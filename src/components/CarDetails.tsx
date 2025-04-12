import React, { useEffect, useState, useContext } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { CarContext } from "../context/ProjectContext"
import { Car } from "../models/car"

// Компонент для отображения деталей конкретного автомобиля
const CarDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>() // Получаем ID автомобиля из параметров URL
  const context = useContext(CarContext) // Доступ к контексту автомобилей
  const navigate = useNavigate() // Для перехода между страницами
  const [car, setCar] = useState<Car | null>(null) // Храним текущий автомобиль

  useEffect(() => {
    if (context) {
      const foundCar = context.cars.find((c) => c.id === parseInt(id || "", 10))
      setCar(foundCar || null)
    }
  }, [context, id])

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this car?')) return;
  
    try {
      if (context?.removeCar && id) {
        const success = await context.removeCar(parseInt(id));
        if (success) {
          navigate('/');
        }
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert('Failed to delete car. Please try again.');
    }
  };
  const handleUpdate = () => {
    navigate(`/update-car/${id}`);
  };

  if (!car) {
    return <div>Car not found!</div>;
  }
  if (!car) {
    return <div>Car not found!</div> // Сообщение, если автомобиль не найден
  }

  return (
    <div>
      <h2>Car Details</h2>
      <div>
        <p>
          <strong>Brand:</strong> {car.brand}
        </p>
        <p>
          <strong>Model:</strong> {car.model}
        </p>
        <p>
          <strong>Price per day:</strong> ${car.pricePerDay}
        </p>
        <p>
          <strong>Type:</strong> {car.type}
        </p>
        <button onClick={() => navigate("/")}>Back to list</button>
        <button onClick={handleUpdate}>Update</button>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  )
}

export default CarDetails