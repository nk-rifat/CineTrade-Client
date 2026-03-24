import { FaPlay } from "react-icons/fa";

const MovieTrailer = ({ movie }) => (
  <div>
    <div className="flex items-center gap-3 mb-6">
      <FaPlay className="text-primary" />
      <h3 className="text-xl font-bold uppercase tracking-tighter">
        Official Trailer
      </h3>
    </div>
    <div className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/10">
      <iframe
        width="100%"
        height="100%"
        src={movie?.trailer}
        title={movie?.title}
        frameBorder="0"
        allowFullScreen
      ></iframe>
    </div>
  </div>
);

export default MovieTrailer;
