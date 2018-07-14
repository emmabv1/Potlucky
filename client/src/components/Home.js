import React from "react";
import {NavLink, Redirect} from "react-router-dom";
import "./login.css";

const Home = () => {
    return (
        <div className="container">
            <div className="title">
                <h2>Hi (name)!</h2>
            </div>
            <div>
            <NavLink to="/events"><button className="events">Upcoming Events</button></NavLink>
            <NavLink to="/newevent"><button className="create">Create Event</button></NavLink>
            </div>
        </div>
    );
}

export default Home;