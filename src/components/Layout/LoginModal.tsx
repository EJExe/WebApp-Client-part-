import { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  CircularProgress,
  Fade,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "90%", sm: 400 },
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ open, onClose }) => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await login(userName, password);
      onClose();
      navigate("/");
    } catch (err) {
      setError("Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose} closeAfterTransition>
      <Fade in={open}>
        <Box sx={modalStyle}>
          <Typography variant="h6" component="h2" mb={3} fontWeight={600}>
            Sign In
          </Typography>
          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <TextField
                label="Username"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
                fullWidth
                autoFocus
                variant="outlined"
              />
              <TextField
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                fullWidth
                variant="outlined"
              />
              {error && (
                <Typography color="error" variant="caption">
                  {error}
                </Typography>
              )}
              <Button
                type="submit"
                variant="contained"
                disabled={isLoading || !userName || !password}
                endIcon={isLoading ? <CircularProgress size={20} /> : null}
                fullWidth
              >
                {isLoading ? "Signing In..." : "Sign In"}
              </Button>
              <Button
                variant="text"
                onClick={() => navigate("/register")}
                sx={{ mt: 1 }}
              >
                Don't have an account? Sign Up
              </Button>
            </Stack>
          </form>
        </Box>
      </Fade>
    </Modal>
  );
};

export default LoginModal;