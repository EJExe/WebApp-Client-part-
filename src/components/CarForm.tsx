// import React, { useState, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { CarContext } from "../context/ProjectContext"; // Updated to CarContext
// import { Car } from "../models/car.models";

// const CarForm = () => {
//   const context = useContext(CarContext);
//   const navigate = useNavigate();
//   const [newCar, setNewCar] = useState<Omit<Car, "id">>({
//     brandId: 0,
//     brandName: "",
//     fuelTypeId: 0,
//     fuelTypeName: "",
//     driveTypeId: 0,
//     driveTypeName: "",
//     categoryId: 0,
//     categoryName: "",
//     bodyTypeId: 0,
//     bodyTypeName: "",
//     featureIds: [],
//     featureNames: [],
//     model: "",
//     year: 0,
//     mileage: 0,
//     color: "",
//     seats: 0,
//     pricePerDay: 0,
//     latitude: 0,
//     longitude: 0,
//     imageUrl: "",
//   });
//   const [error, setError] = useState<string>("");

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");

//     if (!context) {
//       setError("Application error - please reload the page");
//       return;
//     }

//     try {
//       await context.addCar(newCar);
//       navigate("/");
//     } catch (err) {
//       setError("Failed to create car. Check your permissions or try again later.");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
//       <h2>Add New Car</h2>
//       {error && <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>}

//       <div style={{ marginBottom: "15px" }}>
//         <label htmlFor="brandName">Brand:</label>
//         <input
//           type="text"
//           id="brandName"
//           placeholder="Enter brand"
//           value={newCar.brandName}
//           required
//           onChange={(e) => setNewCar({ ...newCar, brandName: e.target.value })}
//           style={{ width: "100%", padding: "8px", marginTop: "5px" }}
//         />
//       </div>

//       <div style={{ marginBottom: "15px" }}>
//         <label htmlFor="model">Model:</label>
//         <input
//           type="text"
//           id="model"
//           placeholder="Enter model"
//           value={newCar.model}
//           required
//           onChange={(e) => setNewCar({ ...newCar, model: e.target.value })}
//           style={{ width: "100%", padding: "8px", marginTop: "5px" }}
//         />
//       </div>

//       <div style={{ marginBottom: "15px" }}>
//         <label htmlFor="pricePerDay">Price per day:</label>
//         <input
//           type="number"
//           id="pricePerDay"
//           placeholder="Enter price per day"
//           value={newCar.pricePerDay}
//           required
//           onChange={(e) =>
//             setNewCar({ ...newCar, pricePerDay: Number(e.target.value) || 0 })
//           }
//           style={{ width: "100%", padding: "8px", marginTop: "5px" }}
//         />
//       </div>

//       <div style={{ marginBottom: "15px" }}>
//         <label htmlFor="bodyTypeName">Type:</label>
//         <select
//           id="bodyTypeName"
//           value={newCar.bodyTypeName}
//           required
//           onChange={(e) => setNewCar({ ...newCar, bodyTypeName: e.target.value })}
//           style={{ width: "100%", padding: "8px", marginTop: "5px" }}
//         >
//           <option value="">Select type</option>
//           <option value="Sedan">Sedan</option>
//           <option value="SUV">SUV</option>
//           <option value="Coupe">Coupe</option>
//           <option value="Hatchback">Hatchback</option>
//         </select>
//       </div>

//       <div style={{ marginBottom: "15px" }}>
//         <label htmlFor="imageUrl">Image URL:</label>
//         <input
//           type="text"
//           id="imageUrl"
//           placeholder="Enter image URL"
//           value={newCar.imagePath}
//           onChange={(e) => setNewCar({ ...newCar, imageUrl: e.target.value })}
//           style={{ width: "100%", padding: "8px", marginTop: "5px" }}
//         />
//       </div>

//       <div style={{ marginBottom: "15px" }}>
//         <label htmlFor="year">Year:</label>
//         <input
//           type="number"
//           id="year"
//           placeholder="Enter year"
//           value={newCar.year}
//           required
//           onChange={(e) => setNewCar({ ...newCar, year: Number(e.target.value) || 0 })}
//           style={{ width: "100%", padding: "8px", marginTop: "5px" }}
//         />
//       </div>

