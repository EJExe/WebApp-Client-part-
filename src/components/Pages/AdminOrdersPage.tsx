/**
 * @fileoverview Admin page for managing orders
 * (Страница администратора для управления заказами)
 * @module components/Pages/AdminOrdersPage
 */
import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  CircularProgress,
  Box,
  Avatar,
  Chip,
  Divider,
  Stack
} from "@mui/material";
import {
  CheckCircle,
  Cancel,
  Done,
  DirectionsCar,
  Person,
  CalendarToday,
  Paid
} from "@mui/icons-material";
import { useEffect, useState } from 'react';
import { useOrderContext } from "../../context/OrderContext";
import { useNavigate } from "react-router-dom";
import { carService } from "../../services/CarService";
import { Car } from "../../models/car.models";
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

/**
 * @component
 * @description Admin page component for managing orders
 * (Компонент страницы администратора для управления заказами)
 * @returns {JSX.Element} Rendered component
 * (Отрендеренный компонент)
 */
const AdminOrdersPage = () => {
  const { orders, fetchOrders, confirmOrder, cancelOrder, completeOrder } = useOrderContext();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [carsData, setCarsData] = useState<Map<number, Car>>(new Map());

  /**
   * @function formatDate
   * @description Formats a date string to a localized format
   * (Форматирует строку даты в локализованный формат)
   * @param {string} dateString - Date string to format
   * (Строка даты для форматирования)
   * @returns {string} Formatted date string
   * (Отформатированная строка даты)
   */
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return format(date, 'dd MMMM yyyy, HH:mm', { locale: ru });
    } catch (error) {
      return dateString;
    }
  };

  /**
   * @function getStatusChip
   * @description Returns a chip component based on order status
   * (Возвращает компонент чипа на основе статуса заказа)
   * @param {string} status - Order status
   * (Статус заказа)
   * @returns {JSX.Element} Chip component with appropriate color and label
   * (Компонент чипа с соответствующим цветом и меткой)
   */
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

  /**
   * @async
   * @function loadData
   * @description Loads orders and car data
   * (Загружает заказы и данные автомобилей)
   * @returns {Promise<void>} Promise that resolves when data is loaded
   * (Промис, который разрешается, когда данные загружены)
   */
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
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * @description Effect hook to load data on component mount
   * (Хук эффекта для загрузки данных при монтировании компонента)
   */
  useEffect(() => {
    loadData();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Все заказы
      </Typography>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
          <CircularProgress />
        </Box>
      ) : orders.length > 0 ? (
        <Grid container spacing={3}>
          {orders.map((order) => {
            const car = carsData.get(order.carId);
            return (
              <Grid item xs={12} key={order.orderId}>
                <Card variant="outlined" sx={{ borderRadius: 2 }}>
                  <CardContent>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={3} md={2}>
                        {car && (
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
                        )}
                      </Grid>
                      
                      <Grid item xs={12} sm={9} md={10}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                          <Typography variant="h6">
                            Заказ #{order.orderId}
                          </Typography>
                          {getStatusChip(order.status)}
                        </Box>
                        
                        <Divider sx={{ my: 1 }} />
                        
                        <Grid container spacing={2}>
                          <Grid item xs={12} md={6}>
                            <Stack spacing={1}>
                              <Typography variant="subtitle2" color="primary">
                                <DirectionsCar fontSize="small" sx={{ mr: 1, verticalAlign: 'middle' }} />
                                Информация об автомобиле
                              </Typography>
                              
                              {car ? (
                                <>
                                  <Typography variant="body2">
                                    <strong>Модель:</strong> {car.brandName} {car.model}
                                  </Typography>
                                  <Typography variant="body2">
                                    <strong>Год:</strong> {car.year}
                                  </Typography>
                                  <Typography variant="body2">
                                    <Paid fontSize="small" sx={{ mr: 1, verticalAlign: 'middle' }} />
                                    <strong>Цена:</strong> {car.pricePerDay.toLocaleString()} ₽/день
                                  </Typography>
                                </>
                              ) : (
                                <Typography variant="body2" color="text.secondary">
                                  Информация об автомобиле недоступна
                                </Typography>
                              )}
                            </Stack>
                          </Grid>
                          
                          <Grid item xs={12} md={6}>
                            <Stack spacing={1}>
                              <Typography variant="subtitle2" color="primary">
                                <Person fontSize="small" sx={{ mr: 1, verticalAlign: 'middle' }} />
                                Информация о клиенте
                              </Typography>
                              
                              <Typography variant="body2">
                                <strong>ID пользователя:</strong> {order.userId}
                              </Typography>
                              
                              <Typography variant="body2">
                                <CalendarToday fontSize="small" sx={{ mr: 1, verticalAlign: 'middle' }} />
                                <strong>Дата бронирования:</strong> {formatDate(order.startDate)}
                              </Typography>
                            </Stack>
                          </Grid>
                        </Grid>
                        
                        <Divider sx={{ my: 1 }} />
                        
                        <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
                          {order.status.toLowerCase() === 'pending' ? (
                            <>
                              <Button
                                variant="contained"
                                color="success"
                                startIcon={<CheckCircle />}
                                onClick={() => confirmOrder(order.orderId)}
                              >
                                Принять
                              </Button>
                              <Button
                                variant="outlined"
                                color="error"
                                startIcon={<Cancel />}
                                onClick={() => cancelOrder(order.orderId)}
                              >
                                Отклонить
                              </Button>
                            </>
                          ) : order.status.toLowerCase() !== 'completed' ? (
                            <Button
                              variant="contained"
                              color="primary"
                              startIcon={<Done />}
                              onClick={() => completeOrder(order.orderId)}
                            >
                              Завершить аренду
                            </Button>
                          ) : null}
                        </Box>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      ) : (
        <Box sx={{ 
          textAlign: 'center',
          p: 8,
          border: '1px dashed',
          borderColor: 'divider',
          borderRadius: 2
        }}>
          <Typography variant="h5" gutterBottom>
            Заказы отсутствуют
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default AdminOrdersPage;