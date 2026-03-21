import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section id="home" className="relative w-full h-screen min-h-[600px] flex items-center justify-center">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
          alt="Luxury Architecture" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-dark/40" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full flex flex-col items-center text-center pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1 }}
        >
          <span className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-full text-xs font-semibold tracking-widest uppercase mb-8 shadow-sm">
            Welcome to NovaNest
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-white tracking-tight mb-6 leading-tight drop-shadow-md">
            Find Your <br/> Perfect Space
          </h1>
          <p className="text-lg md:text-xl text-primary/90 max-w-2xl mx-auto font-light leading-relaxed mb-10 drop-shadow-sm">
            Experience unparalleled luxury and architectural brilliance. We curate the world's most breathtaking estates for those who settle for nothing but perfection.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#properties" className="w-full sm:w-auto px-8 py-4 bg-white text-dark font-bold rounded shadow-xl hover:bg-primary transition-all active:scale-95">
              Explore Collections
            </a>
            <a href="#contact" className="w-full sm:w-auto px-8 py-4 bg-transparent border border-white text-white font-bold rounded hover:bg-white/10 transition-all active:scale-95 backdrop-blur-sm">
              Contact an Agent
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
