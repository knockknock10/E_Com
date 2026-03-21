import { motion } from 'framer-motion';

const About = () => {
  return (
    <section id="about" className="py-24 lg:py-32 px-6 bg-primary">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
        
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="w-full lg:w-1/2"
        >
          <div className="relative aspect-[4/5] w-full max-w-md mx-auto lg:mx-0 rounded-2xl overflow-hidden shadow-2xl shadow-black/10 border border-black/5 group">
            <img 
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
              alt="NovaNest Architect" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark/60 to-transparent" />
            <div className="absolute bottom-8 left-8 text-white">
              <p className="text-4xl font-bold tracking-tight mb-1">15+ Years</p>
              <p className="text-primary/90 font-medium text-sm uppercase tracking-widest">Of Architectural Excellence</p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full lg:w-1/2 flex flex-col justify-center text-center lg:text-left"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-dark tracking-tight mb-6 leading-tight">
            Pioneering the Future of Luxury Living.
          </h2>
          <p className="text-secondary text-lg font-light leading-relaxed mb-6">
            At NovaNest, we believe that a home is more than just a physical space; it is a canvas for your life's greatest moments. Our dedicated team of architectural consultants and real estate experts scour the globe to find properties that defy convention.
          </p>
          <p className="text-secondary text-lg font-light leading-relaxed mb-10">
            Whether you are looking for an ultra-modern skyline penthouse or a serene alpine retreat, our portfolio is meticulously curated to meet the highest standards of luxury, privacy, and aesthetic brilliance.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-8 sm:gap-12">
            <div className="text-center lg:text-left">
              <p className="text-4xl font-extrabold text-dark mb-1">200+</p>
              <p className="text-xs font-semibold text-secondary uppercase tracking-wider">Estates Sold</p>
            </div>
            <div className="hidden sm:block w-px h-12 bg-black/10"></div>
            <div className="text-center lg:text-left">
              <p className="text-4xl font-extrabold text-dark mb-1">$4B+</p>
              <p className="text-xs font-semibold text-secondary uppercase tracking-wider">Volume Secured</p>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default About;
