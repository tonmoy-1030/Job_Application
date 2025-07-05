import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router";
import authService from "./backend/auth";
import { login, logout } from "./store/authSlice";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    // Check for a valid session using the cookie on app load
    authService
      .refreshAccessToken()
      .then((userData) => {
        if (userData) {
          // User is authenticated         
          dispatch(login({ userData }));
        } else {
          // No active session
          dispatch(logout());
        }
      })
      .catch((error) => {
        console.error("Failed to fetch current user:", error);
        dispatch(logout());
      })
      .finally(() => setLoading(false));
  }, []);

  // Show a loading screen while checking auth, otherwise show the app
  return !loading ? (
    <div className="app-container">
      <Header />
      <Outlet />
      <Footer />
    </div>
  ) : (
    <div>Loading...</div>
  );
}

export default App;
