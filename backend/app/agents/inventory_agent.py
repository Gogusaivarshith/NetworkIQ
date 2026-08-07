import pandas as pd
from app.services.data_loader import DataLoader


class InventoryAgent:

    def __init__(self):

        loader = DataLoader()
        loader.load()

        self.inventory = pd.read_csv(loader.inventory_path)

    def understocked(self):

        df = self.inventory[
            self.inventory["Inventory_Level"]
            <
            self.inventory["Reorder_Point"]
        ].copy()

        df["Shortage"] = (
            df["Reorder_Point"] -
            df["Inventory_Level"]
        )

        df = df.sort_values(
            "Shortage",
            ascending=False
        ).head(20)

        return df[
            [
                "SKU_ID",
                "Warehouse_ID",
                "Region",
                "Inventory_Level",
                "Reorder_Point",
                "Demand_Forecast",
                "Shortage"
            ]
        ].to_dict(orient="records")


    def overstocked(self):

        df = self.inventory[
            self.inventory["Inventory_Level"]
            >
            self.inventory["Demand_Forecast"] * 2
        ].copy()

        df["Excess"] = (
            df["Inventory_Level"]
            -
            df["Demand_Forecast"]
        )

        df = df.sort_values(
            "Excess",
            ascending=False
        ).head(20)

        return df[
            [
                "SKU_ID",
                "Warehouse_ID",
                "Region",
                "Inventory_Level",
                "Demand_Forecast",
                "Excess"
            ]
        ].to_dict(orient="records")