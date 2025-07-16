import { Outlet } from "react-router";
import SideBar from "./SideBar";
import DynamicTitle from "../../components/dynamicTitle/DynamicTitle";
const DashboardLayout = () => {
  return (
    <div className="lg:flex relative">
      <div className="">
        <SideBar></SideBar>
      </div>
      <div className="w-full">
        <DynamicTitle></DynamicTitle>
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default DashboardLayout;
