import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Home.css";
import Carousel from "../components/Carousel";
import "../components/Carousel.css";
const API_URL = "http://10.1.184.28:8000/api";

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);
  const animationFrameRef = useRef(null);

  useEffect(() => {
    loadHomeData();
    init3DScene();
    
    const handleMouseMove = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (sceneRef.current && sceneRef.current.camera) {
      sceneRef.current.camera.position.x = mousePos.x * 2;
      sceneRef.current.camera.position.y = mousePos.y * 1;
    }
  }, [mousePos]);

  const init3DScene = () => {
    if (typeof THREE === 'undefined') {
      console.warn('THREE.js not loaded');
      return;
    }
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    
    const pointLight1 = new THREE.PointLight(0x6366f1, 2, 100);
    pointLight1.position.set(10, 10, 10);
    scene.add(pointLight1);
    
    const pointLight2 = new THREE.PointLight(0xec4899, 1.5, 100);
    pointLight2.position.set(-10, -10, 5);
    scene.add(pointLight2);

    // Create main product box
    const geometry = new THREE.BoxGeometry(2, 2.5, 2);
    const material = new THREE.MeshStandardMaterial({
      color: 0x6366f1,
      metalness: 0.7,
      roughness: 0.2
    });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // Add floating particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 100;
    const positions = new Float32Array(particlesCount * 3);
    
    for (let i = 0; i < particlesCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 20;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particlesMaterial = new THREE.PointsMaterial({
      color: 0x6366f1,
      size: 0.05,
      transparent: true,
      opacity: 0.6
    });
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Add ring
    const ringGeometry = new THREE.TorusGeometry(3, 0.05, 16, 100);
    const ringMaterial = new THREE.MeshStandardMaterial({
      color: 0xec4899,
      metalness: 0.8,
      roughness: 0.2,
      emissive: 0xec4899,
      emissiveIntensity: 0.3
    });
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.rotation.x = Math.PI / 2;
    scene.add(ring);

    camera.position.z = 8;

    sceneRef.current = { scene, camera, renderer, cube, particles, ring };

    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate);
      
      cube.rotation.x += 0.005;
      cube.rotation.y += 0.008;
      ring.rotation.z += 0.01;
      particles.rotation.y += 0.001;
      
      camera.lookAt(cube.position);
      renderer.render(scene, camera);
    };
    
    animate();

    const handleResize = () => {
      if (!canvas) return;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    };
    
    window.addEventListener('resize', handleResize);
  };

  const loadHomeData = async () => {
    try {
      const [catRes, prodRes] = await Promise.all([
        axios.get(`${API_URL}/categories/`),
        axios.get(`${API_URL}/products/`)
      ]);

      setCategories(catRes.data);
      setProducts(prodRes.data.slice(0, 6));
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Something went wrong!");
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading your experience...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="home">
      <Carousel/>
      {/* Hero Section with 3D Canvas */}
      

      {/* Categories Section */}
      <section className="categories-section">
        <div className="section-header">
          <h2>Shop by Category</h2>
          <p>Explore our carefully curated collections</p>
        </div>
        
        <div className="categories-grid">
          {categories.map((cat, index) => (
            <Link
              key={cat.id}
              to={`/category/${cat.id}`}
              className="category-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <img
                src={cat.images_url?.[0]?.image || `https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop`}
                alt={cat.name}
              />
              <div className="category-overlay"></div>
              <div className="category-content">
                <h3>{cat.name}</h3>
                <div className="category-explore">
                  <span>Explore</span>
                  <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
              <div className="shine-effect"></div>
            </Link>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3>Premium Quality</h3>
            <p>Carefully selected products that meet the highest standards</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">
              <svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3>Fast Delivery</h3>
            <p>Quick and reliable shipping to your doorstep</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">
              <svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3>Secure Shopping</h3>
            <p>Your data and transactions are always protected</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;