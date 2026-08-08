import {
  Card,
  CardContent,
  Typography,
  Chip,
  Button,
  Stack,
  Divider,
  LinearProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AgentTimeline from "./AgentTimeline";

export default function RecommendationCard({ rec }: any) {
  const confidenceValue = rec.confidence ?? 96;

  return (
    <Card
      elevation={8}
      sx={{
        borderRadius: 4,
        transition: "0.3s",
        "&:hover": {
          transform: "translateY(-6px)",
        },
      }}
    >
      <CardContent>
        <Stack
          direction="row"
          justifyContent="space-between"
          mb={2}
        >
          <Typography variant="h6">
            📦 {rec.sku}
          </Typography>

          <Chip
            label={rec.decision}
            color="success"
          />
        </Stack>

        <Typography>
          📍 <b>{rec.from_region}</b> → <b>{rec.to_region}</b>
        </Typography>

        <Typography>
          🚚 Quantity : <b>{rec.quantity}</b>
        </Typography>

        <Typography>
          💰 Profit : <b>₹{rec.expected_profit}</b>
        </Typography>

        <Typography>
          💵 Transfer Cost : ₹{rec.transfer_cost}
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Typography variant="subtitle2">
          🤖 Agent Reasoning
        </Typography>

        <Typography color="text.secondary">
          {rec.reason}
        </Typography>

        {/* Confidence Progress Bar */}
        <Box mt={2}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            mb={0.5}
          >
            <Typography variant="body2" fontWeight="bold">
              Confidence
            </Typography>
            <Typography variant="body2" fontWeight="bold">
              {confidenceValue}%
            </Typography>
          </Stack>
          <LinearProgress
            variant="determinate"
            value={confidenceValue}
            color="success"
            sx={{ height: 8, borderRadius: 4 }}
          />
        </Box>

        {/* Action Buttons */}
        <Stack
          direction="row"
          spacing={1.5}
          mt={3}
          flexWrap="wrap"
          useFlexGap
        >
          <Button
            variant="contained"
            color="success"
          >
            ✓ Apply Transfer
          </Button>

          <Button
            variant="outlined"
            color="primary"
          >
            📊 Business Impact
          </Button>

          <Button
            variant="outlined"
            color="info"
          >
            🧠 AI Reasoning
          </Button>
        </Stack>

        {/* Accordion wrapping AgentTimeline */}
        <Accordion
          disableGutters
          elevation={0}
          sx={{
            mt: 3,
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 2,
            "&:before": { display: "none" },
          }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="subtitle2" fontWeight="bold">
              🤖 View Agent Timeline
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <AgentTimeline rec={rec} />
          </AccordionDetails>
        </Accordion>
      </CardContent>
    </Card>
  );
}