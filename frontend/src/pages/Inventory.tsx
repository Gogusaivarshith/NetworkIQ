import { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function Inventory() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/inventory")
      .then((res) => setData(res.data));
  }, []);

  if (!data) return <h2>Loading Inventory...</h2>;

  return (
    <div style={{ padding: 30 }}>
      <h1>Inventory Analytics</h1>

      <h2>Top Understocked Products</h2>

      <div style={{ width: "100%", height: 450 }}>
        <ResponsiveContainer>
          <BarChart data={data.understocked.slice(0,10)}>
            <XAxis dataKey="SKU_ID" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="Shortage" fill="#ef4444" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <h2 style={{ marginTop: 50 }}>Top Overstocked Products</h2>

      <div style={{ width: "100%", height: 450 }}>
        <ResponsiveContainer>
          <BarChart data={data.overstocked.slice(0,10)}>
            <XAxis dataKey="SKU_ID" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="Excess" fill="#10b981" />
          </BarChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}

export default Inventory;