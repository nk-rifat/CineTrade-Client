import { Link } from "react-router-dom";
import { useGenres } from "../../../hooks/useGenres";
import { motion } from "framer-motion";
import Loading from "../../../Components/Shared/Loading";

// 1. Container controls the "stagger" orchestrating the children
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
};

// 2. Individual Genre Item variants
const itemVariants = {
  hidden: { opacity: 0, y: 15, scale: 0.9 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20,
    },
  },
};

// 3. Title variant for the "From Left" entrance
const titleVariants = {
  hidden: { opacity: 0, x: -50 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const GenresSection = () => {
  const { data: genres, isLoading } = useGenres();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section className="w-full py-10 overflow-hidden">
      <div className="px-6 md:px-12">
        <motion.div
          variants={titleVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="flex items-center justify-between mb-14"
        >
          <h2 className="text-2xl md:text-3xl font-black uppercase italic text-white">
            Explore{" "}
            <span className="text-sky-500 border-b-2 border-sky-500">
              Categories
            </span>
          </h2>
          <div className="h-1px grow ml-8 bg-linear-to-r from-sky-500/50 to-transparent hidden md:block"></div>
        </motion.div>

        {/* Grid Animation: Items pop in one by one */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-3"
        >
          {genres?.map((genre) => (
            <motion.div key={genre} variants={itemVariants}>
              <Link
                to={`/movies?genre=${genre}`}
                className="group flex items-center justify-center py-3 px-4 rounded-md bg-[#1a1a1a] border border-white/5  hover:border-amber-500/50 hover:bg-amber-500/10 active:scale-95 transition-all duration-200 ease-in-out shadow-sm"
              >
                <span className="text-[12px] font-bold text-gray-100  group-hover:text-amber-400 uppercase tracking-widest truncate">
                  {genre}
                </span>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default GenresSection;
