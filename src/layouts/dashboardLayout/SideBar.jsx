import React from "react";
import { NavLink } from "react-router";
import { HiMenu } from "react-icons/hi";
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
import Logo from "../../components/Shared/Logo";
import useAuth from "../../hooks/useAuth";
import useRole from "../../hooks/useRole";

const SideBar = () => {
  const { user, logoutUser } = useAuth();
  const { role } = useRole(user?.email);

  const navLinkClass =
    "flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-white/10 transition text-white";

  return (
    <div className="lg:border-r border-white/20 text-white h-full">
      <div className="drawer z-50 sticky top-0 lg:drawer-open w-fit pr-4">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        {/* Mobile toggle + heading */}
        <div className="flex items-center justify-between lg:hidden p-4 backdrop-blur-sm gap-5 mt-4">
          {/* Menu Button */}
          <label htmlFor="my-drawer-2" className="cursor-pointer text-white">
            <HiMenu className="text-3xl" />
          </label>

          {/* Title */}
          <h2 className="text-xl font-semibold text-orange-400">Dashboard</h2>
        </div>

        <div className="drawer-side backdrop-blur-sm relative">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <ul className="menu text-white min-h-full w-64 text-base px-4 pt-8 space-y-2">
            <li className="mb-6 text-center">
              <NavLink
                to="/"
                className="text-2xl font-bold flex items-center gap-2 text-orange-400"
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
          </ul>
          <div className="absolute bottom-4 w-full px-2">
            <button onClick={logoutUser} className="btn btn-primary w-full">
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
