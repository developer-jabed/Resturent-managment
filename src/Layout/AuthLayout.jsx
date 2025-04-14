import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";



const AuthLayout = () => {
  return <div>
    <header>
      <Navbar></Navbar>
    </header>
    
    <Outlet />
    <Footer></Footer>
  </div>;
};

export default AuthLayout;
