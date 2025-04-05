import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles.css";

function Dashboard() {
    const [reviews, setReviews] = useState([]);
    const [aiQuery, setAiQuery] = useState("");
    const [aiResponse, setAiResponse] = useState("");
    const [loadingAi, setLoadingAi] = useState(false);
    
    useEffect(() => {
        fetchReviews();
    }, []);

    // ✅ Fetch reviews from backend
    const fetchReviews = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:8000/reviews");
            setReviews(response.data.reviews);
        } catch (error) {
            console.error("❌ Error fetching reviews", error);
        }
    };

    // ✅ Fetch AI response based on user query
    const fetchAiResponse = async () => {
        if (!aiQuery.trim()) {
            setAiResponse("⚠️ Please enter a valid query.");
            return;
        }

        setLoadingAi(true);
        try {
            const response = await axios.post("http://127.0.0.1:8000/ai_query", { query: aiQuery });
            setAiResponse(response.data.response);
        } catch (error) {
            console.error("❌ Error fetching AI response", error);
            setAiResponse("❌ Failed to fetch AI response.");
        } finally {
            setLoadingAi(false);
        }
    };

    return (
        <div className="dashboard-container">
            <h2 className="dashboard-title">📊 Business Dashboard</h2>

            {/* ✅ AI Chat Container */}
            <div className="chat-container">
                <div className="chat-box">
                    <h3>💬 AI Chat</h3>
                    <input
                        type="text"
                        value={aiQuery}
                        onChange={(e) => setAiQuery(e.target.value)}
                        placeholder="Ask AI (e.g., 'What are common complaints?')"
                        className="chat-input"
                    />
                    <button onClick={fetchAiResponse} disabled={loadingAi} className="chat-submit">
                        {loadingAi ? "Thinking..." : "Ask AI"}
                    </button>

                    {/* ✅ AI Response Display */}
                    {aiResponse && (
                        <div className="chat-response">
                            <h4>🤖 AI Response:</h4>
                            <p>{aiResponse}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
