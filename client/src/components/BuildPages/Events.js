import React from "react";
import { NavLink } from "react-router-dom";

const Events = () => {
    return (
        <div>
            <h2>Upcoming Potlucks</h2>

            <button>All</button>
            <button>Yours</button>
            <button>Theirs</button>

            <NavLink to="/potluck/:id">Event Component</NavLink>
            <NavLink to="/potluck/:id">Event Component</NavLink>
            <NavLink to="/potluck/:id">Event Component</NavLink>
            <NavLink to="/potluck/:id">Event Component</NavLink>
            <NavLink to="/potluck/:id">Event Component</NavLink>
            <NavLink to="/potluck/:id">Event Component</NavLink>
            <NavLink to="/potluck/:id">Event Component</NavLink>
        </div>
    );
}

export default Events;