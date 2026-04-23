import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  FiUsers,
  FiShield,
  FiShoppingBag,
  FiTrendingUp,
  FiPlusSquare,
  FiDollarSign,
  FiEye,
  FiShoppingCart,
} from "react-icons/fi";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";


// --- INTERNAL HELPERS ---
const InternalStatCard = ({ title, value, icon, color, detail }) => (
  <div className="relative overflow-hidden bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-3xl p-5 group transition-all">
    <div
      className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${color} opacity-10 blur-2xl group-hover:opacity-20 transition-opacity`}
    />
    <div className="relative flex flex-col gap-3">
      <div
        className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-white shadow-lg`}
      >
        {icon}
      </div>
      <div>
        <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">
          {title}
        </p>
        <h3 className="text-2xl font-black text-white mt-0.5">{value}</h3>
        {detail && (
          <p className="text-[9px] text-emerald-500 font-bold mt-1 uppercase italic">
            {detail}
          </p>
        )}
      </div>
    </div>
  </div>
);

const InternalChartCard = ({ title, subtitle, children, glow }) => (
  <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-[32px] p-6 lg:p-8 relative overflow-hidden shadow-2xl">
    <div
      className="absolute top-0 right-0 w-64 h-64 blur-[100px] -z-10 opacity-20"
      style={{ backgroundColor: glow }}
    />
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-white tracking-tight">{title}</h2>
      <p className="text-slate-500 text-sm font-medium mt-1 italic">
        {subtitle}
      </p>
    </div>
    <div className="h-[300px] w-full">{children}</div>
  </div>
);

const AdminHome = () => {
  const axiosSecure = useAxiosSecure();

  const { data, isLoading } = useQuery({
    queryKey: ["admin-dashboard"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/dashboard-summary");
      return res.data;
    },
  });

  if (isLoading)
    return (
      <div className="h-[80vh] flex justify-center items-center bg-[#0f172a]">
        <span className="loading loading-bars loading-lg text-amber-500"></span>
      </div>
    );

  const {
    stats = {},
    analytics = {},
    topMovies = [],
    recentTransactions = [],
  } = data || {};

  return (
    <div className="p-4 md:p-8 space-y-10 text-white min-h-screen bg-[#0f172a]">
      <header>
        <h1 className="text-4xl text-amber-500 font-bold tracking-tight">
          Admin <span className="text-white">Dashboard</span>
        </h1>
        <p className="text-slate-500 font-medium italic">
          Net income tracking and platform activity
        </p>
      </header>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-5">
        <InternalStatCard
          title="Total Users"
          value={stats.totalUsers || 0}
          icon={<FiUsers />}
          color="from-blue-600 to-indigo-500"
        />
        <InternalStatCard
          title="Partners"
          value={stats.totalPartners || 0}
          icon={<FiShield />}
          color="from-purple-600 to-pink-500"
        />
        <InternalStatCard
          title="Admin Sales"
          value={`$${(stats.adminMovieSales || 0).toFixed(2)}`}
          icon={<FiShoppingBag />}
          color="from-orange-500 to-red-500"
        />
        <InternalStatCard
          title="Partner 20%"
          value={`$${(stats.partnerProfit || 0).toFixed(2)}`}
          icon={<FiTrendingUp />}
          color="from-emerald-500 to-teal-400"
          detail="Commission"
        />
        <InternalStatCard
          title="Reg. Fees"
          value={`$${(stats.partnerFees || 0).toFixed(2)}`}
          icon={<FiPlusSquare />}
          color="from-cyan-500 to-blue-500"
        />
        <InternalStatCard
          title="Total Net"
          value={`$${(stats.totalEarnings || 0).toFixed(2)}`}
          icon={<FiDollarSign />}
          color="from-fuchsia-600 to-purple-600"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <InternalChartCard
          title="Net Profit Stream"
          subtitle="Monthly platform earnings"
          glow="#f59e0b"
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={analytics.sales || []}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#ffffff05"
                vertical={false}
              />
              <XAxis
                dataKey="month"
                axisLine={false}
                tick={{ fill: "#64748b", fontSize: 12 }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1e293b",
                  border: "none",
                  borderRadius: "12px",
                }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#f59e0b"
                strokeWidth={3}
                fill="#f59e0b30"
              />
            </AreaChart>
          </ResponsiveContainer>
        </InternalChartCard>

        <InternalChartCard
          title="Inventory Expansion"
          subtitle="Movies added per month"
          glow="#10b981"
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={analytics.movies || []}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#ffffff05"
                vertical={false}
              />
              <XAxis
                dataKey="month"
                axisLine={false}
                tick={{ fill: "#64748b", fontSize: 12 }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1e293b",
                  border: "none",
                  borderRadius: "12px",
                }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#10b981"
                strokeWidth={3}
                fill="#10b98130"
              />
            </AreaChart>
          </ResponsiveContainer>
        </InternalChartCard>
      </div>

      {/* Leaderboard & Recent Sales */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-10">
        {/* Most Sold */}
        <section className="bg-white/[0.03] border border-white/10 rounded-[32px] p-6 shadow-2xl">
          <h2 className="text-xl font-bold flex items-center gap-3 mb-8">
            <div className="p-2 bg-amber-500/20 rounded-lg">
              <FiTrendingUp className="text-amber-500" />
            </div>
            Top Sellers
          </h2>
          <div className="space-y-4">
            {topMovies.map((movie, idx) => (
              <div
                key={movie._id}
                className="flex items-center justify-between p-4 bg-white/[0.02] border border-white/5 rounded-2xl"
              >
                <div className="flex items-center gap-4">
                  <span
                    className={`text-xl font-black italic ${idx === 0 ? "text-amber-500" : "text-slate-700"}`}
                  >
                    {idx + 1}
                  </span>
                  <div className="w-12 h-12 rounded-xl overflow-hidden border border-white/10">
                    <img
                      src={movie.poster}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h4 className="text-sm font-bold text-slate-200 truncate max-w-[120px]">
                    {movie.title}
                  </h4>
                </div>
                <div className="text-right">
                  <p className="text-md font-black text-emerald-400">
                    {movie.sold || 0}
                  </p>
                  <p className="text-[9px] text-slate-500 font-bold uppercase">
                    Sold
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Recent Transactions Table */}
        <section className="bg-white/[0.03] border border-white/10 rounded-[32px] p-6 shadow-2xl">
          <h2 className="text-xl font-bold flex items-center gap-3 mb-8">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <FiShoppingCart className="text-blue-500" />
            </div>
            Recent Sales
          </h2>
          <div className="space-y-3">
            {recentTransactions.map((tx) => (
              <div
                key={tx._id}
                className="flex items-center justify-between p-4 border-b border-white/[0.05] last:border-0 group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 font-bold border border-white/10 group-hover:border-blue-500/50">
                    {tx.email?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-300 truncate w-32 md:w-48 group-hover:text-white">
                      {tx.email}
                    </p>
                    <p className="text-[10px] text-slate-500 font-medium">
                      {new Date(tx.createdAt).toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-md font-black text-white group-hover:text-amber-500 transition-colors">
                    +${tx.amount || "0.00"}
                  </p>
                  <span className="text-[9px] text-emerald-500 font-black uppercase tracking-widest bg-emerald-500/10 px-1.5 py-0.5 rounded">
                    Success
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminHome;
