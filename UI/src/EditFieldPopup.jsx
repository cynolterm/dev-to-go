import React from "react";
import $ from "jquery";
import "./editfieldpopup.css"

class EditFieldPopup extends React.Component {

    state = {
        type: "",
        uid: "",
        newValue: "",
        popupClass: "edit-field-popup-closed"
    }

    constructor(props) {
        super(props);
    }

    updateField = () => {
        let type = this.state.type;
        let putData = {};
        putData[type] = this.state.newValue;
        $.ajax({
            method: "PUT",
            url: `/api/users/${this.state.uid}`,
            data: $.param(putData),
            processData: false
        }).then(response => {
            this.props.scb();
        }).catch(error => {
            console.error(error);
        })
    }

    componentDidUpdate = (props) => {
        if (this.props.openVariable !== props.openVariable && this.props.openVariable === true) {
            this.setState({popupClass: "edit-field-popup", type: this.props.type, uid: this.props.uid})
        }
    }

    handleChange = (event) =>{
        this.setState({newValue: event.target.value})
    }

    closePopup = () => {
        this.setState({popupClass: "edit-field-popup-closed"})
        this.props.openVariable = false;
    }

    saveChanges = () => {
        this.updateField();
        this.closePopup();
    }

    render(){
        return(
            <div className={this.state.popupClass}>
                <div><h3>{this.state.type}</h3></div>
                <input type="text" placeholder="Enter new Value" value={this.state.newValue} onChange={this.handleChange}></input>
                <div>
                    <button onClick={this.closePopup}>Cancel</button>
                    <button onClick={this.saveChanges}>Save</button>
                </div>
            </div>
        )
    }
}

export default EditFieldPopup;