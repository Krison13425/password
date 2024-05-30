import { useTheme } from "@emotion/react";
import SearchIcon from "@mui/icons-material/Search";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
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
} from "@mui/material";
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import { Cookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import {
  changePassword,
  createPassword,
  deletePassword,
  getPassword,
  getPasswordById,
} from "../API";
import Dialog from "./Global/Dailog";
import Slider from "./Slide";
import { decrypt, encrypt } from "./encrytion";

const MainPage = () => {
  const [passwordDetails, setPasswordDetails] = useState({
    passwordName: "",
    passwordEmail: "",
    password: "",
  });
  const [openDialog, setOpenDialog] = useState(false);
  const handleClose = () => {
    setOpenDialog(false);
  };
  const handleOpenDialog = (id) => {
    setOpenDialog(true);
    fetchSelectedPassword(id);
  };

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const handleDeleteClose = () => {
    setOpenDeleteDialog(false);
  };
  const handleOpenDeleteDialog = (id) => {
    setOpenDeleteDialog(true);
    fetchSelectedPassword(id);
  };

  const [value, setValue] = useState(0);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [passwordVisibility, setPasswordVisibility] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [passwords, setPasswords] = useState([]);
  const [selectedPassword, setSelectedPassword] = useState("");
  const [originalPassword, setOriginalPassword] = useState("");

  const navigate = useNavigate();
  const theme = useTheme();

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setSelectedPassword((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleTogglePasswordVisibility = () => {
    setPasswordVisibility((prev) => !prev);
  };

  const resetForm = () => {
    setPasswordDetails({
      passwordName: "",
      passwordEmail: "",
      password: "",
    });
  };

  const hasChanges =
    JSON.stringify(selectedPassword) !== JSON.stringify(originalPassword);

  useEffect(() => {
    const cookies = new Cookies();
    const token = cookies.get("user");
    resetForm();
    const isTokenExpired = (token) => {
      try {
        const decoded = jwtDecode(token);
        return decoded.exp < Date.now() / 1000;
      } catch (error) {
        return true;
      }
    };

    if (!isTokenExpired(token)) {
      if (value !== 0) {
        fetchAndDecryptPasswords();
      }
    } else {
      cookies.remove("user");
      localStorage.removeItem("email");
      sessionStorage.removeItem("mp");
      sessionStorage.removeItem("verified");
      navigate("/login");
    }
  }, [value]);

  const fetchSelectedPassword = async (id) => {
    const encryptedPassword = await getPasswordById(id);
    const masterPassword = sessionStorage.getItem("mp");
    if (!masterPassword) {
      throw new Error("Master password not found in session storage.");
    }

    const decryptedPassword = {
      ...encryptedPassword,
      password: decrypt(encryptedPassword.password, masterPassword),
    };

    setSelectedPassword(decryptedPassword);
    setOriginalPassword(decryptedPassword);
  };

  const fetchAndDecryptPasswords = async () => {
    try {
      const encryptedPasswords = await getPassword();
      const masterPassword = sessionStorage.getItem("mp");
      if (!masterPassword) {
        throw new Error("Master password not found in session storage.");
      }
      const decryptedPasswords = encryptedPasswords.map((password) => ({
        ...password,
        password: decrypt(password.password, masterPassword),
      }));
      setPasswords(decryptedPasswords);
    } catch (error) {
      console.error("Error fetching and decrypting passwords:", error);
    }
  };

  const handleCreatePassword = async (e) => {
    e.preventDefault();

    const encryptedPassword = encrypt(
      passwordDetails.password,
      sessionStorage.getItem("mp")
    );

    const password = {
      email: passwordDetails.passwordEmail,
      password: encryptedPassword,
      accountName: passwordDetails.passwordName,
    };

    try {
      const response = await createPassword(password);
      setSnackbarMessage(response);
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      resetForm();
    } catch (error) {
      setSnackbarMessage(error);
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    handleClose();

    const encryptedPassword = encrypt(
      selectedPassword.password,
      sessionStorage.getItem("mp")
    );

    const updatedPassword = {
      id: selectedPassword.id,
      password: encryptedPassword,
    };

    try {
      const response = await changePassword(updatedPassword);
      setSnackbarMessage(response);
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      fetchAndDecryptPasswords();
      setSelectedPassword("");
      setOriginalPassword("");
    } catch (error) {
      setSnackbarMessage(error.message);
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleDeletePassword = async (e) => {
    e.preventDefault();
    handleDeleteClose();

    try {
      const response = await deletePassword(selectedPassword.id);
      setSnackbarMessage(response);
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      fetchAndDecryptPasswords();
      setSelectedPassword("");
      setOriginalPassword("");
    } catch (error) {
      setSnackbarMessage(error.message);
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
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
                value={passwordDetails.passwordName}
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
                    passwordName: event.target.value,
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
                value={passwordDetails.passwordEmail}
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
                value={passwordDetails.password}
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
                  disabled={Object.values(passwordDetails).some(
                    (value) => value === ""
                  )}
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
              <Slider
                passwords={passwords}
                searchTerm={searchTerm}
                tabValue={1}
              />
            </Box>
          </TabPanel>
          <TabPanel value={value} index={2} tabValue={2}>
            <Typography variant="h1" sx={{ mb: 8 }}>
              Change Password
            </Typography>
            <Slider
              passwords={passwords}
              searchTerm={searchTerm}
              tabValue={2}
              onChangePasswordClick={handleOpenDialog}
              onClearClick={handleOpenDeleteDialog}
            />

            <Dialog
              open={openDialog}
              handleClose={handleClose}
              title="Update Password"
              onSubmit={handleChangePassword}
            >
              <Box sx={{ textAlign: "center" }}>
                <Box sx={{ marginBottom: "20px" }}>
                  <TextField
                    id="accountName"
                    label="Account Name"
                    fullWidth
                    value={selectedPassword ? selectedPassword.accountName : ""}
                    sx={{
                      width: "70%",
                      "& .MuiOutlinedInput-root": { borderRadius: "25px" },
                    }}
                    disabled
                  />
                </Box>

                <Box sx={{ marginBottom: "20px" }}>
                  <TextField
                    id="email"
                    label="Email"
                    fullWidth
                    value={selectedPassword ? selectedPassword.email : ""}
                    sx={{
                      width: "70%",
                      "& .MuiOutlinedInput-root": { borderRadius: "25px" },
                    }}
                    disabled
                  />
                </Box>

                <Box sx={{ marginBottom: "20px" }}>
                  <TextField
                    id="password"
                    name="password"
                    label="Password"
                    type={passwordVisibility ? "text" : "password"}
                    fullWidth
                    onChange={handleInputChange}
                    value={selectedPassword ? selectedPassword.password : ""}
                    sx={{
                      width: "70%",
                      "& .MuiOutlinedInput-root": { borderRadius: "25px" },
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
                </Box>
              </Box>

              <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={!hasChanges}
                  sx={{
                    borderRadius: "20px",
                  }}
                >
                  update
                </Button>
              </Box>
            </Dialog>

            <Dialog
              open={openDeleteDialog}
              handleClose={handleDeleteClose}
              title="Confirm Delete Password"
              onSubmit={handleDeletePassword}
            >
              <Box sx={{ textAlign: "center", marginTop: "16px" }}>
                <Typography variant="h5" sx={{ marginBottom: "8px" }}>
                  Do you really want to remove this password?
                </Typography>
                <Typography variant="h5" sx={{ marginBottom: "8px" }}>
                  This action cannot be undone.
                </Typography>
              </Box>

              <Box sx={{ mt: 5, display: "flex", justifyContent: "center" }}>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    borderRadius: "20px",
                  }}
                >
                  Confirm
                </Button>
              </Box>
            </Dialog>
          </TabPanel>
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
