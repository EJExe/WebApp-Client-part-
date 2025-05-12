// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { Car, CarCreateDto, BodyType, Brand, CarCategory, CarDriveType, FuelType, CarFeature } from "../models/car.models";
// import { referenceService } from "../services/ReferenceService";
// import { carService } from "../services/CarService";
// import { useAuth } from "../context/AuthContext";
// import {
//     Box,
//     Button,
//     FormControl,
//     InputLabel,
//     Select,
//     MenuItem,
//     TextField,
//     Typography,
//     Grid,
//     Container,
//     Alert,
//     CircularProgress,
// } from "@mui/material";

// const AdminCarManagement: React.FC = () => {
//     const { user } = useAuth();
//     const navigate = useNavigate();
//     const [cars, setCars] = useState<Car[]>([]);
//     const [brands, setBrands] = useState<Brand[]>([]);
//     const [bodyTypes, setBodyTypes] = useState<BodyType[]>([]);
//     const [categories, setCategories] = useState<CarCategory[]>([]);
//     const [driveTypes, setDriveTypes] = useState<CarDriveType[]>([]);
//     const [fuelTypes, setFuelTypes] = useState<FuelType[]>([]);
//     const [features, setFeatures] = useState<CarFeature[]>([]);
//     const [form, setForm] = useState<CarCreateDto>({
//         brandId: 0,
//         model: "",
//         year: 0,
//         mileage: 0,
//         color: "",
//         seats: 0,
//         pricePerDay: 0,
//         latitude: 0,
//         longitude: 0,
//         bodyTypeId: 0,
//         categoryId: 0,
//         driveTypeId: 0,
//         fuelTypeId: 0,
//         featureIds: [],
//         image: null,
//         isLeasingAvailable: false, // Инициализация по умолчанию
//     });
//     const [editingId, setEditingId] = useState<number | null>(null);
//     const [error, setError] = useState<string | null>(null);
//     const [success, setSuccess] = useState<string | null>(null);
//     const [isLoading, setIsLoading] = useState(false);

//     useEffect(() => {
//         if (user?.userRole !== "admin") {
//             navigate("/");
//             return;
//         }

//         const fetchData = async () => {
//             try {
//                 const [
//                     result,
//                     brandsData,
//                     bodyTypesData,
//                     categoriesData,
//                     driveTypesData,
//                     fuelTypesData,
//                     featuresData,
//                 ] = await Promise.all([
//                     carService.getCars(),
//                     referenceService.getBrands(),
//                     referenceService.getBodyTypes(),
//                     referenceService.getCategories(),
//                     referenceService.getDriveTypes(),
//                     referenceService.getFuelTypes(),
//                     referenceService.getFeatures(),
//                 ]);
//                 setCars(result.cars);
//                 setBrands(brandsData);
//                 setBodyTypes(bodyTypesData);
//                 setCategories(categoriesData);
//                 setDriveTypes(driveTypesData);
//                 setFuelTypes(fuelTypesData);
//                 setFeatures(featuresData);
//             } catch (error) {
//                 setError("Failed to load data");
//                 console.error(error);
//             }
//         };

//         fetchData();
//     }, [user, navigate]);

//     const handleEdit = (car: Car) => {
//         console.log("Editing car:", car);
//         const isLeasingAvailable = car.isLeasingAvailable ?? false;
//         console.log("Setting isLeasingAvailable to:", isLeasingAvailable);
//         setEditingId(car.id);
//         setForm({
//             ...form,
//             brandId: car.brandId,
//             model: car.model,
//             year: car.year,
//             mileage: car.mileage,
//             color: car.color,
//             seats: car.seats,
//             pricePerDay: car.pricePerDay,
//             latitude: car.latitude,
//             longitude: car.longitude,
//             bodyTypeId: car.bodyTypeId,
//             categoryId: car.categoryId,
//             driveTypeId: car.driveTypeId,
//             fuelTypeId: car.fuelTypeId,
//             featureIds: car.featureIds || [],
//             image: null,
//             isLeasingAvailable: car.isLeasingAvailable ?? false,
//         });
//     };

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         console.log("handleSubmit called with form:", form);
//         setError(null);
//         setSuccess(null);
//         setIsLoading(true);
        

//         // Отладка значений полей
//         console.log("Validation check:", {
//             brandId: form.brandId,
//             model: form.model,
//             year: form.year,
//             bodyTypeId: form.bodyTypeId,
//             categoryId: form.categoryId,
//             driveTypeId: form.driveTypeId,
//             fuelTypeId: form.fuelTypeId,
//             isLeasingDisabled: form.isLeasingAvailable,
//         });

