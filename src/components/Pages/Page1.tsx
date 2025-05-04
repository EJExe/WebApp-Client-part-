import { useState, useEffect } from "react";
import { Car } from "../../models/car.models";
import APIService from "../../services/APIService";
import {
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Typography,
  Pagination,
  CircularProgress,
} from "@mui/material";
import { Fade } from "@mui/material";

const BASE_API_URL = "https://localhost:7154";

const Page1 = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
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
        console.error("Error loading cars:", err);
        setError("Failed to load cars.");
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
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Box sx={{ color: "red", textAlign: "center", mt: 4 }}>{error}</Box>;
  }

  return (
    <Box sx={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <Typography variant="h2" gutterBottom>
        Available Cars
      </Typography>
      <List>
        {cars.map((car) => (
          <Fade key={car.id} in appear>
            <Box>
              <ListItem alignItems="flex-start" sx={{ py: 2 }}>
                <ListItemAvatar>
                  <Avatar
                    src={car.imagePath ? `${BASE_API_URL}${car.imagePath}` : "/images/cars/default.jpg"}
                    alt={`${car.brandName || "Unknown"} ${car.model || "Car"}`}
                    variant="rounded"
                    sx={{ width: 80, height: 80, mr: 2 }}
                    imgProps={{
                      onError: (e: React.SyntheticEvent<HTMLImageElement>) => {
                        e.currentTarget.src = "/images/cars/default.jpg";
                      },
                    }}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={`${car.brandName || "Unknown"} ${car.model || "Car"}`}
                  secondary={
                    <Box component="span">
                      <Typography
                        component="span"
                        variant="body2"
                        color="text.secondary"
                        display="block"
                      >
                        {car.bodyTypeName || "Unknown"} | ${car.pricePerDay || "N/A"}/day
                      </Typography>
                      <Typography
                        component="span"
                        variant="body2"
                        color="text.secondary"
                        sx={{ mt: 1, display: "block" }}
                      >
                        Features: {car.featureNames?.length > 0 ? car.featureNames.join(", ") : "None"}
                      </Typography>
                    </Box>
                  }
                />
              </ListItem>
            </Box>
          </Fade>
        ))}
      </List>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Pagination
          count={Math.ceil(totalCount / pageSize)}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </Box>
  );
};

export default Page1;