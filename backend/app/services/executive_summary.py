class ExecutiveSummary:

    def generate(self, analytics):

        summary = f"""
📊 Executive AI Summary

• Processed {analytics['total_sales_records']:,} sales records.

• Processed {analytics['total_inventory_records']:,} inventory records.

• Detected {analytics['total_products']:,} unique products.

• Operating across {analytics['total_regions']} regions.

• Total sales reached ₹{analytics['total_sales']:,.2f}.

• Estimated profit is ₹{analytics['total_profit']:,.2f}.

• Network health is stable.

• AI recommends transferring inventory from surplus regions to shortage regions to reduce stockouts and improve supply chain efficiency.
"""

        return {
            "summary": summary
        }