import Loading from "../../../Components/Shared/Loading";
import useCurrentUser from "../../../hooks/useCurrentUser";
import AdminHome from "./AdminHome/AdminHome ";
import PartnerHome from "./PartnerHome/PartnerHome";
import UserHome from "./UserHome";

const DashboardHome = () => {
  const { data: currentUser, isLoading } = useCurrentUser();

  if (isLoading) return <Loading fullPage={true} />;

  const role = currentUser?.role;

  if (role === "admin") return <AdminHome />;
  if (role === "partner") return <PartnerHome />;
  return <UserHome />;
};

export default DashboardHome;
