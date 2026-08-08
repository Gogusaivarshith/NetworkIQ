from datetime import datetime
from fastapi import APIRouter

from app.agents.recommendation_agent import RecommendationAgent

router = APIRouter()

agent = RecommendationAgent()


@router.get("/recommendations")
def recommendations():
    recs = agent.recommend()

    estimated_savings = sum(r["expected_profit"] for r in recs)
    approved = sum(1 for r in recs if r["decision"] == "APPROVED")
    confidence = (
        round(approved / len(recs) * 100, 1) if recs else 0
    )

    return {
        "status": "Optimization Complete",
        "recommendations": recs,
        "recommendation_count": len(recs),
        "estimated_savings": round(estimated_savings, 2),
        "confidence": confidence,
        "network_health": max(0, 100 - len(recs)),
        "generated_at": datetime.now().strftime("%H:%M:%S"),
    }