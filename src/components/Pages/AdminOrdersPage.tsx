import { Container, Typography, Card, CardContent, Grid, Button, CircularProgress, Box } from "@mui/material";
import { CheckCircle, Cancel } from "@mui/icons-material";
import { useEffect, useState } from 'react';
import { useOrderContext } from "../../context/OrderContext";
import { useNavigate } from "react-router-dom";

const AdminOrdersPage = () => {
  const { orders, fetchOrders, confirmOrder, cancelOrder } = useOrderContext();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const loadData = async () => {
    setLoading(true);
    try {
      await fetchOrders();
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  };

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
          {orders.map((order) => (
            <Grid item xs={12} key={order.orderId}>
              <Card variant="outlined" sx={{ borderRadius: 2 }}>
                <CardContent>
                  <Typography variant="h6">
                    Заказ #{order.orderId}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Статус: {order.status}
                  </Typography>
                  <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
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
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
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