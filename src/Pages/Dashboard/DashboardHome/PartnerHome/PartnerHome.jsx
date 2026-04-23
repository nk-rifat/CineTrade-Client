import { useQuery } from "@tanstack/react-query";
import {
  FiActivity,
  FiCheckCircle,
  FiDollarSign,
  FiZap,
  FiTrendingUp,
  FiLayers,
} from "react-icons/fi";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import StatCard from "./StatCard";
import { ChartCard, ModernAreaChart } from "./PartnerCharts";
import ActivityLeaderboard from "./ActivityLeaderboard";

const PartnerHome = () => {
  const axiosSecure = useAxiosSecure();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["partner-dashboard"],
    queryFn: async () => {
      const res = await axiosSecure.get("/partner/dashboard");
      return res.data;
    },
  });

  if (isLoading)
    return (
      <div className="h-[60vh] flex justify-center items-center">
        <span className="loading loading-bars loading-lg text-primary"></span>
      </div>
    );

  if (isError)
    return (
      <div className="p-10 text-error bg-error/10 rounded-2xl border border-error/20">
        Critical error loading dashboard.
      </div>
    );

  const {
    stats = {},
    analytics = { earnings: [], sales: [] },
    topMovies = [],
    recentTransactions = [],
  } = data || {};

  return (
    <div className="p-4 md:p-8 space-y-10 text-white min-h-screen">
      <header>
        <h1 className="text-4xl text-amber-500 font-semibold">
          Partner Dashboard
        </h1>
        <p className="text-slate-500 font-medium italic">
          Performance metrics & sales activity
        </p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-5">
        <StatCard
          title="Total Movies"
          value={stats.totalMovies || 0}
          icon={<FiLayers />}
          color="from-blue-600 to-indigo-500"
        />
        <StatCard
          title="Approved"
          value={stats.approved || 0}
          icon={<FiCheckCircle />}
          color="from-emerald-500 to-teal-400"
          detail={`Rel: ${stats.releasedCount || 0} | Up: ${stats.upcomingCount || 0}`}
        />
        <StatCard
          title="Pending"
          value={stats.pending || 0}
          icon={<FiActivity />}
          color="from-amber-500 to-orange-400"
        />
        <StatCard
          title="Total Sales"
          value={stats.totalSales || 0}
          icon={<FiTrendingUp />}
          color="from-pink-500 to-rose-500"
        />
        <StatCard
          title="Earnings"
          value={`$${stats.earnings || 0}`}
          icon={<FiDollarSign />}
          color="from-fuchsia-600 to-purple-500"
        />
        <StatCard
          title="Total Views"
          value={stats.views || 0}
          icon={<FiZap />}
          color="from-cyan-500 to-blue-500"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ChartCard
          title="Revenue Flow"
          subtitle="Earnings over time"
          glow="rgba(168, 85, 247, 0.15)"
        >
          <ModernAreaChart data={analytics.earnings || []} color="#a855f7" />
        </ChartCard>
        <ChartCard
          title="Sales Trend"
          subtitle="Monthly unit volume"
          glow="rgba(16, 185, 129, 0.15)"
        >
          <ModernAreaChart data={analytics.sales || []} color="#10b981" />
        </ChartCard>
      </div>

      <ActivityLeaderboard
        topMovies={topMovies}
        recentTransactions={recentTransactions}
      />
    </div>
  );
};

export default PartnerHome;
