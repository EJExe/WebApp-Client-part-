import { useState, useEffect } from "react";
import { Car } from "../../models/car.models";
import APIService from "../../services/APIService";
import { useNavigate } from "react-router-dom";
import { ZoomIn } from "@mui/icons-material";
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Pagination,
  CircularProgress,
  Chip,
  Alert,
  styled,
  Fade,
  Button
} from "@mui/material";
import {
  DirectionsCar,
  MonetizationOn,
  Construction,
  EventSeat,
  Palette,
  CheckCircle,
  ArrowBack,
  ArrowForward
} from "@mui/icons-material";

const BASE_API_URL = "https://localhost:7154";

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

const CarListPage = () => {
  const navigate = useNavigate();
  const [cars, setCars] = useState<Car[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(8);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadCars = async () => {
      setIsLoading(true);
      try {
        const validPage = Math.max(1, page);
        const result = await APIService.getCarsWithPagination(validPage, pageSize, false);
        setCars(result.cars);
        setTotalCount(result.totalCount);
      } catch (err) {
        console.error("Ошибка загрузки:", err);
        setError("Ошибка загрузки данных");
      } finally {
        setIsLoading(false);
      }
    };
    loadCars();
  }, [page, pageSize]);

  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress size={60} thickness={4} />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ m: 4 }}>
        {error}
      </Alert>
    );
  }

  return (
    <Box sx={{ maxWidth: 1200, margin: "0 auto", p: 3 }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <DirectionsCar sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
        <Typography variant="h2" gutterBottom fontWeight={700}>
          Доступные автомобили
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Найдено автомобилей: {totalCount}
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {cars.map((car) => (
          <Grid item xs={12} sm={6} md={4} key={car.id}>
            <Fade in appear>
              <Card 
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: 3,
                  boxShadow: 3,
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: 6,
                    cursor: 'pointer' // Добавляем курсор-указатель
                  }
                }}
                onClick={() => navigate(`/cars/${car.id}`)} // Клик на всю карточку
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={car.imagePath ? `${BASE_API_URL}${car.imagePath}` : '/images/cars/default.jpg'}
                  alt={`${car.brandName} ${car.model}`}
                  sx={{
                    objectFit: 'cover',
                    borderTopLeftRadius: 12,
                    borderTopRightRadius: 12
                  }}
                  onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                    e.currentTarget.src = '/images/cars/default.jpg';
                  }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h5" gutterBottom>
                    {car.brandName} {car.model}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                    <Chip
                      icon={<MonetizationOn />}
                      label={`${car.pricePerDay} ₽/день`}
                      color="primary"
                      variant="outlined"
                    />
                    <Chip
                      icon={<Construction />}
                      label={car.bodyTypeName}
                      variant="outlined"
                    />
                    <Chip
                      icon={<EventSeat />}
                      label={`Места: ${car.seats}`}
                      variant="outlined"
                    />
                    <Chip
                      icon={<Palette />}
                      label={car.color}
                      variant="outlined"
                    />
                  </Box>

                  {car.featureNames?.length > 0 && (
                    <Box sx={{ mt: 2 }}>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        <CheckCircle sx={{ mr: 1, fontSize: 16, verticalAlign: 'middle' }} />
                        Особенности:
                      </Typography>
                      <Typography variant="body2">
                        {car.featureNames.join(', ')}
                      </Typography>
                    </Box>
                  )}

                  <Box sx={{ mt: 3 }}>
                    <GradientButton
                      fullWidth
                      startIcon={<ZoomIn />}
                      onClick={(e) => {
                        e.stopPropagation(); // Предотвращаем всплытие события
                        navigate(`/cars/${car.id}`);
                      }}
                    >
                      Подробнее
                    </GradientButton>
                  </Box>

                </CardContent>
              </Card>
            </Fade>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Pagination
          count={Math.ceil(totalCount / pageSize)}
          page={page}
          onChange={handlePageChange}
          color="primary"
          shape="rounded"
          size="large"
          sx={{
            '& .MuiPaginationItem-root': {
              fontSize: '1.1rem',
              minWidth: 40,
              height: 40,
            },
            '& .Mui-selected': {
              boxShadow: 2,
            }
          }}
        />
      </Box>
    </Box>
  );
};

export default CarListPage;