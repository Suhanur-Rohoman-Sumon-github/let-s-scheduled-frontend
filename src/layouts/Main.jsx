import { Outlet } from "react-router-dom";
import Navbar from "../pages/shered/navbar/Navbar";
import Footer from "../pages/shered/footer/Footer";
import Chat from "../pages/DashBoard/user/chat/Chat";

const Main = () => {
  return (
    <div>
      <Navbar />
      <Chat />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Main;
