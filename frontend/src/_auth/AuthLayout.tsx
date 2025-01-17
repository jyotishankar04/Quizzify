import { Navigate, Outlet } from "react-router-dom";

const AuthLayout = () => {
  const isAuthenticated = false;
  return (
    <section id="" className="h-screen  overflow-hidden w-full bg-neutral-100">
      <div className="flex md:flex-row h-full items-stretch">
        {/* Pattern/Logo Side */}
        <div className="w-full hidden md:flex md:w-1/2 h-screen bg-[url('/public/assets/QuizzifyAuth.jpeg')] bg-cover bg-center   p-8  items-center justify-center relative overflow-hidden">
          <div className="relative z-10 text-center">
            {/* <img src="../../public" alt="" /> */}
            {/* <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Quiz Master
            </h1>
            <p className="text-white text-xl opacity-90">
              Create, Share, and Learn
            </p> */}
          </div>
        </div>
        {/* Forms Side */}
        {isAuthenticated ? (
          <Navigate to="/app" />
        ) : (
          <div className="w-full md:w-1/2 px-4 py-12 md:py-20 overflow-y-auto">
            <div className="max-w-md mx-auto">
              <Outlet />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default AuthLayout;
