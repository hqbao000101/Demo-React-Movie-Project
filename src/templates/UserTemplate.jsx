import React from "react";
import Header from "../Components/Header/Header";
import { Outlet } from "react-router-dom";
import Footer from "../Components/Footer/Footer";

const UserTemplate = () => {
  return (
    <div className="flex flex-col justify-between min-h-screen">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default UserTemplate;
