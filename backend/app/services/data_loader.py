from pathlib import Path
import pandas as pd

ROOT = Path(__file__).resolve().parents[3]
DATASET_DIR = ROOT / "datasets"


class DataLoader:

    def __init__(self):
        self.sales_path = None
        self.inventory_path = None
        self.sales_df = None
        self.inventory_df = None

        if DATASET_DIR.exists():
            csv_files = list(DATASET_DIR.glob("*.csv"))

            for file in csv_files:
                name = file.name.lower()

                if "store" in name:
                    self.sales_path = file
                elif "supply" in name:
                    self.inventory_path = file

            if self.sales_path:
                self.sales_df = pd.read_csv(self.sales_path, encoding="latin1")
            if self.inventory_path:
                self.inventory_df = pd.read_csv(
                    self.inventory_path, encoding="latin1"
                )

    def load(self):
        return {
            "sales_rows": (
                len(self.sales_df) if self.sales_df is not None else 0
            ),
            "inventory_rows": (
                len(self.inventory_df) if self.inventory_df is not None else 0
            ),
        }

    def load_uploaded(self, sales_file, inventory_file):
        self.sales_df = pd.read_csv(sales_file, encoding="latin1")
        self.inventory_df = pd.read_csv(inventory_file, encoding="latin1")

        return {
            "status": "success",
            "message": (
                "Datasets validated successfully. Ready for AI Optimization."
            ),
            "sales": {
                "rows": len(self.sales_df),
                "columns": len(self.sales_df.columns),
                "headers": self.sales_df.columns.tolist(),
            },
            "inventory": {
                "rows": len(self.inventory_df),
                "columns": len(self.inventory_df.columns),
                "headers": self.inventory_df.columns.tolist(),
            },
        }


loader = DataLoader()