import { useQuery } from "@tanstack/react-query";
import axiosPublic from "../../../api/axios";
import { FaUsers } from "react-icons/fa";

const ManageUsers = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosPublic.get("/users");
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-3">
        <span className="loading loading-spinner loading-lg text-indigo-500"></span>
        <p className="text-slate-400 font-medium animate-pulse">
          Fetching user directory...
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-9xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <h2 className="text-4xl font-black text-white tracking-tight flex items-center gap-3">
          <FaUsers className="text-amber-500" />
          Manage Users
        </h2>
      </div>
    </div>
  );
};

export default ManageUsers;
