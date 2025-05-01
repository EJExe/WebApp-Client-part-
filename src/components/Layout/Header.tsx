import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Box,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Header = ({ toggleDrawer }: { toggleDrawer: () => void }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
    handleMenuClose();
  };

  return (
    <AppBar position="fixed">
      <Toolbar>
        <IconButton
          color="inherit"
          edge="start"
          onClick={toggleDrawer}
          sx={{ mr: 2, display: { md: "none" } }}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          variant="h6"
          sx={{ flexGrow: 1, fontWeight: 700, cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          CarShare
        </Typography>
        {user && user.userName ? (
          <>
            <Typography sx={{ mr: 2, display: { xs: "none", sm: "block" } }}>
              {user.userName.charAt(0).toUpperCase() + user.userName.slice(1)}
            </Typography>
            <IconButton onClick={handleMenuOpen} color="inherit">
              <Avatar sx={{ width: 32, height: 32, bgcolor: theme.palette.secondary.main }}>
                {user.userName.charAt(0).toUpperCase()}
              </Avatar>
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
              <MenuItem onClick={() => navigate("/profile")}>Profile</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </>
        ) : (
          <Button
            color="inherit"
            onClick={() => navigate("/login")}
            sx={{ borderRadius: "8px", border: "1px solid #FFFFFF" }}
          >
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;