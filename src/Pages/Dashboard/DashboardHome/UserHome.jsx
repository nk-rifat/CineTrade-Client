import { Link } from "react-router-dom";
import { Play, CreditCard, Film, ArrowRight, Star, Clock } from "lucide-react";
import usePurchasedMovies from "../../../hooks/usePurchasedMovies";

const UserHome = () => {
  const { purchaseMovies, isLoading, currentUser } = usePurchasedMovies();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  const totalSpent = purchaseMovies.reduce((sum, m) => sum + (m.price || 0), 0);
  const recentPurchaseMovies = [...purchaseMovies].reverse().slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-10 animate-in fade-in duration-500">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-[2rem] bg-slate-900 p-8 shadow-2xl border border-white/5 group">
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/20 rounded-full blur-[80px] group-hover:bg-primary/30 transition-colors duration-500" />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-secondary/10 rounded-full blur-[80px]" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="avatar">
              <div className="w-16 rounded-2xl ring ring-primary ring-offset-base-100 ring-offset-2 shadow-xl">
                {currentUser?.profilePic ? (
                  <img src={currentUser.profilePic} alt="profile" />
                ) : (
                  <div className="bg-neutral-focus text-neutral-content grid place-items-center w-full h-full text-2xl font-black">
                    {currentUser?.fullName?.charAt(0)}
                  </div>
                )}
              </div>
            </div>

            <div>
              <h2 className="text-4xl font-extrabold tracking-tight text-white">
                Welcome back,{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                  {currentUser?.fullName?.split(" ")[0]}
                </span>
                !
              </h2>
              <p className="text-slate-400 mt-1 font-medium">
                You have successfully curated a collection of{" "}
                {purchaseMovies.length} movies.
              </p>
            </div>
          </div>

          <Link
            to="/all-movies"
            className="btn btn-primary btn-lg rounded-xl px-10 border-none shadow-xl shadow-primary/20 hover:shadow-primary/40 hover:scale-[1.02] transition-all active:scale-95"
          >
            Browse All Movies
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-4">
        {/* Total Movies */}
        <div className="group relative rounded-[2.5rem] bg-white p-2 transition-all duration-500 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)]">
          <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-blue-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="relative h-full rounded-[2.3rem] bg-white p-8 border border-slate-100 flex items-center gap-6">
            <div className="relative flex-shrink-0 w-20 h-20 rounded-3xl bg-blue-50 flex items-center justify-center text-blue-600 transition-all duration-500 group-hover:bg-blue-600 group-hover:text-white group-hover:rotate-6 group-hover:scale-110">
              <Film size={32} strokeWidth={2} />
              <div className="absolute top-1 left-1 w-full h-full bg-white/20 rounded-3xl blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            <div className="flex flex-col">
              <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-slate-400 mb-1">
                Total Movie Purchase
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-black tracking-tighter text-slate-900 leading-none">
                  {purchaseMovies.length}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/*Total Spent */}
        <div className="group relative rounded-[2.5rem] bg-white p-2 transition-all duration-500 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)]">
          <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-emerald-500 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="relative h-full rounded-[2.3rem] bg-white p-8 border border-slate-100 flex items-center gap-6">
            <div className="relative flex-shrink-0 w-20 h-20 rounded-3xl bg-emerald-50 flex items-center justify-center text-emerald-600 transition-all duration-500 group-hover:bg-emerald-600 group-hover:text-white group-hover:-rotate-6 group-hover:scale-110">
              <CreditCard size={32} strokeWidth={2} />
              <div className="absolute top-1 left-1 w-full h-full bg-white/20 rounded-3xl blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            <div className="flex flex-col">
              <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-slate-400 mb-1">
                Total Spend
              </span>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold text-emerald-500">$</span>
                <span className="text-5xl font-black tracking-tighter text-slate-900 leading-none">
                  {totalSpent.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 🎬 Recent Titles */}
      <section className="space-y-6">
        <div className="flex justify-between items-end">
          <div>
            <h3 className="text-2xl font-black tracking-tight flex items-center gap-2">
              <Clock className="text-amber-500" /> Recent Purchases
            </h3>
          </div>
          <Link
            to="/dashboard/my-movies"
            className="text-sm font-bold text-amber-500 flex items-center gap-1 hover:underline group"
          >
            View All Purchase{" "}
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </div>

        {purchaseMovies.length === 0 ? (
          <div className="py-20 text-center bg-base-200/50 rounded-[3rem] border-2 border-dashed border-base-300">
            <p className="text-base-content/50 font-medium">
              No movies purchase yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {recentPurchaseMovies.map((movie) => (
              <div key={movie._id} className="group">
                <div className="relative aspect-[2/3] overflow-hidden rounded-[2rem] shadow-lg transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-primary/20">
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-4">
                    <Link
                      to={`/movie/watch/${movie._id}`}
                      className="btn btn-circle btn-primary btn-lg shadow-xl shadow-primary/40 scale-75 group-hover:scale-100 transition-transform"
                    >
                      <Play fill="currentColor" size={28} />
                    </Link>
                  </div>
                </div>
                <div className="mt-4 px-2 text-center md:text-left">
                  <h4 className="font-bold text-lg truncate">{movie.title}</h4>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default UserHome;
