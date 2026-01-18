import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './Technology.css';

const Technology = () => {
  const canvasRef = useRef(null);
  const [isVisible, setIsVisible] = useState({});

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = 600;

    const particles = [];
    const particleCount = 100;

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.opacity = Math.random() * 0.5 + 0.2;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
        if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
      }

      draw() {
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      // Connect particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.2 * (1 - distance / 120)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = 600;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[id^="section-"]').forEach(section => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const technologies = [
    {
      title: 'Continuous Inkjet (CIJ)',
      description: 'Non-contact printing technology for high-speed production lines with exceptional accuracy.',
      icon: '🖨️',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    {
      title: 'Thermal Inkjet (TIJ)',
      description: 'High-resolution printing for detailed marking requirements and variable data.',
      icon: '🔥',
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    },
    {
      title: 'Laser Marking',
      description: 'Permanent marking without consumables for various materials and surfaces.',
      icon: '⚡',
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    },
    {
      title: 'Drop-on-Demand',
      description: 'Precision printing for variable data and batch coding with minimal waste.',
      icon: '💧',
      gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
    }
  ];

  const features = [
    {
      icon: '🎯',
      title: 'High Precision',
      description: 'Advanced print heads ensure accurate marking every single time with minimal errors.',
      color: '#667eea'
    },
    {
      icon: '⚡',
      title: 'Fast Processing',
      description: 'Quick data processing capabilities for high-speed production environments.',
      color: '#f5576c'
    },
    {
      icon: '🔧',
      title: 'Easy Integration',
      description: 'Seamlessly integrates with existing production systems and workflows.',
      color: '#4facfe'
    },
    {
      icon: '💰',
      title: 'Cost Effective',
      description: 'Low operational costs with high reliability and minimal maintenance requirements.',
      color: '#43e97b'
    },
    {
      icon: '🌍',
      title: 'Versatile Applications',
      description: 'Suitable for various materials including metal, plastic, glass, and packaging.',
      color: '#f093fb'
    },
    {
      icon: '📊',
      title: 'Data Management',
      description: 'Advanced software for easy data input, storage, and retrieval capabilities.',
      color: '#764ba2'
    }
  ];

  const benefits = [
    'Industry-leading print quality and consistency',
    'Minimal downtime with automatic monitoring systems',
    'Environmentally friendly with reduced waste',
    'Comprehensive training and support',
    'Scalable solutions for businesses of all sizes',
    'Compliant with international standards',
    'Real-time quality control and monitoring',
    '24/7 technical support available'
  ];

  return (
    <div className="technology-page">
      <section className="tech-hero">
        <canvas ref={canvasRef} className="hero-canvas"></canvas>
        <div className="tech-hero-overlay"></div>
        <div className="tech-hero-content">
          
          <h1 className="hero-title">
            Revolutionary <span className="gradient-text">Technology</span>
          </h1>
          <p className="hero-subtitle">
            Advanced Coding & Marking Solutions for the Future
          </p>
          <div className="hero-buttons">
            <Link to="/products" className="hero-btn primary">
              <span>Explore Products</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
            <Link to="/contact" className="hero-btn secondary">
              <span>Get Started</span>
            </Link>
          </div>
        </div>
        <div className="scroll-indicator">
          <div className="mouse">
            <div className="wheel"></div>
          </div>
          <p>Scroll to explore</p>
        </div>
      </section>

      <section id="section-intro" className={`tech-intro ${isVisible['section-intro'] ? 'visible' : ''}`}>
        <div className="container">
          <div className="section-badge">Our Vision</div>
          <h2>Cutting-Edge Technology</h2>
          <p className="intro-text">
            We pioneer advanced coding and marking solutions that transform manufacturing processes. 
            Our technology combines precision, speed, and reliability to deliver exceptional results 
            across diverse industries worldwide.
          </p>
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">99.9%</div>
              <div className="stat-label">Accuracy Rate</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">24/7</div>
              <div className="stat-label">Support Available</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">500+</div>
              <div className="stat-label">Global Clients</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">15+</div>
              <div className="stat-label">Years Experience</div>
            </div>
          </div>
        </div>
      </section>

     
      <section id="section-tech" className={`tech-types ${isVisible['section-tech'] ? 'visible' : ''}`}>
        <div className="container">
          <div className="section-badge">Our Solutions</div>
          <h2>Advanced Technologies</h2>
          <p className="section-subtitle">Explore our comprehensive range of marking solutions</p>
          <div className="tech-grid">
            {technologies.map((tech, index) => (
              <div 
                key={index} 
                className="tech-card"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="tech-card-gradient" style={{ background: tech.gradient }}></div>
                <div className="tech-icon-wrapper">
                  <div className="tech-icon">{tech.icon}</div>
                </div>
                <h3>{tech.title}</h3>
                <p>{tech.description}</p>
                <div className="card-shine"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

  
      <section
  id="section-features"
  className={`tech-features ${isVisible['section-features'] ? 'visible' : ''}`}
>
  <div className="container">
    <div className="section-badge">Key Advantages</div>
    <h2>Powerful Features</h2>
    <p className="section-subtitle">Everything you need for perfect marking</p>

    <div className="features-grid">
      {features.map((feature, index) => (
        <div
          key={index}
          className="feature-item"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <div
            className="feature-icon-bg"
            style={{ background: feature.color }}
          >
            <div className="feature-icon">{feature.icon}</div>
          </div>

          <h3>{feature.title}</h3>
          <p>{feature.description}</p>
        </div>
      ))}
    </div>
  </div>
</section>


    
      <section id="section-benefits" className={`tech-benefits ${isVisible['section-benefits'] ? 'visible' : ''}`}>
        <div className="container">
          <div className="benefits-content">
            <div className="benefits-text">
              <div className="section-badge">Why Choose Us</div>
              <h2>Unmatched Advantages</h2>
              <p className="benefits-intro">
                Experience the difference with our industry-leading solutions
              </p>
              <ul className="benefits-list">
                {benefits.map((benefit, index) => (
                  <li key={index} style={{ animationDelay: `${index * 0.05}s` }}>
                    <div className="benefit-check">✓</div>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
              <Link to="/products">
                <button className="explore-btn">
                  <span>Explore Products</span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </button>
              </Link>
            </div>
            <div className="benefits-image">
              <div className="image-wrapper">
                <img 
                  src="https://images.unsplash.com/photo-1581092583537-20d51b4b4f1b?auto=format&fit=crop&w=800&h=600" 
                  alt="Advanced Technology" 
                />
                <div className="image-overlay"></div>
              </div>
              <div className="floating-card card-1">
                <div className="card-icon">📈</div>
                <div className="card-content">
                  <div className="card-value">+45%</div>
                  <div className="card-label">Efficiency Boost</div>
                </div>
              </div>
              <div className="floating-card card-2">
                <div className="card-icon">⚙️</div>
                <div className="card-content">
                  <div className="card-value">98%</div>
                  <div className="card-label">Uptime</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="tech-cta">
        <div className="cta-background">
          <div className="cta-circle circle-1"></div>
          <div className="cta-circle circle-2"></div>
          <div className="cta-circle circle-3"></div>
        </div>
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Transform Your Production?</h2>
            <p>Join hundreds of satisfied customers worldwide and experience the future of marking technology</p>
            <div className="cta-buttons">
              <Link to="/contact">
                <button className="cta-btn primary">
                  <span>Get in Touch</span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </button>
              </Link>
              <Link to="/products">
                <button className="cta-btn secondary">
                  <span>View Products</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Technology;