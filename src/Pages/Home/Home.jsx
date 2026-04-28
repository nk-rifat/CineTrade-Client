import Banner from "./banner/Banner";
import ComingSoonSection from "./coming-soon/ComingSoonSection";
import FaqSection from "./faq/FaqSection";
import GenresSection from "./genres/GenresSection";
import NewReleaseSection from "./new-release/NewReleaseSection";
import PopularSection from "./popular/PopularSection";

const Home = () => {
  return (
    <div className="bg-linear-to-br from-black via-slate-900 to-black">
      <Banner />
      <GenresSection />
      <ComingSoonSection />
      <NewReleaseSection />
      <PopularSection />
      <FaqSection />
    </div>
  );
};

export default Home;
