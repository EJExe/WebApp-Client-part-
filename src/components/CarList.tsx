import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CarContext } from "../context/ProjectContext";
import { Car } from "../models/car";

const CarList: React.FC = () => {
  const context = useContext(CarContext);
  const navigate = useNavigate();

  if (!context) {
    return <div>No context available!</div>;
  }

  const { cars } = context;

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h2>Car Rental List</h2>
        <button
          onClick={() => navigate("/cars/add")}
          style={{
            padding: "8px 16px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Add New Car
        </button>
      </div>

      {cars.length === 0 ? (
        <p>No cars available.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "20px",
          }}
        >
          {cars.map((car) => (
            <div
              key={car.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "15px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              }}
            >
              <h3 style={{ marginTop: 0 }}>
                {car.brandName} {car.model}
              </h3>
              {car.imageUrl ? (
                <div
                  style={{
                    height: "200px",
                    overflow: "hidden",
                    marginBottom: "10px",
                    borderRadius: "4px",
                  }}
                >
                  <img
                    src={car.imageUrl}
                    alt={`${car.brandName} ${car.model}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                    className="car-image"
                    loading="lazy"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://via.placeholder.com/300x200?text=Car+Image";
                    }}
                  />
                </div>
              ) : (
                <div
                  style={{
                    height: "200px",
                    overflow: "hidden",
                    marginBottom: "10px",
                    borderRadius: "4px",
                    backgroundColor: "#f0f0f0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span>No Image</span>
                </div>
              )}
              <div style={{ marginBottom: "15px" }}>
                <p style={{ margin: "5px 0" }}>
                  <strong>Type:</strong> {car.bodyTypeName}
                </p>
                <p style={{ margin: "5px 0" }}>
                  <strong>Price per day:</strong> ${car.pricePerDay}
                </p>
                <p style={{ margin: "5px 0" }}>
                  <strong>Features:</strong>{" "}
                  {car.featureNames.length > 0 ? car.featureNames.join(", ") : "None"}
                </p>
              </div>
              <Link
                to={`/cars/${car.id}`}
                style={{
                  display: "inline-block",
                  padding: "8px 12px",
                  backgroundColor: "#2196F3",
                  color: "white",
                  textDecoration: "none",
                  borderRadius: "4px",
                  textAlign: "center",
                }}
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CarList;