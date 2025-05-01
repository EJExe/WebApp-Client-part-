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
} from "@mui/material";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";
import { useAuth } from "../../context/AuthContext";
import APIService from "../../services/APIService";
import { Car } from "../../models/car";
import "leaflet/dist/leaflet.css";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const Page2 = () => {
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

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const data = await APIService.getCarsWithPagination(page, 10, false);
        setCars(data.cars);
        setTotalCount(data.totalCount);
        setLoading(false);
      } catch (err) {
        setError("Failed to load cars. Please try again later.");
        setLoading(false);
      }
    };
    fetchCars();
  }, [page]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([position.coords.latitude, position.coords.longitude]);
        },
        (err) => {
          console.warn("Could not get user location:", err.message);
          setUserLocation([51.505, -0.09]);
        }
      );
    } else {
      setUserLocation([51.505, -0.09]);
    }
  }, []);

  useEffect(() => {
    if (selectedCar && mapRef.current) {
      mapRef.current.setView([selectedCar.latitude, selectedCar.longitude], 15);
    }
  }, [selectedCar]);

  const handleMarkerClick = (car: Car) => {
    setSelectedCar(car);
  };

  const handleCloseDialog = () => {
    setSelectedCar(null);
  };

  if (loading) {
    return <Typography>Loading cars...</Typography>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Box sx={{ py: 4 }}>
      <Typography variant="h2" gutterBottom fontWeight={700}>
        Find a Car Near You
      </Typography>
      <Typography variant="body1" color="text.secondary" gutterBottom>
        {user ? `${user.userName} (${user.userRole})` : "Guest"} - Select a car from the map below. Total cars: {totalCount}
      </Typography>
      <Box sx={{ mb: 3, display: "flex", gap: 2, flexWrap: "wrap" }}>
        <TextField
          select
          label="Body Type"
          value={filter.type}
          onChange={(e) => setFilter({ ...filter, type: e.target.value })}
          sx={{ minWidth: 150 }}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="Sedan">Sedan</MenuItem>
          <MenuItem value="SUV">SUV</MenuItem>
          <MenuItem value="Hatchback">Hatchback</MenuItem>
        </TextField>
        <TextField
          select
          label="Fuel Type"
          value={filter.fuel}
          onChange={(e) => setFilter({ ...filter, fuel: e.target.value })}
          sx={{ minWidth: 150 }}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="Petrol">Petrol</MenuItem>
          <MenuItem value="Diesel">Diesel</MenuItem>
          <MenuItem value="Electric">Electric</MenuItem>
        </TextField>
      </Box>
      {userLocation && (
        <Box
          sx={{
            filter: selectedCar ? "blur(3px)" : "none",
            transition: "filter 0.3s ease",
            borderRadius: "12px",
            overflow: "hidden",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
        >
          <MapContainer
            ref={mapRef}
            center={userLocation}
            zoom={13}
            style={{ height: "500px", width: "100%" }}
          >
            <TileLayer
              attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {cars
              .filter((car) =>
                filter.type ? car.bodyTypeName === filter.type : true
              )
              .filter((car) =>
                filter.fuel ? car.fuelTypeName === filter.fuel : true
              )
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
      <Box sx={{ mt: 3, display: "flex", justifyContent: "center", gap: 2 }}>
        <Button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          variant="outlined"
        >
          Previous
        </Button>
        <Typography>
          Page {page} of {Math.ceil(totalCount / 10)}
        </Typography>
        <Button
          onClick={() => setPage((prev) => prev + 1)}
          disabled={page >= Math.ceil(totalCount / 10)}
          variant="outlined"
        >
          Next
        </Button>
      </Box>
      <Dialog
        open={!!selectedCar}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
        TransitionComponent={Fade}
        TransitionProps={{ timeout: 300 }}
      >
        {selectedCar && (
          <>
            <DialogTitle sx={{ fontWeight: 700 }}>
              {selectedCar.brandName} {selectedCar.model}
            </DialogTitle>
            <DialogContent>
              {selectedCar.imageUrl ? (
                <img
                  src={selectedCar.imageUrl}
                  alt={`${selectedCar.brandName} ${selectedCar.model}`}
                  style={{
                    width: "100%",
                    maxHeight: "200px",
                    objectFit: "cover",
                    borderRadius: "8px",
                    marginBottom: "16px",
                  }}
                  onError={(e) =>
                    (e.currentTarget.src =
                      "https://via.placeholder.com/150?text=Car+Image")
                  }
                />
              ) : (
                <img
                  src="https://via.placeholder.com/150?text=Car+Image"
                  alt="No Image"
                  style={{
                    width: "100%",
                    maxHeight: "200px",
                    objectFit: "cover",
                    borderRadius: "8px",
                    marginBottom: "16px",
                  }}
                />
              )}
              <Typography variant="body1" gutterBottom>
                <strong>Price per day:</strong> ${selectedCar.pricePerDay}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Type:</strong> {selectedCar.bodyTypeName}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Fuel:</strong> {selectedCar.fuelTypeName}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Drive:</strong> {selectedCar.driveTypeName}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Category:</strong> {selectedCar.categoryName}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Year:</strong> {selectedCar.year}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Mileage:</strong> {selectedCar.mileage} km
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Color:</strong> {selectedCar.color}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Seats:</strong> {selectedCar.seats}
              </Typography>
              {selectedCar.featureNames.length > 0 && (
                <Typography variant="body1" gutterBottom>
                  <strong>Features:</strong> {selectedCar.featureNames.join(", ")}
                </Typography>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog} color="primary" variant="outlined">
                Close
              </Button>
              <Button
                onClick={() => navigate(`/cars/${selectedCar.id}`)}
                color="secondary"
                variant="contained"
              >
                Rent Now
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default Page2;