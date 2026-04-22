import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../hooks/useAxiosSecure";

const useDeleteMovie = (queryKey) => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const { data } = await axiosSecure.delete(`/movies/${id}`);
      return data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });

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

  const handleDelete = (id) => {
    console.log("movie id", id);
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

  return { handleDelete, isDeleting: deleteMutation.isPending };
};

export default useDeleteMovie;
