import {
  Card,
  CardContent,
  Typography,
  Stack,
  Divider,
  Box,
} from "@mui/material";

export default function AgentTimeline({ rec }: any) {
  const steps = [
    {
      title: "✔ Demand Analysis Complete",
      message: "Demand exceeds stock in destination region.",
    },
    {
      title: "✔ Inventory Analysis Complete",
      message: "Surplus detected at source warehouse.",
    },
    {
      title: "✔ Cost Evaluation Complete",
      message: `Transfer Cost (₹${rec?.transfer_cost ?? 0}) < Expected Profit (₹${rec?.expected_profit ?? 0}) — Transfer profitable.`,
    },
    {
      title: `✔ Decision ${rec?.decision === "APPROVED" ? "Approved" : rec?.decision || "Complete"}`,
      message: rec?.reason || "Execute transfer.",
    },
  ];

  return (
    <Card
      elevation={0}
      sx={{
        mt: 2,
        borderRadius: 3,
        border: "1px solid",
        borderColor: "divider",
        backgroundColor: "#f8fafc",
      }}
    >
      <CardContent sx={{ p: 2.5, "&:last-child": { pb: 2.5 } }}>
        <Typography
          variant="subtitle1"
          fontWeight="bold"
          mb={2}
          color="primary.main"
        >
          🤖 AI Decision Flow
        </Typography>

        <Stack spacing={2}>
          {steps.map((step, index) => (
            <Box key={index}>
              <Typography
                variant="subtitle2"
                fontWeight="bold"
                color="success.main"
                mb={0.5}
              >
                {step.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {step.message}
              </Typography>
              {index !== steps.length - 1 && <Divider sx={{ mt: 2 }} />}
            </Box>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
}