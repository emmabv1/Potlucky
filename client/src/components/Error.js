import React from "react";
import {NavLink} from "react-router-dom";

const Error = () => {
    return (
        <div>
            <p>Error: This Page Does Not Exist</p>
            <NavLink to="/">Home</NavLink>
        </div>
    );
}

export default Error;