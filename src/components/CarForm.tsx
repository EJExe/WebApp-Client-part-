import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CarContext } from "../context/ProjectContext"; // Updated to CarContext
import { Car } from "../models/car";

const CarForm = () => {
  const context = useContext(CarContext);
  const navigate = useNavigate();
  const [newCar, setNewCar] = useState<Omit<Car, "id">>({
    brandId: 0,
    brandName: "",
    fuelTypeId: 0,
    fuelTypeName: "",
    driveTypeId: 0,
    driveTypeName: "",
    categoryId: 0,
    categoryName: "",
    bodyTypeId: 0,
    bodyTypeName: "",
    featureIds: [],
    featureNames: [],
    model: "",
    year: 0,
    mileage: 0,
    color: "",
    seats: 0,
    pricePerDay: 0,
    latitude: 0,
    longitude: 0,
    imageUrl: "",
  });
  const [error, setError] = useState<string>("");

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
    <form onSubmit={handleSubmit} style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <h2>Add New Car</h2>
      {error && <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>}

      <div style={{ marginBottom: "15px" }}>
        <label htmlFor="brandName">Brand:</label>
        <input
          type="text"
          id="brandName"
          placeholder="Enter brand"
          value={newCar.brandName}
          required
          onChange={(e) => setNewCar({ ...newCar, brandName: e.target.value })}
          style={{ width: "100%", padding: "8px", marginTop: "5px" }}
        />
      </div>

      <div style={{ marginBottom: "15px" }}>
        <label htmlFor="model">Model:</label>
        <input
          type="text"
          id="model"
          placeholder="Enter model"
          value={newCar.model}
          required
          onChange={(e) => setNewCar({ ...newCar, model: e.target.value })}
          style={{ width: "100%", padding: "8px", marginTop: "5px" }}
        />
      </div>

      <div style={{ marginBottom: "15px" }}>
        <label htmlFor="pricePerDay">Price per day:</label>
        <input
          type="number"
          id="pricePerDay"
          placeholder="Enter price per day"
          value={newCar.pricePerDay}
          required
          onChange={(e) =>
            setNewCar({ ...newCar, pricePerDay: Number(e.target.value) || 0 })
          }
          style={{ width: "100%", padding: "8px", marginTop: "5px" }}
        />
      </div>

      <div style={{ marginBottom: "15px" }}>
        <label htmlFor="bodyTypeName">Type:</label>
        <select
          id="bodyTypeName"
          value={newCar.bodyTypeName}
          required
          onChange={(e) => setNewCar({ ...newCar, bodyTypeName: e.target.value })}
          style={{ width: "100%", padding: "8px", marginTop: "5px" }}
        >
          <option value="">Select type</option>
          <option value="Sedan">Sedan</option>
          <option value="SUV">SUV</option>
          <option value="Coupe">Coupe</option>
          <option value="Hatchback">Hatchback</option>
        </select>
      </div>

      <div style={{ marginBottom: "15px" }}>
        <label htmlFor="imageUrl">Image URL:</label>
        <input
          type="text"
          id="imageUrl"
          placeholder="Enter image URL"
          value={newCar.imageUrl}
          onChange={(e) => setNewCar({ ...newCar, imageUrl: e.target.value })}
          style={{ width: "100%", padding: "8px", marginTop: "5px" }}
        />
      </div>

      <div style={{ marginBottom: "15px" }}>
        <label htmlFor="year">Year:</label>
        <input
          type="number"
          id="year"
          placeholder="Enter year"
          value={newCar.year}
          required
          onChange={(e) => setNewCar({ ...newCar, year: Number(e.target.value) || 0 })}
          style={{ width: "100%", padding: "8px", marginTop: "5px" }}
        />
      </div>

      <div style={{ marginBottom: "15px" }}>
        <label htmlFor="color">Color:</label>
        <input
          type="text"
          id="color"
          placeholder="Enter color"
          value={newCar.color}
          required
          onChange={(e) => setNewCar({ ...newCar, color: e.target.value })}
          style={{ width: "100%", padding: "8px", marginTop: "5px" }}
        />
      </div>

      <div style={{ marginBottom: "15px" }}>
        <label htmlFor="seats">Seats:</label>
        <input
          type="number"
          id="seats"
          placeholder="Enter number of seats"
          value={newCar.seats}
          required
          onChange={(e) => setNewCar({ ...newCar, seats: Number(e.target.value) || 0 })}
          style={{ width: "100%", padding: "8px", marginTop: "5px" }}
        />
      </div>

      <div style={{ display: "flex", gap: "10px" }}>
        <button
          type="submit"
          style={{
            padding: "8px 16px",
            backgroundColor: "#2196F3",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Add Car
        </button>
        <button
          type="button"
          onClick={() => navigate("/")}
          style={{
            padding: "8px 16px",
            backgroundColor: "#f44336",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Back
        </button>
      </div>
    </form>
  );
};

export default CarForm;