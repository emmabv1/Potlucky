import React from "react";
import { NavLink } from "react-router-dom";

const View = () => {
    return (
        <div>
            <p>View Page</p>
            <NavLink to="/home">Home</NavLink>
        </div>
    );
}

export default View;