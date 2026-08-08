from app.services.data_loader import loader

class InventoryAgent:

    def analyze(self):

        inventory = loader.inventory_df

        low_stock = inventory[
            inventory["Inventory_Level"] <
            inventory["Reorder_Point"]
        ]

        return {

            "agent": "Inventory Agent",

            "status": "WARNING",

            "reason":
                f"{len(low_stock)} products below reorder point.",

            "confidence":93
        }