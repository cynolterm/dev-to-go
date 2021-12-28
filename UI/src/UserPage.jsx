import React from "react";
import $ from "jquery";
import "./userpage.css";
import EditFieldPopup from "./EditFieldPopup";
import DevToGoHeader from "./header";

class UserPage extends React.Component {
    
    state = {
        user: undefined,
        popupOpen: false
    }

    params;

    constructor(props){
        super(props);

        const urlSearchParams = new URLSearchParams(window.location.search);
        this.params = Object.fromEntries(urlSearchParams.entries());
        this.getUserData();
        document.dispatchEvent(new CustomEvent("pageChanged", {detail: {page: "user"}}));
    }

    successCallback = () => {
        this.getUserData();
    }

    getUserData = () => {
        $.ajax({
            method: "GET",
            url: `/api/users/${this.params.uid}`
        }).then(response => {
            this.setState({user: response});
        }).catch(error => {
            console.error(error);
        })
    }
    
    openNameEditPopup = () => {
        this.setState({type: "name"});
        this.openPopup();
    }

    openContactEditPopup = () => {
        this.setState({type: "contact"});
        this.openPopup();
    }

    openLocationEditPopup = () => {
        this.setState({type: "location"});
        this.openPopup();
    }

    openPriceEditPopup = () => {
        this.setState({type: "wage"});
        this.openPopup();
    }

    openSkillEditPopup = () => {
        this.setState({type: "skills"});
        this.openPopup();
    }

    openDescriptionEditPopup = () => {
        this.setState({type: "description"});
        this.openPopup();
    }

    openPopup = () => {
        this.setState({popupOpen: true})
    }

    render(){
        return(
            <div>
                <DevToGoHeader page={"user"}></DevToGoHeader>
                <h2>Profile</h2>
                <div className="user-details-container">
                    <div className="left-column">
                        <div className="detail-row">
                            {this.state.user && "Name - " + this.state.user.name}
                            <button onClick={this.openNameEditPopup}>Edit</button>
                        </div>
                        <div className="detail-row">
                            {this.state.user && "Contact - " + this.state.user.contact}
                            <button onClick={this.openContactEditPopup}>Edit</button>
                        </div>
                        <div className="detail-row">
                            {this.state.user && "Location - " + this.state.user.location}
                            <button onClick={this.openLocationEditPopup}>Edit</button>
                        </div>
                        <div className="detail-row">
                            {this.state.user && "Price - " + this.state.user.wage} Ft/hr
                            <button onClick={this.openPriceEditPopup}>Edit</button>
                        </div>
                        <div className="detail-row">
                            {this.state.user && "Skills"}
                            <button onClick={this.openSkillEditPopup}>Edit</button>
                            {this.state.user && this.state.user.skills.map(skill => (
                                <div>{skill.Name} - {skill.Level}</div>
                            ))}
                        </div>
                    </div>
                    <div className="right-column">
                        <div>Description</div>
                        <button onClick={this.openDescriptionEditPopup}>Edit</button>
                        <div>{this.state.user && this.state.user.description}</div>
                    </div>
                    {this.state.user && <EditFieldPopup openVariable={this.state.popupOpen} type={this.state.type} uid={this.state.user._id} scb={this.successCallback}></EditFieldPopup>}
                </div>
            </div>
        )
    }
}

export default UserPage;