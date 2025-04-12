import React from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { CarProvider } from "./context/ProjectContext"
import CarList from "./components/CarList"
import CarForm from "./components/CarForm"
import CarDetails from "./components/CarDetails"
import UpdateCar from './components/UpdateCar';

const App = () => {
  return (
    <CarProvider>
      <Router>
        <div className="app-container">
          <header>
            <h1>Car Rental Management</h1>
          </header>
          
          <main>
            <Routes>
              <Route path="/" element={<CarList />} />
              <Route path="/cars/add" element={<CarForm />} />
              <Route path="/cars/:id" element={<CarDetails />} />
              <Route path="/update-car/:id" element={<UpdateCar />} />
              <Route path="*" element={<div>Page not found</div>} />
            </Routes>
          </main>

          <footer>
            <p>2025 Car Rental Service.</p>
          </footer>
        </div>
      </Router>
    </CarProvider>
  )
}

export default App