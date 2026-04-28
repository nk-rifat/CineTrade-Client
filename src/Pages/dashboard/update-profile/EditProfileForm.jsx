import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import {
  FiCamera,
  FiUser,
  FiMail,
  FiShield,
  FiLoader,
  FiCheckCircle,
} from "react-icons/fi";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { uploadImage } from "../../../../src/utils/uploadImage";

const EditProfileForm = ({ user }) => {
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();

  const [fullName, setFullName] = useState(user?.fullName || "");
  const [preview, setPreview] = useState(user?.profilePic || "");
  const [image, setImage] = useState(null);

  const mutation = useMutation({
    mutationFn: async (updatedData) => {
      const res = await axiosSecure.patch(
        `/users/update-profile/${user.id}`,
        updatedData,
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["currentUser"]);
      Swal.fire({
        icon: "success",
        title: "Profile Updated",
        background: "#0f172a",
        color: "#fff",
        timer: 1500,
        showConfirmButton: false,
      });
    },
    onError: (err) => {
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: err.response?.data?.message || "Something went wrong",
        background: "#0f172a",
        color: "#fff",
      });
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let imageUrl = preview;
      if (image) {
        imageUrl = await uploadImage(image);
      }
      mutation.mutate({
        fullName,
        profilePic: imageUrl,
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Upload Failed",
        text: err.message || "Could not upload image to ImgBB",
        background: "#0f172a",
        color: "#fff",
      });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 text-white">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md border border-white/10 p-8 rounded-3xl shadow-2xl"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-white">
          Edit Profile
        </h2>

        {/* Avatar Section */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <img
              src={preview}
              className="w-28 h-28 rounded-full object-cover ring-4 ring-sky-500/20"
              alt="Avatar"
            />
            <label className="absolute bottom-0 right-0 bg-sky-500 p-2 rounded-full cursor-pointer hover:bg-sky-600 transition shadow-lg">
              <FiCamera className="text-white" />
              <input
                type="file"
                className="hidden"
                onChange={handleImageChange}
                accept="image/*"
              />
            </label>
          </div>
        </div>

        {/* Form Controls */}
        <div className="space-y-4">
          <div>
            <label className="text-sm font-semibold mb-2 block items-center gap-2 text-gray-300">
              <FiUser className="text-sky-500" /> Full Name
            </label>
            <input
              type="text"
              className="w-full bg-slate-800 border border-white/5 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500/50 transition-all text-white"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="opacity-60">
            <label className="text-sm font-semibold mb-2 block items-center gap-2 text-gray-300">
              <FiMail /> Email (Read-only)
            </label>
            <div className="bg-black/20 px-4 py-3 rounded-xl border border-white/5 text-gray-400">
              {user?.email}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-400 flex items-center gap-2">
              <FiShield className="text-sky-500" /> Account Role
            </label>
            <div className="flex items-center gap-2 bg-sky-500/5 border border-sky-500/20 px-4 py-3 rounded-xl">
              <span className="text-sky-400 font-bold uppercase tracking-widest text-xs">
                {user?.role}
              </span>
            </div>
          </div>

          {/* Button type must be "submit" */}
          <button
            type="submit"
            disabled={mutation.isPending}
            className="btn-primary-gradient"
          >
            {mutation.isPending ? (
              <>
                <FiLoader className="animate-spin text-xl" />
                <span>Updating Profile...</span>
              </>
            ) : (
              "Save Changes"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfileForm;
