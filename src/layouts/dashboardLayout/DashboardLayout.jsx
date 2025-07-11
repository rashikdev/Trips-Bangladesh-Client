import { Outlet } from "react-router";
import SideBar from "./SideBar";
const DashboardLayout = () => {
  return (
    <div className="lg:flex relative">
      <div className="">
        <SideBar></SideBar>
      </div>
      <div className="border w-full">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default DashboardLayout;
