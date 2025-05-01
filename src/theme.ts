import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1A3C6D", // Deep Blue
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#FF6200", // Vibrant Orange
      contrastText: "#FFFFFF",
    },
    background: {
      default: "#F5F6F5", // Light Gray
      paper: "#FFFFFF",
    },
    text: {
      primary: "#333333",
      secondary: "#666666",
    },
  },
  typography: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    h1: {
      fontSize: "2rem",
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: "1.5rem",
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h3: {
      fontSize: "1.25rem",
      fontWeight: 600,
      lineHeight: 1.4,
    },
    body1: {
      fontSize: "1rem",
      fontWeight: 400,
      lineHeight: 1.5,
    },
    caption: {
      fontSize: "0.875rem",
      fontWeight: 400,
      lineHeight: 1.6,
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: "linear-gradient(90deg, #1A3C6D 0%, #2A5B9A 100%)",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          textTransform: "none",
          fontWeight: 600,
          padding: "8px 16px",
        },
        containedPrimary: {
          background: "#1A3C6D",
          "&:hover": {
            background: "#153259",
          },
        },
        containedSecondary: {
          background: "#FF6200",
          "&:hover": {
            background: "#E55A00",
          },
        },
        outlined: {
          borderColor: "#1A3C6D",
          color: "#1A3C6D",
          "&:hover": {
            background: "rgba(26,60,109,0.1)",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: "12px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
          animation: "fadeIn 0.3s ease",
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          background: "#FFFFFF",
          borderRight: "1px solid rgba(0,0,0,0.1)",
        },
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});

export default theme;