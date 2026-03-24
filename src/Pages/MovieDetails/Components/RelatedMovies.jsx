import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaStar, FaArrowRight } from "react-icons/fa";

const RelatedMovies = ({ currentId, genre }) => {
  const { data: relatedMovies = [], isLoading } = useQuery({
    queryKey: ["related-movies", genre],
    enabled: !!genre,
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_BASE_URL}/movies?genre=${genre}`,
      );
      return res.data.filter((m) => m._id !== currentId).slice(0, 4);
    },
  });

  if (isLoading || relatedMovies.length === 0) return null;

  return (
    <div className="mt-32">
      <div className="flex items-end justify-between mb-10">
        <div>
          <h2 className="text-3xl font-black uppercase tracking-tighter">
            You Might Also Like
          </h2>
          <div className="h-1 w-20 bg-amber-500 mt-2"></div>
        </div>
        <Link
          to="/"
          className="flex items-center gap-2 text-amber-500 font-bold hover:gap-3 transition-all"
        >
          EXPLORE ALL <FaArrowRight size={14} />
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {relatedMovies.map((m) => (
          <Link key={m._id} to={`/movies/${m._id}`} className="group">
            <div className="relative aspect-[2/3] rounded-2xl overflow-hidden border border-white/5 bg-white/5 transition-all duration-500 group-hover:border-amber-500 group-hover:-translate-y-2">
              <img
                src={m.poster}
                alt={m.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <span className="text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full border-2 border-amber-500  ">
                  View Info
                </span>
              </div>
            </div>
            <h3 className="mt-4 font-bold text-lg group-hover:text-sky-500 transition-colors truncate">
              {m.title}
            </h3>
            <div className="flex items-center gap-3 text-sm text-gray-500">
              <span>{m.release_year}</span>
              <span className="flex items-center gap-1">
                <FaStar className="text-yellow-500" /> {m.rating}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RelatedMovies;
