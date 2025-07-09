import React from "react";
import { NavLink } from "react-router";
import Logo from "../../components/Shared/Logo";
import NavItem from "../../components/Shared/NavItem";

const SideBar = () => {
  return (
    <div className="lg:border-r-2 border-teal-400 text-white">
      <div className="drawer lg:drawer-open w-fit pr-4">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="flex justify-center items-center">
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
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu text-white min-h-full w-60 text-xl space-y-5 pt-8">
            {/* Sidebar content here */}
            <li>
              <NavLink className="border" to="/">
                <h2 className="text-2xl">
                  <Logo></Logo>
                </h2>
              </NavLink>
            </li>
            <div className="text-lg p-2 space-y-6">
              <NavItem item="Manage Profile" link="/dashboard" />
              <NavItem item="My Bookings" link="/dashboard/myBookings" />
              <NavItem item="Manage Stories" link="/dashboard/manageStories" />
              <NavItem item="Add Stories" link="/dashboard/addStory" />
              <NavItem item="Join as tour guide" link="/dashboard/tourGuide" />
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
