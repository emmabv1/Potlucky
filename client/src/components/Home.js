import React, { Component } from 'react';
import {NavLink} from "react-router-dom";
import "./login.css";
import axios from "axios";

class Home extends Component{

    state = {
        user: ""
    }
    
    userqueryid = this.props.match.params.userid;

    componentDidMount(){
        axios.get(`/api/users/${this.userqueryid}`)
            .then(res=>this.setState(pvSt=>{
                return {...pvSt,user: res.data}
            }))
    }

    render() {
        return (
            <div className="container">
                <NavLink to="./home"><img className="logo" src="https://image.ibb.co/kn5pgo/potlucky_logo.png" alt="potlucky_logo"/></NavLink>
                <div className="title">
                    <h2>Hi {this.state.user.name}!</h2>
                </div>
                <div>
                <NavLink to="./events"><button className="menu events">Upcoming Events</button></NavLink>
                <NavLink to="./newevent"><button className="menu events">Create Event</button></NavLink>
                </div>
            </div>
        );
    }
    
}

// // href={"#demo" + this.state.id}
// `/#/${req.user.id}/home`

// `/api/users/${this.props.match.params.userid}`

export default Home;