import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Login from "../authentication/Login";
import Register from "../authentication/Register";
import DashboardLayout from "../layouts/dashboardLayout/DashboardLayout";
import DashboardHome from "../layouts/dashboardLayout/DashboardHome";
import MyBooking from "../components/mybooking/MyBooking";
import PrivateRoute from "./privateRoute/PrivateRoute";
import AddStory from "../components/AddStory/AddStory";
import AboutUs from "../components/aboutUs/AboutUs";
import AllTrips from "../components/Trip/AllTrtips";
import PackageDetails from "../pages/Trip/package/PackageDetails";
import GuideDetailsPage from "../components/guideDetails/GuideDetailsPage";
import Payment from "../payment/Payment";
import JoinAsTourGuide from "../Profile/TouristProfile/JoinAsTourGuide";
import ManageStories from "../pages/manageStories/ManageStories";
import UpdateStory from "../pages/updateStory/UpdateStory";
import MyAssignedTours from "../Profile/GuideProfile/MyAssignedTours";
import Community from "../pages/Community/Community";
import AddPackage from "../Profile/AdminProfile/AddPackage";
import ManageUsers from "../Profile/AdminProfile/ManageUsers";
import ManageCandidates from "../Profile/AdminProfile/ManageCandidates";
import AdminPrivateRoute from "./privateRoute/AdminPrivateRoute";
import AccessDenied from "./privateRoute/AccessDenied";
import AccessDenied2 from "./privateRoute/AccesDenied2";
import GuidePrivateRoute from "./privateRoute/GuidePriveteRoute";
import NotFoundPage from "../components/ErrorPage/NotFoundPage";
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
        path: "about",
        Component: AboutUs,
      },
      {
        path: "trips",
        Component: AllTrips,
      },
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
      {
        path: "package/:id",
        Component: PackageDetails,
      },
      {
        path: "guide/:id",
        Component: GuideDetailsPage,
      },
      {
        path: "community/stories",
        Component: Community,
      },
      {
        path: "/accessDenied/adminPrivateRoute",
        Component: AccessDenied,
      },
      {
        path: "/accessDenied/guidePrivateRoute",
        Component: AccessDenied2,
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
        path: "myAssignedTours",
        element: (
          <PrivateRoute>
            <GuidePrivateRoute>
              <MyAssignedTours></MyAssignedTours>
            </GuidePrivateRoute>
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
      {
        path: "updateStory/:id",
        element: (
          <PrivateRoute>
            <UpdateStory></UpdateStory>
          </PrivateRoute>
        ),
      },
      {
        path: "payment/:id",
        element: (
          <PrivateRoute>
            <Payment></Payment>
          </PrivateRoute>
        ),
      },
      {
        path: "guideApplication",
        element: (
          <PrivateRoute>
            <JoinAsTourGuide></JoinAsTourGuide>
          </PrivateRoute>
        ),
      },
      {
        path: "manageStories",
        element: (
          <PrivateRoute>
            <ManageStories></ManageStories>
          </PrivateRoute>
        ),
      },
      {
        path: "addPackage",
        element: (
          <PrivateRoute>
            <AdminPrivateRoute>
              <AddPackage></AddPackage>
            </AdminPrivateRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "manageUsers",
        element: (
          <PrivateRoute>
            <AdminPrivateRoute>
              <ManageUsers></ManageUsers>
            </AdminPrivateRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "manageCandidates",
        element: (
          <PrivateRoute>
            <AdminPrivateRoute>
              <ManageCandidates></ManageCandidates>
            </AdminPrivateRoute>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "*",
    Component: NotFoundPage,
  }
]);
