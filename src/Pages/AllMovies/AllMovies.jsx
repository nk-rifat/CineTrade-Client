import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import MovieCard from "../Shared/components/MovieCard";
import { useEffect, useState } from "react";

const AllMovies = () => {
  const [filters, setFilters] = useState({ sort: "", language: "", year: "" });

  const [debouncedFilters, setDebouncedFilters] = useState(filters);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedFilters(filters);
    }, 400);

    return () => clearTimeout(timer);
  }, [filters]);

  const { data: movies = [], isLoading } = useQuery({
    queryKey: ["movies", debouncedFilters],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_BASE_URL}/movies`,
        { params: debouncedFilters },
      );

      return res.data;
    },
    keepPreviousData: true,
  });

  if (isLoading) {
    return <p className="text-center text-white mt-10">Loading...</p>;
  }

  return (
    <div className="px-4 md:px-10 py-10 bg-[#050505]">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie._id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default AllMovies;
