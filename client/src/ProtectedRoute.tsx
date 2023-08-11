import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";

const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuth();
  console.log(loading);

  if (loading) {
    return <h1>Loading...</h1>;
  }
  if (!loading && !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
