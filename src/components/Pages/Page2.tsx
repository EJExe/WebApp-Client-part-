import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  TextField,
  MenuItem,
  Fade,
  Alert,
  CircularProgress,
  Chip,
  styled,
  InputAdornment,
  Grid
} from "@mui/material";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";
import { useAuth } from "../../context/AuthContext";
import APIService from "../../services/APIService";
import { Car, FuelType, BodyType } from "../../models/car.models";
import "leaflet/dist/leaflet.css";
import { referenceService } from "../../services/ReferenceService";
import {
  DirectionsCar,
  LocalGasStation,
  CarRental,
  ArrowBack,
  ArrowForward,
  Close,
  ZoomIn,
  Image,
  FilterAlt,
  CheckCircle,
  MonetizationOn, 
  Palette, 
  EventSeat
} from "@mui/icons-material";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

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

const CarMapPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const mapRef = useRef<any>(null);
  const [cars, setCars] = useState<Car[]>([]);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [filter, setFilter] = useState({ type: "", fuel: "" });
  const [fuelTypes, setFuelTypes] = useState<FuelType[]>([]);
  const [bodyTypes, setBodyTypes] = useState<BodyType[]>([]);
  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const data = await APIService.getCarsWithPagination(page, 10, false);
        setCars(data.cars);
        setTotalCount(data.totalCount);
        setLoading(false);
      } catch (err) {
        setError("Ошибка загрузки автомобилей. Пожалуйста, попробуйте позже.");
        setLoading(false);
      }
    };
    fetchCars();
  }, [page]);

  useEffect(() => {
    const loadFilters = async () => {
      const [fuelData, bodyData] = await Promise.all([
        referenceService.getFuelTypes(),
        referenceService.getBodyTypes(),
      ]);
      setFuelTypes(fuelData);
      setBodyTypes(bodyData);
    };
    loadFilters();
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([position.coords.latitude, position.coords.longitude]);
        },
        (err) => {
          console.warn("Не удалось получить местоположение:", err.message);
          setUserLocation([55.7558, 37.6173]);
        }
      );
    } else {
      setUserLocation([55.7558, 37.6173]);
    }
  }, []);

  const handleMarkerClick = (car: Car) => {
    setSelectedCar(car);
  };

  const handleCloseDialog = () => {
    setSelectedCar(null);
  };

  const handleImageClick = () => {
    setIsImageDialogOpen(true);
  };

  const handleCloseImageDialog = () => {
    setIsImageDialogOpen(false);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
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
    <Box sx={{ py: 4, px: 2 }}>
      <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <DirectionsCar sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
          <Typography variant="h3" gutterBottom fontWeight={700}>
            Найди автомобиль рядом
          </Typography>
          <Typography variant="h6" color="text.secondary">
            {user ? `${user.userName} (${user.userRole})` : "Гость"} · Всего автомобилей: {totalCount}
          </Typography>
        </Box>

        <Box sx={{ mb: 3, display: "flex", gap: 2, flexWrap: "wrap", justifyContent: 'center' }}>
          <TextField
            select
            label="Тип кузова"
            value={filter.type}
            onChange={(e) => setFilter({ ...filter, type: e.target.value })}
            sx={{ minWidth: 200 }}
            InputProps={{
              startAdornment: <FilterAlt color="action" sx={{ mr: 1 }} />,
            }}
          >
            <MenuItem value="">Все</MenuItem>
            {bodyTypes.map((type) => (
              <MenuItem key={type.id} value={type.name}>
                {type.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Тип топлива"
            value={filter.fuel}
            onChange={(e) => setFilter({ ...filter, fuel: e.target.value })}
            sx={{ minWidth: 200 }}
            InputProps={{
              startAdornment: <LocalGasStation color="action" sx={{ mr: 1 }} />,
            }}
          >
            <MenuItem value="">Все</MenuItem>
            {fuelTypes.map((fuel) => (
              <MenuItem key={fuel.id} value={fuel.name}>
                {fuel.name}
              </MenuItem>
            ))}
          </TextField>
        </Box>

        {userLocation && (
          <Box
            sx={{
              borderRadius: "16px",
              overflow: "hidden",
              boxShadow: 6,
              position: 'relative',
              '&:hover': {
                boxShadow: 8,
              },
              transition: 'all 0.3s ease',
            }}
          >
            <MapContainer
              ref={mapRef}
              center={userLocation}
              zoom={13}
              style={{ height: "600px", width: "100%" }}
            >
              <TileLayer
                attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {cars
                .filter((car) => filter.type ? car.bodyTypeName === filter.type : true)
                .filter((car) => filter.fuel ? car.fuelTypeName === filter.fuel : true)
                .map((car) => (
                  <Marker
                    key={car.id}
                    position={[car.latitude, car.longitude]}
                    eventHandlers={{ click: () => handleMarkerClick(car) }}
                  />
                ))}
            </MapContainer>
          </Box>
        )}

        

        <Dialog
          open={!!selectedCar}
          onClose={handleCloseDialog}
          maxWidth="sm"
          fullWidth
          TransitionComponent={Fade}
          sx={{ backdropFilter: 'blur(3px)' }}
        >
          {selectedCar && (
            <Box sx={{ p: 3 }}>
              <DialogTitle sx={{ fontWeight: 700, fontSize: 24 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <DirectionsCar fontSize="large" />
                  {selectedCar.brandName} {selectedCar.model}
                </Box>
              </DialogTitle>
              
              <DialogContent>
                {selectedCar.imagePath && (
                  <Box sx={{ position: 'relative', mb: 3 }}>
                    <img
                      src={`https://localhost:7154${selectedCar.imagePath}`}
                      alt={selectedCar.model}
                      style={{
                        width: '100%',
                        height: 200,
                        objectFit: 'cover',
                        borderRadius: 12,
                        cursor: 'pointer',
                      }}
                      onClick={handleImageClick}
                    />
                    <ZoomIn sx={{
                      position: 'absolute',
                      top: 10,
                      right: 10,
                      color: 'white',
                      bgcolor: 'rgba(0,0,0,0.5)',
                      borderRadius: 1,
                      p: 0.5,
                      fontSize: 30
                    }} />
                  </Box>
                )}

                <Grid container spacing={2}>
                  {[
                    { label: 'Цена в день', value: `${selectedCar.pricePerDay} ₽`, icon: <MonetizationOn /> },
                    { label: 'Тип кузова', value: selectedCar.bodyTypeName, icon: <DirectionsCar /> },
                    { label: 'Топливо', value: selectedCar.fuelTypeName, icon: <LocalGasStation /> },
                    { label: 'Год выпуска', value: selectedCar.year, icon: <Image /> },
                    { label: 'Пробег', value: `${selectedCar.mileage} км`, icon: <CheckCircle /> },
                    { label: 'Цвет', value: selectedCar.color, icon: <Palette /> },
                    { label: 'Места', value: selectedCar.seats, icon: <EventSeat /> },
                  ].map((item) => (
                    <Grid item xs={6} key={item.label}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        {item.icon}
                        <Typography variant="body1" fontWeight={500}>
                          {item.label}:
                        </Typography>
                      </Box>
                      <Chip label={item.value} variant="outlined" sx={{ width: '100%' }} />
                    </Grid>
                  ))}
                </Grid>
              </DialogContent>

              <DialogActions sx={{ justifyContent: 'space-between', p: 3 }}>
                <Button onClick={handleCloseDialog} startIcon={<Close />}>
                  Закрыть
                </Button>
                <GradientButton
                  onClick={() => navigate(`/booking/${selectedCar.id}`)}
                  startIcon={<CarRental />}
                >
                  Арендовать
                </GradientButton>
              </DialogActions>
            </Box>
          )}
        </Dialog>

        <Dialog
          open={isImageDialogOpen}
          onClose={handleCloseImageDialog}
          maxWidth="md"
          fullWidth
          sx={{ '& .MuiDialog-paper': { bgcolor: 'transparent', boxShadow: 'none' } }}
        >
          {selectedCar && (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <img
                src={`https://localhost:7154${selectedCar.imagePath}`}
                alt={selectedCar.model}
                style={{
                  maxWidth: '90vw',
                  maxHeight: '90vh',
                  borderRadius: 16,
                  boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
                }}
              />
              <Button
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
                <Close fontSize="large" />
              </Button>
            </Box>
          )}
        </Dialog>
      </Box>
    </Box>
  );
};

export default CarMapPage;