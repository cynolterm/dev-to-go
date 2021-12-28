import React from "react";
import $ from "jquery";
import DisplayDeveloper from "./DisplayDeveloper";
import "./App.css";
import DevToGoHeader from "./header";

class MainPage extends React.Component {
    constructor(props) {
        super(props);
        document.addEventListener("userLoggedIn", (event) => {this.queryDeveloperList(); this.setState({loggedInUser: event.detail.user})});
    }

    componentWillUnmount = () => {
        // document.removeEventListener("userLoggedIn");
    }

    state = {
        users: [],
        loggedInUser: undefined
    }

    componentDidUpdate = (event) => {
        console.log(event);
        console.log(this.state);
    }

    componentDidMount = () => {
        this.queryDeveloperList();
    }

    queryDeveloperList = () =>{
        $.ajax({
            method: "GET",
            url: "/api/users"
        }).then(response => {
            this.setState({users: response.users});
        }).catch(error => {
            console.error(error);
        });
    }
    
    render(){
        return(
            <div>
                <DevToGoHeader page={"main"}></DevToGoHeader>
                <div className="filter-container">

                </div>
                <div className="developer-container">
                    {this.state.users.map(user => (
                        <DisplayDeveloper developer={user}  key={user._id}></DisplayDeveloper>
                    ))}
                </div>
            </div>
        )
    }
}

export default MainPage;