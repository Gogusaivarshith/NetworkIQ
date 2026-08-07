from fastapi import APIRouter

from app.agents.inventory_agent import InventoryAgent

router = APIRouter()

agent = InventoryAgent()


@router.get("/inventory")
def inventory():

    return {

        "understocked":
            agent.understocked(),

        "overstocked":
            agent.overstocked()

    }