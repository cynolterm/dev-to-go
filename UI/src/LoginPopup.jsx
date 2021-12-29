import React from "react";
import "./App.css";
import $ from "jquery";
import { LoginManager } from "./loginManager";

class LoginPopup extends React.Component {
    
    loginManager;

    constructor(props) {
        super(props);
        document.addEventListener("openLoginPopup", (event) => {
            this.openPopup();
        })
        this.loginManager = LoginManager.getInstance();
    }
    
    state = {
        popupClass: "dev-to-go-login-popup-closed",
        username: "",
        password: ""
    }

    closePopup = () => {
        this.setState({popupClass: "dev-to-go-login-popup-closed"})
        this.props.openVariable = false;
    }

    componentDidUpdate = (props) => {

    }

    openPopup = () => {
        this.setState({popupClass: "dev-to-go-login-popup"});
    }

    registerClicked = () => {
        $.ajax({
            method: "POST",
            url: "/api/users",
            data: $.param({username: this.state.username, password: this.state.password}),
            processData: false
        }).then(response => {
            this.closePopup();
        }).catch(error => {
            console.error(error);
        })

        this.closePopup();
    }

    loginClicked = () => {
        $.ajax({
            method: "POST",
            url: "/api/auth/login",
            data: $.param({username: this.state.username, password: this.state.password}),
            processData: false
        }).then(response =>{
            this.closePopup();
            this.loginManager.setLoggedInUser(response.user);
            document.dispatchEvent(new CustomEvent("userLoggedIn", {detail: {user: response.user}}));
        }).catch(error => {
            console.error(error)
        })
    }

    handleUserNameChange = (event) => {
        this.setState({username: event.target.value})
    }

    handlePasswordChange = (event) => {
        this.setState({password: event.target.value})
    }

    render() {
        return(
            <div className={this.state.popupClass}>
                <div className="login-header">
                    <div>Login</div>
                    <button onClick={this.closePopup}>X</button>
                </div>
                <br></br>
                <div className="login-body">
                    <div className="inputrow">
                        <span>Username</span>
                        <input type="text" value={this.state.username} onChange={this.handleUserNameChange}></input>
                    </div>
                    <div className="inputrow">
                        <span>Password</span>
                        <input type="password" value={this.state.password} onChange={this.handlePasswordChange}></input>
                    </div>
                </div>
                <br></br>
                <div className="login-footer">
                    <div className="button-container">
                        <button onClick={this.registerClicked}>Register</button>
                        <button onClick={this.loginClicked}>Login</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default LoginPopup;