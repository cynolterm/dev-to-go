import React from "react";
import LoginPopup from "./LoginPopup";

class LoginButton extends React.Component{

    constructor(props) {
        super(props);

        document.addEventListener("userLoggedIn", (event) => {
            this.setState({user: event.detail.user});
        })
    }

    state = {
        buttontext: "Login / Sign Up",
        popupOpen: false,
        user: undefined
    }

    buttonClickHandler = (event) => {
        this.setState({buttontext: "Logout", popupOpen: true});
        document.dispatchEvent(new CustomEvent("openLoginPopup"));
    }


    render() {
        return(
            <div>
                {this.state.user && <button>{this.state.user.name ? this.state.user.name : this.state.user.username}</button>}
                <button onClick={this.buttonClickHandler}>{this.state.buttontext}</button>
                <LoginPopup openVariable={this.state.popupOpen}></LoginPopup>
            </div>
        )
    }
}

export default LoginButton;