import React from "react";
import { Outlet } from "react-router";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/Footer/Footer";
import DynamicTitle from "../components/dynamicTitle/DynamicTitle";

const MainLayout = () => {
  return (
    <div>
      <DynamicTitle></DynamicTitle>
      <Navbar />
      <main>
        <Outlet></Outlet>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default MainLayout;
