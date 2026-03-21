const Footer = () => {
  return (
    <footer className="bg-dark pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-12 border-b border-white/10 pb-16 mb-10">
        <div className="max-w-sm">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded bg-white flex items-center justify-center text-dark font-bold text-lg">
              N
            </div>
            <span className="font-bold text-2xl tracking-tight text-white">
              NovaNest
            </span>
          </div>
          <p className="text-[#9CA3AF] font-light leading-relaxed">
            Redefining luxury real estate. Discover breathtaking spaces and architectural marvels curated globally for individuals of discerning taste.
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-12 sm:grid-cols-3">
          <div>
            <h3 className="text-white font-semibold mb-6">Company</h3>
            <ul className="space-y-4 text-sm text-[#9CA3AF]">
              <li><a href="#about" className="hover:text-accent transition-colors">About Us</a></li>
              <li><a href="#locations" className="hover:text-accent transition-colors">Careers</a></li>
              <li><a href="#contact" className="hover:text-accent transition-colors">Contact Support</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-6">Properties</h3>
            <ul className="space-y-4 text-sm text-[#9CA3AF]">
              <li><a href="#properties" className="hover:text-accent transition-colors">Featured Estates</a></li>
              <li><a href="#properties" className="hover:text-accent transition-colors">New Listings</a></li>
              <li><a href="#locations" className="hover:text-accent transition-colors">Market Reports</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-6">Connect</h3>
            <ul className="space-y-4 text-sm text-[#9CA3AF]">
              <li><a href="#" className="hover:text-accent transition-colors">Instagram</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Twitter (X)</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">LinkedIn</a></li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between text-xs text-[#6B7280]">
        <p>&copy; {new Date().getFullYear()} NovaNest Real Estate. All rights reserved.</p>
        <div className="flex gap-6 mt-6 md:mt-0">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-white transition-colors">Cookie Settings</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
