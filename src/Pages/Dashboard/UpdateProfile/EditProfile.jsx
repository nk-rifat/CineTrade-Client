import useCurrentUser from "../../../hooks/useCurrentUser";
import EditProfileForm from "./EditProfileForm";
import { FiLoader } from "react-icons/fi";

const EditProfile = () => {
  const { data: currentUser, isLoading, isError } = useCurrentUser();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <FiLoader className="text-sky-500 animate-spin text-4xl" />
      </div>
    );
  }

  if (isError || !currentUser) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        <p>Error loading profile. Please log in again.</p>
      </div>
    );
  }

  return <EditProfileForm key={currentUser?.id} user={currentUser} />;
};

export default EditProfile;
