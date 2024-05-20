import EmailIcon from "@mui/icons-material/Email";
import SendIcon from "@mui/icons-material/Send";
import { useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { verifyToken, verifyUser } from "../API";
import Alert from "./Global/Alert";

const VerificationPage = () => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("");

  const [verificationCode, setVerificationCode] = useState("");
  const [verificationRequested, setVerificationRequested] = useState(false);
  const [iconPosition, setIconPosition] = useState(20);

  const [email, setEmail] = useState("");

  const theme = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    if (storedEmail) {
      setEmail(storedEmail);
    } else if (!storedEmail) {
      navigate("/login");
    }
  }, []);

  const handleVerificationCodeChange = (event) => {
    setVerificationCode(event.target.value);
  };

  const handleResendCode = async () => {
    setIconPosition(180);
    setTimeout(() => {
      setIconPosition(20);
    }, 1000);
    try {
      const requestVerification = await verifyUser(email);
      setSnackbarMessage("Authentication Code Has Sent To Your E-mail");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
      setTimeout(() => {
        setVerificationRequested(true);
      }, 1000);
    } catch (error) {
      setSnackbarMessage(error);
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();

    try {
      const response = await verifyToken(verificationCode, email);
      sessionStorage.setItem("verified", 1);
      setSnackbarMessage(response);
      setSnackbarSeverity("success");
      setOpenSnackbar(true);

      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      setSnackbarMessage(error.data);
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      {verificationRequested ? (
        <>
          <Typography variant="h3" sx={{ textAlign: "center", mt: 5 }}>
            Two Factor Authentication
          </Typography>
          <Box
            sx={{
              boxShadow: 3,
              borderRadius: "50px",
              px: 4,
              py: 6,
              mt: 5,
              display: "flex",
              flexDirection: "column",
              border: "1px solid",
            }}
          >
            <EmailIcon sx={{ fontSize: "3rem", alignSelf: "center" }} />
            <Box
              component="form"
              noValidate
              sx={{ mt: 1, textAlign: "center" }}
            >
              <TextField
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "20px",
                  },
                }}
                required
                fullWidth
                label="Authentication Code"
                value={verificationCode}
                onChange={handleVerificationCodeChange}
                placeholder="XXXXXX"
              />

              <Button
                fullWidth
                onClick={handleVerify}
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  width: 400,
                  borderRadius: "50px",
                  fontSize: "1rem",
                }}
                size="large"
              >
                Verify
              </Button>

              <Typography variant="h5" sx={{ mt: 2, textAlign: "center" }}>
                We just sent you a message via email with your authentication
                code.
              </Typography>
              <Typography variant="h5" sx={{ textAlign: "center" }}>
                Enter the code in the form above to verify your identity.
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              fullWidth
              onClick={handleResendCode}
              variant="outlined"
              sx={{
                mt: 2,
                mb: 2,
                width: 400,
                borderRadius: "50px",
                fontSize: "1rem",
                display: "flex",
                alignItems: "center",
                position: "relative",
                overflow: "hidden",
                "&:hover::before": {
                  width: "100%",
                },
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  height: "100%",
                  width: 0,
                  backgroundColor: theme.palette.primary.main,
                  transition: "width 0.3s ease",
                  zIndex: -1,
                },
                "&:hover": {
                  color: "white",
                },
                "& .MuiButton-endIcon": {
                  zIndex: 2,
                  transition: "transform 0.3s",
                },
                "&:hover .MuiButton-endIcon": {
                  transform: `translateX(${iconPosition}px)`,
                },
              }}
              size="large"
              endIcon={<SendIcon />}
            >
              Resend Verification Code
            </Button>
          </Box>
        </>
      ) : (
        <>
          <Box
            sx={{
              boxShadow: 3,
              borderRadius: "50px",
              px: 4,
              py: 6,
              mt: 5,
              display: "flex",
              flexDirection: "column",
              border: "1px solid",
            }}
          >
            <EmailIcon sx={{ fontSize: "3rem", alignSelf: "center" }} />
            <Box
              component="form"
              noValidate
              sx={{ mt: 1, textAlign: "center" }}
            >
              <Typography variant="h5" sx={{ mt: 2, textAlign: "center" }}>
                When you are ready, click the button below to receive a code via
                E-Mail.
              </Typography>

              <Button
                fullWidth
                onClick={handleResendCode}
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  width: 400,
                  borderRadius: "50px",
                  fontSize: "1rem",
                  position: "relative",
                  overflow: "hidden",
                  "&:hover": {
                    "& .MuiButton-endIcon": {
                      transform: `translateX(${iconPosition}px)`,
                      transition: "transform 0.3s",
                    },
                  },
                }}
                size="large"
                endIcon={<SendIcon />}
              >
                Send Code
              </Button>
            </Box>
          </Box>
        </>
      )}
      <Alert
        open={openSnackbar}
        setOpen={setOpenSnackbar}
        severity={snackbarSeverity}
        message={snackbarMessage}
      />
    </Container>
  );
};

export default VerificationPage;
