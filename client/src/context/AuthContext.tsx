import { createContext, useState, ReactNode, useEffect } from "react";
import { registerRequest, loginRequest } from "../api/auth";
import { AxiosError } from "axios";

interface User {
  username: string;
  email: string;
  password: string;
}

export interface AuthContextProps {
  signup: (user: object) => Promise<void>;
  signin: (user: object) => Promise<void>;
  user: User | null;
  isAuthenticated: boolean;
  errors: string[] | null;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [errors, setErrors] = useState<string[] | null>(null);

  const signup = async (user: object) => {
    try {
      const res = await registerRequest(user);
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (error) {
      if (error instanceof AxiosError) {
        setErrors(error.response?.data);
      }
    }
  };

  const signin = async (user: object) => {
    try {
      const res = await loginRequest(user);
      console.log(res);
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        if (Array.isArray(error.response?.data)) {
          return setErrors(error.response?.data as []);
        }
        setErrors([error.response?.data.message]);
      }
    }
  };

  useEffect(() => {
    if (errors && errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  return (
    <AuthContext.Provider
      value={{
        signup,
        signin,
        user,
        isAuthenticated,
        errors,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
