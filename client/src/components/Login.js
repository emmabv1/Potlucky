import React from "react";
import { NavLink } from "react-router-dom";

const Login = () => {
    return (
        <div>
            <p>Login Page</p>
            <NavLink to="/home">Home</NavLink>
        </div>
    );
}

export default Login;