import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FaUsers } from "react-icons/fa";
import UserStats from "./UserStats";
import UserTable from "./UserTable";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../Components/Shared/Loading";

const ManageUsers = () => {
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();

  const { data, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/users");
      return res.data;
    },
  });

  const users = data?.data || data || [];

  // Mutation for updating user status
  const updateUserMutation = useMutation({
    mutationFn: async ({ userId, updateData }) => {
      const res = await axiosSecure.patch(
        `/admin/manage-user/${userId}`,
        updateData,
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      Swal.fire("Updated!", "User record has been modified.", "success");
    },
    onError: (error) => {
      Swal.fire(
        "Error",
        error.response?.data?.message || "Action failed",
        "error",
      );
    },
  });

  const handleUpdate = (userId, updateData) => {
    const isBanAction = updateData.status === "banned";
    const isRoleAction = !!updateData.role;

    Swal.fire({
      title: "Are you sure?",
      text: isBanAction
        ? "This user will be restricted from logging into the platform!"
        : `You are about to change this user's ${isRoleAction ? "role" : "status"}.`,
      icon: isBanAction ? "warning" : "question",
      showCancelButton: true,
      confirmButtonColor: isBanAction ? "#ef4444" : "#6366f1",
      cancelButtonColor: "#334155",
      confirmButtonText: "Yes, proceed!",
      background: "#0f172a",
      color: "#f8fafc",
    }).then((result) => {
      if (result.isConfirmed) {
        updateUserMutation.mutate({ userId, updateData });
      }
    });
  };

  if (isLoading) return <Loading message="Fetching User..." fullPage={true} />;

  return (
    <div className="p-6 max-w-9xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <h2 className="text-4xl font-black text-white tracking-tight flex items-center gap-3">
          <FaUsers className="text-amber-500" />
          Manage Users
        </h2>
        <UserStats totalUsers={users.length} />
      </div>
      <UserTable users={users} handleUpdate={handleUpdate} />
    </div>
  );
};

export default ManageUsers;
