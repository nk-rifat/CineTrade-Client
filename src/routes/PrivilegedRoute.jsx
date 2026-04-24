import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Loading from "../Components/Shared/Loading";

const PrivilegedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <Loading message="Verifying Access..." fullPage={true} />;
  }

  if (user && allowedRoles.includes(user?.role)) {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivilegedRoute;
