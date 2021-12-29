import React from "react";
import $ from "jquery";
import DisplayDeveloper from "./DisplayDeveloper";
import "./App.css";
import DevToGoHeader from "./header";
import { LoginManager } from "./loginManager";

class MainPage extends React.Component {

    loginManager;

    constructor(props) {
        super(props);
        this.loginManager = LoginManager.getInstance();
    }
    
    componentDidMount = () => {
        document.addEventListener("userLoggedIn", this.handleLogin);
        this.queryDeveloperList();
    }

    componentWillUnmount = () => {
        document.removeEventListener("userLoggedIn", this.handleLogin);
    }

    handleLogin = (event) => {
        let newuser = this.loginManager.getLoggedInUser();
        this.setState({loggedInUser: newuser});
    }

    state = {
        users: [],
        filteredUsers: [],
        loggedInUser: undefined,
        nameFilter: "",
        locationFilter: "",
        skillFilter: ""
    }

    componentDidUpdate = (event) => {

    }

    queryDeveloperList = () =>{
        $.ajax({
            method: "GET",
            url: "/api/users"
        }).then(response => {
            this.setState({users: response.users, filteredUsers: response.users});
        }).catch(error => {
            console.error(error);
        });
    }

    handleNameFilterChange = (event) => {
        this.setState({nameFilter: event.target.value});
        //THIS IS BAD
        this.setState({locationFilter: "", skillFilter: ""});
        let tempArray = [];
        this.state.users.forEach(user => {
            let uName = user.name.toLowerCase();
            let uUName = user.username.toLowerCase();
            let filter = event.target.value.toLowerCase();
            if (uName.includes(filter) || uUName.includes(filter)) {
                tempArray.push(user);
            }
        })
        this.setState({filteredUsers: tempArray});
    }

    handleLocationFilterChange = (event) => {
        this.setState({locationFilter: event.target.value});
        //THIS IS BAD
        this.setState({nameFilter: "", skillFilter: ""});
        let tempArray = [];
        this.state.users.forEach(user => {
            let uLoc = user.location.toLowerCase();
            let filter = event.target.value.toLowerCase();
            if (uLoc.includes(filter)) {
                tempArray.push(user);
            }
        })
        this.setState({filteredUsers: tempArray});
    }

    handleSkillFilterChange = (event) => {
        this.setState({skillFilter: event.target.value});
        //THIS IS BAD
        this.setState({locationFilter: "", nameFilter: ""});
        let tempArray = [];
        this.state.users.forEach(user => {
            let filter = event.target.value.toLowerCase();
            let userAdded = false;
            user.skills.forEach(skill => {
                let sName = skill.Name.toLowerCase();
                if (sName.includes(filter) && !userAdded) {
                    tempArray.push(user);
                    userAdded = true;
                }
            })
        })
        this.setState({filteredUsers: tempArray});
    }
    
    render(){
        return(
            <div>
                <DevToGoHeader page={"main"}></DevToGoHeader>
                <div className="filter-container">
                    <input type="text" placeholder="Filter by name" onChange={this.handleNameFilterChange} value={this.state.nameFilter}></input>
                    <input type="text" placeholder="Filter by location" onChange={this.handleLocationFilterChange} value={this.state.locationFilter}></input>
                    <input type="text" placeholder="Filter by skill" onChange={this.handleSkillFilterChange} value={this.state.skillFilter}></input>
                </div>
                <div className="developer-container">
                    {this.state.filteredUsers.map(user => (
                        <DisplayDeveloper developer={user}  key={user._id}></DisplayDeveloper>
                    ))}
                </div>
            </div>
        )
    }
}

export default MainPage;