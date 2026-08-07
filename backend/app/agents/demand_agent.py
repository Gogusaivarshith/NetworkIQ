import pandas as pd
from app.services.data_loader import DataLoader


class DemandAgent:

    def __init__(self):

        loader = DataLoader()
        loader.load()

        self.sales = pd.read_csv(loader.sales_path)

    def top_products(self):

        df = (
            self.sales
            .groupby("Product Name")
            .agg({
                "Quantity":"sum",
                "Sales":"sum",
                "Profit":"sum"
            })
            .sort_values("Quantity",ascending=False)
            .head(10)
            .reset_index()
        )

        return df.to_dict(orient="records")

    def top_regions(self):

        df = (
            self.sales
            .groupby("Region")
            .agg({
                "Sales":"sum",
                "Profit":"sum",
                "Quantity":"sum"
            })
            .sort_values("Sales",ascending=False)
            .reset_index()
        )

        return df.to_dict(orient="records")

    def top_categories(self):

        df = (
            self.sales
            .groupby("Category of Goods")
            .agg({
                "Sales":"sum",
                "Profit":"sum",
                "Quantity":"sum"
            })
            .sort_values("Sales",ascending=False)
            .reset_index()
        )

        return df.to_dict(orient="records")