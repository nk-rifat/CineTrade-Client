import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const MovieDetails = () => {
  const { id } = useParams();

  const {
    data: movie,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["movie", id],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_BASE_URL}/movies/${id}`,
      );
      return res.data;
    },
  });

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
        <div className="loading loading-ring loading-lg text-primary"></div>
      </div>
    );

  if (isError || !movie)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#0a0a0a] text-white">
        <h2 className="text-2xl font-bold opacity-50 mb-4">Movie not found</h2>
      </div>
    );

  return <div className="min-h-screen bg-[#0a0a0a] text-white">
    
  </div>;
};

export default MovieDetails;
