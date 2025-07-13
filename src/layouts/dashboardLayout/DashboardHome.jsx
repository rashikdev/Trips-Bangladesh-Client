import React from "react";
import TouristProfile from "../../Profile/TouristProfile/TouristProfile";
import useAuth from "../../hooks/useAuth";
import useRole from "../../hooks/useRole";
import GuideProfile from "../../Profile/GuideProfile/GuideProfile";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import AdminProfile from "../../Profile/AdminProfile/AdminProfile";

const DashboardHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  
  const { role, loading } = useRole(user?.email);

  return (
    <div>
      <div>{!loading && role === "tourist" && <TouristProfile />}</div>
      
      <div>{!loading && role === "guide" && <GuideProfile />}</div>

      <div>{!loading && role === "admin" && <AdminProfile />}</div>
    </div>
  );
};

export default DashboardHome;
