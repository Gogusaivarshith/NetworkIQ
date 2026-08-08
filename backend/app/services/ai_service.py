import os
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
print("API KEY:", os.getenv("GEMINI_API_KEY"))
model = genai.GenerativeModel("gemini-2.0-flash")


class AIService:

    def executive_summary(self, analytics):

        prompt = f"""
        You are an expert Supply Chain Consultant.

        Analyze the following business metrics and produce an executive summary.

        Metrics:

        {analytics}

        Your response should include:

        1. Business Overview
        2. Risks
        3. Opportunities
        4. Inventory Insights
        5. Final Recommendation

        Keep it under 250 words.
        """

        response = model.generate_content(prompt)

        return {
            "summary": response.text
        }