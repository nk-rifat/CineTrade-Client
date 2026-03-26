import { useAuth } from "../hooks/useAuth";

const PartnerRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <span className="loading loading-spinner"></span>;

  if (!user || user.role !== "partner") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PartnerRoute;
