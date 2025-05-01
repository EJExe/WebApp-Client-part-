import { Typography, Button, Box, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 64px)",
        display: "flex",
        alignItems: "center",
        background: "linear-gradient(135deg, #1A3C6D 0%, #2A5B9A 100%)",
        color: "#FFFFFF",
        py: 8,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Container>
        <Typography
          variant="h1"
          gutterBottom
          fontWeight={700}
          sx={{
            textShadow: "0 2px 8px rgba(0,0,0,0.3)",
            maxWidth: "80%",
          }}
        >
          Rent Your Perfect Car Today
        </Typography>
        
        <Typography
          variant="h2"
          gutterBottom
          sx={{
            maxWidth: 600,
            mb: 4,
            textShadow: "0 2px 4px rgba(0,0,0,0.2)",
            fontWeight: 400,
          }}
        >
          Find and book the best cars near you with CarShare.
          <Box component="span" sx={{ display: "block", mt: 1 }}>
            Fast, easy, and reliable.
          </Box>
        </Typography>
        
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={() => navigate("/page2")}
            sx={{
              px: 4,
              py: 1.5,
              fontSize: "1.1rem",
              transition: "transform 0.3s ease",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: 4,
              },
            }}
          >
            Find a Car
          </Button>
          
          <Button
            variant="outlined"
            size="large"
            onClick={() => navigate("/page1")}
            sx={{
              px: 4,
              py: 1.5,
              fontSize: "1.1rem",
              borderWidth: "2px",
              borderColor: "rgba(255,255,255,0.5)",
              color: "#fff",
              backdropFilter: "blur(4px)",
              bgcolor: "rgba(255,255,255,0.1)",
              "&:hover": {
                borderColor: "#fff",
                bgcolor: "rgba(255,255,255,0.2)",
                boxShadow: 2,
              },
              transition: "all 0.3s ease",
            }}
          >
            Browse All Cars
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Home;