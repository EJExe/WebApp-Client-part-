import { Box, Typography, Container, Link } from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{
        py: 4,
        background: "#1A3C6D",
        color: "#FFFFFF",
        mt: "auto",
      }}
    >
      <Container>
        <Typography variant="body2" align="center" gutterBottom>
          © 2025 CarShare. All rights reserved.
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
          <Link href="/about" color="inherit" underline="hover">
            About
          </Link>
          <Link href="/contact" color="inherit" underline="hover">
            Contact
          </Link>
          <Link href="/terms" color="inherit" underline="hover">
            Terms
          </Link>
          <Link href="/privacy" color="inherit" underline="hover">
            Privacy
          </Link>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;