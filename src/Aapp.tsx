import React from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { CarProvider } from "./context/ProjectContext"
import ProjectList from "./components/CarList"
import ProjectForm from "./components/CarForm"
import ProjectDetails from "./components/CarDetails"
import UpdateCar from "./components/UpdateCar";



// const App: React.FC = () => {
//   return (
//     <CarProvider>
//       <Router>
//         <h1>Project Management</h1>
//         <Routes>
//           <Route path="/" element={<ProjectList />} /> {/* Главная страница */}
//           <Route path="projects/add" element={<ProjectForm />} /> {/* Добавление проекта */}
//           <Route path="/projects/:id" element={<ProjectDetails />} /> {/* Детали проекта */}
//           <Route path="/cars/:id/edit" element={<UpdateCar />} />
//         </Routes>
//       </Router>
//     </CarProvider>
//   )
// }


// export default App
