import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router";
import authService from "./backend/auth";
import { login, logout } from "./store/authSlice";
import Layout from "./components/Layout";
import { Skeleton } from "./components/ui/skeleton";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    // Check for a valid session using the cookie on app load
    authService
      .refreshAccessToken()
      .then((token) => {
        if (token) {
          // User is authenticated
          dispatch(login({ token }));
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
  }, [dispatch]);

  // Show a loading screen while checking auth, otherwise show the app
  return !loading ? (
    <div>
      <Layout>
        <Outlet />
      </Layout>
    </div>
  ) : (
    <div>
      <Skeleton />
    </div>
  );
}

export default App;
