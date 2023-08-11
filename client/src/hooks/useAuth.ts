import { useContext } from "react";
import { AuthContextProps, AuthContext } from "../context/AuthContext";

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