//       <div style={{ marginBottom: "15px" }}>
//         <label htmlFor="color">Color:</label>
//         <input
//           type="text"
//           id="color"
//           placeholder="Enter color"
//           value={newCar.color}
//           required
//           onChange={(e) => setNewCar({ ...newCar, color: e.target.value })}
//           style={{ width: "100%", padding: "8px", marginTop: "5px" }}
//         />
//       </div>

//       <div style={{ marginBottom: "15px" }}>
//         <label htmlFor="seats">Seats:</label>
//         <input
//           type="number"
//           id="seats"
//           placeholder="Enter number of seats"
//           value={newCar.seats}
//           required
//           onChange={(e) => setNewCar({ ...newCar, seats: Number(e.target.value) || 0 })}
//           style={{ width: "100%", padding: "8px", marginTop: "5px" }}
//         />
//       </div>

//       <div style={{ display: "flex", gap: "10px" }}>
//         <button
//           type="submit"
//           style={{
//             padding: "8px 16px",
//             backgroundColor: "#2196F3",
//             color: "white",
//             border: "none",
//             borderRadius: "4px",
//             cursor: "pointer",
//           }}
//         >
//           Add Car
//         </button>
//         <button
//           type="button"
//           onClick={() => navigate("/")}
//           style={{
//             padding: "8px 16px",
//             backgroundColor: "#f44336",
//             color: "white",
//             border: "none",
//             borderRadius: "4px",
//             cursor: "pointer",
//           }}
//         >
//           Back
//         </button>
//       </div>
//     </form>
//   );
// };

// export default CarForm;

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { referenceService } from "../services/ReferenceService";
import { carService } from "../services/CarService";
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { CarCreateDto, BodyType, Brand, CarCategory, CarDriveType, CarFeature, FuelType } from "../models/car.models";
import { useAuth } from "../context/AuthContext";

