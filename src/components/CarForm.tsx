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
  Paper,
  Divider,
  Chip,
  InputAdornment,
  IconButton,
  CircularProgress,
  styled,
  Alert
} from "@mui/material";
import {
  AddPhotoAlternate,
  CheckCircle,
  Cancel,
  DirectionsCar,
  MonetizationOn,
  Palette,
  EventSeat,
  MyLocation,
  Save,
  Edit
} from "@mui/icons-material";
import { CarCreateDto, BodyType, Brand, CarCategory, CarDriveType, CarFeature, FuelType } from "../models/car.models";
import { useAuth } from "../context/AuthContext";

const GradientButton = styled(Button)({
  background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
  border: 0,
  borderRadius: 8,
  color: 'white',
  padding: '8px 24px',
  boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .2)',
  '&:hover': {
    background: 'linear-gradient(45deg, #1976D2 30%, #1E88E5 90%)',
  },
});

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
    isLeasingAvailable: false,
  });
  const [error, setError] = useState<string>("");
  const [brands, setBrands] = useState<Brand[]>([]);
  const [bodyTypes, setBodyTypes] = useState<BodyType[]>([]);
  const [categories, setCategories] = useState<CarCategory[]>([]);
  const [driveTypes, setDriveTypes] = useState<CarDriveType[]>([]);
  const [fuelTypes, setFuelTypes] = useState<FuelType[]>([]);
  const [features, setFeatures] = useState<CarFeature[]>([]);
  const [isLoading, setIsLoading] = useState(false);

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
      <Paper elevation={0} sx={{ p: 4, borderRadius: 4, bgcolor: 'white' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
          <DirectionsCar sx={{ fontSize: 40, color: 'primary.main' }} />
          <Typography variant="h4">Добавление нового автомобиля</Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3, borderRadius: 3 }}>{error}</Alert>
        )}

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Марка и модель */}
            <Grid item xs={12} md={6}>
              <FormControl fullWidth size="small">
                <InputLabel>Марка</InputLabel>
                <Select
                  value={newCar.brandId}
                  onChange={(e) =>
                    setNewCar({ ...newCar, brandId: Number(e.target.value) })
                  }
                  required
                >
                  {brands.map((brand) => (
                    <MenuItem key={brand.id} value={brand.id}>
                      {brand.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Модель"
                value={newCar.model}
                onChange={(e) => setNewCar({ ...newCar, model: e.target.value })}
                required
                InputProps={{
                  endAdornment: <Edit color="action" />,
                }}
              />
            </Grid>

            {/* Основные характеристики */}
            <Grid item xs={12}>
              <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                Основные характеристики
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6} sm={3}>
                  <TextField
                    fullWidth
                    label="Год выпуска"
                    type="number"
                    value={newCar.year}
                    onChange={(e) =>
                      setNewCar({ ...newCar, year: Number(e.target.value) })
                    }
                    required
                  />
                </Grid>
                <Grid item xs={6} sm={3}>
                  <TextField
                    fullWidth
                    label="Пробег"
                    type="number"
                    value={newCar.mileage}
                    InputProps={{
                      endAdornment: <InputAdornment position="end">км</InputAdornment>,
                    }}
                    onChange={(e) =>
                      setNewCar({ ...newCar, mileage: Number(e.target.value) })
                    }
                    required
                  />
                </Grid>
                <Grid item xs={6} sm={3}>
                  <TextField
                    fullWidth
                    label="Места"
                    type="number"
                    value={newCar.seats}
                    InputProps={{
                      endAdornment: <EventSeat fontSize="small" color="action" />,
                    }}
                    onChange={(e) =>
                      setNewCar({ ...newCar, seats: Number(e.target.value) })
                    }
                    required
                  />
                </Grid>
                <Grid item xs={6} sm={3}>
                  <TextField
                    fullWidth
                    label="Цвет"
                    value={newCar.color}
                    InputProps={{
                      endAdornment: <Palette fontSize="small" color="action" />,
                    }}
                    onChange={(e) => setNewCar({ ...newCar, color: e.target.value })}
                    required
                  />
                </Grid>
              </Grid>
            </Grid>

            {/* Цена и местоположение */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Цена за день"
                type="number"
                value={newCar.pricePerDay}
                InputProps={{
                  startAdornment: <InputAdornment position="start">₽</InputAdornment>,
                  endAdornment: <MonetizationOn color="action" />,
                }}
                onChange={(e) =>
                  setNewCar({ ...newCar, pricePerDay: Number(e.target.value) })
                }
                required
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Широта"
                    type="number"
                    value={newCar.latitude}
                    InputProps={{
                      endAdornment: <MyLocation fontSize="small" color="action" />,
                    }}
                    onChange={(e) =>
                      setNewCar({ ...newCar, latitude: Number(e.target.value) })
                    }
                    required
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Долгота"
                    type="number"
                    value={newCar.longitude}
                    InputProps={{
                      endAdornment: <MyLocation fontSize="small" color="action" />,
                    }}
                    onChange={(e) =>
                      setNewCar({ ...newCar, longitude: Number(e.target.value) })
                    }
                    required
                  />
                </Grid>
              </Grid>
            </Grid>

            {/* Статус аренды */}
            <Grid item xs={12}>
              <FormControl fullWidth>
                <Box sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  p: 1.5,
                  borderRadius: 3,
                  bgcolor: newCar.isLeasingAvailable ? 'success.light' : 'error.light',
                  transition: 'all 0.3s ease'
                }}>
                  <Typography variant="body1" sx={{ flexGrow: 1 }}>
                    Статус аренды:
                    <Box component="span" sx={{ ml: 1, fontWeight: 600 }}>
                      {newCar.isLeasingAvailable ? 'Доступен' : 'Недоступен'}
                    </Box>
                  </Typography>
                  <Button
                    variant="contained"
                    disableElevation
                    sx={{
                      borderRadius: 2,
                      minWidth: 120,
                      bgcolor: newCar.isLeasingAvailable ? 'success.main' : 'error.main',
                      '&:hover': {
                        bgcolor: newCar.isLeasingAvailable ? 'success.dark' : 'error.dark'
                      }
                    }}
                    onClick={() => setNewCar({...newCar, isLeasingAvailable: !newCar.isLeasingAvailable})}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {newCar.isLeasingAvailable ? (
                        <>
                          <CheckCircle fontSize="small" />
                          Включено
                        </>
                      ) : (
                        <>
                          <Cancel fontSize="small" />
                          Выключено
                        </>
                      )}
                    </Box>
                  </Button>
                </Box>
              </FormControl>
            </Grid>

            {/* Дополнительные параметры */}
            <Grid item xs={12} md={6}>
              <FormControl fullWidth size="small">
                <InputLabel>Тип кузова</InputLabel>
                <Select
                  value={newCar.bodyTypeId}
                  onChange={(e) =>
                    setNewCar({ ...newCar, bodyTypeId: Number(e.target.value) })
                  }
                  required
                >
                  {bodyTypes.map((bodyType) => (
                    <MenuItem key={bodyType.id} value={bodyType.id}>
                      {bodyType.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth size="small">
                <InputLabel>Категория</InputLabel>
                <Select
                  value={newCar.categoryId}
                  onChange={(e) =>
                    setNewCar({ ...newCar, categoryId: Number(e.target.value) })
                  }
                  required
                >
                  {categories.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth size="small">
                <InputLabel>Тип привода</InputLabel>
                <Select
                  value={newCar.driveTypeId}
                  onChange={(e) =>
                    setNewCar({ ...newCar, driveTypeId: Number(e.target.value) })
                  }
                  required
                >
                  {driveTypes.map((driveType) => (
                    <MenuItem key={driveType.id} value={driveType.id}>
                      {driveType.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth size="small">
                <InputLabel>Тип топлива</InputLabel>
                <Select
                  value={newCar.fuelTypeId}
                  onChange={(e) =>
                    setNewCar({ ...newCar, fuelTypeId: Number(e.target.value) })
                  }
                  required
                >
                  {fuelTypes.map((fuelType) => (
                    <MenuItem key={fuelType.id} value={fuelType.id}>
                      {fuelType.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Особенности */}
            <Grid item xs={12}>
              <FormControl fullWidth size="small">
                <InputLabel>Особенности</InputLabel>
                <Select
                  multiple
                  value={newCar.featureIds}
                  onChange={(e) =>
                    setNewCar({ ...newCar, featureIds: e.target.value as number[] })
                  }
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip
                          key={value}
                          label={features.find(f => f.id === value)?.name}
                          size="small"
                        />
                      ))}
                    </Box>
                  )}
                >
                  {features.map((feature) => (
                    <MenuItem key={feature.id} value={feature.id}>
                      {feature.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Загрузка изображения */}
            <Grid item xs={12}>
              <Button
                component="label"
                variant="outlined"
                fullWidth
                startIcon={<AddPhotoAlternate />}
                sx={{ py: 1.5, borderRadius: 2 }}
              >
                Загрузить изображение
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={(e) =>
                    setNewCar({
                      ...newCar,
                      image: e.target.files ? e.target.files[0] : null,
                    })
                  }
                />
              </Button>
            </Grid>

            {/* Кнопка отправки */}
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <GradientButton
                  type="submit"
                  disabled={isLoading}
                  startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : <Save />}
                >
                  {isLoading ? 'Сохранение...' : 'Сохранить автомобиль'}
                </GradientButton>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default CarForm;