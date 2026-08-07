from pathlib import Path
import pandas as pd

ROOT = Path(__file__).resolve().parents[3]
DATASET_DIR = ROOT / "datasets"


class DataLoader:

    def __init__(self):
        self.sales_path = None
        self.inventory_path = None

        csv_files = list(DATASET_DIR.glob("*.csv"))

        for file in csv_files:
            name = file.name.lower()

            if "store" in name:
                self.sales_path = file
            elif "supply" in name:
                self.inventory_path = file

        self.sales_df = pd.read_csv(self.sales_path)
        self.inventory_df = pd.read_csv(self.inventory_path)

    def load(self):
        return {
            "sales_rows": len(self.sales_df),
            "inventory_rows": len(self.inventory_df)
        }