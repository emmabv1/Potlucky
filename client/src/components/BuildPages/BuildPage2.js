import React from "react";
import { NavLink } from "react-router-dom";

const BuildPage2 = () => {
    return (
        <div>
            <p>BuildPage2 Page</p>
            <NavLink to="/build3">Build Page 3</NavLink>
        </div>
    );
}

export default BuildPage2;