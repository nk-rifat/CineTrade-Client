import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const PrivilegedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <progress className="progress w-56"></progress>;
  }
  if (user && allowedRoles.includes(user?.role)) {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivilegedRoute;
