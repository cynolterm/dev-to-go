import React from "react";
import $ from "jquery"
import "./displaydeveloper.css";
import { Link } from "react-router-dom"

class DisplayDeveloper extends React.Component {
    userUrl = "";

    constructor(props) {
        super(props);
        this.userUrl = `/user?uid=${this.props.developer._id}`;
    }

    render(){
        return(
            <div className="developer-row">
                <div className="developer-name"><Link to={this.userUrl}>{this.props.developer.name ? this.props.developer.name : this.props.developer.username}</Link></div>
                <div className="developer-location">{this.props.developer.location ? this.props.developer.location: "-"}</div>
                <div className="developer-skills">{this.props.developer.skills && this.props.developer.skills.map(skill => (
                    <span>{skill.Name}</span>
                ))}</div>
            </div>
        )
    }

}

export default DisplayDeveloper;