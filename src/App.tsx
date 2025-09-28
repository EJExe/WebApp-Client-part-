/**
 * @fileoverview Main application component with React Router setup
 * (Главный компонент приложения с настройкой React Router)
 * @module App
 */
import { Navigate, Route, Routes } from "react-router-dom";
import { useState } from 'react';
import { AuthProvider } from "./context/AuthContext";
import { useAuth } from "./context/AuthContext";
import { Typography } from "@mui/material";
import Layout from "./components/Layout/Layout";
import Home from "./components/Pages/Home";
import Page1 from "./components/Pages/Page1";
import Page2 from "./components/Pages/Page2";
import Page3 from "./components/Pages/Page3";
import LoginPage from "./components/Pages/LoginPage";
import RegisterPage from "./components/Pages/RegisterPage";
import CarCatalog from "./components/CarCatalog";
import CarDetails from "./components/CarDetails";
import CarForm from "./components/CarForm";
import UpdateCar from "./components/UpdateCar";
import AdminCarManagement from "./components/AdminCarManagement";
import AdminReferenceManagement from "./components/AdminReferenceManagement";
import Header from "./components/Layout/Header";
import SideMenu from "./components/Layout/SideMenu";
import ProfilePage from "./components/Pages/ProfilePage";
import { OrderProvider } from "./context/OrderContext";
import AdminOrdersPage from "./components/Pages/AdminOrdersPage";


/**
 * @component
 * @description Route wrapper that protects routes requiring authentication or admin privileges
 * Uses React Router's Navigate component for redirection
 * (Обертка маршрута, защищающая маршруты, требующие аутентификации или привилегий администратора.
 * Использует компонент Navigate из React Router для перенаправления)
 * @param {Object} props - Component props
 * (Свойства компонента)
 * @param {React.ReactElement} props.children - Child component to render if authorized
 * (Дочерний компонент для рендеринга, если пользователь авторизован)
 * @param {boolean} [props.adminOnly=false] - Whether the route requires admin privileges
 * (Требует ли маршрут привилегий администратора)
 * @returns {JSX.Element} The protected component or a redirect
 * (Защищенный компонент или перенаправление)
 */
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

/**
 * @component
 * @description Main application component with React Router configuration
 * Sets up routes, authentication, and layout
 * (Главный компонент приложения с конфигурацией React Router.
 * Настраивает маршруты, аутентификацию и макет)
 * @returns {JSX.Element} The application with routing
 * (Приложение с маршрутизацией)
 */
const App: React.FC = () => {
  /**
   * @type {[boolean, React.Dispatch<React.SetStateAction<boolean>>]} State for menu open/closed
   * (Состояние для открытия/закрытия меню)
   */
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <AuthProvider>
      <OrderProvider>
      <Layout>
        {/* React Router Routes configuration */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/page1" element={<Page1 />} />
          <Route path="/profile" element={<ProfilePage />} />
          {/* Каталог автомобилей (доступен всем) */}
          <Route path="/cars" element={<CarCatalog />} />
          <Route path="/cars/:id" element={<CarDetails />} />
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
          <Route
            path="/admin/cars"
            element={
              <ProtectedRoute adminOnly>
                <AdminCarManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/cars/new"
            element={
              <ProtectedRoute adminOnly>
                <CarForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/cars/edit/:id"
            element={
              <ProtectedRoute adminOnly>
                <UpdateCar />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/order"
            element={
              <ProtectedRoute adminOnly>
                <AdminOrdersPage />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/admin/body-types"
            element={
              <ProtectedRoute adminOnly>
                <AdminReferenceManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/brands"
            element={
              <ProtectedRoute adminOnly>
                <AdminReferenceManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/categories"
            element={
              <ProtectedRoute adminOnly>
                <AdminReferenceManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/drive-types"
            element={
              <ProtectedRoute adminOnly>
                <AdminReferenceManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/features"
            element={
              <ProtectedRoute adminOnly>
                <AdminReferenceManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/fuel-types"
            element={
              <ProtectedRoute adminOnly>
                <AdminReferenceManagement />
              </ProtectedRoute>
            }
          />
          
          <Route path="*" element={<Typography>Page not found</Typography>} />
        </Routes>
      </Layout>
      </OrderProvider>
    </AuthProvider>
  );
};

export default App;