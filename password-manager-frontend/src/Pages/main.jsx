import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import SearchIcon from "@mui/icons-material/Search";
import {
  Alert,
  Box,
  Button,
  IconButton,
  InputAdornment,
  Snackbar,
  Tab,
  Tabs,
  TextField,
  Typography,
  Paper,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Slider from "./Slide";
import { Cookies } from "react-cookie";
import { getPassword } from "../API";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { decrypt, encrypt } from "./encrytion";

const MainPage = () => {
  const [passwordDetails, setPasswordDetails] = useState({
    passwordName: "",
    passwordEmail: "",
    password: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [passwords, setPasswords] = useState([]);

  const [value, setValue] = useState(0);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const [passwordVisibility, setPasswordVisibility] = useState(false);

  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleTogglePasswordVisibility = () => {
    setPasswordVisibility((prev) => !prev);
  };

  useEffect(() => {
    const cookies = new Cookies();
    const token = cookies.get("user");

    const isTokenExpired = (token) => {
      try {
        const decoded = jwtDecode(token);
        return decoded.exp < Date.now() / 1000;
      } catch (error) {
        return true;
      }
    };

    const fetchPasswords = async () => {
      try {
        const passwords = await getPassword();
        setPasswords(passwords);
      } catch (error) {
        console.error("Error fetching passwords:", error);
      }
    };

    if (!isTokenExpired(token)) {
      fetchPasswords();
    } else {
      cookies.remove("user");
      localStorage.removeItem("email");
      sessionStorage.removeItem("mp");
      sessionStorage.removeItem("verified");
      navigate("/login");
    }
  }, [value]);

  const handleCreatePassword = async () => {
    const encryptedPassword = encrypt(
      passwordDetails.password,
      sessionStorage.getItem("mp")
    );

    const passwords = {
      name: passwordDetails.passwordName,
      email: passwordDetails.passwordEmail,
      password: encryptedPassword,
    };

    // try {
    //   const response = await createPasswordResetToken(email);

    //   setSnackbarMessage(
    //     "A verification Email has been sent to your email. Please verify your email for resetting the password."
    //   );
    //   setSnackbarSeverity("success");
    //   setSnackbarOpen(true);
    // } catch (error) {
    //   console.error(error);

    //   setSnackbarMessage(error.message);
    //   setSnackbarSeverity("error");
    //   setSnackbarOpen(true);
    // }
  };

  return (
    <>
      <Box sx={{ display: "flex", height: "100vh", width: "100%" }}>
        <Box sx={{ width: "15%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider", height: "100%" }}>
            <Tabs
              orientation="vertical"
              variant="scrollable"
              value={value}
              onChange={handleChange}
              aria-label="Vertical tabs example"
            >
              <Tab
                label="Create Password"
                {...a11yProps(0)}
                sx={{ fontSize: 20, padding: 2 }}
              />

              <Tab
                label="Passwords"
                {...a11yProps(1)}
                sx={{ fontSize: 20, padding: 2 }}
              />

              <Tab
                label="Change Password"
                {...a11yProps(2)}
                sx={{ fontSize: 20, padding: 2 }}
              />
            </Tabs>
          </Box>
        </Box>
        <Box
          sx={{
            width: "85%",
            borderLeft: 1,
            borderColor: "divider",
            height: "100%",
          }}
        >
          <TabPanel value={value} index={0}>
            <Typography variant="h1">Create Password</Typography>
            <Box sx={{ mt: 3, width: "50%" }}>
              <TextField
                id="name"
                label="Password Name"
                sx={{
                  mt: 2,
                  "& .MuiOutlinedInput-root": { borderRadius: "25px" },
                }}
                variant="outlined"
                fullWidth
                margin="normal"
                onChange={(event) => {
                  setPasswordDetails({
                    ...passwordDetails,
                    passwordEmail: event.target.value,
                  });
                }}
              />

              <TextField
                id="email"
                label="Email"
                sx={{
                  mt: 2,
                  "& .MuiOutlinedInput-root": { borderRadius: "25px" },
                }}
                variant="outlined"
                fullWidth
                margin="normal"
                onChange={(event) => {
                  setPasswordDetails({
                    ...passwordDetails,
                    passwordEmail: event.target.value,
                  });
                }}
              />

              <TextField
                id="password"
                label="Password"
                type={passwordVisibility ? "text" : "password"}
                sx={{
                  mt: 2,
                  "& .MuiOutlinedInput-root": { borderRadius: "25px" },
                }}
                variant="outlined"
                fullWidth
                margin="normal"
                onChange={(event) => {
                  setPasswordDetails({
                    ...passwordDetails,
                    password: event.target.value,
                  });
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleTogglePasswordVisibility}
                        edge="end"
                        aria-label="toggle password visibility"
                      >
                        {passwordVisibility ? (
                          <VisibilityOffIcon />
                        ) : (
                          <VisibilityIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Box display="flex" justifyContent="flex-end" mt={2}>
                <Button
                  onClick={handleCreatePassword}
                  variant="contained"
                  color="primary"
                  sx={{
                    borderRadius: "20px",
                    fontSize: "1rem",
                  }}
                >
                  Create
                </Button>
              </Box>
            </Box>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Typography variant="h1">View Password</Typography>
            <TextField
              id="search"
              label="Search"
              variant="outlined"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{
                mt: 1,
                width: "40%",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "25px",
                },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
            <Box>
              <Slider passwords={passwords} searchTerm={searchTerm} />
            </Box>
          </TabPanel>
          <TabPanel value={value} index={2}></TabPanel>
        </Box>
      </Box>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={8000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
          sx={{ width: "100%", fontSize: "1rem" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export default MainPage;
