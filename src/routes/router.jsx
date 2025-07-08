import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Login from "../authentication/Login";
import Register from "../authentication/Register";
import DashboardLayout from "../layouts/dashboardLayout/DashboardLayout";
import DashboardHome from "../layouts/dashboardLayout/DashboardHome";
import MyBooking from "../components/mybooking/MyBooking";
import PrivateRoute from "./privateRoute/PrivateRoute";
import ManageStory from "../components/ManageStory/ManageStory";
import AddStory from "../components/AddStory/AddStory";
export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
    ],
  },
  {
    path: "dashboard",
    Component: DashboardLayout,
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
            <DashboardHome></DashboardHome>
          </PrivateRoute>
        ),
      },
      {
        path: "myBookings",
        element: (
          <PrivateRoute>
            <MyBooking></MyBooking>
          </PrivateRoute>
        ),
      },
      {
        path: "manageStories",
        element: (
          <PrivateRoute>
            <ManageStory></ManageStory>
          </PrivateRoute>
        ),
      },
      {
        path: "addStory",
        element: (
          <PrivateRoute>
            <AddStory></AddStory>
          </PrivateRoute>
        ),
      },
    ],
  },
]);
