import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CarContext } from "../context/ProjectContext";
import { Car } from "../models/car.models";
import { Pagination, Box } from "@mui/material";

const BASE_API_URL = "https://localhost:7154";

const CarList: React.FC = () => {
  const context = useContext(CarContext);
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const carsPerPage = 9;

  // Handle page change
  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    console.log("Page changed to:", value);
    setPage(value);
    // Scroll to top when page changes
    window.scrollTo(0, 0);
  };

  if (!context) {
    return <div>No context available!</div>;
  }

  const { cars } = context;
  
  // Calculate pagination
  const indexOfLastCar = page * carsPerPage;
  const indexOfFirstCar = indexOfLastCar - carsPerPage;
  const currentCars = cars.slice(indexOfFirstCar, indexOfLastCar);
  const totalPages = Math.ceil(cars.length / carsPerPage);

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
          {currentCars.map((car) => (
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
              {car.imagePath ? (
                <div
                  style={{
                    height: "200px",
                    overflow: "hidden",
                    marginBottom: "10px",
                    borderRadius: "4px",
                  }}
                >
                  <img
                    src={`${BASE_API_URL}${car.imagePath}`}
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
                      console.error(`Failed to load image: ${car.imagePath}`);
                      (e.target as HTMLImageElement).src = "https://placehold.co/300x200?text=Car+Image";
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
      
      {/* Pagination */}
      {cars.length > 0 && (
        <Box sx={{
          display: 'flex',
          justifyContent: 'center',
          mt: 4,
          mb: 4,
          padding: '10px',
          backgroundColor: '#f5f5f5',
          borderRadius: '8px'
        }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            color="primary"
            shape="rounded"
            size="large"
            showFirstButton
            showLastButton
            siblingCount={1}
            boundaryCount={1}
          />
        </Box>
      )}
      <div style={{ textAlign: 'center', marginTop: '10px' }}>
        Page {page} of {totalPages} | Showing cars {indexOfFirstCar + 1} to {Math.min(indexOfLastCar, cars.length)} of {cars.length}
      </div>
    </div>
  );
};

export default CarList;