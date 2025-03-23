import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles.css";

function Dashboard() {
    const [reviews, setReviews] = useState([]);
    const [summary, setSummary] = useState("");
    const [loadingSummary, setLoadingSummary] = useState(false);
    const [aiQuery, setAiQuery] = useState("");
    const [aiResponse, setAiResponse] = useState("");
    const [loadingAi, setLoadingAi] = useState(false);

    useEffect(() => {
        fetchReviews();
   //   fetchSummary();
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

    // ✅ Fetch AI-generated summary
   // const fetchSummary = async () => {
   //     setLoadingSummary(true);
   //     try {
   //         const response = await axios.get("http://127.0.0.1:8000/summarize_reviews");
   //         setSummary(response.data.summary);
   //     } catch (error) {
   //         console.error("❌ Error fetching summary", error);
   //     } finally {
   //         setLoadingSummary(false);
   //     }
   // };

    // ✅ Fetch AI response based on user input
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

            //<h3>AI Summary of Customer Reviews</h3>
            //<button onClick={fetchSummary}>Refresh AI Summary</button>
    return (
        <div className="container">
            <h2>Business Dashboard</h2>

            {/* ✅ AI Summary */}
            {loadingSummary ? <p>Loading summary...</p> : <p>{summary}</p>}


            {/* ✅ AI Query Input */}
            <h3>Ask AI a Question</h3>
            <input
                type="text"
                value={aiQuery}
                onChange={(e) => setAiQuery(e.target.value)}
                placeholder="Ask AI (e.g., 'What are the most common complaints?')"
            />
            <button onClick={fetchAiResponse} disabled={loadingAi}>
                {loadingAi ? "Thinking..." : "Get AI Insights"}
            </button>

            {/* ✅ Display AI Response */}
            {aiResponse && (
                <div className="ai-response">
                    <h4>AI Response:</h4>
                    <p>{aiResponse}</p>
                </div>
            )}
        </div>
    );
}

export default Dashboard;
