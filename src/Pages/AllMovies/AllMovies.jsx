import { keepPreviousData, useQuery } from "@tanstack/react-query";
import axios from "axios";
import MovieCard from "../Shared/components/MovieCard";
import { useEffect, useState } from "react";
import Loading from "../../Components/Shared/Loading";
import Error from "../../Components/Shared/Error";

const AllMovies = () => {
  const [filters, setFilters] = useState({ sort: "", language: "", year: "" });

  const [debouncedFilters, setDebouncedFilters] = useState(filters);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedFilters(filters);
    }, 400);

    return () => clearTimeout(timer);
  }, [filters]);

  const {
    data: movies = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["movies", debouncedFilters],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_BASE_URL}/movies`,
        { params: debouncedFilters },
      );

      return res.data;
    },
    placeholderData: keepPreviousData,
  });

  if (isLoading)
    return (
      <div className="w-full h-[400px] bg-[#050505]">
        <Loading />
      </div>
    );

  if (isError) return <Error message={error.message} onRetry={refetch} />;

  return (
    <div className="px-4 bg-gradient-to-br from-black via-slate-900 to-black md:px-10 py-10 bg-[#050505]">
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
        <div className="w-full md:w-auto bg-[#111111]  rounded-lg p-4 flex flex-wrap gap-4 shadow-md">
          {/* Sort */}
          <div className="w-full md:w-40">
            <label className="text-gray-100 text-sm mb-1 block">Sort By</label>
            <select
              className="select select-bordered w-full bg-[#111111] border-gray-500 text-white"
              value={filters.sort}
              onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
            >
              <option value="">Select</option>
              <option value="price_asc">Price Low → High</option>
              <option value="price_desc">Price High → Low</option>
            </select>
          </div>

          {/* Language */}
          <div className="w-full md:w-40">
            <label className="text-gray-100 text-sm mb-1 block">Language</label>
            <input
              type="text"
              placeholder="Type language"
              className="input input-bordered w-full bg-[#111111] border-gray-500 text-white"
              value={filters.language}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  language: e.target.value.toLowerCase(),
                })
              }
            />
          </div>

          {/* Year */}
          <div className="w-full md:w-32">
            <label className="text-gray-100 text-sm mb-1 block">Year</label>
            <input
              type="number"
              placeholder="Enter release year"
              className="input input-bordered w-full bg-[#111111] border-gray-500 text-white"
              value={filters.year}
              onChange={(e) => setFilters({ ...filters, year: e.target.value })}
            />
          </div>
        </div>
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
    </div>
  );
};

export default AllMovies;
