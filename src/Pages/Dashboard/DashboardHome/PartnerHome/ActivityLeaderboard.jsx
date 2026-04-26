import React from "react";
import { FiTrendingUp, FiShoppingCart, FiEye } from "react-icons/fi";

const ActivityLeaderboard = ({ topMovies, recentTransactions }) => {
  // Glassmorphism utility classes
  const cardStyle =
    "bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-[32px] p-6 shadow-2xl transition-all duration-500";
  const itemStyle =
    "group flex items-center justify-between p-4 bg-white/[0.03] border border-white/5 rounded-2xl hover:bg-white/[0.07] hover:border-white/20 hover:-translate-y-1 transition-all duration-300";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-10">
      {/* Top Movies */}
      <section className={cardStyle}>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-bold flex items-center gap-3">
            <div className="p-2 bg-primary/20 rounded-lg">
              <FiTrendingUp className="text-primary" />
            </div>
            Top Performing
          </h2>
          <span className="text-[10px] text-slate-400 font-bold tracking-widest uppercase bg-white/5 px-3 py-1 rounded-full border border-white/5">
            Rankings
          </span>
        </div>

        <div className="space-y-4">
          {topMovies.length > 0 ? (
            topMovies.map((movie, idx) => (
              <div key={movie._id} className={itemStyle}>
                <div className="flex items-center gap-4">
                  <span
                    className={`text-xl font-black italic w-6 ${idx === 0 ? "text-primary" : "text-slate-600"}`}
                  >
                    {idx + 1}
                  </span>
                  <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-white/10 shadow-lg">
                    <img
                      src={movie.poster}
                      alt=""
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-200 group-hover:text-sky-500 transition-colors truncate max-w-35 md:max-w-xs">
                      {movie.title}
                    </h4>
                    <p className="text-[10px] text-slate-500 flex items-center gap-1 font-medium mt-0.5">
                      <FiEye className="text-slate-600" />{" "}
                      {movie.views?.toLocaleString()} views
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-md font-black text-emerald-400 leading-tight">
                    {movie.sold}
                  </p>
                  <p className="text-[9px] text-slate-500 font-bold uppercase tracking-tighter">
                    Sold
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-slate-500 text-sm text-center py-10 italic">
              No data available.
            </p>
          )}
        </div>
      </section>

      {/* Recent Transactions */}
      <section className={cardStyle}>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-bold flex items-center gap-3">
            <div className="p-2 bg-secondary/20 rounded-lg">
              <FiShoppingCart className="text-secondary" />
            </div>
            Recent Sales
          </h2>
          <div className="flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
              Live
            </span>
          </div>
        </div>

        <div className="space-y-3">
          {recentTransactions.length > 0 ? (
            recentTransactions.map((tx) => (
              <div
                key={tx._id}
                className="group flex items-center justify-between p-4 hover:bg-white/4 border-b border-white/5 last:border-0 transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-linear-to-br from-white/10 to-transparent flex items-center justify-center text-slate-300 text-sm font-bold border border-white/10 group-hover:border-secondary/40 transition-colors">
                    {tx.email?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-300 truncate w-32 md:w-48 group-hover:text-white transition-colors">
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
                  <p className="text-md font-black text-white group-hover:text-secondary transition-colors">
                    +${tx.amount}
                  </p>
                  <span className="text-[9px] text-emerald-500 font-black uppercase tracking-widest">
                    Success
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-slate-500 text-sm text-center py-10 italic">
              No recent activity.
            </p>
          )}
        </div>
      </section>
    </div>
  );
};

export default ActivityLeaderboard;
