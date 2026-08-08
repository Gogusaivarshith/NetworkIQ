from fastapi import APIRouter
from app.services.ai_service import AIService
from app.services.analytics_service import AnalyticsService

router = APIRouter()

analytics = AnalyticsService()
ai = AIService()


@router.get("/ai-summary")
def ai_summary():

    data = analytics.dashboard()

    return ai.executive_summary(data)