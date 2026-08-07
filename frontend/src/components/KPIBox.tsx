import { Paper, Typography } from "@mui/material";

type Props = {
  title: string;
  value: string | number;
};

function KPIBox({ title, value }: Props) {
  return (
    <Paper
      elevation={5}
      sx={{
        p: 3,
        borderRadius: 3,
        textAlign: "center",
        height: 170,
      }}
    >
      <Typography variant="h6">
        {title}
      </Typography>

      <Typography
        variant="h4"
        sx={{
          mt: 4,
          color: "#1976d2",
          fontWeight: "bold",
        }}
      >
        {value}
      </Typography>
    </Paper>
  );
}

export default KPIBox;