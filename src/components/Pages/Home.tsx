import { Typography, Button, Box, Container, Grid, Fade, useScrollTrigger, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CarRental, DirectionsCar, LocalGasStation, Speed, CheckCircle, Map, ListAlt, ArrowForward } from "@mui/icons-material";

const Home = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ overflowX: 'hidden' }}>
      {/* Hero Section */}
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          background: 'linear-gradient(135deg, #1A3C6D 0%, #2A5B9A 100%)',
          color: '#FFFFFF',
          py: 8,
          position: 'relative',
        }}
      >
        <Container>
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography
                variant="h1"
                gutterBottom
                sx={{
                  fontWeight: 800,
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  lineHeight: 1.2,
                  mb: 3,
                }}
              >
                <Box component="span" sx={{ color: '#FFD700' }}>CarShare</Box> - 
                Арендуйте автомобиль за 3 клика
              </Typography>
              
              {/* Quick Access Buttons */}
              <Stack spacing={3} sx={{ maxWidth: 500, mb: 6 }}>
                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  onClick={() => navigate("/page2")}
                  startIcon={<Map sx={{ fontSize: 30 }} />}
                  endIcon={<ArrowForward />}
                  sx={{
                    py: 2.5,
                    fontSize: '1.2rem',
                    borderRadius: 3,
                    bgcolor: '#FFD700',
                    color: '#1A3C6D',
                    '&:hover': {
                      bgcolor: '#FFE55E',
                      transform: 'translateY(-2px)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  Посмотреть на карте
                </Button>
                
                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  onClick={() => navigate("/cars")}
                  startIcon={<ListAlt sx={{ fontSize: 30 }} />}
                  endIcon={<ArrowForward />}
                  sx={{
                    py: 2.5,
                    fontSize: '1.2rem',
                    borderRadius: 3,
                    bgcolor: 'rgba(255,255,255,0.9)',
                    color: '#1A3C6D',
                    '&:hover': {
                      bgcolor: 'white',
                      transform: 'translateY(-2px)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  Список автомобилей
                </Button>
              </Stack>

              <Typography
                variant="h5"
                sx={{
                  opacity: 0.9,
                  fontWeight: 300,
                }}
              >
                Выберите удобный способ поиска клада: 
                <Box component="span" sx={{ display: 'block', mt: 1 }}>
                Пираты XXI века предпочитают
                кондиционер, полный бак
                и оплату через приложение!
                </Box>
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              
              <Box sx={{ 
                position: 'relative',
                height: '100vh',
                overflow: 'hidden'
              }}>
                {[1, 2, 3].map((item, index) => (
                  <motion.div
                    key={item}
                    style={{
                      position: 'absolute',
                      width: '100%',
                      height: '100%'
                    }}
                    animate={{
                      y: [null, index % 2 === 0 ? -50 : 50]
                    }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      repeatType: 'reverse',
                      ease: 'linear'
                    }}
                  >
                    <Box
                      component="img"
                      src={`/images/cars/parallax-${item}.png`}
                      alt={`Parallax ${item}`}
                      sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        opacity: 0.3 + index * 0.2,
                        filter: `blur(${index}px)`
                      }}
                    />
                  </motion.div>
                ))}
                
                <Box sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  textAlign: 'center',
                  zIndex: 1
                }}>
                  <Typography variant="h2" sx={{
                    color: 'white',
                    fontSize: '4rem',
                    textShadow: '0 5px 15px rgba(0,0,0,0.5)',
                    mb: 4
                  }}>
                    Новое поколение аренды
                  </Typography>

                 

  </Box>
          </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Additional Sections... */}
    </Box>
  );
};


export default Home;