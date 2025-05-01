import { Typography, Box, Paper, Grid } from "@mui/material";
import { useAuth } from "../../context/AuthContext";

const Page3 = () => {
  const { user } = useAuth();
  // Static placeholder values for dashboard stats
  const stats = {
    totalCars: 120,
    activeRentals: 45,
    totalUsers: 320,
  };

  return (
    <Box sx={{ py: 4 }}>
      <Typography variant="h2" gutterBottom fontWeight={700}>
        Admin Dashboard
      </Typography>
      <Typography variant="body1" color="text.secondary" gutterBottom>
        Welcome, {user?.userName}! Manage your car-sharing platform below.
      </Typography>
      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12} sm={6} md={4} {...({} as any)}>
          <Paper sx={{ p: 3, borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
            <Typography variant="h3" gutterBottom>
              Total Cars
            </Typography>
            <Typography variant="h2" color="primary">
              {stats.totalCars}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4} {...({} as any)}>
          <Paper sx={{ p: 3, borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
            <Typography variant="h3" gutterBottom>
              Active Rentals
            </Typography>
            <Typography variant="h2" color="primary">
              {stats.activeRentals}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4} {...({} as any)}>
          <Paper sx={{ p: 3, borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
            <Typography variant="h3" gutterBottom>
              Users
            </Typography>
            <Typography variant="h2" color="primary">
              {stats.totalUsers}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Page3;