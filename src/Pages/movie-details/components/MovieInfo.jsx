import { FaUserAlt, FaUsers } from "react-icons/fa";

const MovieInfo = ({ movie }) => (
  <div className="space-y-12">
    <div>
      <h3 className="text-xl font-bold border-l-4 border-amber-500 pl-4 mb-4 uppercase tracking-tighter italic">
        Synopsis
      </h3>
      <p className="text-gray-200 text-lg leading-relaxed font-light">
        {movie?.description}
      </p>
    </div>
    <div className="space-y-6 pt-6 border-t border-white/5">
      <div className="flex items-start gap-4">
        <div className="p-3 bg-white/5 rounded-lg text-sky-500">
          <FaUserAlt size={20} />
        </div>
        <div>
          <h4 className="text-xs text-gray-500 uppercase tracking-widest font-bold">
            Director
          </h4>
          <p className="text-lg font-medium">{movie?.director}</p>
        </div>
      </div>
      <div className="flex items-start gap-4">
        <div className="p-3 bg-white/5 rounded-lg text-sky-500">
          <FaUsers size={20} />
        </div>
        <div>
          <h4 className="text-xs text-gray-500 uppercase tracking-widest font-bold">
            Cast Members
          </h4>
          <p className="text-base text-gray-300">
            {(movie?.cast || []).join(", ")}
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default MovieInfo;
