from fastapi import APIRouter

from app.agents.demand_agent import DemandAgent

router = APIRouter()

agent = DemandAgent()


@router.get("/forecast")
def forecast():

    return {

        "top_products":
            agent.top_products(),

        "top_regions":
            agent.top_regions(),

        "top_categories":
            agent.top_categories()

    }