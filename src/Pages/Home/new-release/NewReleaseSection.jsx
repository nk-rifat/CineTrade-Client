import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css";
import Loading from "../../../Components/Shared/Loading";
import MovieCard from "../../../components/shared/MovieCard";

const NewReleaseSection = () => {
  const { data: newRelease, isLoading } = useQuery({
    queryKey: ["newReleaseMovies"],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_BASE_URL}/movies/new-releases`,
      );
      return res.data;
    },
  });

  if (isLoading) {
    return <Loading fullPage={true} />;
  }

  return (
    <section className="px-4 pt-6 md:px-10">
      <div className="flex items-center justify-between mb-14">
        <h2 className="text-4xl md:text-5xl font-black text-white uppercase italic">
          New{" "}
          <span className="text-sky-500 border-b-2 border-sky-500">
            Releases
          </span>
        </h2>
        <div className="h-px grow ml-8 bg-linear-to-r from-sky-500/50 to-transparent hidden md:block"></div>
      </div>

      {/* Slider */}
      <Swiper
        modules={[Autoplay, Navigation]}
        navigation
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        spaceBetween={20}
        breakpoints={{
          640: { slidesPerView: 3 },
          1024: { slidesPerView: 5 },
        }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
          {newRelease.map((movie) => (
            <SwiperSlide key={movie._id}>
              <MovieCard movie={movie} />
            </SwiperSlide>
          ))}
        </div>
      </Swiper>
    </section>
  );
};

export default NewReleaseSection;
