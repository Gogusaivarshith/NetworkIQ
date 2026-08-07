from fastapi import APIRouter
from app.services.data_loader import DataLoader

router = APIRouter()

loader = DataLoader()


@router.get("/sales")
def sales():

    sales_df = loader.sales_df

    top_products = (
        sales_df.groupby("Product Name")
        .agg(
            {
                "Quantity": "sum",
                "Sales": "sum",
                "Profit": "sum",
            }
        )
        .sort_values("Sales", ascending=False)
        .head(10)
        .reset_index()
    )

    top_regions = (
        sales_df.groupby("Region")
        .agg(
            {
                "Sales": "sum",
                "Profit": "sum",
                "Quantity": "sum",
            }
        )
        .reset_index()
    )

    top_categories = (
        sales_df.groupby("Category of Goods")
        .agg(
            {
                "Sales": "sum",
                "Profit": "sum",
                "Quantity": "sum",
            }
        )
        .reset_index()
    )

    return {
        "top_products": top_products.to_dict(orient="records"),
        "top_regions": top_regions.to_dict(orient="records"),
        "top_categories": top_categories.to_dict(orient="records"),
    }