import pandas as pd
from app.services.data_loader import DataLoader


class RecommendationAgent:

    def __init__(self):
        loader = DataLoader()
        loader.load()

        self.inventory = pd.read_csv(loader.inventory_path)

    def recommend(self):
        under = self.inventory[
            self.inventory["Inventory_Level"]
            < self.inventory["Reorder_Point"]
        ].copy()

        over = self.inventory[
            self.inventory["Inventory_Level"]
            > self.inventory["Demand_Forecast"] * 2
        ].copy()

        recommendations = []

        for _, shortage in under.iterrows():
            sku = shortage["SKU_ID"]

            candidates = over[over["SKU_ID"] == sku]

            if len(candidates) == 0:
                continue

            source = candidates.iloc[0]

            qty = min(
                source["Inventory_Level"] - source["Demand_Forecast"],
                shortage["Reorder_Point"] - shortage["Inventory_Level"],
            )

            if qty <= 0:
                continue

            transfer_cost = round(qty * 2.5, 2)
            expected_profit = round(qty * source["Unit_Price"] * 0.35, 2)

            recommendations.append({
                "sku": sku,
                "from_region": source["Region"],
                "to_region": shortage["Region"],
                "from_warehouse": source["Warehouse_ID"],
                "to_warehouse": shortage["Warehouse_ID"],
                "quantity": int(qty),
                "transfer_cost": transfer_cost,
                "expected_profit": expected_profit,
                "decision": (
                    "APPROVED"
                    if expected_profit > transfer_cost
                    else "REJECTED"
                ),
                "reason": (
                    f"{shortage['Region']} needs inventory while"
                    f" {source['Region']} has excess stock."
                ),
                "agent_trace": [
                    {
                        "agent": "Sales Agent",
                        "result": (
                            f"Demand is higher in {shortage['Region']}"
                        ),
                    },
                    {
                        "agent": "Inventory Agent",
                        "result": (
                            f"{source['Region']} warehouse has excess inventory"
                        ),
                    },
                    {
                        "agent": "Risk Agent",
                        "result": "Transfer will not create stockout risk",
                    },
                    {
                        "agent": "Decision Agent",
                        "result": (
                            "Transfer Approved"
                            if expected_profit > transfer_cost
                            else "Transfer Rejected"
                        ),
                    },
                ],
            })

        return recommendations[:20]