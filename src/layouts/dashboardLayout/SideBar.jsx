import React from "react";
import { NavLink } from "react-router";
import Logo from "../../components/Shared/Logo";
import NavItem from "../../components/Shared/NavItem";
import useAuth from "../../hooks/useAuth";
import useRole from "../../hooks/useRole";
import {
  FaUser,
  FaBook,
  FaTasks,
  FaUsers,
  FaClipboardList,
  FaPlus,
  FaUserTie,
  FaRegImages,
  FaEdit,
  FaHome,
} from "react-icons/fa";
const SideBar = () => {
  const { user, logoutUser } = useAuth();
  const { role, loading } = useRole(user?.email);
  console.log(role);

  const navLinkClass =
    "flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-white/10 transition text-white";

  const handleLogout = async () => {
    try {
      await logoutUser();
      localStorage.removeItem("access-token");
      toast.success("Logout successful.");
      setDropdownOpen(false);
    } catch (err) {
      console.error("Logout failed:", err);
      toast.error("Failed to logout. Try again.");
    }
  };

  return (
    <div className="lg:border-r-2 border-primary text-white h-full">
      <div className="drawer z-50 sticky top-0 lg:drawer-open w-fit pr-4">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="flex justify-center items-center mt-5 ml-5">
          <div className="drawer-content flex flex-col lg:hidden">
            {/* Page content here */}
            <label
              htmlFor="my-drawer-2"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="mx-2 text-xl flex-1 font-semibold px-2 md:hidden">
            Dashboard
          </div>
        </div>
        <div className="drawer-side backdrop-blur-sm">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <ul className="menu text-white min-h-full w-64 text-base px-4 pt-8 space-y-2">
            <li className="mb-6 text-center">
              <NavLink
                to="/"
                className="text-2xl font-bold flex gap-2 text-orange-400"
              >
                <FaHome />
                <Logo />
              </NavLink>
            </li>

            <NavLink to="/dashboard" className={navLinkClass}>
              <FaUser /> Manage Profile
            </NavLink>

            {role === "tourist" && (
              <>
                <NavLink to="/dashboard/myBookings" className={navLinkClass}>
                  <FaBook /> My Bookings
                </NavLink>
                <NavLink to="/dashboard/manageStories" className={navLinkClass}>
                  <FaEdit /> Manage Stories
                </NavLink>
                <NavLink to="/dashboard/addStory" className={navLinkClass}>
                  <FaRegImages /> Add Stories
                </NavLink>
                <NavLink
                  to="/dashboard/guideApplication"
                  className={navLinkClass}
                >
                  <FaUserTie /> Join as Tour Guide
                </NavLink>
              </>
            )}

            {role === "guide" && (
              <>
                <NavLink
                  to="/dashboard/myAssignedTours"
                  className={navLinkClass}
                >
                  <FaTasks /> My Assigned Tours
                </NavLink>
                <NavLink to="/dashboard/manageStories" className={navLinkClass}>
                  <FaEdit /> Manage Stories
                </NavLink>
                <NavLink to="/dashboard/addStory" className={navLinkClass}>
                  <FaRegImages /> Add Stories
                </NavLink>
              </>
            )}

            {role === "admin" && (
              <>
                <NavLink to="/dashboard/addPackage" className={navLinkClass}>
                  <FaPlus /> Add Package
                </NavLink>
                <NavLink to="/dashboard/manageUsers" className={navLinkClass}>
                  <FaUsers /> Manage Users
                </NavLink>
                <NavLink
                  to="/dashboard/manageCandidates"
                  className={navLinkClass}
                >
                  <FaClipboardList /> Manage Candidates
                </NavLink>
              </>
            )}
            <button
              onClick={handleLogout}
              className="absolute bottom-4 left-8 bg-red-500 border-2 border-transparent w-[80%] mx-auto text-center hover:bg-transparent/40 hover:text-red-500 hover:border-red-500 cursor-pointer"
            >
              logout
            </button>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
