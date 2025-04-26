import { Typography } from "@mui/material"
import { useAuth } from "../../context/AuthContext"

const Page3 = () => {
  const { user } = useAuth()

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Admin Panel
      </Typography>
      <Typography>Welcome, {user?.userName}! You have admin privileges.</Typography>
    </div>
  )
}

export default Page3
