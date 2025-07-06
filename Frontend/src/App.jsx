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
    const initSession = async () => {
      try {
        const userData = await authService.getCurrentUser(); // /me/
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      } catch (err) {
        dispatch(logout());
      } finally {
        setLoading(false);
      }
    };

    initSession();
  }, []);

  return loading ? (
    <Skeleton />
  ) : (
    <Layout>
      <Outlet />
    </Layout>
  );
}

export default App;
