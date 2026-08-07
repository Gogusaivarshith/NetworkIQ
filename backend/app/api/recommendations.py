from fastapi import APIRouter

from app.agents.recommendation_agent import RecommendationAgent

router = APIRouter()

agent = RecommendationAgent()


@router.get("/recommendations")
def recommendations():

    return {

        "recommendations":
            agent.recommend()

    }