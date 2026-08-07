import { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

function Sales() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/sales")
      .then((res) => setData(res.data));
  }, []);

  if (!data) return <h2>Loading...</h2>;

  return (
    <div style={{ padding: 30 }}>
      <h1>Sales Analytics</h1>

      <h2>Top Products by Sales</h2>
      <div style={{ width: "100%", height: 450 }}>
        <ResponsiveContainer>
          <BarChart data={data.top_products}>
            <XAxis
              dataKey="Product Name"
              interval={0}
              angle={-30}
              textAnchor="end"
              height={120}
            />
            <YAxis />
            <Tooltip />
            <Bar dataKey="Sales" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <h2 style={{ marginTop: 60 }}>Regional Sales</h2>
      <div style={{ width: "100%", height: 400 }}>
        <ResponsiveContainer>
          <BarChart data={data.top_regions}>
            <XAxis dataKey="Region" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="Sales" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <h2 style={{ marginTop: 60 }}>Sales by Category</h2>
      <div style={{ width: "100%", height: 500 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data.top_categories}
              dataKey="Sales"
              nameKey="Category of Goods"
              outerRadius={160}
              label
            >
              {data.top_categories.map((_: any, index: number) => (
                <Cell
                  key={index}
                  fill={[
                    "#2563eb",
                    "#16a34a",
                    "#dc2626",
                    "#f59e0b",
                    "#9333ea",
                    "#06b6d4",
                  ][index % 6]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Sales;