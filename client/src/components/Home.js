import React from "react";
import { NavLink } from "react-router-dom";

const Home = () => {
    return (
        <div>
            <p>Home Page</p>
            <NavLink to="/build1">Build Page 1</NavLink>
            <NavLink to="/view">View Page</NavLink>
        </div>
    );
}

export default Home;