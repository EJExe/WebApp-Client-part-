import { Typography } from "@mui/material"
import { Link } from "react-router-dom"

const Home = () => {
  return (
    <>
      <Typography variant="h4" gutterBottom>
        Домашняя страница
      </Typography>
      <Typography>
        Добро пожаловать на домашнюю страницу! Попробуйте навигацию с помощью меню.
      </Typography>
      <Link to="/page1">Go to Page 1</Link>
    </>
  )
}

export default Home
