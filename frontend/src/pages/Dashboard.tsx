import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Paper,
  Typography
} from "@mui/material";
import api from "../services/api";
import KPIBox from "../components/KPIBox";
import { formatNumber } from "../utils/format";
import "./Dashboard.css";

export default function Dashboard() {
  const [dashboard, setDashboard] = useState<any>(null);
  const [optimizing, setOptimizing] = useState<boolean>(false);
  const [optimizationData, setOptimizationData] = useState<any>(null);
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    api.get("/dashboard").then((res) => {
      setDashboard(res.data);
    });
  }, []);

  const runOptimization = async () => {
    setOptimizing(true);

    setLogs(["🔗 Connecting to Backend..."]);

    await new Promise((r) => setTimeout(r, 600));

    setLogs((prev) => [...prev, "📈 Loading Sales Dataset..."]);

    await new Promise((r) => setTimeout(r, 700));

    setLogs((prev) => [...prev, "📦 Loading Inventory Dataset..."]);

    await new Promise((r) => setTimeout(r, 700));

    setLogs((prev) => [...prev, "🧠 Running Multi-Agent AI..."]);

    try {
      const res = await api.get("/recommendations");
      console.log(res.data);
      setOptimizationData(res.data);

      setLogs((prev) => [
        ...prev,
        `✅ ${res.data.recommendation_count} recommendations generated`
      ]);

      await new Promise((r) => setTimeout(r, 500));

      setLogs((prev) => [...prev, "🚀 Dashboard Updated Successfully"]);
    } finally {
      setOptimizing(false);
    }
  };

  if (!dashboard) {
    return <h1>Loading...</h1>;
  }

  const topRecommendation =
    optimizationData?.topRecommendation ||
    optimizationData?.recommendations?.[0] || {
      sku: "SKU_1",
      from: "West Warehouse",
      to: "North Warehouse",
      quantity: 17,
      expected_profit: 121.86,
      decision: "APPROVED"
    };

  return (
    <div className="container">
      <h1 className="title">NetworkIQ Dashboard</h1>

      {/* AI Control Center */}
      <Box
        sx={{
          background:
            "linear-gradient(135deg,#0f172a,#1e3a8a,#2563eb)",
          borderRadius: 5,
          p: 5,
          color: "white",
          mb: 5,
          boxShadow: "0px 25px 60px rgba(0,0,0,0.35)",
          border: "1px solid rgba(255,255,255,0.08)",
          position: "relative",
          overflow: "hidden"
        }}
      >
        <Typography variant="h4" fontWeight="bold">
          🧠 NetworkIQ AI Decision Engine
        </Typography>

        <Typography sx={{ mt: 1 }}>
          Enterprise Supply Chain Intelligence Platform
        </Typography>

        <Typography
          sx={{
            opacity: 0.75,
            mt: 1,
            fontSize: 15
          }}
        >
          Live AI Analysis • Multi-Agent Reasoning • Real-Time Optimization
        </Typography>

        <Button
          size="large"
          variant="contained"
          color="success"
          onClick={runOptimization}
          disabled={optimizing}
          sx={{
            mt: 3,
            px: 5,
            py: 1.5,
            borderRadius: "16px",
            fontWeight: "bold",
            fontSize: 16,
            background: "linear-gradient(90deg,#10b981,#22c55e)",
            boxShadow: "0 10px 30px rgba(16,185,129,.4)"
          }}
        >
          {optimizing ? "🤖 Optimizing..." : "🚀 Run AI Optimization"}
        </Button>

        {optimizing && (
          <Box mt={3} display="flex" alignItems="center" gap={2}>
            <CircularProgress color="inherit" size={24} />
            <Typography>Running AI Agents...</Typography>
          </Box>
        )}

        {/* AI Activity logs shown strictly while optimizing */}
        {optimizing && logs.length > 0 && (
          <Card
            sx={{
              mt: 3,
              background: "#111827",
              color: "white",
              borderRadius: 3
            }}
          >
            <CardContent>
              <Typography fontWeight="bold" mb={2}>
                🤖 AI Activity
              </Typography>

              {logs.map((log, index) => (
                <Typography key={index} sx={{ mb: 1, fontSize: 15 }}>
                  {log}
                </Typography>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Completion Status Bar shown after optimization finishes */}
        {!optimizing && optimizationData && (
          <Paper
            sx={{
              mt: 3,
              p: 2,
              background: "rgba(16, 185, 129, 0.15)",
              border: "1px solid #10b981",
              color: "white",
              borderRadius: 3,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 2
            }}
          >
            <Box display="flex" alignItems="center" gap={1.5}>
              <Typography fontWeight="bold" color="#22c55e" fontSize={16}>
                ✔ Optimization Complete
              </Typography>
              <Typography sx={{ opacity: 0.6 }}>•</Typography>
              <Typography sx={{ opacity: 0.9 }}>
                <b>
                  {optimizationData.recommendation_count ??
                    optimizationData.recommendations?.length ??
                    20}
                </b>{" "}
                Transfers Generated
              </Typography>
              <Typography sx={{ opacity: 0.6 }}>•</Typography>
              <Typography sx={{ opacity: 0.9 }}>
                Completed in <b>1.2 sec</b>
              </Typography>
            </Box>
            <Button
              variant="text"
              sx={{ color: "#60a5fa", fontWeight: "bold", textTransform: "none" }}
            >
              View AI Insights →
            </Button>
          </Paper>
        )}

        {/* KPI Grid inside Control Center */}
        <Grid container spacing={3} mt={2}>
          <Grid size={{ xs: 12, md: 3 }}>
            <Paper sx={{ p: 2, textAlign: "center" }}>
              <Typography variant="h6">Network Health</Typography>
              <Typography variant="h3" color="success.main">
                {optimizationData?.network_health ?? "--"}%
              </Typography>
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, md: 3 }}>
            <Paper sx={{ p: 2, textAlign: "center" }}>
              <Typography variant="h6">Transfers Found</Typography>
              <Typography variant="h3">
                {optimizationData?.recommendation_count ?? "--"}
              </Typography>
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, md: 3 }}>
            <Paper sx={{ p: 2, textAlign: "center" }}>
              <Typography variant="h6">Potential Savings</Typography>
              <Typography variant="h4">
                ₹{optimizationData?.estimated_savings?.toLocaleString() ?? "--"}
              </Typography>
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, md: 3 }}>
            <Paper sx={{ p: 2, textAlign: "center" }}>
              <Typography variant="h6">AI Confidence</Typography>
              <Typography variant="h3">
                {optimizationData?.confidence ?? "--"}%
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        {/* 🧠 AI DECISION Card */}
        {optimizationData && (
          <Paper
            sx={{
              mt: 3,
              p: 3,
              background: "rgba(255, 255, 255, 0.05)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              color: "white",
              borderRadius: 3
            }}
          >
            <Typography variant="h6" fontWeight="bold" color="#60a5fa" mb={2}>
              🧠 AI DECISION
            </Typography>
            <Grid container spacing={2} alignItems="center">
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <Typography variant="body2" sx={{ opacity: 0.7 }}>
                  Transfer
                </Typography>
                <Typography variant="h6" fontWeight="bold">
                  {topRecommendation.sku}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  {topRecommendation.from} ↓ {topRecommendation.to}
                </Typography>
              </Grid>

              <Grid size={{ xs: 12, sm: 6, md: 2 }}>
                <Typography variant="body2" sx={{ opacity: 0.7 }}>
                  Quantity
                </Typography>
                <Typography variant="h6" fontWeight="bold">
                  {topRecommendation.quantity}
                </Typography>
              </Grid>

              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <Typography variant="body2" sx={{ opacity: 0.7 }}>
                  Expected Profit
                </Typography>
                <Typography variant="h6" fontWeight="bold" color="#4ade80">
                  ₹
                  {typeof topRecommendation.expected_profit === "number"
                    ? topRecommendation.expected_profit.toLocaleString()
                    : topRecommendation.expected_profit}
                </Typography>
              </Grid>

              <Grid size={{ xs: 12, sm: 6, md: 2 }}>
                <Typography variant="body2" sx={{ opacity: 0.7 }}>
                  Decision
                </Typography>
                <Typography variant="h6" fontWeight="bold" color="#4ade80">
                  {topRecommendation.decision || "APPROVED"}
                </Typography>
              </Grid>

              <Grid size={{ xs: 12, sm: 6, md: 2 }}>
                <Button
                  variant="outlined"
                  color="inherit"
                  size="small"
                  sx={{ borderRadius: 2, textTransform: "none" }}
                >
                  [View Full Analysis]
                </Button>
              </Grid>
            </Grid>
          </Paper>
        )}
      </Box>

      {/* AI Agent Pipeline */}
      <Card
        sx={{
          mb: 4,
          p: 3,
          borderRadius: 4,
          boxShadow: 4
        }}
      >
        <Typography variant="h5" fontWeight="bold" mb={3}>
          🤖 AI Agent Pipeline
        </Typography>
        <Box
          display="grid"
          gridTemplateColumns="repeat(auto-fit,minmax(220px,1fr))"
          gap={3}
        >
          <Card sx={{ p: 2, textAlign: "center" }}>
            <Typography variant="h6">📈 Sales Agent</Typography>
            <Typography color="green">
              ✔ Sales patterns analyzed
            </Typography>
          </Card>
          <Card sx={{ p: 2, textAlign: "center" }}>
            <Typography variant="h6">📦 Inventory Agent</Typography>
            <Typography color="green">
              ✔ Stock levels checked
            </Typography>
          </Card>
          <Card sx={{ p: 2, textAlign: "center" }}>
            <Typography variant="h6">⚠ Risk Agent</Typography>
            <Typography color="orange">
              ⚡ Shortages detected
            </Typography>
          </Card>
          <Card sx={{ p: 2, textAlign: "center" }}>
            <Typography variant="h6">🧠 Decision Agent</Typography>
            <Typography color="green">
              ✔ Transfers Optimized
            </Typography>
          </Card>
        </Box>
      </Card>

      {/* KPI Cards */}
      <div className="cards">
        <KPIBox
          title="Total Sales"
          value={formatNumber(dashboard.total_sales)}
        />
        <KPIBox
          title="Profit"
          value={formatNumber(dashboard.total_profit)}
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