import { 
  Avatar, 
  Box, 
  Button, 
  Chip, 
  Container,
  Card, 
  CardContent,
  Grid, 
  Paper, 
  Stack, 
  Typography,
  Divider,
  CircularProgress,
  IconButton,
  Tooltip
} from "@mui/material";
import {
  Edit,
  DirectionsCar,
  CalendarToday,
  Paid,
  LocationOn,
  CheckCircle,
  Email,
  Phone,
  Badge,
  AccessTime,
  Info,
  Refresh,
  Done
} from "@mui/icons-material";
import { useAuth } from "../../context/AuthContext";
import { useOrderContext } from "../../context/OrderContext";
import { useEffect, useState } from 'react';
import { Order } from "../../models/order";
import { carService } from "../../services/CarService";
import { Car } from "../../models/car.models";
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { Link } from "react-router-dom";

const ProfilePage = () => {
  const { user } = useAuth();
  const { orders, fetchOrders, completeOrder} = useOrderContext();
  const [loading, setLoading] = useState(true);
  const [carsData, setCarsData] = useState<Map<number, Car>>(new Map());
  
  
  const loadData = async () => {
    setLoading(true);
    try {
      await fetchOrders();
      
      // Fetch car details for each order
      const carIds = new Set<number>();
      orders.forEach(order => carIds.add(order.carId));
      
      const carsMap = new Map<number, Car>();
      for (const carId of carIds) {
        try {
          const car = await carService.getById(carId);
          carsMap.set(carId, car);
        } catch (error) {
          console.error(`Error fetching car ${carId}:`, error);
        }
      }
      
      setCarsData(carsMap);
    } catch (error) {
      console.error("Error loading orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    // Only run this effect once when the component mounts
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return format(date, 'dd MMMM yyyy, HH:mm', { locale: ru });
    } catch (error) {
      return dateString;
    }
  };

  const getStatusChip = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return <Chip size="small" label="В ожидании" color="warning" />;
      case 'confirmed':
        return <Chip size="small" label="Подтверждено" color="success" />;
      case 'completed':
        return <Chip size="small" label="Завершено" color="default" />;
      case 'cancelled':
        return <Chip size="small" label="Отменено" color="error" />;
      default:
        return <Chip size="small" label={status} />;
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={4}>
        {/* Левая колонка - Профиль */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, borderRadius: 4 }}>
            <Stack alignItems="center" spacing={2}>
              <Avatar
                sx={{ 
                  width: 120, 
                  height: 120,
                  border: "3px solid",
                  borderColor: "primary.main"
                }}
              />
              
              <Typography variant="h5" fontWeight="bold">
                {user?.userName}
              </Typography>
              
              <Chip 
                label="Верифицирован" 
                color="success" 
                size="small"
                icon={<CheckCircle fontSize="small" />}
              />
              
              <Stack width="100%" spacing={1} sx={{ mt: 2 }}>
                <ProfileItem 
                  label="Телефон"
                  value={user?.userRole}
                  icon={<Phone />}
                />
                
                <ProfileItem
                  label="Email"
                  value={user?.userName}
                  icon={<Email />}
                />
                
                <ProfileItem
                  label="Водительские права"
                  value="78 ММ 123456"
                  icon={<Badge />}
                />
              </Stack>
              
              <Button
                fullWidth
                variant="outlined"
                startIcon={<Edit />}
                sx={{ mt: 2 }}
              >
                Редактировать профиль
              </Button>
            </Stack>
          </Paper>
        </Grid>

        {/* Правая колонка - Аренды */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, borderRadius: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" fontWeight="bold">
                Мои аренды 🚗
              </Typography>
              <Tooltip title="Обновить">
                <IconButton 
                  onClick={loadData} 
                  disabled={loading}
                  color="primary"
                >
                  <Refresh />
                </IconButton>
              </Tooltip>
            </Box>
            
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
                <CircularProgress />
              </Box>
            ) : orders.length > 0 ? (
              <Stack spacing={2} sx={{ mt: 2 }}>
                {orders.map((order) => {
                  const car = carsData.get(order.carId);
                  return (
                    <Card key={order.orderId} variant="outlined" sx={{ borderRadius: 2 }}>
                      <CardContent>
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={4} md={3}>
                            <Box
                              component="img"
                              src={car?.imagePath 
                                ? `https://localhost:7154${car.imagePath}` 
                                : "/images/cars/default.jpg"}
                              alt={car?.model || "Автомобиль"}
                              sx={{
                                width: '100%',
                                height: 120,
                                objectFit: 'cover',
                                borderRadius: 2
                              }}
                            />
                          </Grid>
                          
                          <Grid item xs={12} sm={8} md={9}>
                            <Stack spacing={1}>
                              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Typography variant="h6">
                                  {car ? `${car.brandName} ${car.model}` : "Автомобиль не найден"}
                                </Typography>
                                {getStatusChip(order.status)}
                              </Box>
                              
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <AccessTime fontSize="small" color="action" />
                                <Typography variant="body2">
                                  Дата бронирования: {formatDate(order.startDate)}
                                </Typography>
                              </Box>
                              
                              {car && (
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                  <Paid fontSize="small" color="action" />
                                  <Typography variant="body2">
                                    {car.pricePerDay.toLocaleString()} ₽/день
                                  </Typography>
                                </Box>
                              )}
                              
                              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                                <Button
                                  variant="outlined"
                                  color="success"
                                  size="small"
                                  startIcon={<Done />}
                                  onClick={async () => {
                                    try {
                                      await completeOrder(order.orderId);
                                      // Можно добавить уведомление об успехе
                                    } catch (error) {
                                      // Обработка ошибок
                                      console.error("Ошибка завершения аренды:", error);
                                    }
                                  }}
                                  disabled={order.status.toLowerCase() === 'completed'}
                                >
                                  Завершить аренду
                                </Button>
                                <Button
                                  component={Link}
                                  to={`/cars/${order.carId}`}
                                  size="small"
                                  endIcon={<Info />}
                                >
                                  Подробнее
                                </Button>
                              </Box>
                            </Stack>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  );
                })}
              </Stack>
            ) : (
              <Box sx={{ 
                p: 4, 
                textAlign: 'center'
              }}>
                <Typography variant="h6" gutterBottom>
                  У вас нет активных аренд 😔
                </Typography>
                <Typography color="text.secondary" sx={{ mb: 3 }}>
                  Нажмите кнопку ниже, чтобы найти идеальный автомобиль!
                </Typography>
                <Button 
                  component={Link}
                  to="/cars"
                  variant="contained" 
                  size="large"
                  startIcon={<DirectionsCar />}
                >
                  Найти автомобиль
                </Button>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

// Вспомогательные компоненты
const ProfileItem = ({ icon, label, value }: any) => (
  <Stack direction="row" spacing={2} alignItems="center">
    <Box sx={{ color: 'text.secondary' }}>{icon}</Box>
    <Box>
      <Typography variant="body2" color="text.secondary">{label}</Typography>
      <Typography variant="body1">{value}</Typography>
    </Box>
  </Stack>
);

export default ProfilePage;