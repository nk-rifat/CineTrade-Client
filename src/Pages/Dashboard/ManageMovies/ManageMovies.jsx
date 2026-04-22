import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import DashboardMovieCard from "../../Shared/components/DashboardMovieCard";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useDeleteMovie from "../../../hooks/useDeleteMovie";

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
        `/admin/movies?page=${page}&limit=${limit}&addedBy=${filter}`,
      );
      return res.data;
    },
  });

  const movies = data?.movies || [];
  const totalPages = data?.totalPages || 0;

  if (isLoading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="p-6">
      {/* FILTER */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-amber-500 ">Manage All Movies</h2>

        <select
          className="select select-bordered text-amber-500 font-semibold"
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
          className="btn"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Prev
        </button>

        {[...Array(totalPages).keys()].map((num) => (
          <button
            key={num}
            onClick={() => setPage(num + 1)}
            className={`btn ${page === num + 1 ? "btn-primary" : ""}`}
          >
            {num + 1}
          </button>
        ))}

        <button
          className="btn"
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
