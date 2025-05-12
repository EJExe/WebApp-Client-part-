import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  Box, 
  Typography, 
  Button, 
  CircularProgress,
  Dialog,
  DialogContent,
  IconButton,
  CardMedia,
  Grid,
  Chip,
  Snackbar,
  Alert
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { Car, BodyType, CarCategory, CarDriveType, FuelType, CarFeature, Brand } from "../models/car.models";
import { referenceService } from "../services/ReferenceService";
import { carService } from "../services/CarService";
import { useOrderContext } from "../context/OrderContext";
import { authService } from "../services/AuthService";

const CarDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { createOrder } = useOrderContext();
    const [car, setCar] = useState<Car | null>(null);
    const [brands, setBrands] = useState<Brand[]>([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [bodyTypes, setBodyTypes] = useState<BodyType[]>([]);
    const [categories, setCategories] = useState<CarCategory[]>([]);
    const [driveTypes, setDriveTypes] = useState<CarDriveType[]>([]);
    const [fuelTypes, setFuelTypes] = useState<FuelType[]>([]);
    const [features, setFeatures] = useState<CarFeature[]>([]);
    const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);
    const [bookingStatus, setBookingStatus] = useState<{
      loading: boolean;
      error: string | null;
      success: boolean;
    }>({ loading: false, error: null, success: false });

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
                setError("Ошибка загрузки данных");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    const handleImageClick = () => {
        setIsImageDialogOpen(true);
    };

    const handleBookNow = async () => {
        if (!car) return;
        // Check if user is authenticated
        if (!authService.isAuthenticated()) {
            alert('Пользователь не авторизован');
            return;
        }
        setBookingStatus({ loading: true, error: null, success: false });
        try {
            await createOrder(car.id);
            setBookingStatus({ loading: false, error: null, success: true });
            setTimeout(() => navigate("/profile"), 2000); // Перенаправление на страницу профиля через 2 секунды
        } catch (error) {
            setBookingStatus({ 
            loading: false, 
            error: "Ошибка при создании бронирования", 
            success: false 
            });
        }
    };


    const handleCloseImageDialog = () => {
        setIsImageDialogOpen(false);
    };

    if (loading) {
        return <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 4 }} />;
    }

    if (error || !car) {
        return <Typography color="error" sx={{ mt: 4, textAlign: 'center' }}>{error || 'Автомобиль не найден'}</Typography>;
    }

    return (
        <Box sx={{ p: 4, maxWidth: 1200, mx: 'auto' }}>
            <Button
                variant="outlined"
                onClick={() => navigate('/cars')}
                sx={{ mb: 4 }}
            >
                Вернуться в каталог
            </Button>
            
            <Typography variant="h3" mb={4} fontWeight={700}>
                {brands.find((b: Brand) => b.id === car.brandId)?.name || "Unknown"} {car.model}
            </Typography>

            <CardMedia
                component="img"
                image={car.imagePath 
                    ? `https://localhost:7154${car.imagePath}` 
                    : "/placeholder.jpg"}
                alt={car.model}
                sx={{
                    width: '100%',
                    maxHeight: 500,
                    objectFit: 'cover',
                    borderRadius: 3,
                    cursor: 'pointer',
                    boxShadow: 3,
                    transition: 'transform 0.3s',
                    '&:hover': {
                        transform: 'scale(1.02)'
                    }
                }}
                onClick={handleImageClick}
                onError={(e: any) => e.target.src = "/placeholder.jpg"}
            />

            <Dialog
                open={isImageDialogOpen}
                onClose={handleCloseImageDialog}
                maxWidth="md"
                fullWidth
                PaperProps={{
                    sx: {
                        bgcolor: 'transparent',
                        boxShadow: 'none',
                        position: 'relative'
                    }
                }}
            >
                <IconButton
                    onClick={handleCloseImageDialog}
                    sx={{
                        position: 'absolute',
                        top: 16,
                        right: 16,
                        color: 'white',
                        bgcolor: 'rgba(0,0,0,0.5)',
                        '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' }
                    }}
                >
                    <CloseIcon fontSize="large" />
                </IconButton>
                
                <DialogContent sx={{ p: 0 }}>
                    <img
                        src={car.imagePath 
                            ? `https://localhost:7154${car.imagePath}` 
                            : "/placeholder.jpg"}
                        alt={car.model}
                        style={{
                            width: '100%',
                            height: '90vh',
                            objectFit: 'contain',
                            borderRadius: 8
                        }}
                    />
                </DialogContent>
            </Dialog>

            <Grid container spacing={3} sx={{ mt: 4 }}>
                <Grid item xs={12} md={6}>
                    <DetailItem 
                        label="Год выпуска" 
                        value={car.year}
                    />
                    <DetailItem 
                        label="Пробег" 
                        value={`${car.mileage.toLocaleString()} км`}
                    />
                    <DetailItem 
                        label="Цвет" 
                        value={car.color}
                    />
                    <DetailItem 
                        label="Количество мест" 
                        value={car.seats}
                    />
                </Grid>
                
                <Grid item xs={12} md={6}>
                    <DetailItem 
                        label="Цена" 
                        value={`${car.pricePerDay.toLocaleString()} ₽/день`}
                    />
                    <DetailItem 
                        label="Тип кузова" 
                        value={bodyTypes.find((bt: BodyType) => bt.id === car.bodyTypeId)?.name || "Неизвестно"}
                    />
                    <DetailItem 
                        label="Категория" 
                        value={categories.find((c: CarCategory) => c.id === car.categoryId)?.name || "Неизвестно"}
                    />
                    <DetailItem 
                        label="Тип привода" 
                        value={driveTypes.find((dt: CarDriveType) => dt.id === car.driveTypeId)?.name || "Неизвестно"}
                    />
                    <DetailItem 
                        label="Тип топлива" 
                        value={fuelTypes.find((ft: FuelType) => ft.id === car.fuelTypeId)?.name || "Неизвестно"}
                    />
                </Grid>
            </Grid>

            {car.featureIds.length > 0 && (
                <Box sx={{ mt: 4 }}>
                    <Typography variant="h5" mb={2}>
                        Особенности:
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {car.featureIds.map((fid: number) => (
                            <Chip
                                key={fid}
                                label={features.find((f: CarFeature) => f.id === fid)?.name || "Unknown"}
                                variant="outlined"
                                sx={{ borderRadius: 1 }}
                            />
                        ))}
                    </Box>
                </Box>
            )}

            <Button
                variant="contained"
                size="large"
                onClick={handleBookNow}
                disabled={bookingStatus.loading}
                sx={{ 
                    mt: 4,
                    px: 6,
                    py: 2,
                    fontSize: '1.1rem',
                    position: 'relative'
                }}
            >
                {bookingStatus.loading ? (
                    <CircularProgress size={24} sx={{ color: 'white' }} />
                ) : (
                    'Забронировать сейчас'
                )}
            </Button>

            <Snackbar
                open={bookingStatus.success}
                autoHideDuration={3000}
                onClose={() => setBookingStatus(prev => ({...prev, success: false}))}
            >
                <Alert severity="success" sx={{ width: '100%' }}>
                    Бронирование успешно создано!
                </Alert>
            </Snackbar>

            <Snackbar
                open={!!bookingStatus.error}
                autoHideDuration={3000}
                onClose={() => setBookingStatus(prev => ({...prev, error: null}))}
            >
                <Alert severity="error" sx={{ width: '100%' }}>
                    {bookingStatus.error}
                </Alert>
            </Snackbar>
        </Box>
    );
};

const DetailItem = ({ label, value }: { label: string; value: string | number }) => (
    <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle1" color="text.secondary">
            {label}:
        </Typography>
        <Typography variant="h6" sx={{ fontWeight: 500 }}>
            {value}
        </Typography>
    </Box>
);

export default CarDetails;