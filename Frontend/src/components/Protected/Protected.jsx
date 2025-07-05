// src/components/Protected.jsx

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

export default function Protected({ children, authentication = true }) {
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.authenticated);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    // If the route requires authentication and the user is not logged in
    if (authentication && authStatus !== authentication) {
      navigate("/login");
    }
    // If the route is for non-authenticated users but the user is logged in
    else if (!authentication && authStatus !== authentication) {
      navigate("/");
    }
    setLoader(false);
  }, [authStatus, navigate, authentication]);

  return loader ? <h1>Loading...</h1> : <>{children}</>;
}
