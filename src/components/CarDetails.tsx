// import React, { useEffect, useState, useContext } from "react"
// import { useParams, useNavigate } from "react-router-dom"
// import { CarContext } from "../context/ProjectContext"
// import { Car } from "../models/car.models"
// import APIService from "../services/APIService";

// // Компонент для отображения деталей конкретного автомобиля
// const CarDetails = () => {
//   const { id } = useParams<{ id: string }>();
//   const navigate = useNavigate();
//   const [car, setCar] = useState<Car | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchCar = async () => {
//       try {
//         const response = await APIService.getCars(false); // Adjust if there's a specific endpoint for single car
//         const foundCar = response.find((c) => c.id === parseInt(id || ""));
//         if (foundCar) {
//           setCar(foundCar);
//         } else {
//           setError("Car not found");
//         }
//       } catch (err) {
//         setError("Failed to load car details");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCar();
//   }, [id]);

//   const handleUpdate = () => {
//     navigate(`/cars/update/${id}`);
//   };

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>{error}</p>;
//   if (!car) return <p>No car found</p>;

//   return (
//     <div>
//       <p>
//         <strong>Brand:</strong> {car.brandName}
//       </p>
//       <p>
//         <strong>Model:</strong> {car.model}
//       </p>
//       <p>
//         <strong>Price per day:</strong> ${car.pricePerDay}
//       </p>
//       <p>
//         <strong>Type:</strong> {car.bodyTypeName}
//       </p>
//       <p>
//         <strong>Features:</strong>{" "}
//         {car.featureNames.length > 0 ? car.featureNames.join(", ") : "None"}
//       </p>
//       {car.imageUrl && (
//         <img
//           src={car.imageUrl}
//           alt={`${car.brandName} ${car.model}`}
//           style={{ maxWidth: "300px" }}
//         />
//       )}
//       <button onClick={() => navigate("/")}>Back to list</button>
//       <button onClick={handleUpdate}>Update</button>
//     </div>
//   );
// };

// export default CarDetails;

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import { Car, BodyType, CarCategory, CarDriveType, FuelType, CarFeature, Brand } from "../models/car.models";
import { referenceService } from "../services/ReferenceService";
import { carService } from "../services/CarService";

const CarDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [car, setCar] = useState<Car | null>(null);
    const [brands, setBrands] = useState<Brand[]>([]);
    const [bodyTypes, setBodyTypes] = useState<BodyType[]>([]);
    const [categories, setCategories] = useState<CarCategory[]>([]);
    const [driveTypes, setDriveTypes] = useState<CarDriveType[]>([]);
    const [fuelTypes, setFuelTypes] = useState<FuelType[]>([]);
   
    const [features, setFeatures] = useState<CarFeature[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [
                    carData,
                    brandsData,
                    bodyTypesData,
                    categoriesData,
                    driveTypesData,
                    fuelTypesData,
                    featuresData,
                ] = await Promise.all([
                    carService.getById(Number(id)),
                    referenceService.getBrands(),
                    referenceService.getBodyTypes(),
                    referenceService.getCategories(),
                    referenceService.getDriveTypes(),
                    referenceService.getFuelTypes(),
                    referenceService.getFeatures(),
                ]);
                setCar(carData);
                setBrands(brandsData);
                setBodyTypes(bodyTypesData);
                setCategories(categoriesData);
                setDriveTypes(driveTypesData);
                setFuelTypes(fuelTypesData);
                setFeatures(featuresData);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [id]);

    if (!car) {
        return <Typography>Loading...</Typography>;
    }

    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h4" mb={4}>
                {brands.find((b) => b.id === car.brandId)?.name || "Unknown"} {car.model}
            </Typography>
            <img
                src={car.imagePath 
                    ? `https://localhost:7154${car.imagePath}` 
                    : "/placeholder.jpg"}
                alt={car.model}
                style={{ width: "100%", maxHeight: 400, objectFit: "cover" }}
            />
            <Typography>Year: {car.year}</Typography>
            <Typography>Mileage: {car.mileage} km</Typography>
            <Typography>Color: {car.color}</Typography>
            <Typography>Seats: {car.seats}</Typography>
            <Typography>Price: ${car.pricePerDay}/day</Typography>
            <Typography>Body Type: {bodyTypes.find((bt) => bt.id === car.bodyTypeId)?.name || "Unknown"}</Typography>
            <Typography>Category: {categories.find((c) => c.id === car.categoryId)?.name || "Unknown"}</Typography>
            <Typography>Drive Type: {driveTypes.find((dt) => dt.id === car.driveTypeId)?.name || "Unknown"}</Typography>
            <Typography>Fuel Type: {fuelTypes.find((ft) => ft.id === car.fuelTypeId)?.name || "Unknown"}</Typography>
            <Typography>
                Features: {car.featureIds.map((fid) => features.find((f) => f.id === fid)?.name || "Unknown").join(", ")}
            </Typography>
            <Button variant="contained" sx={{ mt: 2 }}>
                Book Now
            </Button>
        </Box>
    );
};

export default CarDetails;