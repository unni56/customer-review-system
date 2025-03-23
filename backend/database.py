from pymongo import MongoClient
from datetime import datetime
from config import MONGO_URI  # Import MongoDB URI

# ✅ Connect to MongoDB Atlas
client = MongoClient(MONGO_URI)
db = client["customer_reviews"]
collection = db["reviews"]

# ✅ Function to save a new review
def save_review(service_used, review_text, rating):
    review_data = {
        "service_used": service_used,
        "review_text": review_text,
        "rating": rating,
        "timestamp": datetime.utcnow()
    }
    collection.insert_one(review_data)
    return {"message": "Review submitted successfully!"}

# ✅ Function to fetch all reviews
def get_all_reviews():
    return list(collection.find({}, {"_id": 0}))  # Exclude MongoDB `_id`

# ✅ Fix: Function to search for reviews (using regex)
def search_reviews(query):
    search_results = list(collection.find(
        {"review_text": {"$regex": f".*{query}.*", "$options": "i"}},  # Case-insensitive partial match
        {"_id": 0}
    ))
    return search_results if search_results else None  # Return None if no results
