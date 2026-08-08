from app.services.data_loader import loader

class RecommendationService:

    def generate(self):

        sales = loader.sales_df
        inventory = loader.inventory_df

        recommendations = []

        # Low Inventory
        low_stock = inventory[
            inventory["Inventory_Level"] <
            inventory["Reorder_Point"]
        ]

        recommendations.append({
            "priority": "HIGH",
            "title": "Low Inventory Alert",
            "description": f"{len(low_stock)} products are below reorder level."
        })

        # Supplier Delay
        delayed = inventory[
            inventory["Supplier_Lead_Time_Days"] > 20
        ]

        recommendations.append({
            "priority": "MEDIUM",
            "title": "Supplier Delay",
            "description": f"{len(delayed)} products have high supplier lead times."
        })

        # Top Region
        top_region = (
            sales.groupby("Region")["Sales"]
            .sum()
            .idxmax()
        )

        recommendations.append({
            "priority": "LOW",
            "title": "Best Performing Region",
            "description": f"{top_region} has the highest sales."
        })

        return recommendations