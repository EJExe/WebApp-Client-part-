import React from "react"
import { BrowserRouter as Router,Navigate, Route, Routes } from "react-router-dom"
import { CarProvider } from "./context/ProjectContext"
import CarList from "./components/CarList"
import CarForm from "./components/CarForm"
import CarDetails from "./components/CarDetails"
import UpdateCar from './components/UpdateCar';
import Layout from "./components/Layout/Layout"
import Home from "./components/Pages/Home"
import Page1 from "./components/Pages/Page1"
import Page2 from "./components/Pages/Page2"
import Page3 from "./components/Pages/Page3"
import { AuthProvider } from "../../my-app/src/context/AuthContext"
import { useAuth } from "../../my-app/src/context/AuthContext"
// Импорт провайдера контекста авторизации и хука для доступа к контексту.
import LoginPage from "./components/Pages/LoginPage"

const ProtectedRoute: React.FC<{ children: React.ReactElement; adminOnly?: boolean }> = ({
  children,
  adminOnly = false,
}) => {
  // Этот компонент используется для защиты маршрутов.
  // Он проверяет, авторизован ли пользователь, и есть ли у него права администратора.

  const { user, isAdmin } = useAuth()
  // Хук из контекста авторизации, чтобы получить данные о текущем пользователе и его правах.

  if (!user) {
    alert("Недостаточно прав. Выполните вход!")
    // Если пользователь не авторизован, показываем уведомление.
    return <Navigate to="/" replace />
    // Перенаправляем на главную страницу.
  } else if (adminOnly && !isAdmin) {
    alert("Недостаточно прав пользователя!")
    // Если маршрут только для администраторов, а пользователь не администратор, показываем уведомление.
    return <Navigate to="/" replace />
    // Перенаправляем на главную страницу.
  }

  return children
  // Если все проверки пройдены, рендерим вложенные компоненты.
}


// const App = () => {
//   return (
//     <CarProvider>
//       <Router>
//         <div className="app-container">
//           <header>
//             <h1>Car Rental Management</h1>
//           </header>
          
//           <main>
//             <Routes>
//               <Route path="/" element={<CarList />} />
//               <Route path="/cars/add" element={<CarForm />} />
//               <Route path="/cars/:id" element={<CarDetails />} />
//               <Route path="/update-car/:id" element={<UpdateCar />} />
//               <Route path="*" element={<div>Page not found</div>} />
//             </Routes>
//           </main>

//           <footer>
//             <p>2025 Car Rental Service.</p>
//           </footer>
//         </div>
//       </Router>
//     </CarProvider>
//   )
// }

const App: React.FC = () => {
  // Главный компонент приложения, который объединяет маршруты, Layout и провайдер авторизации.

  return (
    <AuthProvider>
      {/* Обеспечиваем доступ к контексту авторизации для всех компонентов приложения. */}
      <Layout>
        {/* Оборачиваем приложение в Layout, который может содержать шапку, подвал и т.д. */}
        <Routes>
          {/* Определяем маршруты приложения. */}
          <Route path="/" element={<Home />} />
          {/* Маршрут главной страницы. */}
          <Route path="/login" element={<LoginPage />} />
          {/* Маршрут страницы входа. */}
          <Route path="/page1" element={<Page1 />} />
          {/* Маршрут для Page1 без ограничений. */}
          <Route
            path="/page2"
            element={
              <ProtectedRoute>
                {/* Ограниченный маршрут для Page2. */}
                <Page2 />
              </ProtectedRoute>
            }
          />
          <Route
            path="/page3"
            element={
              <ProtectedRoute adminOnly>
                {/* Ограниченный маршрут для Page3 только для администраторов. */}
                <Page3 />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Layout>
    </AuthProvider>
  )
}

export default App