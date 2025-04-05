import React, { useState } from "react";
import axios from "axios";
import "../styles.css";

function CustomerPage() {
    const [serviceUsed, setServiceUsed] = useState("");
    const [reviewText, setReviewText] = useState("");
    const [rating, setRating] = useState(1);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);

    // ✅ Submit review function
    const submitReview = async () => {
        if (!serviceUsed || !reviewText) {
            setMessage("⚠️ Please fill all fields before submitting.");
            return;
        }

        const reviewData = { service_used: serviceUsed, review_text: reviewText, rating: rating };

        try {
            setLoading(true);
            await axios.post("http://127.0.0.1:8000/submit_review", reviewData);
            setMessage("✅ Review submitted successfully!");
            setServiceUsed("");
            setReviewText("");
            setRating(1);
            setShowModal(true);
        } catch (error) {
            console.error("❌ Error submitting review", error);
            setMessage("❌ Error submitting review. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <h2>Customer Review Submission</h2>
            <input 
                type="text" 
                value={serviceUsed} 
                onChange={(e) => setServiceUsed(e.target.value)} 
                placeholder="Enter service name" 
            />
            <textarea 
                value={reviewText} 
                onChange={(e) => setReviewText(e.target.value)} 
                placeholder="Write your detailed review here..."
            />
            <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
                {[1, 2, 3, 4, 5].map(num => <option key={num} value={num}>{num} Star</option>)}
            </select>
            <button onClick={submitReview} disabled={loading} className="submit-button">
                {loading ? "Submitting..." : "Submit Review"}
            </button>
            {message && <p className="message">{message}</p>}

            {/* ✅ Confirmation Popup */}
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>✅ Review Submitted Successfully!</h3>
                        <button onClick={() => setShowModal(false)}>OK</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CustomerPage;
