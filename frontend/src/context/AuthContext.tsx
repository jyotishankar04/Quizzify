// import { createContext, useContext, useEffect, useState } from "react";
// import { TContextType } from "../types";

// export const INITIAL_USER = {
//   id: "",
//   name: "",
//   email: "",
//   role: "",
//   imageUrl: "",
// };

// const INITIAL_STATE = {
//   isAuthenticated: false,
//   user: INITIAL_USER,
//   isLoading: false,
//   setUser: () => {},
//   setIsAuthenticated: () => {},
//   checkAuthUser: async () => false as boolean,
// };

// const AuthContext = createContext<TContextType>(INITIAL_STATE);

// const AuthProvider = ({ children }: { children: React.ReactNode }) => {
//   const [user, setUser] = useState(INITIAL_USER);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   const checkAuthUser = async () => {
//     setIsLoading(true);
//     try {
//       // Simulate API call
//       const response = await new Promise((resolve) =>
//         setTimeout(
//           () => resolve({ isAuthenticated: true, user: INITIAL_USER }),
//           1000
//         )
//       );
//       setIsAuthenticated(response.isAuthenticated);
//       setUser(response.user);
//       return response.isAuthenticated;
//     } catch (error) {
//       console.error(error);
//       return false;
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const value = {
//     user,
//     setUser,
//     isAuthenticated,
//     setIsAuthenticated,
//     isLoading,
//     checkAuthUser,
//   };
//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };

// export default AuthContext;
