import React from "react";
import { Navigate, useLocation } from "react-router";
import useAuth from "../../hooks/useAuth";
import useRole from "../../hooks/useRole";

const GuidePrivateRoute = ({ children }) => {
  const { user, loading: authLoading } = useAuth();
  const location = useLocation();

  const email = user?.email;
  const { role, loading: roleLoading } = useRole(email);

  if (authLoading || roleLoading || !email) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-spinner loading-lg text-blue-600"></span>
      </div>
    );
  }

  if (role !== "guide") {
    return (
      <Navigate
        to="/accessDenied/guidePrivateRoute"
        replace
        state={{ from: location }}
      />
    );
  }

  return children;
};

export default GuidePrivateRoute;
