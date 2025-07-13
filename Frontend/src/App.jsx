import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router";
import authService from "./backend/auth";
import { login, logout } from "./store/authSlice";
import Layout from "./components/Layout";
import { Skeleton } from "./components/ui/skeleton";


function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  useEffect(() => {
  const initSession = async () => {
    try {
      const userData = await authService.getCurrentUser();
      if (userData) {
        dispatch(login({ userData }));
        if (userData.must_change_password === true) {
          navigate('/change-password/');
        } else {
          navigate('/');
        }
      } else {
        dispatch(logout());
      }
    } catch (err) {
      console.error('Error fetching user session:', err);
      dispatch(logout());
    } finally {
      setLoading(false);
    }
  };

  initSession();
}, [dispatch, navigate]);


  return loading ? (
    <Skeleton />
  ) : (
    
      <Outlet />
    
  );
}

export default App;
