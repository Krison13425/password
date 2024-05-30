import { CssBaseline, ThemeProvider } from "@mui/material";
import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ProtectedRoutes from "./Pages/Global/ProtectedRoutes";
import Login from "./Pages/Login";
import VerificationPage from "./Pages/Verification";
import { ColorModeContext, useMode } from "./theme";
import MainPage from "./Pages/MainPage";

function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/verification" element={<VerificationPage />} />
            <Route element={<ProtectedRoutes />}>
              <Route path="/" element={<MainPage />} />
            </Route>
          </Routes>
        </Router>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
