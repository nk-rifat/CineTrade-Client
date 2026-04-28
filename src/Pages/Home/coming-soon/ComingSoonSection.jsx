import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "../../../Components/Shared/Loading";
import { motion } from "framer-motion";
import MovieCard from "../../../components/shared/MovieCard";

const ComingSoonSection = () => {
  const { data: comingSoonMovies, isLoading } = useQuery({
    queryKey: ["comingSoon"],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_BASE_URL}/movies/coming-soon`,
      );
      return res.data;
    },
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05, // Rapid stagger for the grid
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: [0.33, 1, 0.68, 1] },
    },
  };

  if (isLoading) {
    return (
      <div className="w-full h-100 bg-[#050505]">
        <Loading message="Previewing Upcoming Titles..." fullPage={false} />
      </div>
    );
  }

  return (
    <section className="w-full py-8 text-white">
      <div className="px-6 md:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex items-center justify-between mb-14"
        >
          <h2 className="text-4xl md:text-5xl font-black uppercase italic">
            Upcoming{" "}
            <span className="text-sky-500 border-b-2 border-sky-500">
              Movies
            </span>
          </h2>
          <div className="h-px grow ml-8 bg-linear-to-r from-sky-500/50 to-transparent hidden md:block"></div>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8"
        >
          {comingSoonMovies?.map((movie) => (
            <motion.div key={movie._id || movie.id} variants={itemVariants}>
              <MovieCard movie={movie} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ComingSoonSection;
