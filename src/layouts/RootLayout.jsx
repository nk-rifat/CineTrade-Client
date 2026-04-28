import { Outlet } from "react-router";
import Navbar from "../components/layout/navbar/Navbar";
import Footer from "../components/layout/footer/Footer";


const RootLayout = () => {
  return (
    <div>
      <Navbar />
      <Outlet></Outlet>
      <Footer />
    </div>
  );
};

export default RootLayout;
