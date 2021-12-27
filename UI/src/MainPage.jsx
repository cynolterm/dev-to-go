import React from "react";
import $ from "jquery";

class MainPage extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        users: []
    }

    componentDidUpdate = (event) => {
        console.log(event);
        console.log(this.state);
    }

    componentDidMount = () => {
        $.ajax({
            method: "GET",
            url: "/api/users"
        }).then(response => {
            console.log(response)
            this.setState({users: response.users});
        }).catch(error => {
            console.error(error);
        });
    }
    
    render(){
        return(
            <div>HelloHeader
                {this.state.users.map(user => (
                    <li key={user._id}>
                        <span>Name: {user.username}</span>
                        <span>Location: {user.location}</span>
                        {/* <div>Skills: {user.skills}</div> */}
                    </li>
                ))}
            </div>
        )
    }
}

export default MainPage;