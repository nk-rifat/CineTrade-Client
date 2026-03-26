import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";


const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <span className="loading loading-spinner"></span>;

  if (!user || user.role !== "admin") {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};

export default AdminRoute;
