import React from "react";
import "./login.css";

const Home = () => {
    return (
        <div>
            <p>Welcome (name) to Potlucky</p>
            <div>
            <a href="/events"><button className="events">Upcoming Events</button></a>
            <a href="/newevent"><button className="create">Create Event</button></a>
            </div>
        </div>
    );
}

export default Home;