import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
// import Home from "../Pages/Home"

const Layout = () => {
  return (
    <>
      <Header />
      {/* <Home /> */}
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
