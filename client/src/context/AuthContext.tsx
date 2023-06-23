import { createContext, useState, ReactNode } from "react";
import { registerRequest } from "../api/auth";
import { AxiosError } from "axios";

interface User {
  username: string;
  email: string;
  password: string;
}

export interface AuthContextProps {
  signup: (user: object) => Promise<void>;
  user: User | null;
  isAuthenticated: boolean;
  errors: [] | null;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [errors, setErrors] = useState<[] | null>(null);

  const signup = async (user: object) => {
    try {
      const res = await registerRequest(user);
      console.log(res.data);
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response?.data);
        setErrors(error.response?.data);
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        signup,
        user,
        isAuthenticated,
        errors,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
