from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from database import save_review, get_all_reviews, search_reviews  # Import functions
from pydantic import BaseModel
from ai import ask_ai
from fastapi import Body  # Import Body explicitly
import logging

# ✅ Configure Logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)



app = FastAPI()

# Enable CORS for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ API to Submit Review
class Review(BaseModel):
    service_used: str
    review_text: str
    rating: int

class AIQuery(BaseModel):
    query: str

# ✅ Fix: Accept JSON Request Body
@app.post("/submit_review")
def submit_review(review: Review):
    logger.info("🔥 Submit Review Endpoint Called")  # ✅ Use logging
    return save_review(review.service_used, review.review_text, review.rating)
# ✅ API to Retrieve All Reviews
@app.get("/reviews")
def get_reviews():
    return {"reviews": get_all_reviews()}

# ✅ API to Search Reviews
@app.get("/search_reviews")
def search_reviews_endpoint(query: str = Query(..., description="Search query for reviews")):
    results = search_reviews(query)
    if results:
        return {"reviews": results}
    return {"message": "❌ No reviews found matching your search."}

@app.post("/ai_query")
def ai_query(query: AIQuery = Body(...)):  # 👈 Now FastAPI knows it's a JSON body
    print("HI")
    reviews = get_all_reviews()
    print("helo")
    response = ask_ai(query.query, reviews)
    print("kill me")
    return {"response": response}
