import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import { IconButton, Snackbar, useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import InputAdornment from "@mui/material/InputAdornment";
import Switch from "@mui/material/Switch";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import Cookies from "universal-cookie";

// import { adminAuthenticate } from "../api";
import Alert from "./Global/Alert";
import { register, userExist } from "../API";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [userExists, setUserExists] = useState(false);

  //   const navigate = useNavigate();

  //   const cookies = new Cookies();

  const handleShowPassword = () => {
    setShowPassword(true);
  };

  const handleHidePassword = () => {
    setShowPassword(false);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  useEffect(() => {
    const fetchUserExistence = async () => {
      try {
        const userExists = await userExist();
        setUserExists(userExists);
      } catch (error) {
        console.error("Error checking user existence:", error);
      }
    };

    fetchUserExistence();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    const userCredentials = {
      username: username,
      password: password,
    };
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const userCredentials = {
      username: username,
      password: password,
    };
    try {
      const response = await register(userCredentials);
      console.log(response);
      setSnackbarMessage(response);
      setSnackbarSeverity("success");
      setOpenSnackbar(true);

      setUsername("");
      setPassword("");
      window.location.reload();
    } catch (error) {
      setSnackbarMessage(error.data);
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     const loginCredentials = {
    //       username: username,
    //       password: password,
    //     };
    //     try {
    //       const response = await adminAuthenticate(loginCredentials);
    //       cookies.set("user", response.token, {
    //         path: "/",
    //       });
    //       localStorage.setItem("id", response.id);
    //       localStorage.setItem("role", response.role);
    //       navigate("/admin/dashboard");
    //       setSnackbarMessage("Admin Login Successfully");
    //       setSnackbarSeverity("success");
    //       setOpenSnackbar(true);
    //     } catch (error) {
    //       setSnackbarMessage("Invalid username or password");
    //       setSnackbarSeverity("error");
    //       setOpenSnackbar(true);
    //     }
  };

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          boxShadow: 3,
          borderRadius: "50px",
          px: 4,
          py: 6,
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          border: "1px solid",
        }}
      >
        <Typography component="h1" variant="h3" sx={{ textAlign: "center" }}>
          {userExists ? "User Login" : "User Register"}
        </Typography>

        <Box component="form" noValidate sx={{ mt: 1, textAlign: "center" }}>
          <TextField
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "20px",
              },
            }}
            margin="normal"
            required
            fullWidth
            id="username"
            label="Email"
            name="email"
            autoComplete="username"
            value={username}
            onChange={handleUsernameChange}
            autoFocus
          />

          <TextField
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "20px",
              },
            }}
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={handlePasswordChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {showPassword ? (
                    <IconButton onClick={handleHidePassword}>
                      <VisibilityOff />
                    </IconButton>
                  ) : (
                    <IconButton onClick={handleShowPassword}>
                      <Visibility />
                    </IconButton>
                  )}
                </InputAdornment>
              ),
            }}
          />
          {userExists ? (
            <Button
              fullWidth
              onClick={handleLogin}
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                width: 400,
                borderRadius: "50px",
                fontSize: "1rem",
              }}
              startIcon={<LoginOutlinedIcon />}
              size="large"
            >
              Login
            </Button>
          ) : (
            <Button
              fullWidth
              onClick={handleRegister}
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                width: 400,
                borderRadius: "50px",
                fontSize: "1rem",
              }}
              startIcon={<PersonAddAlt1Icon />}
              size="large"
            >
              Register
            </Button>
          )}
        </Box>
      </Box>

      <Alert
        open={openSnackbar}
        setOpen={setOpenSnackbar}
        severity={snackbarSeverity}
        message={snackbarMessage}
      />
    </Container>
  );
};

export default Login;
