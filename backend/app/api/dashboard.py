from fastapi import APIRouter

from app.services.analytics_service import AnalyticsService

router = APIRouter()

service = AnalyticsService()


@router.get("/dashboard")
def dashboard():

    return service.dashboard()