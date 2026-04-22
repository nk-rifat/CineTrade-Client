import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import {
  FiLoader,
  FiClock,
  FiFilm,
  FiDollarSign,
  FiCalendar,
} from "react-icons/fi";
import PendingMovieTable from "../../Shared/components/PendingMovieTable";
import { useAuth } from "../../../hooks/useAuth";

const PendingMovies = () => {
  const axiosSecure = useAxiosSecure();
  const {user} = useAuth();

  const isAdmin = user?.role === "admin";

  const {
    data: pendingMovies = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["pending-movies"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/movies/pending");
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[60vh] gap-4">
        <FiLoader className="animate-spin text-4xl text-blue-500" />
        <p className="text-gray-500 animate-pulse font-medium">
          Fetching pending Movies...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center bg-red-500/10 border border-red-500/20 rounded-2xl p-10 mt-10 max-w-lg mx-auto">
        <p className="text-red-500 font-semibold">
          Failed to load pending movies.
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
        <div>
          <h2 className="text-4xl font-extrabold text-white tracking-t  ight flex items-center gap-3">
            <FiClock className="text-amber-500" /> Pending Movies
          </h2>
          <p className="text-gray-500 mt-2 text-lg">
            There are{" "}
            <span className="text-amber-500 font-bold">
              {pendingMovies.length}
            </span>{" "}
            movies awaiting approval.
          </p>
        </div>

        <div className="h-1 w-20 bg-amber-500 rounded-full md:hidden"></div>
      </div>

      {pendingMovies.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white/5 rounded-[2.5rem] border border-white/10 border-dashed">
          <FiFilm className="text-6xl text-gray-700 mb-4" />
          <p className="text-gray-400 text-xl font-medium">
            The queue is empty.
          </p>
        </div>
      ) : (
        <PendingMovieTable movies={pendingMovies} isAdmin={isAdmin} />
      )}
    </div>
  );
};

export default PendingMovies;
