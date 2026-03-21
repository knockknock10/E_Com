import Hero from '../components/sections/Hero';
import FeaturedProperties from '../components/sections/FeaturedProperties';
import Locations from '../components/sections/Locations';
import About from '../components/sections/About';
import Contact from '../components/sections/Contact';

const Home = () => {
  return (
    <div className="w-full bg-primary overflow-x-hidden scroll-smooth">
      <Hero />
      <FeaturedProperties />
      <Locations />
      <About />
      <Contact />
    </div>
  );
};

export default Home;
