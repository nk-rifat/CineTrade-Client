import { FaUserShield, FaBan } from "react-icons/fa";

const UserRow = ({ user, index, handleUpdate }) => {
  const roleStyles = {
    admin: "bg-rose-600/20 uppercase text-rose-600 hover:bg-rose-600/30",
    partner: "bg-amber-400/20 text-amber-500 hover:bg-amber-400/30",
    user: "bg-slate-700/20 text-slate-300 hover:bg-slate-700/30",
  };

  const handlePromote = () => {
    handleUpdate(user._id, { role: "admin" });
  };

  const handleStatusToggle = () => {
    const newStatus = user.status === "banned" ? "active" : "banned";
    handleUpdate(user._id, { status: newStatus });
  };

  return (
    <tr className="hover:bg-gray-800 transition-colors group">
      <td className="pl-8 text-gray-300 font-mono">{index + 1}</td>
      <td>
        <div className="flex flex-col">
          <span className="font-bold text-slate-200 group-hover:text-sky-400 transition-colors">
            {user?.fullName || "Anonymous"}
          </span>
          <span className="text-xs text-slate-500 tracking-wide">
            {user?.email}
          </span>
        </div>
      </td>
      <td>
        <span
          className={`badge badge-md font-semibold border-none py-4 px-4 rounded-lg transition-all ${roleStyles[user?.role] || roleStyles?.user}`}
        >
          {user.role}
        </span>
      </td>
      <td>
        <div className="flex items-center gap-2">
          <span
            className={`h-2 w-2 rounded-full ${user?.status === "banned" ? "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]" : "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"}`}
          />
          <span
            className={`text-xs font-medium uppercase ${user?.status === "banned" ? "text-red-400" : "text-emerald-400"}`}
          >
            {user?.status}
          </span>
        </div>
      </td>
      <td className="pr-8">
        {/* Only show actions if the user is NOT an admin */}
        {user?.role !== "admin" && (
          <div className="flex justify-center gap-1">
            <ActionButton
              onClick={handlePromote}
              icon={<FaUserShield size={18} />}
              tip="Promote to Admin"
              color="text-amber-500"
            />

            <div className="w-px bg-slate-700 h-4 self-center mx-1"></div>

            <ActionButton
              onClick={handleStatusToggle}
              icon={<FaBan size={16} />}
              tip={user?.status === "banned" ? "Unban" : "Restrict"}
              color={
                user?.status === "banned" ? "text-emerald-500" : "text-rose-500"
              }
            />
          </div>
        )}
      </td>
    </tr>
  );
};

// Small sub-component for buttons to keep Row clean
const ActionButton = ({ icon, tip, color, onClick }) => (
  <div className="tooltip tooltip-top" data-tip={tip}>
    <button
      onClick={onClick}
      className={`btn btn-ghost btn-sm btn-square ${color} hover:bg-white/10`}
    >
      {icon}
    </button>
  </div>
);

export default UserRow;
