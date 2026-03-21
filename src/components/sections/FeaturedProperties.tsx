import { motion } from 'framer-motion';
import { mockProperties } from '../../data/properties';

const FeaturedProperties = () => {
  return (
    <section id="properties" className="py-24 lg:py-32 px-6 bg-primary">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 lg:mb-20 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-extrabold text-dark tracking-tight mb-4">
              Featured Properties
            </h2>
            <p className="text-secondary text-lg font-light leading-relaxed">
              Explore our hand-picked selection of exclusive homes, curated for their exceptional design and breathtaking locations.
            </p>
          </div>
          <a href="#contact" className="px-6 py-3 font-semibold text-white bg-dark rounded hover:bg-accent hover:shadow-lg hover:shadow-accent/20 transition-all active:scale-95 shrink-0">
            Contact for Private Listings
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {mockProperties.slice(0, 6).map((property, idx) => (
            <motion.div 
              key={property.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 flex flex-col h-full border border-black/5"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-secondary/10">
                <img 
                  src={property.imageUrl} 
                  alt={property.title} 
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
                />
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold text-dark shadow-md uppercase tracking-wide">
                  {property.location}
                </div>
              </div>
              <div className="p-6 md:p-8 flex-1 flex flex-col">
                <h3 className="text-2xl font-bold text-dark mb-3 truncate group-hover:text-accent transition-colors">
                  {property.title}
                </h3>
                <div className="flex flex-wrap items-center gap-4 text-sm text-secondary mb-6 font-medium">
                  <div className="flex items-center gap-1">
                    <span className="text-dark font-bold">{property.beds}</span> Beds
                  </div>
                  <span className="w-1 h-1 rounded-full bg-secondary/30"></span>
                  <div className="flex items-center gap-1">
                    <span className="text-dark font-bold">{property.baths}</span> Baths
                  </div>
                  <span className="w-1 h-1 rounded-full bg-secondary/30"></span>
                  <div className="flex items-center gap-1">
                    <span className="text-dark font-bold">{property.sqft.toLocaleString()}</span> sqft
                  </div>
                </div>
                
                <div className="pt-6 mt-auto border-t border-black/5 flex justify-between items-center">
                  <span className="text-3xl font-bold text-dark tracking-tight">
                    ${(property.price / 1000000).toFixed(1)}M
                  </span>
                  <button className="text-sm font-semibold text-white bg-dark hover:bg-accent transition-colors rounded-lg px-6 py-3 shadow-md active:scale-95 group-hover:shadow-accent/20">
                    View Details
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;
