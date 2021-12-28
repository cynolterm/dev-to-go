import "./header.css";
import LoginButton from "./LoginButton";
import React from "react";
import { Link } from "react-router-dom";

class DevToGoHeader extends React.Component {

    state = {
        page: ""
    }

    constructor(props) {
        super(props);
    }

    render(){
        return(
            <div className="dev-to-go-header">
                {this.props.page === "user" ? <div><Link to={"/"}><button>Home</button></Link></div>: <div></div>}
                <h1>Developer To Go</h1>
                <div>
                    <LoginButton></LoginButton>
                </div>
            </div>
        )
    }
}

export default DevToGoHeader;