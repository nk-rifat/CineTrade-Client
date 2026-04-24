import Banner from "../Banner/Banner";
import ComingSoonSection from "../ComingSoon/ComingSoonSection";
import FaqSection from "../FAQ/FaqSection";
import GenresSection from "../Genres/GenresSection";
import NewReleaseSection from "../NewRelease/NewReleaseSection";
import PopularSection from "../Popular/PopularSection";

const Home = () => {
  return (
    <div className="bg-gradient-to-br from-black via-slate-900 to-black">
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
