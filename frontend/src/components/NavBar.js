import React from "react";
import { Link } from "react-router-dom";
import "../styles.css";

function Navbar() {
    return (
        <nav className="navbar">
            <Link to="/">Customer Page</Link>
            <Link to="/dashboard">Business Dashboard</Link>
        </nav>
    );
}

export default Navbar;
