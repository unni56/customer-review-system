import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CustomerPage from "./components/CustomerPage";
import Dashboard from "./components/Dashboard";
import Navbar from "./components/NavBar";
import LeaveReview from "./components/LeaveReview";
import Reviews from "./components/Reviews";

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<CustomerPage />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/leave-review" element={<LeaveReview />} />
                <Route path="/reviews" element={<Reviews />} />
            </Routes>
        </Router>
    );
}

export default App;
