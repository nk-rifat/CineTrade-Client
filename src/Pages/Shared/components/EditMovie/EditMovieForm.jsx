import React from "react";
import { FiYoutube, FiLink, FiUploadCloud } from "react-icons/fi";
import Field from "../Field";
import { useAuth } from "../../../../hooks/useAuth";

const EditMovieForm = ({
  register,
  handleSubmit,
  errors,
  isUploading,
  posterPreview,
  setPosterPreview,
}) => {
  const { user } = useAuth();
  const isPartner = user?.role === "partner";
  const inputClasses =
    "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-gray-600 mt-1";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* LEFT COLUMN */}
        <div className="space-y-4 p-8 bg-white/5 rounded-[2rem] border border-white/10 backdrop-blur-xl">
          <Field label="Movie Title" error={errors.title}>
            <input
              {...register("title", { required: "Title is required" })}
              className={inputClasses}
              type="text"
            />
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Language">
              <input
                {...register("language")}
                className={inputClasses}
                type="text"
              />
            </Field>
            <Field label="Category">
              <input
                {...register("category")}
                className={inputClasses}
                type="text"
              />
            </Field>
          </div>

          <Field label="Description">
            <textarea
              {...register("description")}
              rows="4"
              className={inputClasses}
              type="text"
            />
          </Field>
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-4 p-8 bg-white/5 rounded-[2rem] border border-white/10 backdrop-blur-xl">
          <div className="grid grid-cols-2 gap-4">
            <Field label="Price">
              <input
                type="number"
                {...register("price")}
                className={inputClasses}
              />
            </Field>
            <Field label="Duration (min)">
              <input
                type="number"
                {...register("duration")}
                className={inputClasses}
              />
            </Field>
          </div>

          <Field label="Poster Image">
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-white/10 rounded-xl bg-white/5 cursor-pointer overflow-hidden hover:bg-white/10">
              {posterPreview ? (
                <img
                  src={posterPreview}
                  alt="Preview"
                  className="h-full w-full object-cover"
                />
              ) : (
                <>
                  <FiUploadCloud className="text-2xl text-gray-500 mb-2" />
                  <p className="text-sm text-gray-500">Upload Poster</p>
                </>
              )}
              <input
                type="file"
                className="hidden"
                {...register("poster", {
                  onChange: (e) => {
                    const file = e.target.files[0];
                    if (file) setPosterPreview(URL.createObjectURL(file));
                  },
                })}
              />
            </label>
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Trailer URL">
              <div className="relative">
                <input
                  {...register("trailer")}
                  className={inputClasses}
                  type="url"
                />
              </div>
            </Field>
            <Field label="Video URL">
              <div className="relative">
                <input
                  disabled={isPartner}
                  {...register("videoUrl")}
                  className={inputClasses}
                  type="url"
                />
              </div>
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Director">
              <input
                {...register("director")}
                className={inputClasses}
                type="text"
              />
            </Field>
            <Field label="Release Year">
              <input
                type="number"
                {...register("release_year")}
                className={inputClasses}
              />
            </Field>
          </div>

          <Field label="Release Status" error={errors.release_status}>
            <input
              disabled={isPartner}
              type="text"
              {...register("release_status")}
              placeholder="e.g. released, upcoming, pending"
              className={inputClasses}
            />
          </Field>
        </div>
      </div>

      <div className="p-8 bg-white/5 rounded-[2rem] border border-white/10">
        <div className="grid grid-cols-2 gap-6">
          <Field label="Genres (comma separated)">
            <input
              {...register("genres")}
              className={inputClasses}
              type="text"
            />
          </Field>
          <Field label="Cast (comma separated)">
            <input {...register("cast")} className={inputClasses} type="text" />
          </Field>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isUploading}
          className="px-10 py-4 bg-white text-black font-bold rounded-2xl hover:bg-blue-600 hover:text-white disabled:bg-gray-600 transition-all"
        >
          {isUploading ? "Updating..." : "Update Movie"}
        </button>
      </div>
    </form>
  );
};

export default EditMovieForm;
