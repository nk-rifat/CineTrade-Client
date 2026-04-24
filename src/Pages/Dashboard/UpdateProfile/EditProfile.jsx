import Loading from "../../../Components/Shared/Loading";
import useCurrentUser from "../../../hooks/useCurrentUser";
import EditProfileForm from "./EditProfileForm";
import { FiLoader } from "react-icons/fi";

const EditProfile = () => {
  const { data: currentUser, isLoading, isError } = useCurrentUser();

  if (isLoading) return <Loading fullPage={true} />;

  if (isError || !currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <p>Error loading profile. Please log in again.</p>
      </div>
    );
  }

  return <EditProfileForm key={currentUser?.id} user={currentUser} />;
};

export default EditProfile;
