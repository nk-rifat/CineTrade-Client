import { FaUserCheck } from "react-icons/fa";

const UserStats = ({ totalUsers }) => (
  <div className="bg-slate-800/50 border border-slate-700 px-5 py-2 rounded-2xl flex items-center gap-3">
    <div className="p-2 bg-indigo-500/10 rounded-lg text-amber-500">
      <FaUserCheck size={20} />
    </div>
    <div>
      <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">
        Total Users
      </p>
      <p className="text-xl font-bold text-white leading-none">{totalUsers}</p>
    </div>
  </div>
);

export default UserStats;
