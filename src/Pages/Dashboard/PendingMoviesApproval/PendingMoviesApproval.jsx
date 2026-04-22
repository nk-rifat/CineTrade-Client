import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FiClock, FiFilm, FiCheck, FiX } from "react-icons/fi";
import PendingMovieTable from "../../Shared/components/PendingMovieTable";
import { useAuth } from "../../../hooks/useAuth";

const PendingMoviesApproval = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const {user} = useAuth();

  const isAdmin = user?.role === "admin";

  const { data: pendingMovies = [], isLoading } = useQuery({
    queryKey: ["pending-movies"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/pending-movies");
      return res.data;
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }) => {
      const { data } = await axiosSecure.patch(`/movies/${id}`, {
        release_status: status,
      });
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["pending-movies"] });
      Swal.fire({
        title: variables.status === "rejected" ? "Rejected" : "Approved!",
        text: `Movie has been ${variables.status} successfully.`,
        icon: "success",
        background: "#171717",
        color: "#fff",
        confirmButtonColor: "#f59e0b",
      });
    },
  });

  const handleApprove = (movie) => {
    const currentYear = new Date().getFullYear();
    const newStatus =
      movie.release_year > currentYear ? "upcoming" : "released";
    updateStatusMutation.mutate({ id: movie._id, status: newStatus });
  };

  const handleReject = (movie) => {
    Swal.fire({
      title: "Reject Submission?",
      text: `Reject "${movie.title}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#3f3f46",
      confirmButtonText: "Yes, Reject",
      background: "#171717",
      color: "#fff",
    }).then((result) => {
      if (result.isConfirmed) {
        updateStatusMutation.mutate({ id: movie._id, status: "rejected" });
      }
    });
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-96">
        <span className="loading loading-spinner loading-lg text-amber-500"></span>
      </div>
    );

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
        <div>
          <h2 className="text-4xl font-extrabold text-white tracking-tight flex items-center gap-3 uppercase">
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
      </div>

      {pendingMovies.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white/5 rounded-[2.5rem] border border-white/10 border-dashed">
          <FiFilm className="text-6xl text-gray-700 mb-4" />
          <p className="text-gray-400 text-xl font-medium">
            The queue is empty.
          </p>
        </div>
      ) : (
        <PendingMovieTable
          movies={pendingMovies}
          isAdmin={isAdmin}
          renderActions={(movie) => (
            <>
              {/* Approve Button */}
              <button
                onClick={() => handleApprove(movie)}
                className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 hover:bg-emerald-500 hover:text-white transition-all shadow-lg shadow-emerald-500/10"
              >
                <FiCheck size={18} />
              </button>
              {/* Reject Button */}
              <button
                onClick={() => handleReject(movie)}
                className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-500 hover:bg-rose-500 hover:text-white transition-all shadow-lg shadow-rose-500/10"
              >
                <FiX size={18} />
              </button>
            </>
          )}
        />
      )}
    </div>
  );
};

export default PendingMoviesApproval;
