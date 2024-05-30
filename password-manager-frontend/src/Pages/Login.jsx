import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";

import Cookies from "universal-cookie";

import { useNavigate } from "react-router-dom";
import { login, register, userExist } from "../API";
import Alert from "./Global/Alert";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [userExists, setUserExists] = useState(false);
  const isButtonDisabled = username === "" || password === "";

  const cookies = new Cookies();

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

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const userCredentials = {
      username: username,
      password: password,
    };

    try {
      const response = await login(userCredentials);
      cookies.set("user", response.token);
      localStorage.setItem("email", response.email);
      sessionStorage.setItem("mp", password);
      setSnackbarMessage(response.message);
      setSnackbarSeverity("success");
      setOpenSnackbar(true);

      setTimeout(() => {
        navigate("/verification");
      }, 1000);
    } catch (error) {
      setSnackbarMessage("Invalid Email or Password");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const userCredentials = {
      username: username,
      password: password,
    };
    try {
      const response = await register(userCredentials);
      setSnackbarMessage(response);
      setSnackbarSeverity("success");
      setOpenSnackbar(true);

      setUsername("");
      setPassword("");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      setSnackbarMessage(error.data);
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
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
              disabled={isButtonDisabled}
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
              disabled={isButtonDisabled}
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
