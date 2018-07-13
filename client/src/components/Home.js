import React from "react";
import {NavLink, Redirect} from "react-router-dom";
import "./login.css";

const Home = () => {
    return (
        <div>
            <p>Welcome (name) to Potlucky</p>
            <div>
            <NavLink to="/events"><button className="events">Upcoming Events</button></NavLink>
            <NavLink to="/newevent"><button className="create">Create Event</button></NavLink>
            </div>
        </div>
    );
}

export default Home;