//         // Валидация
//         if (!form.brandId || form.brandId === 0) {
//             setError("Please select a valid brand");
//             console.log("Validation failed: Invalid brandId");
//             return;
//         }
//         if (!form.model) {
//             setError("Model is required");
//             console.log("Validation failed: Model is empty");
//             return;
//         }
//         if (!form.year || form.year < 1900) {
//             setError("Valid year is required");
//             console.log("Validation failed: Invalid year");
//             return;
//         }
//         if (!form.bodyTypeId || form.bodyTypeId === 0) {
//             setError("Please select a valid body type");
//             console.log("Validation failed: Invalid bodyTypeId");
//             return;
//         }
//         if (!form.categoryId || form.categoryId === 0) {
//             setError("Please select a valid category");
//             console.log("Validation failed: Invalid categoryId");
//             return;
//         }
//         if (!form.driveTypeId || form.driveTypeId === 0) {
//             setError("Please select a valid drive type");
//             console.log("Validation failed: Invalid driveTypeId");
//             return;
//         }
//         if (!form.fuelTypeId || form.fuelTypeId === 0) {
//             setError("Please select a valid fuel type");
//             console.log("Validation failed: Invalid fuelTypeId");
//             return;
//         }
//         if (form.isLeasingAvailable === undefined || form.isLeasingAvailable === null) {
//             setError("Leasing status is required");
//             console.log("Validation failed: isLeasingAvailable is undefined or null");
//             return;
//         }

//         try {
//             const formData = new FormData();
        
//             // Добавляем все поля в FormData
//             formData.append("brandId", form.brandId.toString());
//             formData.append("model", form.model);
//             formData.append("year", form.year.toString());
//             formData.append("mileage", form.mileage.toString());
//             formData.append("color", form.color);
//             formData.append("seats", form.seats.toString());
//             formData.append("pricePerDay", form.pricePerDay.toString());
//             formData.append("latitude", form.latitude.toString());
//             formData.append("longitude", form.longitude.toString());
//             formData.append("bodyTypeId", form.bodyTypeId.toString());
//             formData.append("categoryId", form.categoryId.toString());
//             formData.append("driveTypeId", form.driveTypeId.toString());
//             formData.append("fuelTypeId", form.fuelTypeId.toString());
//             formData.append("isLeasingAvailable", form.isLeasingAvailable.toString());
            
//             // Добавляем featureIds
//             form.featureIds.forEach((id, index) => {
//                 formData.append(`featureIds[${index}]`, id.toString());
//             });

//             // Добавляем изображение, если есть
//             if (form.image) {
//                 formData.append("image", form.image);
//             }

//             try {
//                 const carData: CarCreateDto = {
//                   brandId: form.brandId,
//                   model: form.model,
//                   year: form.year,
//                   mileage: form.mileage,
//                   color: form.color,
//                   seats: form.seats,
//                   pricePerDay: form.pricePerDay,
//                   latitude: form.latitude,
//                   longitude: form.longitude,
//                   bodyTypeId: form.bodyTypeId,
//                   categoryId: form.categoryId,
//                   driveTypeId: form.driveTypeId,
//                   fuelTypeId: form.fuelTypeId,
//                   featureIds: form.featureIds,
//                   image: form.image, // или null если нет изображения
//                   isLeasingAvailable: form.isLeasingAvailable
//                 };

//                 if (editingId) {
//                     // Обновляем существующий автомобиль
//                     await carService.update(editingId, carData);
//                     setSuccess("Car updated successfully!");
//                 } else {
//                     // Создаем новый автомобиль
//                     await carService.create(carData);
//                     setSuccess("Car created successfully!");
//                 }
//             } catch (error: any) 
//             {
//                 setError(error.message || "Failed to save car");
//                 console.error("Error in handleSubmit:", error);
//             }
            
