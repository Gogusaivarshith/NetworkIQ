import { useEffect, useState } from "react";
import api from "../services/api";
import KPIBox from "../components/KPIBox";
import "./Dashboard.css";

export default function Dashboard() {
  const [dashboard, setDashboard] = useState<any>(null);

  useEffect(() => {
    api.get("/dashboard").then((res) => {
      setDashboard(res.data);
    });
  }, []);

  if (!dashboard) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="container">
      <h1 className="title">NetworkIQ Dashboard</h1>

      <div className="cards">
        <KPIBox
          title="Total Sales"
          value={`₹${dashboard.total_sales.toLocaleString()}`}
        />
        <KPIBox
          title="Profit"
          value={`₹${dashboard.total_profit.toLocaleString()}`}
        />
        <KPIBox title="Products" value={dashboard.total_products} />
        <KPIBox title="Regions" value={dashboard.total_regions} />
        <KPIBox
          title="Inventory Rows"
          value={dashboard.total_inventory_records}
        />
      </div>
    </div>
  );
}