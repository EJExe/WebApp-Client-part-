import { useState, useEffect } from "react";
import { Box, Button, Grid, TextField, Typography, Select, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Car, CarFilterDto, Brand } from "../models/car.models";
import { referenceService } from "../services/ReferenceService";
import { carService } from "../services/CarService";

const CarCatalog: React.FC = () => {
    const [cars, setCars] = useState<Car[]>([]);
    const navigate = useNavigate();
    const [brands, setBrands] = useState<Brand[]>([]);
    const [filters, setFilters] = useState<CarFilterDto>({
        pageNumber: 1,
        pageSize: 10
    });
    const [pagination, setPagination] = useState({
        totalCount: 0,
        pageNumber: 1,
        pageSize: 10
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [result, brandsData] = await Promise.all([
                    carService.getCars({
                        ...filters,
                        pageNumber: pagination.pageNumber,
                        pageSize: pagination.pageSize
                    }),
                    referenceService.getBrands(),
                ]);
                
                setCars(result.cars);
                setBrands(brandsData);
                setPagination(prev => ({
                    ...prev,
                    totalCount: result.totalCount
                }));
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [filters, pagination.pageNumber, pagination.pageSize]);

    const handleFilterChange = (key: keyof CarFilterDto, value: number | string) => {
        setFilters((prev) => ({
            ...prev,
            [key]: value === "" ? undefined : value,
        }));
    };

    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h4" mb={4}>
                Car Catalog
            </Typography>
            <Grid container spacing={2} mb={4}>
                <Grid xs={12} sm={3}>
                    <Select
                        fullWidth
                        value={filters.brandId || ""}
                        onChange={(e) => handleFilterChange("brandId", Number(e.target.value))}
                    >
                        <MenuItem value="">All Brands</MenuItem>
                        {brands.map((brand) => (
                            <MenuItem key={brand.id} value={brand.id}>
                                {brand.name}
                            </MenuItem>
                        ))}
                    </Select>
                </Grid>
                <Grid xs={12} sm={3}>
                    <TextField
                        fullWidth
                        label="Min Price"
                        type="number"
                        value={filters.minPrice || ""}
                        onChange={(e) => handleFilterChange("minPrice", Number(e.target.value))}
                    />
                </Grid>
                <Grid xs={12} sm={3}>
                    <TextField
                        fullWidth
                        label="Max Price"
                        type="number"
                        value={filters.maxPrice || ""}
                        onChange={(e) => handleFilterChange("maxPrice", Number(e.target.value))}
                    />
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                {Array.isArray(cars) && cars.map(car => (
                    <Grid xs={12} sm={6} md={4} key={car.id}>
                        <Box sx={{ border: "1px solid #ccc", p: 2, borderRadius: 2 }}>
                            <img
                                src={car.imagePath 
                                    ? `https://localhost:7154${car.imagePath}` 
                                    : "/placeholder.jpg"}
                                alt={car.model}
                                style={{ width: "100%", height: 200, objectFit: "cover" }}
                            />
                            <Typography variant="h6">
                                {brands.find((b) => b.id === car.brandId)?.name || "Unknown"} {car.model}
                            </Typography>
                            <Typography>Year: {car.year}</Typography>
                            <Typography>Price: ${car.pricePerDay}/day</Typography>
                            <Button onClick={() => navigate(`/cars/${car.id}`)}>View Details</Button>
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default CarCatalog;