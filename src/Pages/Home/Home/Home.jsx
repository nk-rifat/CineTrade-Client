import Banner from "../Banner/Banner";
import ComingSoonSection from "../ComingSoon/ComingSoonSection";
import GenresSection from "../Genres/GenresSection";
import PopularSection from "../Popular/PopularSection";

const Home = () => {
  return (
    <>
      <Banner />
      <GenresSection />
      <ComingSoonSection />
      <PopularSection />
    </>
  );
};

export default Home;
