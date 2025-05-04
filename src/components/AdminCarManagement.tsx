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
} from "@mui/material";

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
        isLeasingDisabled: false,
    });
    const [editingId, setEditingId] = useState<number | null>(null);

    useEffect(() => {
        if (user?.userRole !== "admin") {
            navigate("/");
            return;
        }

        const fetchData = async () => {
            try {
                const [result, brandsData, bodyTypesData, categoriesData, driveTypesData, fuelTypesData, featuresData

                ] = await Promise.all([
                    carService.getCars(),
                    referenceService.getBrands(),
                    referenceService.getBodyTypes(),
                    referenceService.getCategories(),
                    referenceService.getDriveTypes(),
                    referenceService.getFuelTypes(),
                    referenceService.getFeatures(),
                ]);
                setCars(result.cars);
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
    }, [user, navigate]);

    const handleEdit = (car: Car) => {
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
            featureIds: car.featureIds,
            image: null,
            isLeasingDisabled: car.isLeasingDisabled,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingId) {
                await carService.update(editingId, form);
            } else {
                await carService.create(form);
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
                isLeasingDisabled: false,
            });
            setEditingId(null);
            const carsData = await carService.getCars();
            setCars(carsData.cars);
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await carService.delete(id);
            const carsData = await carService.getCars();
            setCars(carsData.cars);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Container sx={{ p: 4 }}>
            <Typography variant="h4" mb={4}>
                Manage Cars
            </Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    // @ts-ignore
                    <Grid component="div" xs={12} sm={6}>
                        <FormControl fullWidth>
                            <InputLabel>Brand</InputLabel>
                            <Select
                                value={form.brandId || ""}
                                onChange={(e) => setForm({ ...form, brandId: Number(e.target.value) })}
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
                    // @ts-ignore
                    <Grid component="div" xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Model"
                            value={form.model}
                            onChange={(e) => setForm({ ...form, model: e.target.value })}
                        />
                    </Grid>
                    // @ts-ignore
                    <Grid component="div" xs={12} sm={3}>
                        <TextField
                            fullWidth
                            label="Year"
                            type="number"
                            value={form.year || ""}
                            onChange={(e) => setForm({ ...form, year: Number(e.target.value) })}
                        />
                    </Grid>
                    // @ts-ignore
                    <Grid component="div" xs={12} sm={3}>
                        <TextField
                            fullWidth
                            label="Mileage"
                            type="number"
                            value={form.mileage || ""}
                            onChange={(e) => setForm({ ...form, mileage: Number(e.target.value) })}
                        />
                    </Grid>
                    // @ts-ignore
                    <Grid component="div" xs={12} sm={3}>
                        <TextField
                            fullWidth
                            label="Color"
                            value={form.color}
                            onChange={(e) => setForm({ ...form, color: e.target.value })}
                        />
                    </Grid>
                    // @ts-ignore
                    <Grid component="div" xs={12} sm={3}>
                        <TextField
                            fullWidth
                            label="Seats"
                            type="number"
                            value={form.seats || ""}
                            onChange={(e) => setForm({ ...form, seats: Number(e.target.value) })}
                        />
                    </Grid>
                    // @ts-ignore
                    <Grid component="div" xs={12} sm={3}>
                        <TextField
                            fullWidth
                            label="Price per Day"
                            type="number"
                            value={form.pricePerDay || ""}
                            onChange={(e) => setForm({ ...form, pricePerDay: Number(e.target.value) })}
                        />
                    </Grid>
                    // @ts-ignore
                    <Grid component="div" xs={12} sm={3}>
                        <TextField
                            fullWidth
                            label="Latitude"
                            type="number"
                            value={form.latitude || ""}
                            onChange={(e) => setForm({ ...form, latitude: Number(e.target.value) })}
                        />
                    </Grid>
                    // @ts-ignore
                    <Grid component="div" xs={12} sm={3}>
                        <TextField
                            fullWidth
                            label="Longitude"
                            type="number"
                            value={form.longitude || ""}
                            onChange={(e) => setForm({ ...form, longitude: Number(e.target.value) })}
                        />
                    </Grid>
                    // @ts-ignore
                    <Grid component="div" xs={12} sm={3}>
                        <FormControl fullWidth>
                            <InputLabel>Body Type</InputLabel>
                            <Select
                                value={form.bodyTypeId || ""}
                                onChange={(e) => setForm({ ...form, bodyTypeId: Number(e.target.value) })}
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
                    // @ts-ignore
                    <Grid component="div" xs={12} sm={3}>
                        <FormControl fullWidth>
                            <InputLabel>Category</InputLabel>
                            <Select
                                value={form.categoryId || ""}
                                onChange={(e) => setForm({ ...form, categoryId: Number(e.target.value) })}
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
                    // @ts-ignore
                    <Grid component="div" xs={12} sm={3}>
                        <FormControl fullWidth>
                            <InputLabel>Drive Type</InputLabel>
                            <Select
                                value={form.driveTypeId || ""}
                                onChange={(e) => setForm({ ...form, driveTypeId: Number(e.target.value) })}
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
                    // @ts-ignore
                    <Grid component="div" xs={12} sm={3}>
                        <FormControl fullWidth>
                            <InputLabel>Fuel Type</InputLabel>
                            <Select
                                value={form.fuelTypeId || ""}
                                onChange={(e) => setForm({ ...form, fuelTypeId: Number(e.target.value) })}
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
                    // @ts-ignore
                    <Grid component="div" xs={12}>
                        <FormControl fullWidth>
                            <InputLabel>Features</InputLabel>
                            <Select
                                multiple
                                value={form.featureIds}
                                onChange={(e) => setForm({ ...form, featureIds: e.target.value as number[] })}
                            >
                                {features.map((feature) => (
                                    <MenuItem key={feature.id} value={feature.id}>
                                        {feature.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    // @ts-ignore
                    <Grid component="div" xs={12}>
                        <input
                            type="file"
                            accept="image/jpeg,image/png"
                            onChange={(e) => setForm({ ...form, image: e.target.files ? e.target.files[0] : null })}
                        />
                    </Grid>
                    // @ts-ignore
                    <Grid component="div" xs={12}>
                        <Button type="submit" variant="contained">
                            {editingId ? "Update Car" : "Add Car"}
                        </Button>
                    </Grid>
                </Grid>
            </form>
            <Box sx={{ mt: 4 }}>
                <Typography variant="h5">Existing Cars</Typography>
                {cars.map((car) => (
                    <Box key={car.id} sx={{ border: "1px solid #ccc", p: 2, mt: 2, borderRadius: 2 }}>
                        <Typography>
                            {brands.find((b) => b.id === car.brandId)?.name || "Unknown"} {car.model}
                        </Typography>
                        <Button onClick={() => handleEdit(car)}>Edit</Button>
                        <Button onClick={() => handleDelete(car.id)} color="error">
                            Delete
                        </Button>
                    </Box>
                ))}
            </Box>
        </Container>
    );
};

export default AdminCarManagement;