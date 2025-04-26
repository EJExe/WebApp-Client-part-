import { Typography } from "@mui/material"
import { useAuth } from "../../context/AuthContext"

const Page1 = () => {
  const { user } = useAuth()
  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Page 2
      </Typography>
      <Typography>  {user?.userName} {user?.userRole}  This is Page 2 content.</Typography>
    </div>
  )
}

export default Page1
