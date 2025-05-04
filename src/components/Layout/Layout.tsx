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
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <>
      <CssBaseline />
      <Header toggleDrawer={toggleDrawer} />
      <SideMenu
        open={drawerOpen}
        onMenuItemClick={handleMenuItemClick}
        onClose={() => setDrawerOpen(false)}
      />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          padding: { xs: 2, sm: 3 },
          marginLeft: { xs: 0, md: "240px" },
          marginTop: "64px",
          minHeight: "calc(100vh - 64px)",
          backgroundColor: "#F5F6F5",
        }}
      >
        {children}
      </Box>
    </>
  );
};

export default Layout;