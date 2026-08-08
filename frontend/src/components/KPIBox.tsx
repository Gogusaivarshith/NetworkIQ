import { Paper, Typography } from "@mui/material";

type Props = {
  title: string;
  value: string | number;
};

function KPIBox({ title, value }: Props) {
  return (
    <Paper
      elevation={6}
      sx={{
        p: 3,
        borderRadius: 4,
        textAlign: "center",
        height: 160,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        position: "relative",
        background:
          "linear-gradient(#0f172a, #0f172a) padding-box, linear-gradient(135deg, #3b82f6, #8b5cf6, #06b6d4) border-box",
        border: "1.5px solid transparent",
        color: "#ffffff",
        transition: "all 0.3s ease-in-out",
        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: "0 16px 32px rgba(59, 130, 246, 0.25)",
        },
      }}
    >
      <Typography
        variant="body2"
        sx={{
          mb: 1.5,
          fontWeight: 600,
          color: "#94a3b8",
          textTransform: "uppercase",
          letterSpacing: 1.1,
          fontSize: "0.85rem",
        }}
      >
        {title}
      </Typography>

      <Typography
        sx={{
          color: "#60a5fa",
          fontWeight: 800,
          fontSize: {
            xs: "1.5rem",
            sm: "1.9rem",
            md: "2.2rem",
          },
          wordBreak: "break-word",
          overflowWrap: "break-word",
          lineHeight: 1.2,
          textShadow: "0 0 20px rgba(96, 165, 250, 0.3)",
        }}
      >
        {value}
      </Typography>
    </Paper>
  );
}

export default KPIBox;