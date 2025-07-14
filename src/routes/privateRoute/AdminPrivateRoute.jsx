import React from "react";
import { Navigate, useLocation } from "react-router";
import useAuth from "../../hooks/useAuth";
import useRole from "../../hooks/useRole";

const AdminPrivateRoute = ({ children }) => {
  const { user, loading: authLoading } = useAuth();
  const location = useLocation();

  const email = user?.email;
  const { role, loading: roleLoading } = useRole(email);

  // Wait until both user and role are loaded
  if (authLoading || roleLoading || !email) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-spinner loading-lg text-blue-600"></span>
      </div>
    );
  }

  if (role !== "admin") {
    return <Navigate to="/accessDenied/adminPrivateRoute" />;
  }

  return children;
};

export default AdminPrivateRoute;
