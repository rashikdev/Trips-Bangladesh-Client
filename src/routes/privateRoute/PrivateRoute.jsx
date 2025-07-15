import React from "react";
import { Navigate, useLocation } from "react-router";
import useAuth from "../../hooks/useAuth";
import LoadingSpinner from "../../components/loadingPage/LoadingSpinner";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  const location = useLocation();

  if (loading || !user) {
    return <LoadingSpinner></LoadingSpinner>;
  }
  
  if (!user) {
    return <Navigate to="/login" state={location.pathname} replace></Navigate>;
  }
  return children;
};

export default PrivateRoute;
