import React from "react";
import LoginPopup from "./LoginPopup";
import { LoginManager } from "./loginManager";
import { Link } from "react-router-dom";

class LoginButton extends React.Component{

    loginManager;

    constructor(props) {
        super(props);

        this.loginManager = LoginManager.getInstance();
    }

    componentDidMount = () => {
        document.addEventListener("userLoggedIn", this.handleLogin);
        let user = this.loginManager.getLoggedInUser();
        this.setState({user: user});
        if (user._id) {
            this.setState({buttontext: "Logout", profileUrl: `/user?uid=${user._id}`});
        }
    }

    componentWillUnmount = () => {
        document.removeEventListener("userLoggedIn", this.handleLogin);
    }

    handleLogin = (event) => {
        let newuser = this.loginManager.getLoggedInUser();
        this.setState({user: newuser});
        if (newuser._id) {
            this.setState({buttontext: "Logout", profileUrl: `/user?uid=${newuser._id}`});
        }
        else {
            this.setState({buttontext: "Log in / Register", profileUrl: `/`});
        }
    }

    state = {
        buttontext: "Login / Sign Up",
        popupOpen: false,
        user: {},
        profileUrl: ""
    }

    buttonClickHandler = (event) => {
        if(this.state.buttontext !== "Logout") {
            document.dispatchEvent(new CustomEvent("openLoginPopup"));
        }
        else {
            this.loginManager.setLoggedInUser({});
            document.dispatchEvent(new CustomEvent("userLoggedIn", {detail: {user: {}}}));
        }
    }

    profileClick = () => {
        setTimeout(() => {
            document.dispatchEvent(new CustomEvent("profileClicked"));
        }, 200);
    }

    render() {
        return(
            <div>
                {this.state.user._id && <Link to={this.state.profileUrl}><button onClick={this.profileClick}>{this.state.user.name ? this.state.user.name : this.state.user.username}</button></Link>}
                <button onClick={this.buttonClickHandler}>{this.state.buttontext}</button>
                <LoginPopup openVariable={this.state.popupOpen}></LoginPopup>
            </div>
        )
    }
}

export default LoginButton;