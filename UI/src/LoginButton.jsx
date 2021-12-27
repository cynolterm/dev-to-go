import React from "react";
import LoginPopup from "./LoginPopup";

class LoginButton extends React.Component{

    state = {
        buttontext: "Login / Sign Up",
        popupOpen: false
    }

    buttonClickHandler = (event) => {
        console.log(event);
        this.setState({buttontext: "User", popupOpen: true});
        console.log(this.state.popupOpen)
        setTimeout(() => {
            console.log(this.state.popupOpen)
        }, 100)
    }

    render() {
        return(
            <div>
                <button onClick={this.buttonClickHandler}>{this.state.buttontext}</button>
                <LoginPopup openVariable={this.state.popupOpen}></LoginPopup>
            </div>
        )
    }
}

export default LoginButton;