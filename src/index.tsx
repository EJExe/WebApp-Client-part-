/**
 * @fileoverview Application entry point with React Router configuration
 * (Точка входа приложения с конфигурацией React Router)
 * @module index
 */
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ThemeProvider } from "@mui/material/styles";
import { BrowserRouter } from "react-router-dom";
import theme from "./theme";

/**
 * @description Create the root React element and render the application
 * BrowserRouter is configured here to enable client-side routing throughout the app
 * (Создание корневого элемента React и рендеринг приложения.
 * BrowserRouter настроен здесь для обеспечения клиентской маршрутизации во всем приложении)
 */
const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <ThemeProvider theme={theme}>
    {/* BrowserRouter wraps the entire application to enable client-side routing */}
    {/* BrowserRouter оборачивает все приложение для обеспечения клиентской маршрутизации */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ThemeProvider>
);

/**
 * @description Report web vitals for performance monitoring
 * (Отчет о веб-показателях для мониторинга производительности)
 */
reportWebVitals();