import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { FiFilm } from "react-icons/fi";
import { useAuth } from "../../../hooks/useAuth";
import { uploadImage } from "../../../../src/utils/uploadImage";
import AddMovieForm from "./AddMovieForm";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AddMovie = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [isUploading, setIsUploading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const StyledSwal = Swal.mixin({
    customClass: {
      popup: "rounded-3xl border border-white/10 bg-[#121212] text-white",
      confirmButton:
        "bg-white text-black px-6 py-2 rounded-xl font-semibold hover:bg-blue-500 hover:text-white transition-all",
    },
    buttonsStyling: false,
    background: "#121212",
    color: "#fff",
  });

  const mutation = useMutation({
    mutationFn: async (newMovie) => {
      const { data } = await axiosSecure.post("/add-movie", newMovie);
      return data;
    },
    onSuccess: () => {
      StyledSwal.fire({
        title: "Success!",
        text:
          user?.role === "admin"
            ? "Movie published successfully."
            : "Movie submitted for admin approval.",
        icon: "success",
        timer: 2500,
        showConfirmButton: false,
      });
      reset();
    },
    onError: (error) => {
      StyledSwal.fire({
        title: "Error",
        text: error.response?.data?.message || "Failed to submit movie.",
        icon: "error",
      });
    },
  });

  const onSubmit = async (data) => {
    try {
      setIsUploading(true);
      const posterFile = data.poster[0];
      const posterURL = await uploadImage(posterFile);

      const inputYear = parseInt(data.release_year);

      const moviePayload = {
        title: data.title,
        description: data.description,
        poster: posterURL,
        price: parseFloat(data.price),
        duration: parseInt(data.duration),
        release_year: Number(inputYear),
        genres: data.genres ? data.genres.split(",").map((g) => g.trim()) : [],
        cast: data.cast ? data.cast.split(",").map((c) => c.trim()) : [],
        director: data.director,
        language: data.language,
        trailer: data.trailer,
        category: data.category,
        videoUrl: data.videoUrl,
      };

      mutation.mutate(moviePayload);
    } catch (error) {
      StyledSwal.fire({
        title: "Error",
        text: error.message || "Something went wrong during submission.",
        icon: "error",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <header className="mb-10">
        <h1 className="text-4xl font-extrabold text-white tracking-tight flex items-center gap-4">
          <FiFilm className="text-amber-500" /> Add New Movie
        </h1>
        <p className="text-gray-500 text-lg mt-2">
          {user?.role === "admin"
            ? "Publishing as Administrator"
            : "Submit content to the marketplace."}
        </p>
      </header>

      <AddMovieForm
        register={register}
        handleSubmit={handleSubmit(onSubmit)}
        errors={errors}
        isPending={mutation.isPending}
        isUploading={isUploading}
      />
    </div>
  );
};

export default AddMovie;
