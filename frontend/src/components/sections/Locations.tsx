import { motion } from 'framer-motion';

const locations = [
  { name: 'New York', image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', properties: 124 },
  { name: 'Dubai', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', properties: 86 },
  { name: 'London', image: 'https://images.unsplash.com/photo-1513635269975-5969336cb1f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', properties: 92 },
  { name: 'Miami', image: 'https://images.unsplash.com/photo-1533106497176-45ae19e68ba2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', properties: 45 },
];

const Locations = () => {
  return (
    <section id="locations" className="py-24 lg:py-32 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <h2 className="text-4xl md:text-5xl font-extrabold text-dark tracking-tight mb-6">
            Global Destinations
          </h2>
          <p className="text-secondary text-lg font-light leading-relaxed">
            From the bustling streets of Manhattan to the serene beaches of Dubai, discover premium spaces in the world's most sought-after cities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {locations.map((loc, idx) => (
            <motion.a 
              href="#properties"
              key={loc.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className="group relative h-[400px] rounded-2xl overflow-hidden cursor-pointer shadow-md bg-dark block"
            >
              <img 
                src={loc.image} 
                alt={loc.name} 
                className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 ease-in-out"
                loading="lazy"
              />
              {/* Dynamic overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
              
              <div className="absolute bottom-0 left-0 p-8 w-full z-10 flex flex-col justify-end h-full">
                <span className="w-10 h-1 bg-accent mb-4 transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-out"></span>
                <h3 className="text-3xl font-bold text-white tracking-tight mb-2 transform group-hover:-translate-y-1 transition-transform duration-500">
                  {loc.name}
                </h3>
                <p className="text-primary font-medium opacity-80 group-hover:opacity-100 transform group-hover:translate-y-0 translate-y-2 transition-all duration-500 text-sm tracking-wide">
                  {loc.properties} Exclusive Listings
                </p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Locations;
