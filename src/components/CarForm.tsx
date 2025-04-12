import React, { useState, useContext } from "react"
import { CarContext } from "../context/ProjectContext"
import { useNavigate } from "react-router-dom"
import { Car } from "../models/car";
import internal from "stream";



// Компонент для добавления нового автомобиля
const CarForm: React.FC = () => {
  const context = useContext(CarContext)
  const navigate = useNavigate()
  const [error, setError] = useState("");

  const [newCar, setNewCar] = useState<Omit<Car, "id">>({
    brand: "",
    model: "",
    pricePerDay: 0,
    type: "",
    imageUrl: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!context) {
      setError("Application error - please reload the page");
      return;
    }

    try {
      await context.addCar(newCar);
      navigate("/");
    } catch (err) {
      setError("Failed to create car. Check your permissions or try again later.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Car</h2>
      {error && <div className="error">{error}</div>}

      {/* Поле для бренда */}
      <div>
        <label htmlFor="brand">Brand:</label>
        <input
          type="text"
          id="brand"
          placeholder="Enter brand"
          value={newCar.brand}
          required
          onChange={(e) => setNewCar({ ...newCar, brand: e.target.value })}
        />
      </div>

      {/* Поле для модели */}
      <div>
        <label htmlFor="model">Model:</label>
        <input
          type="text"
          id="model"
          placeholder="Enter model"
          value={newCar.model}
          required
          onChange={(e) => setNewCar({ ...newCar, model: e.target.value })}
        />
      </div>

      {/* Поле для цены за день */}
      <div>
        <label htmlFor="pricePerDay">Price per day:</label>
        <input
          type="number"
          id="pricePerDay"
          placeholder="Enter price per day"
          value={newCar.pricePerDay}
          required
          onChange={(e) =>
            setNewCar({ ...newCar, pricePerDay: Number(e.target.value) })
          }
        />
      </div>

      {/* Выбор типа автомобиля */}
      <div>
        <label htmlFor="type">Type:</label>
        <select
          id="type"
          value={newCar.type}
          required
          onChange={(e) => setNewCar({ ...newCar, type: e.target.value })}
        >
          <option value="">Select type</option>
          <option value="Sedan">Sedan</option>
          <option value="SUV">SUV</option>
          <option value="Coupe">Coupe</option>
        </select>
      </div>

      {/* Поле для URL изображения */}
      <div>
        <label htmlFor="imageUrl">Image URL:</label>
        <input
          type="text"
          id="imageUrl"
          placeholder="Enter image URL"
          value={newCar.imageUrl}
          
          onChange={(e) => setNewCar({ ...newCar, imageUrl: e.target.value })}
        />
      </div>

      {/* Кнопки управления */}
      <button type="submit">Add Car</button>
      <button type="button" onClick={() => navigate("/")}>
        Back
      </button>
    </form>
  );
}

export default CarForm