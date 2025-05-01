import { Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { useAuth } from "./context/AuthContext";
import { Typography } from "@mui/material";
import Layout from "./components/Layout/Layout";
import Home from "./components/Pages/Home";
import Page1 from "./components/Pages/Page1";
import Page2 from "./components/Pages/Page2";
import Page3 from "./components/Pages/Page3";
import LoginPage from "./components/Pages/LoginPage";

const ProtectedRoute: React.FC<{ children: React.ReactElement; adminOnly?: boolean }> = ({
  children,
  adminOnly = false,
}) => {
  const { user, isAdmin } = useAuth();
  if (!user) {
    alert("Please sign in to access this page!");
    return <Navigate to="/login" replace />;
  } else if (adminOnly && !isAdmin) {
    alert("Admin access required!");
    return <Navigate to="/" replace />;
  }
  return children;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/page1" element={<Page1 />} />
          <Route
            path="/page2"
            element={
              <ProtectedRoute>
                <Page2 />
              </ProtectedRoute>
            }
          />
          <Route
            path="/page3"
            element={
              <ProtectedRoute adminOnly>
                <Page3 />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Typography>Page not found</Typography>} />
        </Routes>
      </Layout>
    </AuthProvider>
  );
};

export default App;