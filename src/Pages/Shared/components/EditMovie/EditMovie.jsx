import { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { uploadImage } from "../../../../utils/uploadImage";
import EditMovieForm from "./EditMovieForm";
import { useAuth } from "../../../../hooks/useAuth";

const EditMovie = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const [posterPreview, setPosterPreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  // Fetch single Movie Data
  const { data: movie, isLoading } = useQuery({
    queryKey: ["movie", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/movies/${id}`);
      if (!posterPreview) setPosterPreview(res.data.poster);
      return res.data;
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    values: movie
      ? {
          ...movie,
          genres: movie.genres?.join(", "),
          cast: movie.cast?.join(", "),
        }
      : {},
  });

  // Update Mutation
  const mutation = useMutation({
    mutationFn: async (updatedMovie) => {
      const { data } = await axiosSecure.patch(`/movies/${id}`, updatedMovie);
      return data;
    },
    onSuccess: (data) => {
      if (data.modifiedCount > 0 || data.acknowledged) {
        queryClient.invalidateQueries(["movie", id]);
        Swal.fire({
          title: "Success!",
          text: "Movie updated successfully.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
        if (user?.role === "admin") {
          navigate("/dashboard/manage-movies");
        } else {
          navigate("/dashboard/uploaded-movies");
        }
      }
    },
    onError: (error) => {
      Swal.fire(
        "Error",
        error.response?.data?.message || "Update failed",
        "error",
      );
    },
  });

  const onSubmit = async (data) => {
    try {
      setIsUploading(true);

      let posterURL = movie.poster;
      const posterFile = data.poster?.[0];

      if (posterFile instanceof File) {
        const uploadedURL = await uploadImage(posterFile);
        if (uploadedURL) posterURL = uploadedURL;
      }

      const moviePayload = {
        title: data.title,
        description: data.description,
        poster: posterURL,
        price: parseFloat(data.price),
        duration: parseInt(data.duration),
        release_year: Number(data.release_year),
        genres: data.genres ? data.genres.split(",").map((g) => g.trim()) : [],
        cast: data.cast ? data.cast.split(",").map((c) => c.trim()) : [],
        director: data.director,
        language: data.language,
        trailer: data.trailer,
        category: data.category,
        videoUrl: data.videoUrl,
        release_status: data.release_status,
      };

      mutation.mutate(moviePayload);
    } catch (error) {
      console.error(error);
    } finally {
      setIsUploading(false);
    }
  };

  if (isLoading)
    return <p className="text-center text-white py-20">Loading...</p>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <EditMovieForm
        register={register}
        handleSubmit={handleSubmit(onSubmit)}
        errors={errors}
        isPending={mutation.isPending || isUploading}
        posterPreview={posterPreview}
        setPosterPreview={setPosterPreview}
      />
    </div>
  );
};

export default EditMovie;
