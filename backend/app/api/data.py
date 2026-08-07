from fastapi import APIRouter
from app.services.data_loader import DataLoader

router = APIRouter()

loader = DataLoader()


@router.get("/load-data")
def load_data():

    return loader.load()