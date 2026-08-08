import { Outlet, Link } from "react-router-dom";
import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";

const drawerWidth = 250;

export default function MainLayout() {
  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            background: "#0f172a",
            color: "white",
          },
        }}
      >
        <Toolbar>
          <Typography variant="h5" fontWeight="bold">
            🚀 NetworkIQ
          </Typography>
        </Toolbar>

        <List>
          <ListItemButton component={Link} to="/">
            <ListItemText primary="🏠 Dashboard" />
          </ListItemButton>

          <ListItemButton component={Link} to="/sales">
            <ListItemText primary="📈 Sales" />
          </ListItemButton>

          <ListItemButton component={Link} to="/inventory">
            <ListItemText primary="📦 Inventory" />
          </ListItemButton>

          <ListItemButton component={Link} to="/insights">
            <ListItemText primary="🧠 AI Insights" />
          </ListItemButton>

          <ListItemButton component={Link} to="/upload">
            <ListItemText primary="📂 Upload" />
          </ListItemButton>
        </List>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 4,
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}