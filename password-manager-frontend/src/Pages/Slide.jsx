import AppleIcon from "@mui/icons-material/Apple";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import GoogleIcon from "@mui/icons-material/Google";
import InstagramIcon from "@mui/icons-material/Instagram";
import PaymentRoundedIcon from "@mui/icons-material/PaymentRounded";
import ShopRoundedIcon from "@mui/icons-material/ShopRounded";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import { useTheme } from "@emotion/react";
import {
  Box,
  Button,
  Fade,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";
import {
  EffectCoverflow,
  Mousewheel,
  Navigation,
  Pagination,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "./Slider.css";

const Slider = ({
  passwords,
  searchTerm,
  tabValue,
  onChangePasswordClick,
  onClearClick,
}) => {
  const theme = useTheme();
  const swiperRef = useRef(null);
  const isMobileSm = useMediaQuery(theme.breakpoints.down("sm"));
  const isMobileMd = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const isMobileLg = useMediaQuery(theme.breakpoints.between("md", "lg"));
  const isMobileXl = useMediaQuery(theme.breakpoints.up("lg"));
  const [flippedIndex, setFlippedIndex] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (password) => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 500);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const goNext = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext();
    }
  };

  const goPrev = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  const flipCard = (index) => {
    if (index === currentIndex) {
      setFlippedIndex((prevIndex) => (prevIndex === index ? null : index));
    }
  };

  const flipBack = () => {
    if (flippedIndex !== null) {
      setFlippedIndex(null);
    }
  };

  const handleSlideChange = (swiper) => {
    setCurrentIndex(swiper.realIndex);
  };

  const handleChangePasswordClick = (id) => {
    onChangePasswordClick(id);
  };

  const handleClearClick = (id) => {
    onClearClick(id);
  };

  useEffect(() => {
    flipBack();
  }, [currentIndex]);

  const filteredPasswords = passwords.filter(
    (password) =>
      password.accountName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      password.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  let iconSize, sliderHeight, paperHeight, paperWidth;
  if (isMobileSm) {
    iconSize = "4rem";
    sliderHeight = "60vh";
    paperHeight = 250;
    paperWidth = 150;
  } else if (isMobileMd) {
    iconSize = "6rem";
    sliderHeight = "70vh";
    paperHeight = 350;
    paperWidth = 250;
  } else if (isMobileLg) {
    iconSize = "8rem";
    sliderHeight = "76vh";
    paperHeight = 400;
    paperWidth = 300;
  } else if (isMobileXl) {
    iconSize = "10rem";
    sliderHeight = "80vh";
    paperHeight = 500;
    paperWidth = 400;
  }
  const iconStyles = (isActive) => ({
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    cursor: isActive ? "pointer" : "grab",
    color: "#000",
    transition: "color 0.3s",
    color:
      theme.palette.mode === "dark"
        ? theme.palette.primary.light
        : theme.palette.primary.dark,
    fontSize: iconSize,
  });
  return (
    <>
      <Box position="relative">
        <Swiper
          effect={"coverflow"}
          loop={true}
          grabCursor={true}
          coverflowEffect={{
            rotate: 0,
            stretch: -75,
            depth: 250,
            modifier: 3.5,
            slideShadows: false,
          }}
          slidesPerView={isMobileSm ? 1 : 3}
          centeredSlides={true}
          mousewheel={true}
          pagination={{
            clickable: true,
          }}
          navigation={false}
          modules={[Pagination, Mousewheel, Navigation, EffectCoverflow]}
          className="mySwiper"
          ref={swiperRef}
          style={{ height: sliderHeight }}
          onSlideChange={(swiper) => handleSlideChange(swiper)}
        >
          {filteredPasswords.map((password, index) => (
            <SwiperSlide key={password.id}>
              <div
                className={`card-inner ${flippedIndex === index ? "flip" : ""}`}
              >
                <div className="card-front">
                  <Paper
                    elevation={10}
                    sx={{
                      width: paperWidth,
                      height: paperHeight,
                      borderRadius: "30px",
                      position: "relative",
                      mt: isMobileSm ? 2 : 5,
                      marginX: "auto",
                    }}
                  >
                    {index === currentIndex && (
                      <>
                        {tabValue === 2 && (
                          <Tooltip
                            title="Delete Password"
                            sx={{
                              "& .MuiTooltip-tooltip": {
                                fontSize: "1.5rem",
                              },
                            }}
                            TransitionComponent={Fade}
                            TransitionProps={{ timeout: 600 }}
                            arrow
                          >
                            <IconButton
                              sx={{
                                position: "absolute",
                                top: "8px",
                                right: "8px",
                                color: theme.palette.error.main,
                                fontSize: "3rem",
                              }}
                              onClick={() => handleClearClick(password.id)}
                            >
                              <ClearRoundedIcon fontSize="inherit" />
                            </IconButton>
                          </Tooltip>
                        )}
                      </>
                    )}

                    {(() => {
                      const lowercaseEmail = password.email.toLowerCase();
                      const lowercaseAccountName =
                        password.accountName.toLowerCase();
                      const isActive = index === currentIndex;

                      switch (true) {
                        case lowercaseEmail.includes("@gmail") &&
                          lowercaseAccountName.includes("email"):
                          return (
                            <GoogleIcon
                              onClick={() => flipCard(index)}
                              sx={iconStyles(isActive)}
                            />
                          );
                        case lowercaseAccountName.includes("instagram") ||
                          lowercaseAccountName.includes("ig") ||
                          lowercaseAccountName.includes("ins"):
                          return (
                            <InstagramIcon
                              onClick={() => flipCard(index)}
                              sx={iconStyles(isActive)}
                            />
                          );
                        case lowercaseAccountName.includes("facebook") ||
                          lowercaseAccountName.includes("fb"):
                          return (
                            <FacebookRoundedIcon
                              onClick={() => flipCard(index)}
                              sx={iconStyles(isActive)}
                            />
                          );
                        case lowercaseAccountName.includes("apple"):
                          return (
                            <AppleIcon
                              onClick={() => flipCard(index)}
                              sx={iconStyles(isActive)}
                            />
                          );
                        case lowercaseAccountName.includes("email"):
                          return (
                            <EmailRoundedIcon
                              onClick={() => flipCard(index)}
                              sx={iconStyles(isActive)}
                            />
                          );
                        case lowercaseAccountName.includes("lazada") ||
                          lowercaseAccountName.includes("shopee") ||
                          lowercaseAccountName.includes("lz") ||
                          lowercaseAccountName.includes("sp"):
                          return (
                            <ShopRoundedIcon
                              onClick={() => flipCard(index)}
                              sx={iconStyles(isActive)}
                            />
                          );
                        case lowercaseAccountName.includes("bank"):
                          return (
                            <PaymentRoundedIcon
                              onClick={() => flipCard(index)}
                              sx={iconStyles(isActive)}
                            />
                          );
                        default:
                          return (
                            <EmailRoundedIcon
                              onClick={() => flipCard(index)}
                              sx={iconStyles(isActive)}
                            />
                          );
                      }
                    })()}

                    <Typography
                      variant="h3"
                      sx={{
                        position: "absolute",
                        top: isMobileSm ? "10px" : "20px",
                        left: "50%",
                        transform: "translateX(-50%)",
                      }}
                    >
                      {password.accountName}
                    </Typography>
                    {index === currentIndex && (
                      <>
                        {tabValue === 1 ? (
                          <Tooltip title="View Password" arrow>
                            <VisibilityIcon
                              onClick={() => flipCard(index)}
                              sx={{
                                position: "absolute",
                                bottom: 0,
                                left: "50%",
                                transform: "translateX(-50%)",
                                marginBottom: "16px",
                                fontSize: "1.5rem",
                                cursor: "pointer",
                                transition: "color 0.3s",
                                "&:hover": {
                                  color: theme.palette.primary.dark,
                                },
                              }}
                            />
                          </Tooltip>
                        ) : (
                          <Button
                            onClick={() =>
                              handleChangePasswordClick(password.id)
                            }
                            variant="outlined"
                            sx={{
                              position: "absolute",
                              bottom: 0,
                              left: "50%",
                              transform: "translateX(-50%)",
                              marginBottom: "16px",
                              borderRadius: "50px",
                              overflow: "hidden",
                              color:
                                theme.palette.mode === "dark"
                                  ? theme.palette.primary.light
                                  : theme.palette.primary.main,
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
                            }}
                            size="large"
                            endIcon={<EditRoundedIcon />}
                          >
                            change password
                          </Button>
                        )}
                      </>
                    )}
                  </Paper>
                </div>
                <div className="card-back">
                  <Paper
                    elevation={10}
                    sx={{
                      width: paperWidth,
                      height: paperHeight,
                      borderRadius: "30px",
                      position: "relative",
                      mt: isMobileSm ? 2 : 5,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    onMouseLeave={flipBack}
                  >
                    <Box width="80%">
                      <TextField
                        id="password-name"
                        label="Password Name"
                        value={password.accountName}
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: "25px",
                          },
                        }}
                        readOnly
                      />

                      <TextField
                        id="password-email"
                        label="Password Email"
                        value={password.email}
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: "25px",
                          },
                        }}
                        readOnly
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <Tooltip
                                title={copied ? "Copied!" : "Copy Email"}
                                arrow
                              >
                                <IconButton
                                  onClick={() =>
                                    copyToClipboard(password.email)
                                  }
                                >
                                  <ContentCopyIcon
                                    sx={{
                                      transition: "color 0.5s",
                                      "&:hover": {
                                        color: theme.palette.primary.main,
                                      },
                                    }}
                                  />
                                </IconButton>
                              </Tooltip>
                            </InputAdornment>
                          ),
                        }}
                      />

                      <TextField
                        id="password"
                        label="Password"
                        type={showPassword ? "text" : "password"}
                        value={password.password}
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: "25px",
                          },
                        }}
                        readOnly
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton onClick={togglePasswordVisibility}>
                                {showPassword ? (
                                  <VisibilityOffIcon
                                    sx={{
                                      transition: "color 0.5s",
                                      "&:hover": {
                                        color: theme.palette.primary.main,
                                      },
                                    }}
                                  />
                                ) : (
                                  <VisibilityIcon
                                    sx={{
                                      transition: "color 0.5s",
                                      "&:hover": {
                                        color: theme.palette.primary.main,
                                      },
                                    }}
                                  />
                                )}
                              </IconButton>
                              <Tooltip
                                title={copied ? "Copied!" : "Copy password"}
                                arrow
                              >
                                <IconButton
                                  onClick={() =>
                                    copyToClipboard(password.password)
                                  }
                                  sx={{
                                    transition: "color 0.5s",
                                    "&:hover": {
                                      color: theme.palette.primary.main,
                                    },
                                  }}
                                >
                                  <ContentCopyIcon />
                                </IconButton>
                              </Tooltip>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Box>
                  </Paper>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "1rem",
            transform: "translateY(-50%)",
            zIndex: 100,
          }}
        >
          <ArrowBackIosNewRoundedIcon
            onClick={goPrev}
            sx={{
              fontSize: 40,
              cursor: "pointer",
              color: theme.palette.primary.main,
            }}
          />
        </Box>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            right: "1rem",
            transform: "translateY(-50%)",
            zIndex: 100,
          }}
        >
          <ArrowForwardIosRoundedIcon
            onClick={goNext}
            sx={{
              fontSize: 40,
              cursor: "pointer",
              color: theme.palette.primary.main,
            }}
          />
        </Box>
      </Box>
    </>
  );
};

export default Slider;
