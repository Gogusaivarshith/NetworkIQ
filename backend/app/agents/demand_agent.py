from app.services.data_loader import loader

class DemandAgent:

    def analyze(self):

        sales = loader.sales_df

        top_region = (
            sales.groupby("Region")["Sales"]
            .sum()
            .idxmax()
        )

        return {
            "agent": "Demand Agent",
            "status": "SUCCESS",
            "reason":
                f"Highest demand detected in {top_region} region.",
            "confidence": 96
        }