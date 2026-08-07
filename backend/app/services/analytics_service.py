import pandas as pd
from app.services.data_loader import DataLoader


class AnalyticsService:

    def __init__(self):
        self.loader = DataLoader()

        data = self.loader.load()

        self.sales = pd.read_csv(self.loader.sales_path)
        self.inventory = pd.read_csv(self.loader.inventory_path)

    def dashboard(self):

        return {

            "total_sales_records": len(self.sales),

            "total_inventory_records": len(self.inventory),

            "total_regions":
                self.sales["Region"].nunique(),

            "total_products":
                self.sales["Product Name"].nunique(),

            "total_categories":
                self.sales["Category of Goods"].nunique(),

            "total_profit":
                round(self.sales["Profit"].sum(),2),

            "total_sales":
                round(self.sales["Sales"].sum(),2),

            "stockout_products":
                int(self.inventory["Stockout_Flag"].sum()),

            "average_inventory":
                round(self.inventory["Inventory_Level"].mean(),2),

            "forecast_average":
                round(self.inventory["Demand_Forecast"].mean(),2)
        }