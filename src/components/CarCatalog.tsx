import { useState, useEffect } from "react";
import { 
  Box, 
  Button, 
  Grid, 
  TextField, 
  Typography, 
  Select, 
  MenuItem, 
  Card, 
  CardContent, 
  CardMedia, 
  Chip, 
  Pagination, 
  CircularProgress,
  Alert,
  styled
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Car, CarFilterDto, Brand } from "../models/car.models";
import { referenceService } from "../services/ReferenceService";
import { carService } from "../services/CarService";
import { DirectionsCar, MonetizationOn, CalendarToday, ZoomIn } from "@mui/icons-material";

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

const CarCatalog: React.FC = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const navigate = useNavigate();
  const [brands, setBrands] = useState<Brand[]>([]);
  const [filters, setFilters] = useState<CarFilterDto>({
    pageNumber: 1,
    pageSize: 9,
    brandId: undefined,
    minPrice: undefined,
    maxPrice: undefined
  });
  const [pagination, setPagination] = useState({
    totalCount: 0,
    pageNumber: 1,
    pageSize: 9
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        console.log("Fetching cars with filters:", JSON.stringify(filters, null, 2));
        const [result, brandsData] = await Promise.all([
          carService.getCars(filters),
          referenceService.getBrands(),
        ]);
        
        console.log("API response:", JSON.stringify(result, null, 2));
        
        setCars(result.cars);
        setBrands(brandsData);
        
        // Ensure we're using the correct page number from the response or from our filters
        const pageNumber = result.pageNumber || filters.pageNumber || 1;
        
        setPagination({
          pageNumber: pageNumber,
          pageSize: result.pageSize || filters.pageSize || 5,
          totalCount: result.totalCount
        });
        
        console.log("Updated pagination state:", {
          pageNumber: pageNumber,
          pageSize: result.pageSize || filters.pageSize || 5,
          totalCount: result.totalCount
        });
      } catch (error) {
        setError("Ошибка загрузки данных");
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchData();
  }, [filters]);

  const handleFilterChange = (key: keyof CarFilterDto, value: number | string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value === "" ? undefined : value,
    }));
    setPagination(prev => ({ ...prev, pageNumber: 1 }));
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    console.log("Changing page to:", value);
    setFilters(prev => ({ ...prev, pageNumber: value }));
  };

  return (
    <Box sx={{ p: 4, maxWidth: 1400, mx: 'auto' }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <DirectionsCar sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
        <Typography variant="h2" fontWeight={700} gutterBottom>
          Каталог автомобилей
        </Typography>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

      {/* Фильтры */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <Select
            fullWidth
            value={filters.brandId || ""}
            onChange={(e) => handleFilterChange("brandId", Number(e.target.value))}
            displayEmpty
            inputProps={{ 'aria-label': 'Выберите марку' }}
          >
            <MenuItem value="">Все марки</MenuItem>
            {brands.map((brand) => (
              <MenuItem key={brand.id} value={brand.id}>
                {brand.name}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            label="Минимальная цена"
            type="number"
            InputProps={{
              startAdornment: <MonetizationOn color="action" sx={{ mr: 1 }} />,
            }}
            value={filters.minPrice || ""}
            onChange={(e) => handleFilterChange("minPrice", Number(e.target.value))}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            label="Максимальная цена"
            type="number"
            InputProps={{
              startAdornment: <MonetizationOn color="action" sx={{ mr: 1 }} />,
            }}
            value={filters.maxPrice || ""}
            onChange={(e) => handleFilterChange("maxPrice", Number(e.target.value))}
          />
        </Grid>
      </Grid>

      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress size={60} thickness={4} />
        </Box>
      ) : (
        <>
          <Grid container spacing={3}>
            {cars.map(car => (
              <Grid item xs={12} sm={6} md={4} key={car.id}>
                <Card sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: 6
                  }
                }}>
                  <CardMedia
                    component="img"
                    height="220"
                    image={car.imagePath 
                      ? `https://localhost:7154${car.imagePath}` 
                      : "/placeholder.jpg"}
                    alt={car.model}
                    sx={{ objectFit: 'cover' }}
                    onError={(e: any) => e.target.src = "/placeholder.jpg"}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h5" gutterBottom>
                      {brands.find(b => b.id === car.brandId)?.name || "Неизвестно"} {car.model}
                    </Typography>
                    
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                      <Chip
                        icon={<MonetizationOn fontSize="small" />}
                        label={`${car.pricePerDay} ₽/день`}
                        color="primary"
                        variant="outlined"
                      />
                      <Chip
                        icon={<CalendarToday fontSize="small" />}
                        label={`Год: ${car.year}`}
                        variant="outlined"
                      />
                    </Box>

                    <GradientButton 
                      fullWidth 
                      onClick={() => navigate(`/cars/${car.id}`)}
                      startIcon={<ZoomIn />}
                    >
                      Подробнее
                    </GradientButton>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mt: 4,
            mb: 4,
            padding: '15px',
            backgroundColor: '#f5f5f5',
            borderRadius: '8px'
          }}>
            <Pagination
              count={Math.ceil(pagination.totalCount / pagination.pageSize)}
              page={pagination.pageNumber}
              onChange={handlePageChange}
              color="primary"
              shape="rounded"
              size="large"
              showFirstButton
              showLastButton
              siblingCount={1}
              boundaryCount={1}
            />
            <Typography sx={{ mt: 2, color: 'text.secondary' }}>
              Страница {pagination.pageNumber} из {Math.ceil(pagination.totalCount / pagination.pageSize)} |
              Показано {cars.length} из {pagination.totalCount} автомобилей
            </Typography>
          </Box>
        </>
      )}
    </Box>
  );
};

export default CarCatalog;