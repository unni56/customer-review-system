import express from 'express';
import cors from 'cors';

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

// In-memory storage for reviews
let reviews = [
  {
    id: 1,
    service_used: "La Maison Restaurant",
    review_text: "Excellent French cuisine with impeccable service",
    rating: 5,
    created_at: new Date().toISOString()
  },
  {
    id: 2,
    service_used: "Sushi Master",
    review_text: "Fresh sushi and great atmosphere",
    rating: 4,
    created_at: new Date().toISOString()
  }
];

// Get all reviews
app.get('/reviews', (req, res) => {
  res.json({ reviews });
});

// Search reviews
app.get('/search_reviews', (req, res) => {
  const query = req.query.query.toLowerCase();
  const filtered = reviews.filter(review => 
    review.service_used.toLowerCase().includes(query) ||
    review.review_text.toLowerCase().includes(query)
  );
  res.json({ reviews: filtered });
});

// Submit a review
app.post('/submit_review', (req, res) => {
  const newReview = {
    id: reviews.length + 1,
    ...req.body,
    created_at: new Date().toISOString()
  };
  reviews.push(newReview);
  res.json({ success: true, review: newReview });
});

// AI query endpoint (mock response for now)
app.post('/ai_query', (req, res) => {
  const { query } = req.body;
  res.json({
    response: `Analysis based on your query: "${query}"\n\nBased on the current reviews, we see a positive trend in customer satisfaction with an average rating above 4 stars. The most commonly praised aspects are service quality and food authenticity.`
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});