//             setForm({
//                 brandId: 0,
//                 model: "",
//                 year: 0,
//                 mileage: 0,
//                 color: "",
//                 seats: 0,
//                 pricePerDay: 0,
//                 latitude: 0,
//                 longitude: 0,
//                 bodyTypeId: 0,
//                 categoryId: 0,
//                 driveTypeId: 0,
//                 fuelTypeId: 0,
//                 featureIds: [],
//                 image: null,
//                 isLeasingAvailable: false,
//             });
//             setEditingId(null);
//             const carsData = await carService.getCars();
//             setCars(carsData.cars);
//             // console.log("Cars updated:", carsData.cars);
//             // await carService.update(id, formData);
//         } catch (error: any) {
//             setError(error.message || "Failed to save car");
//             console.error("Error in handleSubmit:", error);
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     const handleDelete = async (id: number) => {
//         try {
//             await carService.delete(id);
//             setSuccess("Car deleted successfully!");
//             const carsData = await carService.getCars();
//             setCars(carsData.cars);
//         } catch (error: any) {
//             setError(error.message || "Failed to delete car");
//             console.error(error);
//         }
//     };

//     return (
//         <Container sx={{ p: 4 }}>
//             <Typography variant="h4" mb={4}>
//                 Manage Cars
//             </Typography>
//             <form onSubmit={handleSubmit}>
//                 <Grid container spacing={2}>
                    
//                     <Grid component="div" xs={12} sm={6}>
//                         <FormControl fullWidth>
//                             <InputLabel>Brand</InputLabel>
//                             <Select
//                                 value={form.brandId || ""}
//                                 onChange={(e) => setForm({ ...form, brandId: Number(e.target.value) })}
//                             >
//                                 <MenuItem value={0}>Select Brand</MenuItem>
//                                 {brands.map((brand) => (
//                                     <MenuItem key={brand.id} value={brand.id}>
//                                         {brand.name}
//                                     </MenuItem>
//                                 ))}
//                             </Select>
//                         </FormControl>
//                     </Grid>
                    
//                     <Grid component="div" xs={12} sm={6}>
//                         <TextField
//                             fullWidth
//                             label="Model"
//                             value={form.model}
//                             onChange={(e) => setForm({ ...form, model: e.target.value })}
//                         />
//                     </Grid>
                    
//                     <Grid component="div" xs={12} sm={3}>
//                         <TextField
//                             fullWidth
//                             label="Year"
//                             type="number"
//                             value={form.year || ""}
//                             onChange={(e) => setForm({ ...form, year: Number(e.target.value) })}
//                         />
//                     </Grid>
                    
//                     <Grid component="div" xs={12} sm={3}>
//                         <TextField
//                             fullWidth
//                             label="Mileage"
//                             type="number"
//                             value={form.mileage || ""}
//                             onChange={(e) => setForm({ ...form, mileage: Number(e.target.value) })}
//                         />
//                     </Grid>
                    
//                     <Grid component="div" xs={12} sm={3}>
//                         <TextField
//                             fullWidth
//                             label="Color"
//                             value={form.color}
//                             onChange={(e) => setForm({ ...form, color: e.target.value })}
//                         />
//                     </Grid>
                    
//                     <Grid component="div" xs={12} sm={3}>
//                         <TextField
//                             fullWidth
//                             label="Seats"
//                             type="number"
//                             value={form.seats || ""}
//                             onChange={(e) => setForm({ ...form, seats: Number(e.target.value) })}
//                         />
//                     </Grid>
                   
//                     <Grid component="div" xs={12} sm={3}>
//                         <TextField
//                             fullWidth
//                             label="Price per Day"
//                             type="number"
//                             value={form.pricePerDay || ""}
//                             onChange={(e) => setForm({ ...form, pricePerDay: Number(e.target.value) })}
//                         />
//                     </Grid>
                   
//                     <Grid component="div" xs={12} sm={3}>
//                         <TextField
//                             fullWidth
//                             label="Latitude"
//                             type="number"
//                             value={form.latitude || ""}
//                             onChange={(e) => setForm({ ...form, latitude: Number(e.target.value) })}
//                         />
//                     </Grid>
                
//                     <Grid component="div" xs={12} sm={3}>
//                         <TextField
//                             fullWidth
//                             label="Longitude"
//                             type="number"
//                             value={form.longitude || ""}
//                             onChange={(e) => setForm({ ...form, longitude: Number(e.target.value) })}
//                         />
//                     </Grid>
            
//                     <Grid component="div" xs={12} sm={3}>
//                         <FormControl fullWidth>
//                             <InputLabel>Body Type</InputLabel>
//                             <Select
//                                 value={form.bodyTypeId || ""}
//                                 onChange={(e) => setForm({ ...form, bodyTypeId: Number(e.target.value) })}
//                             >
//                                 <MenuItem value={0}>Select Body Type</MenuItem>
//                                 {bodyTypes.map((bodyType) => (
//                                     <MenuItem key={bodyType.id} value={bodyType.id}>
//                                         {bodyType.name}
//                                     </MenuItem>
//                                 ))}
//                             </Select>
//                         </FormControl>
//                     </Grid>
                
//                     <Grid component="div" xs={12} sm={3}>
//                         <FormControl fullWidth>
//                             <InputLabel>Category</InputLabel>
//                             <Select
//                                 value={form.categoryId || ""}
//                                 onChange={(e) => setForm({ ...form, categoryId: Number(e.target.value) })}
//                             >
//                                 <MenuItem value={0}>Select Category</MenuItem>
//                                 {categories.map((category) => (
//                                     <MenuItem key={category.id} value={category.id}>
//                                         {category.name}
//                                     </MenuItem>
//                                 ))}
//                             </Select>
//                         </FormControl>
//                     </Grid>
                 
//                     <Grid component="div" xs={12} sm={3}>
//                         <FormControl fullWidth>
//                             <InputLabel>Drive Type</InputLabel>
//                             <Select
//                                 value={form.driveTypeId || ""}
//                                 onChange={(e) => setForm({ ...form, driveTypeId: Number(e.target.value) })}
//                             >
//                                 <MenuItem value={0}>Select Drive Type</MenuItem>
//                                 {driveTypes.map((driveType) => (
//                                     <MenuItem key={driveType.id} value={driveType.id}>
//                                         {driveType.name}
//                                     </MenuItem>
//                                 ))}
//                             </Select>
//                         </FormControl>
//                     </Grid>
         
//                     <Grid component="div" xs={12} sm={3}>
//                         <FormControl fullWidth>
//                             <InputLabel>Fuel Type</InputLabel>
//                             <Select
//                                 value={form.fuelTypeId || ""}
//                                 onChange={(e) => setForm({ ...form, fuelTypeId: Number(e.target.value) })}
//                             >
//                                 <MenuItem value={0}>Select Fuel Type</MenuItem>
//                                 {fuelTypes.map((fuelType) => (
//                                     <MenuItem key={fuelType.id} value={fuelType.id}>
//                                         {fuelType.name}
//                                     </MenuItem>
//                                 ))}
//                             </Select>
//                         </FormControl>
//                     </Grid>
               
//                     <Grid xs={12} sm={3}>
//                         <FormControl fullWidth required>
//                             <InputLabel>Leasing Status</InputLabel>
//                             <Select
//                                 value={form.isLeasingAvailable ? "true" : "false"}
//                                 onChange={(e) => {
//                                     const value = e.target.value === "true";
//                                     console.log("Leasing status changed to:", value);
//                                     setForm((prevForm) => ({
//                                         ...prevForm,
//                                         isLeasingDisabled: value,
//                                     }));
//                                 }}
//                             >
//                                 <MenuItem value="false">Enable Leasing</MenuItem>
//                                 <MenuItem value="true">Disable Leasing</MenuItem>
//                             </Select>
//                         </FormControl>
//                     </Grid>

//                     <Grid component="div" xs={12}>
//                         <FormControl fullWidth>
//                             <InputLabel>Features</InputLabel>
//                             <Select
//                                 multiple
//                                 value={form.featureIds}
//                                 onChange={(e) => setForm({ ...form, featureIds: e.target.value as number[] })}
//                             >
//                                 {features.map((feature) => (
//                                     <MenuItem key={feature.id} value={feature.id}>
//                                         {feature.name}
//                                     </MenuItem>
//                                 ))}
//                             </Select>
//                         </FormControl>
//                     </Grid>
              
//                     <Grid component="div" xs={12}>
//                         <input
//                             type="file"
//                             accept="image/jpeg,image/png"
//                             onChange={(e) => setForm({ ...form, image: e.target.files ? e.target.files[0] : null })}
//                         />
//                     </Grid>
                
//                     <Grid component="div" xs={12}>
//                         <Button type="submit" variant="contained" disabled={isLoading}>
//                             {isLoading ? <CircularProgress size={24} /> : editingId ? "Update Car" : "Add Car"}
//                         </Button>
//                     </Grid>
//                 </Grid>
//             </form>
//             <Box sx={{ mt: 4 }}>
//                 <Typography variant="h5">Existing Cars</Typography>
//                 {cars.map((car) => (
//                     <Box key={car.id} sx={{ border: "1px solid #ccc", p: 2, mt: 2, borderRadius: 2 }}>
//                         <Typography>
//                             {brands.find((b) => b.id === car.brandId)?.name || "Unknown"} {car.model}
//                         </Typography>
//                         <Button onClick={() => handleEdit(car)}>Edit</Button>
//                         <Button onClick={() => handleDelete(car.id)} color="error">
//                             Delete
//                         </Button>
//                     </Box>
//                 ))}
//             </Box>
//         </Container>
//     );
// };

// export default AdminCarManagement;

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Car, CarCreateDto, BodyType, Brand, CarCategory, CarDriveType, FuelType, CarFeature } from "../models/car.models";
import { referenceService } from "../services/ReferenceService";
import { carService } from "../services/CarService";
import { useAuth } from "../context/AuthContext";
import {
    Box,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextField,
    Typography,
    Grid,
    Container,
    Alert,
    CircularProgress,
    Card,
    CardContent,
    Chip,
    Divider,
    IconButton,
    InputAdornment,
    Paper,
    Pagination,
    styled
} from "@mui/material";
import {
    Edit,
    Delete,
    AddPhotoAlternate,
    CheckCircle,
    Cancel,
    DirectionsCar,
    MonetizationOn,
    Palette,
    EventSeat,
    MyLocation
} from "@mui/icons-material";

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

