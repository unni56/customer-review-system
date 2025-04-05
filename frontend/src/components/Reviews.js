import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles.css";

function Reviews() {
    const [reviews, setReviews] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [newReview, setNewReview] = useState("");
    const [rating, setRating] = useState(0);

    useEffect(() => {
        fetchAllReviews();
    }, []);

    const fetchAllReviews = async () => {
        try {
            const response = await axios.get("http://localhost:8000/reviews");
            setReviews(response.data.reviews);
        } catch (error) {
            console.error("Error fetching reviews:", error);
        }
    };

    const searchReviews = async () => {
        if (!searchQuery.trim()) {
            fetchAllReviews();
            return;
        }

        try {
            const response = await axios.get(`http://localhost:8000/search_reviews`, {
                params: { query: searchQuery }
            });
            setReviews(response.data.reviews || []);
        } catch (error) {
            console.error("Error searching reviews:", error);
        }
    };

    const submitReview = async () => {
        if (!newReview.trim() || rating === 0) {
            alert("Please provide a review and select a rating!");
            return;
        }

        try {
            await axios.post("http://localhost:8000/reviews", {
                review_text: newReview,
                rating
            });
            setNewReview("");
            setRating(0);
            fetchAllReviews();
        } catch (error) {
            console.error("Error submitting review:", error);
        }
    };

    return (
        <div className="review-page">
            <h2>⭐ Customer Reviews</h2>

            {/* 🔍 Search Box */}
            <div className="search-container">
                <input
                    type="text"
                    placeholder="🔍 Search reviews..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-box"
                />
                <button onClick={searchReviews} className="search-btn">Search</button>
            </div>

            {/* 📝 Review Submission Form */}
            <div className="review-box">
                <h4>Leave a Review</h4>
                <textarea
                    placeholder="✍️ Type your review here..."
                    value={newReview}
                    onChange={(e) => setNewReview(e.target.value)}
                    className="chat-input"
                />

                {/* ⭐ Star Rating System */}
                <div className="star-rating">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <label key={star}>
                            <input
                                type="radio"
                                name="rating"
                                value={star}
                                checked={rating === star}
                                onChange={() => setRating(star)}
                            />
                            <span className="star">⭐</span>
                        </label>
                    ))}
                </div>

                <button onClick={submitReview} className="submit-btn">Submit</button>
            </div>

            {/* 📜 Display Reviews */}
            <div className="review-list">
                {reviews.length > 0 ? (
                    reviews.map((review, index) => (
                        <div key={index} className="review-card">
                            <h4>{review.service_used}</h4>
                            <p>{review.review_text}</p>
                            <p>Rating: {review.rating} ⭐</p>
                        </div>
                    ))
                ) : (
                    <p>❌ No reviews found.</p>
                )}
            </div>
        </div>
    );
}

export default Reviews;
