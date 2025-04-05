import React from "react";
import { Link } from "react-router-dom";
import "../styles.css";

function Navbar() {
    return (
        <nav className="navbar">
            <div className="logo">
                <Link to="/">🍽️ Fine Dine</Link>
            </div>
            <ul className="nav-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/menu">Menu</Link></li>
                <li><Link to="/reviews">Reviews</Link></li>
                <li><Link to="/dashboard">Business Dashboard</Link></li>
                <li><Link to="/leave-review">✍️ Leave a Review</Link></li>
            </ul>
        </nav>
    );
}

export default Navbar;
