import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { HiOutlineArrowLeft, HiOutlineExclamationCircle } from "react-icons/hi";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import WatchMoviePlayer from "./Components/WatchMoviePlayer";
import Loading from "../../Components/Shared/Loading";
import Error from "../../Components/Shared/Error";
import { formatMinutesToHours } from "../../utils/formatMinutesToHours";
import { useEffect } from "react";

const WatchMovie = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const {
    data: movie,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["movie", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/movies/${id}`);
      return res.data;
    },
    enabled: !!id,
    retry: 1,
  });

  useEffect(() => {
    document.title = "CineTrade - Watch Movie";
  }, []);

  if (isLoading) {
    return <Loading message="Buffering Stream..." fullPage={true} />;
  }

  if (movie?.release_status === "upcoming") {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-linear-to-br from-black via-slate-900 to-black text-white p-6 text-center">
        <HiOutlineExclamationCircle className="w-16 h-16 text-sky-500 mb-6 animate-pulse" />
        <h2 className="text-3xl font-black uppercase italic tracking-tighter">
          Content Locked
        </h2>
        <p className="text-gray-400 mt-2 max-w-md">
          You have successfully pre-ordered{" "}
          <span className="text-white font-bold">{movie?.title}</span>. The
          player will unlock on the official release date.
        </p>
        <button
          onClick={() => navigate(-1)}
          className="mt-8 px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-sky-500 hover:text-white transition-all"
        >
          Return
        </button>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="h-screen flex items-center justify-center bg-black p-6">
        <Error
          message={
            error?.message ||
            "We couldn't connect to the secure streaming server."
          }
          onRetry={refetch}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-black via-slate-900 to-black text-white">
      {/* Header */}
      <nav className="p-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-white/60 hover:text-white transition group"
        >
          <HiOutlineArrowLeft
            className="group-hover:-translate-x-1 transition-transform"
            size={20}
          />
          <span className="font-semibold tracking-wide text-amber-500">
            Exit Player
          </span>
        </button>
      </nav>

      {/*Video Player Component */}
      <WatchMoviePlayer src={movie?.videoUrl} poster={movie?.poster} />

      {/* Info Section */}
      <div className="max-w-6xl mx-auto px-6 mt-10 pb-20">
        <div className="flex items-center gap-3 mb-4">
          <span className="px-2 py-0.5 border border-sky-500/50 text-amber-500 text-[10px] font-black rounded uppercase tracking-wider">
            {movie?.release_status || "Released"}
          </span>
          <span className="text-gray-400 text-sm font-medium">
            {movie?.release_year} • {formatMinutesToHours(movie?.duration)}
          </span>
        </div>

        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter italic mb-4 text-transparent bg-clip-text bg-linear-to-b from-white to-gray-500">
          {movie?.title}
        </h1>

        <div className="h-1 w-20 bg-amber-500 mb-6 shadow-[0_0_15px_rgba(14,165,233,0.5)]"></div>
      </div>
    </div>
  );
};

export default WatchMovie;