const CarForm: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [newCar, setNewCar] = useState<CarCreateDto>({
    brandId: 0,
    model: "",
    year: 0,
    mileage: 0,
    color: "",
    seats: 0,
    pricePerDay: 0,
    latitude: 0,
    longitude: 0,
    bodyTypeId: 0,
    categoryId: 0,
    driveTypeId: 0,
    fuelTypeId: 0,
    featureIds: [],
    image: null,
    isLeasingDisabled: false,
  });
  const [error, setError] = useState<string>("");
  const [brands, setBrands] = useState<Brand[]>([]);
  const [bodyTypes, setBodyTypes] = useState<BodyType[]>([]);
  const [categories, setCategories] = useState<CarCategory[]>([]);
  const [driveTypes, setDriveTypes] = useState<CarDriveType[]>([]);
  const [fuelTypes, setFuelTypes] = useState<FuelType[]>([]);
  const [features, setFeatures] = useState<CarFeature[]>([]);

  useEffect(() => {
    if (user?.userRole !== "admin") {
      navigate("/");
      return;
    }

    const fetchData = async () => {
      try {
        const [
          brandsData,
          bodyTypesData,
          categoriesData,
          driveTypesData,
          fuelTypesData,
          featuresData,
        ] = await Promise.all([
          referenceService.getBrands(),
          referenceService.getBodyTypes(),
          referenceService.getCategories(),
          referenceService.getDriveTypes(),
          referenceService.getFuelTypes(),
          referenceService.getFeatures(),
        ]);
        setBrands(brandsData);
        setBodyTypes(bodyTypesData);
        setCategories(categoriesData);
        setDriveTypes(driveTypesData);
        setFuelTypes(fuelTypesData);
        setFeatures(featuresData);
      } catch (err) {
        setError("Failed to load reference data");
      }
    };

    fetchData();
  }, [navigate, user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await carService.create(newCar);
      navigate("/admin/cars");
    } catch (err) {
      setError("Failed to create car");
    }
  };

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Add New Car
      </Typography>
      {error && (
        <Typography color="error" gutterBottom>
          {error}
        </Typography>
      )}
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Brand</InputLabel>
              <Select
                value={newCar.brandId}
                onChange={(e) =>
                  setNewCar({ ...newCar, brandId: Number(e.target.value) })
                }
                required
              >
                <MenuItem value={0}>Select Brand</MenuItem>
                {brands.map((brand) => (
                  <MenuItem key={brand.id} value={brand.id}>
                    {brand.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid xs={12} sm={6}>
            <TextField
              fullWidth
              label="Model"
              value={newCar.model}
              onChange={(e) => setNewCar({ ...newCar, model: e.target.value })}
              required
            />
          </Grid>
          <Grid xs={12} sm={6}>
            <TextField
              fullWidth
              label="Year"
              type="number"
              value={newCar.year}
              onChange={(e) =>
                setNewCar({ ...newCar, year: Number(e.target.value) })
              }
              required
            />
          </Grid>
          <Grid xs={12} sm={6}>
            <TextField
              fullWidth
              label="Mileage (km)"
              type="number"
              value={newCar.mileage}
              onChange={(e) =>
                setNewCar({ ...newCar, mileage: Number(e.target.value) })
              }
              required
            />
          </Grid>
          <Grid xs={12} sm={6}>
            <TextField
              fullWidth
              label="Color"
              value={newCar.color}
              onChange={(e) => setNewCar({ ...newCar, color: e.target.value })}
              required
            />
          </Grid>
          <Grid xs={12} sm={6}>
            <TextField
              fullWidth
              label="Seats"
              type="number"
              value={newCar.seats}
              onChange={(e) =>
                setNewCar({ ...newCar, seats: Number(e.target.value) })
              }
              required
            />
          </Grid>
          <Grid xs={12} sm={6}>
            <TextField
              fullWidth
              label="Price per Day ($)"
              type="number"
              value={newCar.pricePerDay}
              onChange={(e) =>
                setNewCar({ ...newCar, pricePerDay: Number(e.target.value) })
              }
              required
            />
          </Grid>
          <Grid xs={12} sm={6}>
            <TextField
              fullWidth
              label="Latitude"
              type="number"
              value={newCar.latitude}
              onChange={(e) =>
                setNewCar({ ...newCar, latitude: Number(e.target.value) })
              }
              required
            />
          </Grid>
          <Grid xs={12} sm={6}>
            <TextField
              fullWidth
              label="Longitude"
              type="number"
              value={newCar.longitude}
              onChange={(e) =>
                setNewCar({ ...newCar, longitude: Number(e.target.value) })
              }
              required
            />
          </Grid>
          <Grid xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Body Type</InputLabel>
              <Select
                value={newCar.bodyTypeId}
                onChange={(e) =>
                  setNewCar({ ...newCar, bodyTypeId: Number(e.target.value) })
                }
                required
              >
                <MenuItem value={0}>Select Body Type</MenuItem>
                {bodyTypes.map((bodyType) => (
                  <MenuItem key={bodyType.id} value={bodyType.id}>
                    {bodyType.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={newCar.categoryId}
                onChange={(e) =>
                  setNewCar({ ...newCar, categoryId: Number(e.target.value) })
                }
                required
              >
                <MenuItem value={0}>Select Category</MenuItem>
                {categories.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Drive Type</InputLabel>
              <Select
                value={newCar.driveTypeId}
                onChange={(e) =>
                  setNewCar({ ...newCar, driveTypeId: Number(e.target.value) })
                }
                required
              >
                <MenuItem value={0}>Select Drive Type</MenuItem>
                {driveTypes.map((driveType) => (
                  <MenuItem key={driveType.id} value={driveType.id}>
                    {driveType.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Fuel Type</InputLabel>
              <Select
                value={newCar.fuelTypeId}
                onChange={(e) =>
                  setNewCar({ ...newCar, fuelTypeId: Number(e.target.value) })
                }
                required
              >
                <MenuItem value={0}>Select Fuel Type</MenuItem>
                {fuelTypes.map((fuelType) => (
                  <MenuItem key={fuelType.id} value={fuelType.id}>
                    {fuelType.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid xs={12}>
            <FormControl fullWidth>
              <InputLabel>Features</InputLabel>
              <Select
                multiple
                value={newCar.featureIds}
                onChange={(e) =>
                  setNewCar({
                    ...newCar,
                    featureIds: e.target.value as number[],
                  })
                }
              >
                {features.map((feature) => (
                  <MenuItem key={feature.id} value={feature.id}>
                    {feature.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid xs={12}>
            <Typography variant="subtitle1" gutterBottom>
              Upload Image
            </Typography>
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setNewCar({
                  ...newCar,
                  image: e.target.files ? e.target.files[0] : null,
                })
              }
            />
          </Grid>
          <Grid xs={12}>
            <Button type="submit" variant="contained" color="primary" size="large">
              Create Car
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default CarForm;