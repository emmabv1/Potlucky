import React from "react";
import {NavLink} from "react-router-dom";

const Home = () => {
    return (
        <div>
            <p>Welcome (name) to Potlucky</p>
            <div>
            <section className="events"><NavLink to="/events">Upcoming Events</NavLink></section>
            <section className="create"><NavLink to="/newevent">Create Event</NavLink></section>
            </div>
        </div>
    );
}

export default Home;