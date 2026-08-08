from app.services.data_loader import loader

class SupplierAgent:

    def analyze(self):

        inventory = loader.inventory_df

        delayed = inventory[
            inventory["Supplier_Lead_Time_Days"] > 20
        ]

        return {

            "agent":"Supplier Agent",

            "status":"WARNING",

            "reason":
                f"{len(delayed)} suppliers have long lead times.",

            "confidence":91
        }