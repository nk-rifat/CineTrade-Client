import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import DashboardMovieCard from "../../Shared/components/DashboardMovieCard";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useDeleteMovie from "../../../hooks/useDeleteMovie";
import { FiFilm } from "react-icons/fi";
import Loading from "../../../Components/Shared/Loading";

const ManageMovies = () => {
  const { handleDelete } = useDeleteMovie(["admin-movies"]);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState("all");
  const axiosSecure = useAxiosSecure();

  const limit = 8;

  const { data, isLoading } = useQuery({
    queryKey: ["admin-movies", page, filter],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/admin/all-movies?page=${page}&limit=${limit}&addedBy=${filter}`,
      );
      return res.data;
    },
  });

  const movies = data?.movies || [];
  const totalPages = data?.totalPages || 0;

  if (isLoading) return <Loading fullPage={true} />;

  return (
    <div className="p-6">
      {/* FILTER */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-4xl font-black text-white tracking-tight flex items-center gap-3">
          <FiFilm className="text-amber-500" />
          Manage All Movies
        </h2>

        <select
          className="select select-bordered text-amber-500 bg-slate-900 font-semibold"
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value);
            setPage(1);
          }}
        >
          <option value="all">All Movies</option>
          <option value="partner">Partner Movies</option>
          <option value="admin">Admin Movies</option>
        </select>
      </div>

      {/*  MOVIE GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {movies.map((movie) => (
          <DashboardMovieCard
            key={movie._id}
            movie={movie}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {/* PAGINATION */}
      <div className="flex justify-center mt-8 gap-2">
        <button
          className="px-4 py-2 bg-slate-800 text-white rounded hover:bg-amber-500 hover:text-black disabled:opacity-50 disabled:hover:bg-slate-800 disabled:hover:text-white transition-all cursor-pointer font-bold"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Prev
        </button>

        {[...Array(totalPages).keys()].map((num) => (
          <button
            key={num}
            onClick={() => setPage(num + 1)}
            className={`btn ${page === num + 1 ? "bg-amber-500 border-none" : ""}`}
          >
            {num + 1}
          </button>
        ))}

        <button
          className="px-4 py-2 bg-slate-800 text-white rounded hover:bg-amber-500 hover:text-black disabled:opacity-50 disabled:hover:bg-slate-800 disabled:hover:text-white transition-all cursor-pointer font-bold"
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ManageMovies;
