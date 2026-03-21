import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, {
      rootMargin: '-30% 0px -70% 0px'
    });
    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => observer.observe(section));
    return () => sections.forEach(section => observer.unobserve(section));
  }, []);
  const handleNavClick = (e, href) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 80; // Navbar height offset
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };
  const navLinks = [{
    name: 'Home',
    href: '#home',
    id: 'home'
  }, {
    name: 'Properties',
    href: '#properties',
    id: 'properties'
  }, {
    name: 'Locations',
    href: '#locations',
    id: 'locations'
  }, {
    name: 'About',
    href: '#about',
    id: 'about'
  }, {
    name: 'Contact',
    href: '#contact',
    id: 'contact'
  }];
  return <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-black/5 py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        {/* Brand */}
        <a href="#home" onClick={e => handleNavClick(e, '#home')} className="flex items-center gap-2 group cursor-pointer">
          <div className={`w-8 h-8 rounded flex items-center justify-center font-bold text-lg transition-colors duration-300 ${isScrolled ? 'bg-dark text-white group-hover:bg-accent' : 'bg-white text-dark group-hover:bg-accent group-hover:text-white'}`}>
            N
          </div>
          <span className={`font-bold text-xl tracking-tight transition-colors duration-300 ${isScrolled ? 'text-dark' : 'text-white'}`}>
            NovaNest
          </span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(link => {
          const isActive = activeSection === link.id;
          const linkColor = isScrolled ? isActive ? 'text-accent font-bold' : 'text-secondary hover:text-dark hover:font-semibold' : isActive ? 'text-white font-bold' : 'text-white/80 hover:text-white hover:font-semibold';
          return <a key={link.name} href={link.href} onClick={e => handleNavClick(e, link.href)} className={`text-sm tracking-wide transition-all ${linkColor}`}>
                {link.name}
              </a>;
        })}
          <Link to="/auth" className={`px-5 py-2.5 text-sm font-semibold rounded transition-all active:scale-95 ${isScrolled ? 'bg-dark text-white hover:bg-accent shadow-lg shadow-accent/20' : 'bg-white/10 backdrop-blur border border-white/20 text-white hover:bg-white/20'}`}>
            Sign In
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className={`md:hidden p-2 transition-colors duration-300 ${isScrolled ? 'text-dark' : 'text-white'}`}>
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && <div className="absolute top-full left-0 w-full bg-white border-b border-black/5 shadow-xl flex flex-col p-6 gap-6 md:hidden">
          {navLinks.map(link => <a key={link.name} href={link.href} onClick={e => handleNavClick(e, link.href)} className={`text-base font-medium transition-colors ${activeSection === link.id ? 'text-accent font-bold' : 'text-dark hover:text-accent'}`}>
              {link.name}
            </a>)}
          <Link to="/auth" onClick={() => setIsMobileMenuOpen(false)} className="mt-2 text-center py-3 bg-dark text-white font-bold rounded-lg hover:bg-accent transition-colors">
            Sign In
          </Link>
        </div>}
    </nav>;
};
export default Navbar;