import google.generativeai as genai
from config import GEMINI_API_KEY

# ✅ Configure Gemini API
genai.configure(api_key=GEMINI_API_KEY)

# ✅ Verify Model Name (Replace if necessary)
MODEL_NAME = "models/gemini-1.5-pro"  # Change this if the model is unavailable

# ✅ Function to process AI queries
def ask_ai(user_query, reviews):
    """Generates an AI response based on user query and customer reviews."""
    print(reviews)
    if not reviews:
        return "No review data available to analyze."

    # ✅ Format reviews for AI processing
    review_texts = "\n".join([f"- {r['review_text']}" for r in reviews[:10]])  # Limit to last 10 reviews
    prompt = f"Here are some customer reviews:\n{review_texts}\n\nUser query: {user_query}\n\nProvide a detailed response."

    try:
        model = genai.GenerativeModel(MODEL_NAME)
        response = model.generate_content(prompt)

        # ✅ Debugging logs
        print("🔥 AI Raw Response:", response)

        # ✅ Extract AI-generated text properly
        if response and hasattr(response, "text"):
            return response.text.strip()
        elif hasattr(response, "parts") and response.parts:
            return response.parts[0].text.strip()
        else:
            return "AI could not generate a response."

    except Exception as e:
        return f"Error in AI processing: {str(e)}"
