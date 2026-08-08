import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  Typography,
  Button,
  Stack,
  Chip,
  Divider,
} from "@mui/material";

export default function Upload() {
  const navigate = useNavigate();
  const [sales, setSales] = useState<File | null>(null);
  const [inventory, setInventory] = useState<File | null>(null);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const upload = async () => {
    if (!sales || !inventory) {
      alert("Please select both files.");
      return;
    }

    setLoading(true);

    const form = new FormData();
    form.append("sales", sales);
    form.append("inventory", inventory);

    try {
      const res = await axios.post("http://127.0.0.1:8000/upload", form);
      setResult(res.data);
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    }

    setLoading(false);
  };

  return (
    <Box sx={{ p: 4, maxWidth: 600, mx: "auto" }}>
      <Card sx={{ p: 4, borderRadius: 3, boxShadow: 3 }}>
        <Stack spacing={3}>
          <Typography variant="h4" fontWeight="bold">
            Upload Dataset
          </Typography>

          <Stack spacing={2}>
            <Button variant="outlined" component="label" fullWidth>
              {sales ? `Sales File: ${sales.name}` : "Choose Sales File"}
              <input
                type="file"
                hidden
                onChange={(e) => setSales(e.target.files?.[0] || null)}
              />
            </Button>

            <Button variant="outlined" component="label" fullWidth>
              {inventory
                ? `Inventory File: ${inventory.name}`
                : "Choose Inventory File"}
              <input
                type="file"
                hidden
                onChange={(e) => setInventory(e.target.files?.[0] || null)}
              />
            </Button>
          </Stack>

          <Button
            variant="contained"
            size="large"
            onClick={upload}
            disabled={loading}
            fullWidth
          >
            {loading ? "Analyzing..." : "Analyze"}
          </Button>

          {result && (
            <Card
              variant="outlined"
              sx={{
                p: 3,
                borderRadius: 2,
                backgroundColor: "#f8f9fa",
              }}
            >
              <Stack spacing={2}>
                <Typography variant="h6" fontWeight="bold" color="success.main">
                  ✔ Dataset Validated
                </Typography>

                <Divider />

                <Box>
                  <Typography variant="subtitle1" fontWeight="bold">
                    Sales
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {result.sales.rows.toLocaleString()} Rows
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {result.sales.columns} Columns
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="subtitle1" fontWeight="bold">
                    Inventory
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {result.inventory.rows.toLocaleString()} Rows
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {result.inventory.columns} Columns
                  </Typography>
                </Box>

                <Divider />

                <Stack spacing={2} alignItems="flex-start">
                  <Chip
                    label="Ready for AI Optimization"
                    color="success"
                    variant="outlined"
                    sx={{ fontWeight: "bold" }}
                  />

                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    size="large"
                    onClick={() => navigate("/")}
                  >
                    Go To Dashboard
                  </Button>
                </Stack>
              </Stack>
            </Card>
          )}
        </Stack>
      </Card>
    </Box>
  );
}