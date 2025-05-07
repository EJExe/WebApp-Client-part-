// Layout.tsx
import { useState } from "react";
import { Box, CssBaseline } from "@mui/material";
import Header from "./Header";
import SideMenu from "./SideMenu";
import { useNavigate } from "react-router-dom";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleMenuItemClick = (path: string) => {
    navigate(path);
    setDrawerOpen(false);
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <>
       <CssBaseline />
      <Header onMenuToggle={toggleDrawer} />
      <SideMenu
        open={drawerOpen}
        onMenuItemClick={handleMenuItemClick}
        onClose={() => setDrawerOpen(false)}
      />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {children}
      </Box>
    </>
  );
};

export default Layout;