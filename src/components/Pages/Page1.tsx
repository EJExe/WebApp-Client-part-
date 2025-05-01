import { useEffect, useState } from "react";
import {
  Typography,
  Pagination,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Button,
  Box,
  Alert,
  Fade,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import APIService from "../../services/APIService";
import { Car } from "../../models/car";

interface PaginatedResponse {
  cars: Car[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
}

const Page1 = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<PaginatedResponse>({
    cars: [],
    totalCount: 0,
    pageNumber: 1,
    pageSize: 10,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCars = async (page: number) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await APIService.getCarsWithPagination(page, 10, false);
      setData(response);
    } catch (error) {
      console.error("Error fetching cars:", error);
      setError("Failed to load cars. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCars(1);
  }, []);

  const handlePageChange = (_: unknown, value: number) => {
    fetchCars(value);
  };

  return (
    <Box sx={{ py: 4, maxWidth: 800, mx: "auto" }}>
      <Typography variant="h2" gutterBottom fontWeight={700}>
        Available Cars
      </Typography>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      {isLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
          <CircularProgress />
        </Box>
      ) : data.cars.length === 0 ? (
        <Typography variant="body1" color="text.secondary">
          No cars available.
        </Typography>
      ) : (
        <>
          <List
            sx={{
              bgcolor: "background.paper",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
          >
            {data.cars.map((car, index) => (
              <Fade in timeout={300 + index * 100} key={car.id}>
                <Box>
                  <ListItem
                    alignItems="flex-start"
                    sx={{
                      py: 2,
                      transition: "transform 0.3s ease, box-shadow 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                        bgcolor: "rgba(26,60,109,0.05)",
                      },
                    }}
                  >
                    <ListItemAvatar>
                    <Avatar
                      src={
                        car.imageUrl ||
                        "https://via.placeholder.com/150?text=Car+Image"
                      }
                      alt={`${car.brandName} ${car.model}`}
                      variant="rounded"
                      sx={{ width: 80, height: 80, mr: 2 }}
                      imgProps={{
                        onError: (e: React.SyntheticEvent<HTMLImageElement>) => {
                          e.currentTarget.src =
                            "https://via.placeholder.com/150?text=Car+Image";
                        },
                      }}
                    />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography variant="h3" fontWeight={600}>
                          {car.brandName} {car.model}
                        </Typography>
                      }
                      secondary={
                        <>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            component="span"
                          >
                            Year: {car.year} • Price/day: ${car.pricePerDay} • Type: {car.bodyTypeName}
                            <br />
                            Fuel: {car.fuelTypeName} • Seats: {car.seats}
                            <br />
                            Features: {car.featureNames.length > 0 ? car.featureNames.join(", ") : "None"}
                          </Typography>
                          <Box sx={{ mt: 1 }}>
                            <Button
                              variant="contained"
                              color="secondary"
                              size="small"
                              onClick={() => navigate(`/cars/${car.id}`)}
                            >
                              Rent Now
                            </Button>
                          </Box>
                        </>
                      }
                    />
                  </ListItem>
                  {index < data.cars.length - 1 && <Divider />}
                </Box>
              </Fade>
            ))}
          </List>
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <Pagination
              count={Math.ceil(data.totalCount / data.pageSize)}
              page={data.pageNumber}
              onChange={handlePageChange}
              color="primary"
              showFirstButton
              showLastButton
            />
          </Box>
        </>
      )}
    </Box>
  );
};

export default Page1;