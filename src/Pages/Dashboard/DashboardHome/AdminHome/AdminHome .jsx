import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  FiUsers,
  FiShield,
  FiShoppingBag,
  FiTrendingUp,
  FiPlusSquare,
  FiDollarSign,
} from "react-icons/fi";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import StatCard from "../PartnerHome/StatCard";
import { ChartCard, ModernAreaChart } from "../PartnerHome/PartnerCharts";
import ActivityLeaderboard from "../PartnerHome/ActivityLeaderboard";

const AdminHome = () => {
  const axiosSecure = useAxiosSecure();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["admin-dashboard"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/dashboard-summary");
      return res.data;
    },
  });

  // --- LOADING STATE ---
  if (isLoading)
    return (
      <div className="h-[80vh] flex justify-center items-center bg-[#0f172a]">
        <span className="loading loading-bars loading-lg text-amber-500"></span>
      </div>
    );

  // --- ERROR STATE ---
  if (isError)
    return (
      <div className="h-[80vh] flex justify-center items-center bg-[#0f172a] p-10">
        <div className="text-error bg-error/10 border border-error/20 p-6 rounded-2xl">
          <p className="font-bold text-lg">Error loading Admin Data</p>
          <p className="text-sm opacity-70 italic">
            Please verify your connection or admin permissions.
          </p>
        </div>
      </div>
    );

  const {
    stats = {},
    analytics = { sales: [], movies: [] },
    topMovies = [],
    recentTransactions = [],
  } = data || {};

  return (
    <div className="p-4 md:p-8 space-y-10 text-white min-h-screen bg-[#0f172a]">
      {/* Header Section */}
      <header>
        <h1 className="text-4xl text-amber-500 font-bold tracking-tight">
          Admin <span className="text-white">Dashboard</span>
        </h1>
        <p className="text-slate-500 font-medium italic">
          Net income tracking and platform activity
        </p>
      </header>

      {/* Stats Cards - Reusing StatCard */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-5">
        <StatCard
          title="Total Users"
          value={stats.totalUsers || 0}
          icon={<FiUsers />}
          color="from-blue-600 to-indigo-500"
        />
        <StatCard
          title="Partners"
          value={stats.totalPartners || 0}
          icon={<FiShield />}
          color="from-purple-600 to-pink-500"
        />
        <StatCard
          title="Admin Sales"
          value={`$${(stats.adminMovieSales || 0).toFixed(2)}`}
          icon={<FiShoppingBag />}
          color="from-orange-500 to-red-500"
        />
        <StatCard
          title="Partner 20%"
          value={`$${(stats.partnerProfit || 0).toFixed(2)}`}
          icon={<FiTrendingUp />}
          color="from-emerald-500 to-teal-400"
          detail="Commission"
        />
        <StatCard
          title="Reg. Fees"
          value={`$${(stats.partnerFees || 0).toFixed(2)}`}
          icon={<FiPlusSquare />}
          color="from-cyan-500 to-blue-500"
        />
        <StatCard
          title="Total Net"
          value={`$${(stats.totalEarnings || 0).toFixed(2)}`}
          icon={<FiDollarSign />}
          color="from-fuchsia-600 to-purple-600"
        />
      </div>

      {/* Charts Section - Reusing ChartCard and ModernAreaChart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ChartCard
          title="Net Profit Stream"
          subtitle="Monthly platform earnings"
          glow="rgba(245, 158, 11, 0.15)"
        >
          <ModernAreaChart data={analytics.sales || []} color="#f59e0b" />
        </ChartCard>

        <ChartCard
          title="Inventory Expansion"
          subtitle="Movies added per month"
          glow="rgba(16, 185, 129, 0.15)"
        >
          <ModernAreaChart data={analytics.movies || []} color="#10b981" />
        </ChartCard>
      </div>

      {/* Leaderboard & Recent Sales - Reusing ActivityLeaderboard */}
      <ActivityLeaderboard
        topMovies={topMovies}
        recentTransactions={recentTransactions}
      />
    </div>
  );
};

export default AdminHome;
