import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Products.css";

const API_URL = "http://10.1.184.28:8000/api";

const Products = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredCategory, setHoveredCategory] = useState(null);

  useEffect(() => {
    axios.get(`${API_URL}/categories/`)
      .then(res => {
        setCategories(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const filteredCategories = categories.filter(cat =>
    cat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading categories...</p>
      </div>
    );
  }

  return (
    <div className="products-page">
      <section className="products-hero">
        <div className="hero-particles"></div>
        <div className="products-hero-content">
      
          <div className="search-container">
            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </section>

    
      <section className="categories-container">
        <div className="categories-header">
          <h2>All Categories</h2>
          <p className="category-count">{filteredCategories.length} categories found</p>
        </div>

        {filteredCategories.length === 0 ? (
          <div className="no-results">
            <svg width="64" height="64" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <h3>No categories found</h3>
            <p>Try adjusting your search</p>
          </div>
        ) : (
          <div className="products-grid">
            {filteredCategories.map((cat, index) => (
              <Link 
                to={`/category/${cat.id}`} 
                key={cat.id} 
                className="product-card"
                style={{ animationDelay: `${index * 0.1}s` }}
                onMouseEnter={() => setHoveredCategory(cat.id)}
                onMouseLeave={() => setHoveredCategory(null)}
              >
                <div className="card-image-wrapper">
                  <img
                    src={cat.images_url?.[0]?.image || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop'}
                    alt={cat.name}
                  />
                  <div className="card-overlay">
                    <span className="explore-text">
                      Explore Collection
                      <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </div>
                </div>
                <div className="card-content">
                  <h3>{cat.name}</h3>
                  <p className="card-description">{cat.description || "Explore our curated collection"}</p>
                  <div className="card-footer">
                    <span className="view-products">View Products</span>
                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
                <div className="shine-effect"></div>
              </Link>
            ))}
          </div>
        )}
      </section>

      <section className="featured-section">
        <div className="featured-content">
          <div className="featured-text">
            <h2>Why Shop With Us?</h2>
            <div className="featured-features">
              <div className="feature-item">
                <div className="feature-icon">
                  <svg width="28" height="28" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p>Handpicked products that meet the highest standards</p>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-icon">
                  <svg width="28" height="28" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h4>Fast Delivery</h4>
                  <p>Quick shipping to your doorstep</p>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-icon">
                  <svg width="28" height="28" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <h4>Secure Shopping</h4>
                  <p>Your data is always protected</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Products;