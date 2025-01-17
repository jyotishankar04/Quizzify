import { Outlet } from "react-router-dom";
import Sidebar from "../components/_root/Sidebar";

const RootLayout = () => {
  return (
    <div className="w-full h-screen flex">
      <Sidebar />
      <div className="w-full h-full overflow-y-auto flex-grow">
        <Outlet />
      </div>
    </div>
  );
};

export default RootLayout;
