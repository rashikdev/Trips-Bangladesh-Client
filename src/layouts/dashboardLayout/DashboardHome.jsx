import React from "react";
import TouristProfile from "../../Profile/TouristProfile/TouristProfile";
import useAuth from "../../hooks/useAuth";
import useRole from "../../hooks/useRole";

const DashboardHome = () => {
  const { user } = useAuth();

  const { role, loading } = useRole(user?.email);
  console.log(role);
  return (
    <div>
      <div>
        {!loading && role === "tourist" && <TouristProfile />}
      </div>
    </div>
  );
};

export default DashboardHome;
