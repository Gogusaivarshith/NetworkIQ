import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Card, Grid, Paper, Typography, Stack } from "@mui/material";
import RecommendationCard from "../components/RecommendationCard";

export default function AIInsights() {
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [meta, setMeta] = useState<{
    recommendation_count?: number;
    estimated_savings?: number;
    confidence?: number;
  }>({});

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/recommendations")
      .then((res) => {
        console.log(res.data);
        setRecommendations(res.data.recommendations || []);
        setMeta({
          recommendation_count:
            res.data.recommendation_count ?? res.data.recommendations?.length ?? 20,
          estimated_savings: res.data.estimated_savings ?? 1400,
          confidence: res.data.confidence ?? 100,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const formatSavings = (savings?: number) => {
    if (!savings) return "₹1.4K";
    if (savings >= 1000) {
      return `₹${(savings / 1000).toFixed(1)}K`;
    }
    return `₹${savings.toLocaleString()}`;
  };

  return (
    <Box sx={{ p: 4 }}>
      {/* 🤖 AI Decision Center Header Banner */}
      <Paper
        elevation={8}
        sx={{
          mb: 5,
          p: 4,
          borderRadius: 4,
          background: "linear-gradient(135deg, #0f172a, #1e3a8a, #1e1b4b)",
          color: "white",
          boxShadow: "0px 20px 50px rgba(0,0,0,0.3)",
          border: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <Typography variant="h4" fontWeight="bold" mb={3} color="#60a5fa">
          🤖 AI Decision Center
        </Typography>

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, sm: 4 }}>
            <Card
              sx={{
                p: 2.5,
                textAlign: "center",
                background: "rgba(255, 255, 255, 0.05)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                color: "white",
                borderRadius: 3,
              }}
            >
              <Typography variant="body2" sx={{ opacity: 0.7, mb: 0.5 }}>
                Recommendations
              </Typography>
              <Typography variant="h4" fontWeight="bold" color="#38bdf8">
                {meta.recommendation_count ?? recommendations.length ?? 20}
              </Typography>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, sm: 4 }}>
            <Card
              sx={{
                p: 2.5,
                textAlign: "center",
                background: "rgba(255, 255, 255, 0.05)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                color: "white",
                borderRadius: 3,
              }}
            >
              <Typography variant="body2" sx={{ opacity: 0.7, mb: 0.5 }}>
                Estimated Savings
              </Typography>
              <Typography variant="h4" fontWeight="bold" color="#4ade80">
                {formatSavings(meta.estimated_savings)}
              </Typography>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, sm: 4 }}>
            <Card
              sx={{
                p: 2.5,
                textAlign: "center",
                background: "rgba(255, 255, 255, 0.05)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                color: "white",
                borderRadius: 3,
              }}
            >
              <Typography variant="body2" sx={{ opacity: 0.7, mb: 0.5 }}>
                Average Confidence
              </Typography>
              <Typography variant="h4" fontWeight="bold" color="#a78bfa">
                {meta.confidence ?? 100}%
              </Typography>
            </Card>
          </Grid>
        </Grid>
      </Paper>

      {/* Recommendations Cards Grid */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
          gap: 3,
        }}
      >
        {recommendations.slice(0, 9).map((rec, index) => (
          <Box key={index}>
            <RecommendationCard rec={rec} />
          </Box>
        ))}
      </Box>
    </Box>
  );
}