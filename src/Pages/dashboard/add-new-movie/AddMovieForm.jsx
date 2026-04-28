import { FiPlus, FiYoutube, FiLink, FiUploadCloud } from "react-icons/fi";
import Field from "../../../components/shared/Field";


const AddMovieForm = ({
  register,
  handleSubmit,
  errors,
  isPending,
  isUploading,
}) => {
  const inputClasses =
    "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-gray-600 mt-1";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Section */}
        <div className="space-y-4 p-8 bg-white/5 rounded-4xl border border-white/10 backdrop-blur-xl">
          <div className="grid grid-cols-2 gap-4">
            <Field label="Movie Title" error={errors.title}>
              <input
                {...register("title", { required: "Title is required" })}
                placeholder="Movie Title"
                className={inputClasses}
                type="text"
              />
            </Field>
            <Field label="Language" error={errors.language}>
              <input
                {...register("language", { required: "Required" })}
                placeholder="Movie Language"
                className={inputClasses}
                type="text"
              />
            </Field>
          </div>

          <Field label="Description" error={errors.description}>
            <textarea
              {...register("description")}
              rows="4"
              className={inputClasses}
              placeholder="Movie Description"
            ></textarea>
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Price ($)" error={errors.price}>
              <input
                type="number"
                step="0.01"
                {...register("price", { required: "Required" })}
                className={inputClasses}
              />
            </Field>
            <Field label="Duration (min)" error={errors.duration}>
              <input
                type="number"
                {...register("duration", { required: "Required" })}
                className={inputClasses}
              />
            </Field>
          </div>
        </div>

        {/* Right Section */}
        <div className="space-y-4 p-8 bg-white/5 rounded-4xl border border-white/10 backdrop-blur-xl">
          <Field label="Poster Image" error={errors.poster}>
            <label className="flex flex-col items-center justify-center w-full h-32 mt-1 border-2 border-dashed border-white/10 rounded-xl bg-white/5 hover:bg-white/10 cursor-pointer transition-all">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <FiUploadCloud className="text-2xl text-gray-500 mb-2" />
                <p className="text-sm text-gray-500">Click to upload poster</p>
              </div>
              <input
                type="file"
                className="hidden"
                accept="image/*"
                {...register("poster", { required: "Poster is required" })}
              />
            </label>
          </Field>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Trailer URL" error={errors.trailerUrl}>
              <div className="relative">
                <input
                  {...register("trailer", { required: "Required" })}
                  placeholder="YouTube link"
                  className={`${inputClasses} pr-10`}
                  type="url"
                />
                <FiYoutube className="absolute right-3 top-[60%] -translate-y-1/2 text-gray-500" />
              </div>
            </Field>
            <Field label="Full Movie URL" error={errors.videoUrl}>
              <div className="relative">
                <input
                  {...register("videoUrl", { required: "Required" })}
                  placeholder="Stream link"
                  className={`${inputClasses} pr-10`}
                  type="url"
                />
                <FiLink className="absolute right-3 top-[60%] -translate-y-1/2 text-gray-500" />
              </div>
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Director" error={errors.director}>
              <input {...register("director")} className={inputClasses} />
            </Field>
            <Field label="Release Year" error={errors.release_year}>
              <input
                type="number"
                {...register("release_year", { required: "Required" })}
                className={inputClasses}
              />
            </Field>
          </div>
        </div>
      </div>

      {/* Tags Section */}
      <div className="p-8 bg-white/5 rounded-4xl border border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Field label="Genres (comma separated)" error={errors.genres}>
            <input
              {...register("genres")}
              placeholder="Action, Adventure"
              className={inputClasses}
              type="text"
            />
          </Field>
          <Field label="Cast (comma separated)" error={errors.cast}>
            <input
              {...register("cast")}
              placeholder="Actor Actress"
              className={inputClasses}
              type="text"
            />
          </Field>
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <button
          type="submit"
          disabled={isPending || isUploading}
          className="flex items-center gap-3 px-10 py-4 bg-white text-black font-bold rounded-2xl hover:bg-blue-600 hover:text-white transition-all duration-500 shadow-xl disabled:opacity-50"
        >
          {isUploading
            ? "Uploading..."
            : isPending
              ? "Publishing..."
              : "Submit Movie"}
          {!isPending && !isUploading}
        </button>
      </div>
    </form>
  );
};

export default AddMovieForm;
