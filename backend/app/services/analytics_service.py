from app.services.data_loader import loader

class AnalyticsService:

    def dashboard(self):

        sales = loader.sales_df
        inventory = loader.inventory_df

        return {
            "total_sales_records": len(sales),
            "total_inventory_records": len(inventory),
            "total_regions": sales["Region"].nunique(),
            "total_products": sales["Product Name"].nunique(),
            "total_categories": sales["Category of Goods"].nunique(),
            "total_profit": round(sales["Profit"].sum(),2),
            "total_sales": round(sales["Sales"].sum(),2),
            "stockout_products": int(inventory["Stockout_Flag"].sum()),
            "average_inventory": round(inventory["Inventory_Level"].mean(),2),
            "forecast_average": round(inventory["Demand_Forecast"].mean(),2)
        }