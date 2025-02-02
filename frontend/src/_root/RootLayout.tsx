import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/_root/Sidebar";
import { useEffect } from "react";
import { useAuthContext } from "../context/AuthContext";
import FooterByMe from "../components/FooterByMe";

const RootLayout = () => {
  const navigate = useNavigate();
  const { isAuthenticated, checkAuthUser, isLoading } = useAuthContext();
  useEffect(() => {
    // Prevent unnecessary calls by checking authentication state first
    if (!isAuthenticated) {
      checkAuthUser();
    }
  }, [isAuthenticated, checkAuthUser]);

  if (isLoading) {
    return (
      <div className="flex items-center flex-col gap-8 justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        <span className="sr-only text-black">Authenticating...</span>
      </div>
    );
  }

  return (
    <div className="w-full h-screen flex">
      <Sidebar />
      <div className="w-full h-full overflow-y-auto flex-grow">
        {isAuthenticated ? (
          <div className="flex flex-col h-full">
            <div className="flex-1 w-full overflow-y-auto">
              <Outlet />
            </div>
            <div className="">
              <FooterByMe />
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <h1 className="text-3xl font-semibold">Unauthorized</h1>
            <button
              className="btn btn-primary"
              onClick={() => navigate("/auth/signin")}
            >
              Login{" "}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RootLayout;
