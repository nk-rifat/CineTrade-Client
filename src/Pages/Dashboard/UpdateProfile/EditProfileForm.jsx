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

const EditProfileForm = ({ user }) => {
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();

  const [fullName, setFullName] = useState(user?.fullName || "");
  const [preview, setPreview] = useState(user?.profilePic || "");
  const [image, setImage] = useState(null);

  const uploadToImgBB = async (file) => {
    const formData = new FormData();
    formData.append("image", file);
    const apiKey = import.meta.env.VITE_IMGBB_API_KEY;
    const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    return data.data.url;
  };

  const mutation = useMutation({
    mutationFn: async () => {
      let imageUrl = preview;
      if (image) {
        imageUrl = await uploadToImgBB(image);
      }

      const res = await axiosSecure.patch(`/users/update-profile/${user.id}`, {
        fullName,
        profilePic: imageUrl,
      });
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 text-white">
      <div className="w-full max-w-md bg-slate-900 border border-white/10 p-8 rounded-3xl shadow-2xl">
        <h2 className="text-2xl font-bold mb-6 text-center">Edit Profile</h2>

        {/* Avatar Section */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <img
              src={preview}
              className="w-28 h-28 rounded-full object-cover ring-4 ring-sky-500/20"
              alt="Avatar"
            />
            <label className="absolute bottom-0 right-0 bg-sky-500 p-2 rounded-full cursor-pointer hover:bg-sky-600 transition">
              <FiCamera />
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
            <label className="text-sm font-semibold mb-2 block flex items-center gap-2">
              <FiUser className="text-sky-500" /> Full Name
            </label>
            <input
              type="text"
              className="w-full bg-slate-800 border border-white/5 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500/50"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          <div className="opacity-50">
            <label className="text-sm font-semibold mb-2 block flex items-center gap-2">
              <FiMail /> Email (Read-only)
            </label>
            <div className="bg-black/20 px-4 py-3 rounded-xl border border-white/5">
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

          <button
            onClick={() => mutation.mutate()}
            disabled={mutation.isPending}
            className="w-full py-4 mt-4 bg-sky-600 hover:bg-sky-700 disabled:opacity-50 font-bold rounded-xl transition flex items-center justify-center gap-2"
          >
            {mutation.isPending ? (
              <FiLoader className="animate-spin" />
            ) : (
              "Save Changes"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfileForm;
