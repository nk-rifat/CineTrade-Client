import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import DashboardMovieCard from "../../Shared/components/DashboardMovieCard";
import Swal from "sweetalert2";

const UploadedMovies = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Fetching Movie
  const {
    data: movies = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["uploaded-movies"],
    queryFn: async () => {
      const res = await axiosSecure.get("/uploaded-movies");
      return res.data;
    },
  });

  // Delete Movie
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const { data } = await axiosSecure.delete(`/movies/${id}`);
      return data;
    },
    onSuccess: () => {
      // Refresh the list immediately
      queryClient.invalidateQueries(["uploaded-movies"]);
      Swal.fire({
        title: "Deleted!",
        text: "Movie has been removed.",
        icon: "success",
        background: "#121212",
        color: "#fff",
        confirmButtonColor: "#f59e0b",
      });
    },
    onError: (error) => {
      Swal.fire(
        "Error",
        error.response?.data?.message || "Delete failed",
        "error",
      );
    },
  });

  // Delete Handler
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      background: "#121212",
      color: "#fff",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
      }
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="alert alert-error max-w-md mx-auto mt-10 text-white">
        <span>{error?.message || "Error loading movies"}</span>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8 text-amber-500">
        Your Uploaded Movies
      </h1>

      {movies.length === 0 ? (
        <p className="text-center py-20 opacity-50 text-xl">No movies found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {movies.map((movie) => (
            <DashboardMovieCard key={movie._id} movie={movie} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
};

export default UploadedMovies;
