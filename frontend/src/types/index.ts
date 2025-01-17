/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

export type TContextType = {
  user: any;
  isLoading: boolean;
  isAuthenticated: boolean;
  setUser: React.Dispatch<React.SetStateAction<any>>;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  checkAuthUser: () => Promise<boolean>;
};
