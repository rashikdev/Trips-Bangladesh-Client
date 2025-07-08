import { Outlet } from "react-router";
import SideBar from "./SideBar";
const DashboardLayout = () => {
  return (
    <div className="lg:flex">
      <SideBar></SideBar>
      <div className="border w-full">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default DashboardLayout;
