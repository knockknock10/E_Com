import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./ProductDetail.css";

const API_URL = "http://10.1.184.28:8000/api";

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [activeImage, setActiveImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    axios.get(`${API_URL}/products/${productId}/`)
      .then(res => {
        setProduct(res.data);
        setActiveImage(res.data.images_url?.[0]?.image || '');
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [productId]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading product...</p>
      </div>
    );
  }

  if (!product) return null;

  return (
    <div className="product-detail-page">
      {/* Back Navigation */}
      <div className="breadcrumb-container">
        <Link to="/products" className="breadcrumb-link">
          Products
        </Link>
        <span className="breadcrumb-separator">/</span>
        <Link to={`/category/${product.category}`} className="breadcrumb-link">
          Category
        </Link>
        <span className="breadcrumb-separator">/</span>
        <span className="breadcrumb-current">{product.name}</span>
      </div>

      {/* Product Layout */}
      <div className="product-layout">
        {/* Left: Images */}
        <div className="image-section">
          <div className="main-image-wrapper">
            <img
              src={activeImage}
              alt={product.name}
              className="main-image"
            />
            <div className="image-badge">Premium Quality</div>
          </div>

          {/* Thumbnails */}
          {product.images_url?.length > 1 && (
            <div className="thumbnail-row">
              {product.images_url.map((img, index) => (
                <div
                  key={img.id}
                  className={`thumb-wrapper ${activeImage === img.image ? "active" : ""}`}
                  onClick={() => setActiveImage(img.image)}
                >
                  <img
                    src={img.image}
                    alt={`${product.name} ${index + 1}`}
                    className="thumb"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right: Product Info */}
        <div className="info-section">
          <div className="product-tag">New Arrival</div>
          
          <h1 className="product-title">{product.name}</h1>
          
          <div className="rating-section">
            <div className="stars">
              {[...Array(5)].map((_, i) => (
                <svg key={i} width="20" height="20" fill="#fbbf24" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
            </div>
            <span className="review-count">(128 reviews)</span>
          </div>

          <div className="price-section">
            <span className="current-price">₹{product.price}</span>
            <span className="original-price">₹{(product.price * 1.3).toFixed(2)}</span>
            <span className="discount-badge">30% OFF</span>
          </div>

          <div className="description-section">
            <h3>Description</h3>
            <p>{product.description || "Premium quality product designed for excellence and long-lasting performance."}</p>
          </div>

          <div className="features-section">
            <h3>Key Features</h3>
            <ul className="features-list">
              <li>
                <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Premium Quality Materials
              </li>
              <li>
                <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Fast & Free Shipping
              </li>
              <li>
                <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                30-Day Money Back Guarantee
              </li>
              <li>
                <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                24/7 Customer Support
              </li>
            </ul>
          </div>

          <div className="quantity-section">
            <label>Quantity:</label>
            <div className="quantity-controls">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="qty-btn"
              >
                -
              </button>
              <span className="qty-display">{quantity}</span>
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="qty-btn"
              >
                +
              </button>
            </div>
          </div>

          <div className="action-buttons">
            <button className="btn-add-to-cart">
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              Add to Cart
            </button>
            <button className="btn-buy-now">
              Buy Now
            </button>
            <button className="btn-wishlist">
              <svg width="22" height="22" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
          </div>

          <div className="info-badges">
            <div className="info-badge">
              <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <div>
                <strong>Secure Payment</strong>
                <p>100% secure transactions</p>
              </div>
            </div>
            <div className="info-badge">
              <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
              </svg>
              <div>
                <strong>Free Shipping</strong>
                <p>On orders over ₹500</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;