import React, { useState, useEffect } from 'react';
import { Search, Star, Send, MessageSquare, Home, Menu as MenuIcon, BarChart, Utensils, Clock, Award } from 'lucide-react';

interface Review {
  id: number;
  service_used: string;
  review_text: string;
  rating: number;
  created_at: string;
}

function App() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [newReview, setNewReview] = useState({
    service_used: '',
    review_text: '',
    rating: 5
  });
  const [aiQuery, setAiQuery] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/reviews');
      const data = await response.json();
      setReviews(data.reviews);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:8000/submit_review', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newReview),
      });
      if (response.ok) {
        setNewReview({ service_used: '', review_text: '', rating: 5 });
        fetchReviews();
        setSubmitSuccess(true);
        setTimeout(() => setSubmitSuccess(false), 3000);
      }
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/search_reviews?query=${searchQuery}`);
      const data = await response.json();
      if (data.reviews) {
        setReviews(data.reviews);
      }
    } catch (error) {
      console.error('Error searching reviews:', error);
    }
  };

  const handleAiQuery = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://127.0.0.1:8000/ai_query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: aiQuery }),
      });
      const data = await response.json();
      setAiResponse(data.response);
    } catch (error) {
      console.error('Error querying AI:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderLeaveReview = () => (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Leave a Review</h2>
      {submitSuccess && (
        <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg">
          Review submitted successfully!
        </div>
      )}
      <form onSubmit={handleSubmitReview} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Enter Services Used 
          </label>
          <input
            type="text"
            value={newReview.service_used}
            onChange={(e) => setNewReview({ ...newReview, service_used: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter Keywords"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Your Review
          </label>
          <textarea
            value={newReview.review_text}
            onChange={(e) => setNewReview({ ...newReview, review_text: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            rows={4}
            placeholder="Share your dining experience..."
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-4">
            Rating: {newReview.rating} stars
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="range"
              min="1"
              max="5"
              value={newReview.rating}
              onChange={(e) => setNewReview({ ...newReview, rating: parseInt(e.target.value) })}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-6 w-6 ${
                    star <= newReview.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center space-x-2"
        >
          <Send className="h-5 w-5" />
          <span>Submit Review</span>
        </button>
      </form>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setActiveTab('home')}>
              <Utensils className="h-6 w-6 text-yellow-400" />
              <span className="text-xl font-bold">Fine Dine</span>
            </div>
            <div className="flex space-x-6">
              <button 
                onClick={() => setActiveTab('home')}
                className={`flex items-center space-x-1 ${activeTab === 'home' ? 'text-yellow-400' : 'hover:text-yellow-400'}`}
              >
                <Home className="h-5 w-5" />
                <span>Home</span>
              </button>
              <button 
                onClick={() => setActiveTab('reviews')}
                className={`flex items-center space-x-1 ${activeTab === 'reviews' ? 'text-yellow-400' : 'hover:text-yellow-400'}`}
              >
                <Star className="h-5 w-5" />
                <span>Reviews</span>
              </button>
              <button 
                onClick={() => setActiveTab('leave-review')}
                className={`flex items-center space-x-1 ${activeTab === 'leave-review' ? 'text-yellow-400' : 'hover:text-yellow-400'}`}
              >
                <Send className="h-5 w-5" />
                <span>Leave a Review</span>
              </button>
              <button 
                onClick={() => setActiveTab('ai-insights')}
                className={`flex items-center space-x-1 ${activeTab === 'ai-insights' ? 'text-yellow-400' : 'hover:text-yellow-400'}`}
              >
                <BarChart className="h-5 w-5" />
                <span>AI Insights</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {activeTab === 'home' && (
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative h-96">
                <img 
                  src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" 
                  alt="Restaurant interior" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <div className="text-center text-white">
                    <h1 className="text-4xl font-bold mb-4">Welcome to Fine Dine</h1>
                    <p className="text-xl">Discover the finest dining experiences in your city</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
                  <Utensils className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Curated Restaurants</h3>
                <p className="text-gray-600">Discover hand-picked restaurants offering exceptional dining experiences.</p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-4">
                  <Star className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Verified Reviews</h3>
                <p className="text-gray-600">Read authentic reviews from real diners to make informed choices.</p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mb-4">
                  <MessageSquare className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">AI-Powered Insights</h3>
                <p className="text-gray-600">Get personalized recommendations and trends analysis using AI.</p>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'reviews' && (
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-2xl font-semibold mb-4">Search Reviews</h2>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search reviews..."
                  className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                <button
                  onClick={handleSearch}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  <Search className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold mb-4">All Reviews</h2>
              <div className="space-y-4">
                {reviews.map((review) => (
                  <div key={review.id} className="border-b border-gray-200 pb-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium text-gray-900">{review.service_used}</h3>
                      <div className="flex items-center">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-5 w-5 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                              fill={i < review.rating ? 'currentColor' : 'none'}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="mt-2 text-gray-600">{review.review_text}</p>
                    <p className="mt-1 text-sm text-gray-500">
                      {new Date(review.created_at).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'leave-review' && renderLeaveReview()}

        {activeTab === 'ai-insights' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-6">AI Insights</h2>
            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-medium mb-4">Ask AI About Reviews</h3>
                <div className="space-y-4">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={aiQuery}
                      onChange={(e) => setAiQuery(e.target.value)}
                      placeholder="Ask about review trends, ratings, or specific services..."
                      className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                    <button
                      onClick={handleAiQuery}
                      disabled={loading}
                      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50"
                    >
                      {loading ? (
                        <span>Processing...</span>
                      ) : (
                        <MessageSquare className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  {aiResponse && (
                    <div className="bg-purple-50 rounded-md p-4">
                      <p className="text-purple-900">{aiResponse}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-medium mb-4">Rating Distribution</h3>
                <div className="space-y-3">
                  {[5, 4, 3, 2, 1].map((rating) => {
                    const count = reviews.filter(r => r.rating === rating).length;
                    const percentage = (count / reviews.length) * 100 || 0;
                    return (
                      <div key={rating} className="flex items-center space-x-4">
                        <div className="flex items-center w-20">
                          <Star className="h-4 w-4 text-yellow-400" />
                          <span className="ml-1">{rating}</span>
                        </div>
                        <div className="flex-1 h-4 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-yellow-400"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <span className="w-16 text-sm text-gray-500">{percentage.toFixed(1)}%</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;