import pandas as pd
from sklearn.ensemble import RandomForestRegressor

class DemandPredictor:

    def train(self, df):

        features = [
            "Unit_Price",
            "Unit_Cost",
            "Inventory_Level",
            "Supplier_Lead_Time_Days",
            "Reorder_Point"
        ]

        X = df[features]
        y = df["Demand_Forecast"]

        model = RandomForestRegressor(
            n_estimators=100,
            random_state=42
        )

        model.fit(X, y)

        return model

    def predict(self, model, df):

        features = [
            "Unit_Price",
            "Unit_Cost",
            "Inventory_Level",
            "Supplier_Lead_Time_Days",
            "Reorder_Point"
        ]

        return model.predict(df[features])