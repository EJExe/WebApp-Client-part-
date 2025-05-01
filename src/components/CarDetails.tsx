import React, { useEffect, useState, useContext } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { CarContext } from "../context/ProjectContext"
import { Car } from "../models/car"
import APIService from "../services/APIService";

// Компонент для отображения деталей конкретного автомобиля
const CarDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await APIService.getCars(false); // Adjust if there's a specific endpoint for single car
        const foundCar = response.find((c) => c.id === parseInt(id || ""));
        if (foundCar) {
          setCar(foundCar);
        } else {
          setError("Car not found");
        }
      } catch (err) {
        setError("Failed to load car details");
      } finally {
        setLoading(false);
      }
    };

    fetchCar();
  }, [id]);

  const handleUpdate = () => {
    navigate(`/cars/update/${id}`);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!car) return <p>No car found</p>;

  return (
    <div>
      <p>
        <strong>Brand:</strong> {car.brandName}
      </p>
      <p>
        <strong>Model:</strong> {car.model}
      </p>
      <p>
        <strong>Price per day:</strong> ${car.pricePerDay}
      </p>
      <p>
        <strong>Type:</strong> {car.bodyTypeName}
      </p>
      <p>
        <strong>Features:</strong>{" "}
        {car.featureNames.length > 0 ? car.featureNames.join(", ") : "None"}
      </p>
      {car.imageUrl && (
        <img
          src={car.imageUrl}
          alt={`${car.brandName} ${car.model}`}
          style={{ maxWidth: "300px" }}
        />
      )}
      <button onClick={() => navigate("/")}>Back to list</button>
      <button onClick={handleUpdate}>Update</button>
    </div>
  );
};

export default CarDetails;