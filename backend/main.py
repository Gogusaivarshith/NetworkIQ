from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.dashboard import router as dashboard_router
from app.api.data import router as data_router
from app.api.forecast import router as forecast_router
from app.api.inventory import router as inventory_router
from app.api.recommendations import router as recommendation_router
from app.api.sales import router as sales_router
from app.api.upload import router as upload_router
from app.api.recommendations import router as recommendation_router
from app.api.ai import router as ai_router


app = FastAPI(
    title="NetworkIQ",
    version="1.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(data_router)
app.include_router(dashboard_router)
app.include_router(forecast_router)
app.include_router(inventory_router)
app.include_router(recommendation_router)
app.include_router(sales_router)
app.include_router(upload_router)
app.include_router(recommendation_router)
app.include_router(ai_router)


@app.get("/")
def root():

    return {
        "message":"NetworkIQ Backend Running"
    }