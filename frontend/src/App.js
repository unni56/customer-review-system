import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CustomerPage from "./components/CustomerPage";
import Dashboard from "./components/Dashboard";
import Navbar from "./components/NavBar";

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<CustomerPage />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </Router>
    );
}

export default App;