const StyledCard = styled(Card)({
    borderRadius: 16,
    boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
    transition: 'transform 0.2s, box-shadow 0.2s',
    '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: '0 12px 24px rgba(0,0,0,0.2)'
    }
});

const SectionHeader = styled(Typography)({
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    marginBottom: 24,
    '& svg': {
        fontSize: 32
    }
});

const AdminCarManagement: React.FC = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [cars, setCars] = useState<Car[]>([]);
    const [brands, setBrands] = useState<Brand[]>([]);
    const [bodyTypes, setBodyTypes] = useState<BodyType[]>([]);
    const [categories, setCategories] = useState<CarCategory[]>([]);
    const [driveTypes, setDriveTypes] = useState<CarDriveType[]>([]);
    const [fuelTypes, setFuelTypes] = useState<FuelType[]>([]);
    const [features, setFeatures] = useState<CarFeature[]>([]);
    const [pagination, setPagination] = useState({
        totalCount: 0,
        pageNumber: 1,
        pageSize: 9
    });
    const [form, setForm] = useState<CarCreateDto>({
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
    const [editingId, setEditingId] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (user?.userRole !== "admin") {
            navigate("/");
            return;
        }

        const fetchData = async () => {
            try {
                const [
                    result,
                    brandsData,
                    bodyTypesData,
                    categoriesData,
                    driveTypesData,
                    fuelTypesData,
                    featuresData,
                ] = await Promise.all([
                    carService.getCars({
                        pageNumber: pagination.pageNumber,
                        pageSize: pagination.pageSize
                    }),
                    referenceService.getBrands(),
                    referenceService.getBodyTypes(),
                    referenceService.getCategories(),
                    referenceService.getDriveTypes(),
                    referenceService.getFuelTypes(),
                    referenceService.getFeatures(),
                ]);
                console.log("Fetched cars:", result.cars);
                setCars(result.cars);
                setBrands(brandsData);
                setBodyTypes(bodyTypesData);
                setCategories(categoriesData);
                setDriveTypes(driveTypesData);
                setFuelTypes(fuelTypesData);
                setFeatures(featuresData);
                setPagination(prev => ({
                    ...prev,
                    totalCount: result.totalCount
                }));
            } catch (error) {
                setError("Failed to load data");
                console.error(error);
            }
        };

        fetchData();
    }, [user, navigate, pagination.pageNumber, pagination.pageSize]);

    const handleEdit = (car: Car) => {
        console.log("Editing car:", car);
        console.log("Setting isLeasingAvailable to:", car.isLeasingAvailable);
        setEditingId(car.id);
        setForm({
            brandId: car.brandId,
            model: car.model,
            year: car.year,
            mileage: car.mileage,
            color: car.color,
            seats: car.seats,
            pricePerDay: car.pricePerDay,
            latitude: car.latitude,
            longitude: car.longitude,
            bodyTypeId: car.bodyTypeId,
            categoryId: car.categoryId,
            driveTypeId: car.driveTypeId,
            fuelTypeId: car.fuelTypeId,
            featureIds: car.featureIds || [],
            image: null,
            isLeasingAvailable: car.isLeasingAvailable,
        });
    };

    const handleLeasingToggle = async (id: number, isLeasingAvailable: boolean) => {
        try {
            const newLeasingStatus = !isLeasingAvailable;
            console.log(`Toggling leasing status for car ID ${id} to: ${newLeasingStatus}`);
            const carsData = await carService.getCars({
                pageNumber: pagination.pageNumber,
                pageSize: pagination.pageSize
            });
            console.log("Updated cars after toggle:", carsData.cars);
            setCars(carsData.cars);
            setPagination({
                pageNumber: pagination.pageNumber, // Preserve current page number
                pageSize: pagination.pageSize,
                totalCount: carsData.totalCount
            });
            setSuccess(`Leasing status ${newLeasingStatus ? "enabled" : "disabled"} successfully!`);
        } catch (error: any) {
            setError(error.message || "Failed to toggle leasing status");
            console.error("Error in handleLeasingToggle:", error);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("handleSubmit called with form:", form);
        setError(null);
        setSuccess(null);
        setIsLoading(true);

        if (!form.brandId || form.brandId === 0) {
            setError("Please select a valid brand");
            setIsLoading(false);
            return;
        }
        if (!form.model) {
            setError("Model is required");
            setIsLoading(false);
            return;
        }
        if (!form.year || form.year < 1900) {
            setError("Valid year is required");
            setIsLoading(false);
            return;
        }
        if (!form.bodyTypeId || form.bodyTypeId === 0) {
            setError("Please select a valid body type");
            setIsLoading(false);
            return;
        }
        if (!form.categoryId || form.categoryId === 0) {
            setError("Please select a valid category");
            setIsLoading(false);
            return;
        }
        if (!form.driveTypeId || form.driveTypeId === 0) {
            setError("Please select a valid drive type");
            setIsLoading(false);
            return;
        }
        if (!form.fuelTypeId || form.fuelTypeId === 0) {
            setError("Please select a valid fuel type");
            setIsLoading(false);
            return;
        }
        if (form.isLeasingAvailable === undefined || form.isLeasingAvailable === null) {
            setError("Leasing status is required");
            setIsLoading(false);
            return;
        }

        try {
            const carData: CarCreateDto = {
                brandId: form.brandId,
                model: form.model,
                year: form.year,
                mileage: form.mileage,
                color: form.color,
                seats: form.seats,
                pricePerDay: form.pricePerDay,
                latitude: form.latitude,
                longitude: form.longitude,
                bodyTypeId: form.bodyTypeId,
                categoryId: form.categoryId,
                driveTypeId: form.driveTypeId,
                fuelTypeId: form.fuelTypeId,
                featureIds: form.featureIds,
                image: form.image,
                isLeasingAvailable: form.isLeasingAvailable,
            };

            if (editingId) {
                await carService.update(editingId, carData);
                setSuccess("Успех!");
            } else {
                await carService.create(carData);
                setSuccess("Успех");
            }

            setForm({
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
            setEditingId(null);
            const carsData = await carService.getCars({
                pageNumber: pagination.pageNumber,
                pageSize: pagination.pageSize
            });
            console.log("Updated cars:", carsData.cars);
            setCars(carsData.cars);
            setPagination({
                pageNumber: pagination.pageNumber, // Preserve current page number
                pageSize: pagination.pageSize,
                totalCount: carsData.totalCount
            });
        } catch (error: any) {
            setError(error.message || "Failed to save car");
            console.error("Error in handleSubmit:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await carService.delete(id);
            setSuccess("Car deleted successfully!");
            const carsData = await carService.getCars({
                pageNumber: pagination.pageNumber,
                pageSize: pagination.pageSize
            });
            setCars(carsData.cars);
            setPagination({
                pageNumber: pagination.pageNumber, // Preserve current page number
                pageSize: pagination.pageSize,
                totalCount: carsData.totalCount
            });
        } catch (error: any) {
            setError(error.message || "Failed to delete car");
            console.error(error);
        }
    };

    const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
        setPagination(prev => ({ ...prev, pageNumber: value }));
    };

    return (
        <Container maxWidth="xl" sx={{ p: 4, bgcolor: '#f8f9fa' }}>
            <SectionHeader variant="h4">
                <DirectionsCar /> Управление Автомобилями
            </SectionHeader>

            {error && <Alert severity="error" sx={{ mb: 3, borderRadius: 3 }}>{error}</Alert>}
            {success && <Alert severity="success" sx={{ mb: 3, borderRadius: 3 }}>{success}</Alert>}

            <Paper elevation={0} sx={{ p: 4, mb: 4, borderRadius: 4, bgcolor: 'white' }}>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {editingId ? <Edit /> : <AddPhotoAlternate />}
                    {editingId ? 'Редактирование' : 'Добавить новый автомобиль'}
                </Typography>
                <Divider sx={{ mb: 4 }} />

                <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        {/* Марка и модель */}
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth size="small">
                                <InputLabel>Марка</InputLabel>
                                <Select
                                    value={form.brandId}
                                    onChange={(e) => setForm({ ...form, brandId: Number(e.target.value) })}
                                    sx={{ borderRadius: 2 }}
                                >
                                    {brands.map((brand) => (
                                        <MenuItem key={brand.id} value={brand.id}>
                                            <img 
                                                
                                                alt={brand.name} 
                                                style={{ width: 24, height: 24, marginRight: 8 }}
                                            />
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
                                variant="outlined"
                                size="small"
                                value={form.model}
                                onChange={(e) => setForm({ ...form, model: e.target.value })}
                                InputProps={{
                                    endAdornment: <Edit color="action" />,
                                }}
                            />
                        </Grid>

                        {/* Характеристики */}
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
                                        size="small"
                                        value={form.year}
                                        onChange={(e) => setForm({ ...form, year: Number(e.target.value) })}
                                    />
                                </Grid>
                                <Grid item xs={6} sm={3}>
                                    <TextField
                                        fullWidth
                                        label="Пробег"
                                        type="number"
                                        size="small"
                                        value={form.mileage}
                                        InputProps={{
                                            endAdornment: <InputAdornment position="end">км</InputAdornment>,
                                        }}
                                        onChange={(e) => setForm({ ...form, mileage: Number(e.target.value) })}
                                    />
                                </Grid>
                                <Grid item xs={6} sm={3}>
                                    <TextField
                                        fullWidth
                                        label="Места"
                                        type="number"
                                        size="small"
                                        value={form.seats}
                                        InputProps={{
                                            endAdornment: <EventSeat fontSize="small" color="action" />,
                                        }}
                                        onChange={(e) => setForm({ ...form, seats: Number(e.target.value) })}
                                    />
                                </Grid>
                                <Grid item xs={6} sm={3}>
                                    <TextField
                                        fullWidth
                                        label="Цвет"
                                        size="small"
                                        value={form.color}
                                        InputProps={{
                                            endAdornment: <Palette fontSize="small" color="action" />,
                                        }}
                                        onChange={(e) => setForm({ ...form, color: e.target.value })}
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
                                size="small"
                                value={form.pricePerDay}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">₽</InputAdornment>,
                                    endAdornment: <MonetizationOn color="action" />,
                                }}
                                onChange={(e) => setForm({ ...form, pricePerDay: Number(e.target.value) })}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth
                                        label="Широта"
                                        type="number"
                                        size="small"
                                        value={form.latitude}
                                        InputProps={{
                                            endAdornment: <MyLocation fontSize="small" color="action" />,
                                        }}
                                        onChange={(e) => setForm({ ...form, latitude: Number(e.target.value) })}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth
                                        label="Долгота"
                                        type="number"
                                        size="small"
                                        value={form.longitude}
                                        InputProps={{
                                            endAdornment: <MyLocation fontSize="small" color="action" />,
                                        }}
                                        onChange={(e) => setForm({ ...form, longitude: Number(e.target.value) })}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>

                        {/* Дополнительные опции */}
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth size="small">
                                <InputLabel>Тип кузова</InputLabel>
                                <Select
                                    value={form.bodyTypeId}
                                    onChange={(e) => setForm({ ...form, bodyTypeId: Number(e.target.value) })}
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
                                    value={form.categoryId}
                                    onChange={(e) => setForm({ ...form, categoryId: Number(e.target.value) })}
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
                                    value={form.driveTypeId}
                                    onChange={(e) => setForm({ ...form, driveTypeId: Number(e.target.value) })}
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
                                    value={form.fuelTypeId}
                                    onChange={(e) => setForm({ ...form, fuelTypeId: Number(e.target.value) })}
                                >
                                    {fuelTypes.map((fuelType) => (
                                        <MenuItem key={fuelType.id} value={fuelType.id}>
                                            {fuelType.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        {/* Особенности и фото */}
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth size="small">
                                <InputLabel>Особенности</InputLabel>
                                <Select
                                    multiple
                                    value={form.featureIds}
                                    onChange={(e) => setForm({ ...form, featureIds: e.target.value as number[] })}
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

                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth>
                                <Box sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 2,
                                p: 1.5,
                                borderRadius: 3,
                                bgcolor: form.isLeasingAvailable ? 'success.light' : 'error.light',
                                transition: 'all 0.3s ease'
                                }}>
                                <Typography variant="body1" sx={{ flexGrow: 1 }}>
                                    Статус аренды:
                                    <Box component="span" sx={{ ml: 1, fontWeight: 600 }}>
                                    {form.isLeasingAvailable ? 'Доступен' : 'Недоступен'}
                                    </Box>
                                </Typography>
                                <Button
                                    variant="contained"
                                    disableElevation
                                    sx={{
                                    borderRadius: 2,
                                    minWidth: 120,
                                    bgcolor: form.isLeasingAvailable ? 'success.main' : 'error.main',
                                    '&:hover': {
                                        bgcolor: form.isLeasingAvailable ? 'success.dark' : 'error.dark'
                                    }
                                    }}
                                    onClick={() => setForm({...form, isLeasingAvailable: !form.isLeasingAvailable})}
                                >
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    {form.isLeasingAvailable ? (
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

                        <Grid item xs={12} md={6}>
                            <Button
                                component="label"
                                variant="outlined"
                                fullWidth
                                startIcon={<AddPhotoAlternate />}
                                sx={{ py: 1.5, borderRadius: 2 }}
                            >
                                Загрузить фото
                                <input
                                    type="file"
                                    hidden
                                    accept="image/*"
                                    onChange={(e) => setForm({ ...form, image: e.target.files ? e.target.files[0] : null })}
                                />
                            </Button>
                        </Grid>

                        {/* Кнопки управления */}
                        <Grid item xs={12}>
                            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                                {editingId && (
                                    <Button
                                        variant="text"
                                        color="inherit"
                                        onClick={() => setEditingId(null)}
                                        startIcon={<Cancel />}
                                    >
                                        Отмена
                                    </Button>
                                )}
                                <GradientButton
                                    type="submit"
                                    disabled={isLoading}
                                    startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : null}
                                >
                                    {editingId ? 'Сохранить изменения' : 'Добавить автомобиль'}
                                </GradientButton>
                            </Box>
                        </Grid>
                    </Grid>
                </form>
            </Paper>

            {/* Список автомобилей */}
            <SectionHeader variant="h5">
                <DirectionsCar /> Текущие Автомобили
            </SectionHeader>

            <Grid container spacing={3}>
                {cars.map((car) => (
                    <Grid item xs={12} sm={6} md={4} key={car.id}>
                        <StyledCard>
                            <CardContent>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                    <Chip 
                                        label={car.isLeasingAvailable ? 'Доступен лизинг' : 'Лизинг закрыт'}
                                        color={car.isLeasingAvailable ? 'success' : 'error'}
                                        size="small"
                                        icon={car.isLeasingAvailable ? <CheckCircle /> : <Cancel />}
                                    />
                                    <Box>
                                        <IconButton onClick={() => handleEdit(car)} color="primary">
                                            <Edit />
                                        </IconButton>
                                        <IconButton onClick={() => handleDelete(car.id)} color="error">
                                            <Delete />
                                        </IconButton>
                                    </Box>
                                </Box>

                                <Typography variant="h6" gutterBottom>
                                    {brands.find((b) => b.id === car.brandId)?.name} {car.model}
                                </Typography>

                                <Grid container spacing={1} sx={{ mb: 2 }}>
                                    <Grid item xs={6}>
                                        <Typography variant="body2" color="textSecondary">
                                            <EventSeat fontSize="small" /> Места: {car.seats}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="body2" color="textSecondary">
                                            <Palette fontSize="small" /> {car.color}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="body2" color="textSecondary">
                                            Год: {car.year}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="body2" color="textSecondary">
                                            {car.mileage.toLocaleString()} км
                                        </Typography>
                                    </Grid>
                                </Grid>

                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Typography variant="h6" color="primary">
                                        {car.pricePerDay.toLocaleString()} ₽/день
                                    </Typography>
                                </Box>
                            </CardContent>
                        </StyledCard>
                    </Grid>
                ))}
            </Grid>

            {/* Pagination */}
            {cars.length > 0 && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, mb: 4 }}>
                    <Pagination
                        count={Math.ceil(pagination.totalCount / pagination.pageSize)}
                        page={pagination.pageNumber}
                        onChange={handlePageChange}
                        color="primary"
                        shape="rounded"
                        size="large"
                    />
                </Box>
            )}
        </Container>
    );
};

export default AdminCarManagement;