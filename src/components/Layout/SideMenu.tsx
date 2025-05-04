import { useState } from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Box,
} from "@mui/material";
import {
  Home,
  Map,
  ViewList,
  AdminPanelSettings,
  Close,
} from "@mui/icons-material";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

interface SideMenuProps {
  open: boolean;
  onMenuItemClick: (path: string) => void;
  onClose: () => void;
}

const SideMenu: React.FC<SideMenuProps> = ({ open, onMenuItemClick, onClose }) => {
  const location = useLocation();
  const { isAdmin } = useAuth();

  const menuItems = [
    { text: "Главная", icon: <Home />, path: "/" },
    { text: "Список автомобилей", icon: <ViewList />, path: "/page1" },
    { text: "Каталог автомобилей", icon: <ViewList />, path: "/cars" },
    { text: "Карта", icon: <Map />, path: "/page2" },
    ...(isAdmin
      ? [
          { text: "Админ-панель", icon: <AdminPanelSettings />, path: "/page3" },
          { text: "Управление автомобилями", icon: <AdminPanelSettings />, path: "/admin/cars" },
          { text: "Добавить автомобиль", icon: <AdminPanelSettings />, path: "/admin/cars/new" },
        ]
      : []),
  ];

  return (
    <Drawer
      variant="permanent"
      open={open}
      sx={{
        width: { xs: open ? 240 : 0, md: 240 },
        flexShrink: 0,
        transition: "width 0.3s ease",
        "& .MuiDrawer-paper": {
          width: { xs: open ? 240 : 0, md: 240 },
          boxSizing: "border-box",
          marginTop: "64px",
          height: "calc(100vh - 64px)",
          borderRight: "1px solid rgba(0,0,0,0.1)",
          backgroundColor: "#FFFFFF",
          overflowX: "hidden",
          transition: "width 0.3s ease",
        },
      }}
    >
      <Box sx={{ display: { xs: "flex", md: "none" }, justifyContent: "flex-end", p: 1 }}>
        <IconButton onClick={onClose}>
          <Close />
        </IconButton>
      </Box>
      <List>
        {menuItems.map((item) => (
          <ListItemButton
            key={item.text}
            onClick={() => {
              onMenuItemClick(item.path);
              onClose();
            }}
            sx={{
              backgroundColor: location.pathname === item.path ? "rgba(26,60,109,0.1)" : "inherit",
              "&:hover": {
                backgroundColor: "rgba(26,60,109,0.2)",
              },
              "& .MuiListItemIcon-root": {
                color: location.pathname === item.path ? "#1A3C6D" : "#666666",
              },
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
};

export default SideMenu;