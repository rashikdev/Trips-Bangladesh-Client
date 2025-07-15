import React from "react";
import { Navigate, useLocation } from "react-router";
import useAuth from "../../hooks/useAuth";
import useRole from "../../hooks/useRole";
import LoadingSpinner from "../../components/loadingPage/LoadingSpinner";

const GuidePrivateRoute = ({ children }) => {
  const { user, loading: authLoading } = useAuth();
  const location = useLocation();

  const email = user?.email;
  const { role, loading: roleLoading } = useRole(email);

  if (authLoading || roleLoading || !email) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  if (role !== "guide") {
    return <Navigate to="/accessDenied/guidePrivateRoute" />;
  }

  return children;
};

export default GuidePrivateRoute;
