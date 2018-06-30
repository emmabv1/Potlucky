import React from "react";
import { NavLink } from "react-router-dom";

const BuildPage1 = () => {
    return (
        <div>
            <p>BuildPage1 Page</p>
            <NavLink to="/build2">Build Page 2</NavLink>
        </div>
    );
}

export default BuildPage1;