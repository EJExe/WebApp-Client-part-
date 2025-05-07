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
    Typography 
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
  } from "@mui/icons-material";
  import { useAuth } from "../../context/AuthContext";
  import { useEffect, useState } from 'react';
  
  interface Booking {
    id: number;
    carId: number;
    startDate: string;
    endDate: string;
    status: string;
    carDetails: {
      model: string;
      imagePath: string;
    };
  }

  const ProfilePage = () => {
    const { user } = useAuth();
    const [bookings, setBookings] = useState<Booking[]>([]);
    
    // Пример данных об аренде
    const currentRental = {
      car: "Tesla Model 3 Long Range",
      licensePlate: "А123АА777",
      startDate: "15.03.2024 14:00",
      endDate: "17.03.2024 18:00",
      price: "5 200 ₽",
      location: "Москва, ТРЦ Авиапарк",
      image: "/images/cars/tesla-model3.png"
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
  
          {/* Правая колонка - Аренда */}
          <Grid item xs={12} md={8}>
            {currentRental ? (
              <Paper sx={{ p: 3, borderRadius: 4 }}>
                <Typography variant="h6" gutterBottom fontWeight="bold">
                  Текущая аренда 🚗
                </Typography>
                
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Box
                      component="img"
                      src={currentRental.image}
                      alt="Car"
                      sx={{
                        width: '100%',
                        borderRadius: 3,
                        boxShadow: 3
                      }}
                    />
                  </Grid>
                  
                  <Grid item xs={12} md={6}>
                    <RentalDetail 
                      icon={<DirectionsCar />}
                      label="Автомобиль"
                      value={currentRental.car}
                    />
                    
                    <RentalDetail
                      icon={<CalendarToday />}
                      label="Срок аренды"
                      value={`${currentRental.startDate} - ${currentRental.endDate}`}
                    />
                    
                    <RentalDetail
                      icon={<Paid />}
                      label="Стоимость"
                      value={currentRental.price}
                    />
                    
                    <RentalDetail
                      icon={<LocationOn />}
                      label="Место получения"
                      value={currentRental.location}
                    />
                    
                    <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
                      <Button
                        variant="contained"
                        color="error"
                        fullWidth
                      >
                        Завершить досрочно
                      </Button>
                      
                      <Button
                        variant="outlined"
                        fullWidth
                      >
                        Продлить аренду
                      </Button>
                    </Stack>
                  </Grid>
                </Grid>
              </Paper>
            ) : (
              <Paper sx={{ 
                p: 4, 
                borderRadius: 4,
                textAlign: 'center'
              }}>
                <Typography variant="h6" gutterBottom>
                  У вас нет активных аренд 😔
                </Typography>
                <Typography color="text.secondary" sx={{ mb: 3 }}>
                  Нажмите кнопку ниже, чтобы найти идеальный автомобиль!
                </Typography>
                <Button 
                  variant="contained" 
                  size="large"
                  startIcon={<DirectionsCar />}
                >
                  Найти автомобиль
                </Button>
              </Paper>
            )}
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
  
  const RentalDetail = ({ icon, label, value }: any) => (
    <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
      <Box sx={{ 
        width: 40,
        height: 40,
        bgcolor: 'action.hover',
        borderRadius: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {icon}
      </Box>
      <Box>
        <Typography variant="body2" color="text.secondary">{label}</Typography>
        <Typography variant="body1">{value}</Typography>
      </Box>
    </Stack>
  );
  
  export default ProfilePage;