import useCurrentUser from "../../hooks/useCurrentUser";
import UserHome from "./UserHome";
import PartnerHome from "./PartnerHome";
import AdminHome from "./AdminHome";

const DashboardHome = () => {
  const { data: currentUser, isLoading } = useCurrentUser();

  if (isLoading) return <span className="loading loading-spinner"></span>;

  const role = currentUser?.role;

  if (role === "admin") return <AdminHome />;
  if (role === "partner") return <PartnerHome />;
  return <UserHome />;
};

export default DashboardHome;
