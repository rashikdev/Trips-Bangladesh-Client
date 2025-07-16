import React, { useEffect } from "react";
import { useLocation } from "react-router";

const DynamicTitle = () => {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;

    let title = "Home";

    if (path === "/login") {
      title = "Login";
    } else if (path === "/register") {
      title = "Register";
    } else if (path === "/community/stories") {
      title = "Community Stories";
    } else if (path === "/about") {
      title = "About Us";
    } else if (path.startsWith("/trips")) {
      title = "All Trips";
    } else if (path.startsWith("/package/")) {
      title = "Package Details";
    } else if (path.startsWith("/guide/")) {
      title = "Guide Details";
    } else if (path === "/dashboard/myBookings") {
      title = "My Bookings";
    } else if (path === "/dashboard/manageStories") {
      title = "Manage Stories";
    } else if (path === "/dashboard/guideApplication") {
      title = "Guide Applications";
    } else if (path === "/dashboard/myAssignedTours") {
      title = "Assigned Tours";
    } else if (path === "/dashboard/myAssignedTours") {
      title = "My Assigned Tours";
    } else if (path === "/dashboard/addStory") {
      title = "Add Story";
    } else if (path === "/dashboard/addPackage") {
      title = "Add Package";
    } else if (path === "/dashboard/manageUsers") {
      title = "Manage Users";
    } else if (path === "/dashboard/manageCandidates") {
      title = "Manage Candidates";
    } else if (path.startsWith("/dashboard")) {
      title = "Dashboard";
    }

    document.title = `Trips | ${title}`;
  }, [location]);

  return null;
};

export default DynamicTitle;
