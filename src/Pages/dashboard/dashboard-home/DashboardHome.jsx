import Loading from "../../../Components/Shared/Loading";
import useCurrentUser from "../../../hooks/useCurrentUser";
import AdminHome from "./admin/AdminHome";
import PartnerHome from "./partner/PartnerHome";
import UserHome from "./user/UserHome";

const DashboardHome = () => {
  const { data: currentUser, isLoading } = useCurrentUser();

  if (isLoading) return <Loading fullPage={true} />;

  const role = currentUser?.role;

  if (role === "admin") return <AdminHome />;
  if (role === "partner") return <PartnerHome />;
  return <UserHome />;
};

export default DashboardHome;
