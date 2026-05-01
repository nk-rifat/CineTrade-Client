import Navbar from "../components/layout/navbar/Navbar";
import Footer from "../components/layout/footer/Footer";
import { useEffect } from "react";
import { getPageTitle } from "../utils/getPageTitle";
import { Outlet, useLocation } from "react-router-dom";

const RootLayout = () => {
  const location = useLocation();

  useEffect(() => {
    document.title = `CineTrade - ${getPageTitle(location.pathname)}`;
  }, [location.pathname]);

  return (
    <div>
      <Navbar />
      <Outlet></Outlet>
      <Footer />
    </div>
  );
};

export default RootLayout;
