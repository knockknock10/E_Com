import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import './Header.css';

const API_URL = "http://10.1.184.28:8000/api";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsDropdown, setProductsDropdown] = useState(false);
  const [categories, setCategories] = useState([]);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const dropdownTimeoutRef = useRef(null);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch categories
    axios
      .get(`${API_URL}/categories/`)
      .then(res => setCategories(res.data))
      .catch(err => console.error(err));

    // Fetch all products for search
    axios
      .get(`${API_URL}/products/`)
      .then(res => setAllProducts(res.data))
      .catch(err => console.error(err));

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle click outside search to close results
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Search functionality
  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      const query = searchQuery.toLowerCase();

      // Search in categories
      const categoryResults = categories
        .filter(cat => cat.name.toLowerCase().includes(query))
        .map(cat => ({
          type: 'category',
          id: cat.id,
          name: cat.name,
          image: cat.images_url?.[0]?.image,
          description: cat.description || 'Category'
        }));

      // Search in products
      const productResults = allProducts
        .filter(product =>
          product.name.toLowerCase().includes(query) ||
          (product.description && product.description.toLowerCase().includes(query))
        )
        .map(product => ({
          type: 'product',
          id: product.id,
          name: product.name,
          image: product.images_url?.[0]?.image,
          price: product.price,
          description: product.description
        }));

      // Combine results (categories first, then products)
      const combined = [...categoryResults, ...productResults].slice(0, 8);
      setSearchResults(combined);
      setShowSearchResults(true);
    } else {
      setSearchResults([]);
      setShowSearchResults(false);
    }
  }, [searchQuery, categories, allProducts]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(prev => !prev);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setProductsDropdown(false);
  };

  const handleDropdownEnter = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setProductsDropdown(true);
  };

  const handleDropdownLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setProductsDropdown(false);
    }, 250);
  };

  const handleSearchResultClick = (result) => {
    if (result.type === 'category') {
      navigate(`/category/${result.id}`);
    } else {
      navigate(`/product/${result.id}`);
    }
    setSearchQuery('');
    setShowSearchResults(false);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchResults.length > 0) {
      handleSearchResultClick(searchResults[0]);
    }
  };

  return (
    <header className={`header ${scrolled ? 'header-scrolled' : ''}`}>
      <div className="header-container">
        <Link to="/" className="logo" onClick={closeMobileMenu}>
          <img
            src="https://cdn.dribbble.com/userupload/17039932/file/original-983633d1f6de58f5d871f174ff34f057.jpg?resize=400x0"
            alt="ecom"
          />
          <span className="logo-text">YourBrand</span>
        </Link>

        <nav className={`nav ${mobileMenuOpen ? 'mobile-open' : ''}`}>
          <ul className="nav-list">
            <li>
              <Link to="/" onClick={closeMobileMenu}>
                <span className="nav-icon">🏠</span>
                Home
              </Link>
            </li>

            <li
              className="dropdown"
              onMouseEnter={handleDropdownEnter}
              onMouseLeave={handleDropdownLeave}
            >
              <Link to="/products">
                <span className="nav-icon">🛍️</span>
                Products
                <svg className="dropdown-arrow" width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                  <path d="M6 8L2 4h8L6 8z" />
                </svg>
              </Link>

              {productsDropdown && (
                <ul className="dropdown-menu">
                  <div className="dropdown-header">
                    <h4>Shop by Category</h4>
                    <p>Explore our collections</p>
                  </div>
                  {categories.map((cat, index) => (
                    <li key={cat.id} style={{ animationDelay: `${index * 0.05}s` }}>
                      <Link
                        to={`/category/${cat.id}`}
                        onClick={closeMobileMenu}
                        className="dropdown-item"
                      >
                        <span className="dropdown-item-icon">
                          {cat.images_url?.[0]?.image ? (
                            <img src={cat.images_url[0].image} alt={cat.name} />
                          ) : (
                            '📦'
                          )}
                        </span>
                        <span className="dropdown-item-text">{cat.name}</span>
                        <svg className="dropdown-item-arrow" width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </li>
                  ))}
                  <li className="dropdown-footer">
                    <Link to="/products" onClick={closeMobileMenu}>
                      View All Products →
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            <li>
              <Link to="/technology" onClick={closeMobileMenu}>
                <span className="nav-icon">⚡</span>
                Technology
              </Link>
            </li>

            <li>
              <Link to="/contact" onClick={closeMobileMenu}>
                <span className="nav-icon">✉️</span>
                Contact
              </Link>
            </li>
          </ul>
        </nav>

        <div className="header-actions">
          <div className="search-container" ref={searchRef}>
            <form onSubmit={handleSearchSubmit} className="search-form">
              <div className="search-btn" aria-label="Search">
                <svg
                  width="20"
                  height="20"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>

                <input
                  type="text"
                  placeholder="Search products & categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => searchQuery && setShowSearchResults(true)}
                />
              </div>
            </form>



            {showSearchResults && searchResults.length > 0 && (
              <div className="search-results">
                <div className="search-results-header">
                  <span>Search Results ({searchResults.length})</span>
                </div>
                {searchResults.map((result, index) => (
                  <div
                    key={`${result.type}-${result.id}-${index}`}
                    className="search-result-item"
                    onClick={() => handleSearchResultClick(result)}
                  >
                    <div className="search-result-icon">
                      {result.image ? (
                        <img src={result.image} alt={result.name} />
                      ) : (
                        <span>{result.type === 'category' ? '📁' : '📦'}</span>
                      )}
                    </div>
                    <div className="search-result-info">
                      <div className="search-result-name">{result.name}</div>
                      <div className="search-result-meta">
                        <span className="search-result-type">
                          {result.type === 'category' ? 'Category' : 'Product'}
                        </span>
                        {/* {result.price && (
                          <span className="search-result-price">₹{result.price}</span>
                        )} */}
                      </div>
                    </div>
                    <svg className="search-result-arrow" width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                ))}
              </div>
            )}

            {showSearchResults && searchQuery && searchResults.length === 0 && (
              <div className="search-results">
                <div className="search-no-results">
                  <svg width="48" height="48" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <p>No results found for "{searchQuery}"</p>
                  <span>Try searching with different keywords</span>
                </div>
              </div>
            )}
          </div>

          <button
            className="mobile-menu-btn"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            <span className={`hamburger ${mobileMenuOpen ? 'active' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;