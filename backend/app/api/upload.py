from fastapi import APIRouter, UploadFile, File
from app.services.data_loader import loader

router = APIRouter()

@router.post("/upload")
async def upload_files(
    sales: UploadFile = File(...),
    inventory: UploadFile = File(...)
):
    return loader.load_uploaded(
        sales.file,
        inventory.file
    )