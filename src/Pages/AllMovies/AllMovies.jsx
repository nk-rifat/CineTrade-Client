import { keepPreviousData, useQuery } from "@tanstack/react-query";
import axios from "axios";
import MovieCard from "../Shared/components/MovieCard";
import { useEffect, useState } from "react";
import Loading from "../../Components/Shared/Loading";
import Error from "../../Components/Shared/Error";
import MovieFilters from "./MovieFilters";

const AllMovies = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [filters, setFilters] = useState({ sort: "", language: "", year: "" });

  const [debouncedFilters, setDebouncedFilters] = useState(filters);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedFilters(filters);
    }, 400);

    return () => clearTimeout(timer);
  }, [filters]);

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["movies", debouncedFilters, currentPage],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_BASE_URL}/movies`,
        {
          params: {
            ...debouncedFilters,
            page: currentPage,
            limit: itemsPerPage,
          },
        },
      );

      return res.data;
    },
    placeholderData: keepPreviousData,
  });

  const movies = data?.movies || [];
  const totalPages = data?.totalPages || 0;

  if (isLoading)
    return (
      <div className="w-full h-100 bg-[#050505]">
        <Loading />
      </div>
    );

  if (isError) return <Error message={error.message} onRetry={refetch} />;

  return (
    <div className="px-4 bg-linear-to-br from-black via-slate-900 to-black md:px-10 py-10">
      {/* Header + Filters Row */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6 mb-6">
        {/* Left: Header and Description */}
        <div className="flex-1">
          <h2 className="text-2xl md:text-3xl lg:text-5xl font-black uppercase italic text-white mb-2">
            All{" "}
            <span className="text-amber-500 border-b-2 border-amber-500">
              Movies
            </span>
          </h2>
          <p className="text-gray-200 mt-4 max-w-2xl">
            Discover your next favorite movie from our vast collection! Filter
            by language, release year, or sort by price and rating to find
            exactly what you’re looking for.
          </p>
        </div>

        {/* Right: Premium Filter Box */}
        <MovieFilters filters={filters} setFilters={setFilters} />
      </div>

      {/* Movies Grid */}
      {isLoading ? (
        <Loading message="Loading Movies..." />
      ) : movies.length === 0 ? (
        <p className="text-center text-white mt-10 text-lg font-medium">
          No movies match your filter criteria.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {movies.map((movie) => (
            <MovieCard key={movie._id} movie={movie} />
          ))}
        </div>
      )}

      {/* PAGINATION (Numbered Style) */}
      <div className="flex flex-wrap justify-center items-center mt-12 gap-2">
        {/* Prev Button */}
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
          className="px-4 py-2 bg-slate-800 text-white rounded hover:bg-amber-500 hover:text-black disabled:opacity-50 disabled:hover:bg-slate-800 disabled:hover:text-white transition-all cursor-pointer font-bold"
        >
          Prev
        </button>

        {/* Page Numbers */}
        {[...Array(totalPages).keys()].map((num) => {
          const pageNum = num + 1;
          return (
            <button
              key={pageNum}
              onClick={() => setCurrentPage(pageNum)}
              className={`w-10 h-10 rounded font-bold transition-all cursor-pointer border ${
                currentPage === pageNum
                  ? "bg-amber-500 text-black border-amber-500"
                  : "bg-transparent text-white border-slate-700 hover:border-amber-500"
              }`}
            >
              {pageNum}
            </button>
          );
        })}

        {/* Next Button */}
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
          className="px-4 py-2 bg-slate-800 text-white rounded hover:bg-amber-500 hover:text-black disabled:opacity-50 disabled:hover:bg-slate-800 disabled:hover:text-white transition-all cursor-pointer font-bold"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AllMovies;
