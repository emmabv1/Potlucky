import React from "react";
import {NavLink} from "react-router-dom";
import "./login.css";

//replace with data from get route
const name = "Yoo";

const Home = () => {
    return (
        <div className="container">
            <NavLink to="/home"><img className="logo" src="https://image.ibb.co/kn5pgo/potlucky_logo.png" alt="potlucky_logo"/></NavLink>
            <div className="title">
                <h2>Hi {name}!</h2>
            </div>
            <div>
            <NavLink to="/events"><button className="menu events">Upcoming Events</button></NavLink>
            <NavLink to="/newevent"><button className="menu events">Create Event</button></NavLink>
            </div>
        </div>
    );
}

export default Home;