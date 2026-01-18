import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./CategoryDetail.css";

const API_URL = "http://10.1.184.28:8000/api";

const CategoryDetail = () => {
  const { categoryId } = useParams();
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredProduct, setHoveredProduct] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoryRes = await axios.get(
          `${API_URL}/categories/${categoryId}/`
        );
        setCategory(categoryRes.data);

        const productRes = await axios.get(`${API_URL}/products/`);

        const filteredProducts = productRes.data.filter(
          (product) => String(product.category) === String(categoryId)
        );

        setProducts(filteredProducts);
        setLoading(false);
      } catch (err) {
        console.error("Error loading category/products", err);
        setLoading(false);
      }
    };

    fetchData();
  }, [categoryId]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading products...</p>
      </div>
    );
  }

  if (!category) return null;

  return (
    <div className="category-detail-page">
      {/* Hero Section */}
      <section className="category-hero">
        <div className="hero-overlay"></div>
        <div className="category-hero-content">
          <Link to="/products" className="back-link">
            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Categories
          </Link>
          <h1>{category.name}</h1>
          <p className="category-description">{category.description || "Explore our premium collection"}</p>
          <div className="product-count">
            <span>{products.length}</span> Products Available
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="products-section">
        {products.length === 0 ? (
          <div className="no-products">
            <svg width="64" height="64" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <h3>No Products Found</h3>
            <p>We're currently updating this category. Check back soon!</p>
            <Link to="/products" className="btn-primary">Browse All Categories</Link>
          </div>
        ) : (
          <div className="products-grid">
            {products.map((product, index) => (
              <Link 
                to={`/product/${product.id}`} 
                key={product.id} 
                className="product-card"
                style={{ animationDelay: `${index * 0.1}s` }}
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                <div className="product-image-wrapper">
                  <img 
                    src={product.images_url?.[0]?.image || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop'} 
                    alt={product.name} 
                  />
                  <div className="product-overlay">
                    <span className="view-details">View Details</span>
                  </div>
                  {product.images_url?.[1]?.image && hoveredProduct === product.id && (
                    <img 
                      src={product.images_url[1].image} 
                      alt={product.name}
                      className="product-image-hover"
                    />
                  )}
                </div>
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <p className="product-description">{product.description?.substring(0, 60)}...</p>
                  <div className="product-footer">
                    <span className="price">₹{product.price}</span>
                    <span className="add-to-cart">
                      <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                    </span>
                  </div>
                </div>
                <div className="shine-effect"></div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default CategoryDetail;