import React from "react";
import {NavLink} from "react-router-dom";

const Home = () => {
    return (
        <div>
            <p>Welcome (name) to Potlucky</p>
            <div>
            <div><NavLink to="/events">Upcoming Events</NavLink></div>
            <div><NavLink to="/newevent">Create Event</NavLink></div>
            </div>
        </div>
    );
}

export default Home;