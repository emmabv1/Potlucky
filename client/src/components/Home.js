import React, { Component } from 'react';
import {NavLink} from "react-router-dom";
import "./login.css";
import axios from "axios";

//replace with data from get route
const name = "Yoo";

class Home extends Component{

    state = {
        user: ""
    }
    
    componentDidMount(){
        axios.get(`/api/users/${this.props.match.params.userid}`)
            .then(res=>this.setState(pvSt=>{
                return {...pvSt,user: res.data}
            }))
    }
    // componentDidMount() {
    //     console.log(this.props.match.params.userid);
    //     fetch(`/api/users/${this.props.match.params.userid}`, {
    //         method: 'GET',
    //         headers: {'Content-Type': 'application/json'},
    //     }).then((response) => {
    //         if (response.status >= 400) {
    //           throw new Error("Bad response from server");
    //         }
    //         return response.json();
    //     }).then((data) => {
    //         console.log(data)    
    //         if(data == "success"){
    //           this.setState({user: data});
    //           console.log(this.state.user);
    //         }
    //     }).catch((err) => {
    //         console.log(err)
    //     });
    // }

    render() {
        return (
            <div className="container">
                <NavLink to="/home"><img className="logo" src="https://image.ibb.co/kn5pgo/potlucky_logo.png" alt="potlucky_logo"/></NavLink>
                <div className="title">
                    <h2>Hi {this.state.user.name}!</h2>
                </div>
                <div>
                <NavLink to="/events"><button className="menu events">Upcoming Events</button></NavLink>
                <NavLink to="/newevent"><button className="menu events">Create Event</button></NavLink>
                </div>
            </div>
        );
    }
    
}

export default Home;