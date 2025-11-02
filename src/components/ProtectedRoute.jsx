import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = () => {
  const location = useLocation();
  const reduxToken = useSelector((state) => state.auth?.token);
  const token = reduxToken || localStorage.getItem("token");

  // If no token, redirect to login and preserve the intended destination
  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Otherwise, render child routes
  return <Outlet />;
};

export default ProtectedRoute;
