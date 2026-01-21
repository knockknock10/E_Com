import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Admin.css';

const API_URL = "https://ecommerce-backend-1-8fi4.onrender.com/api";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    products: 0,
    categories: 0,
    carousel: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [productsRes, categoriesRes, carouselRes] = await Promise.all([
        axios.get(`${API_URL}/products/`),
        axios.get(`${API_URL}/categories/`),
        axios.get(`${API_URL}/carousel/`)
      ]);

      setStats({
        products: productsRes.data.length,
        categories: categoriesRes.data.length,
        carousel: carouselRes.data.length
      });
      setLoading(false);
    } catch (error) {
      console.error('Error fetching stats:', error);
      setLoading(false);
    }
  };

  const dashboardCards = [
    {
      title: 'Products',
      count: stats.products,
      icon: (
        <svg width="48" height="48" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
      link: '/admin/products',
      addLink: '/admin/products/add',
      color: '#0f172a'
    },
    {
      title: 'Categories',
      count: stats.categories,
      icon: (
        <svg width="48" height="48" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      link: '/admin/categories',
      addLink: '/admin/categories/add',
      color: '#7c3aed'
    },
    {
      title: 'Carousel',
      count: stats.carousel,
      icon: (
        <svg width="48" height="48" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      link: '/admin/carousel',
      addLink: '/admin/carousel/add',
      color: '#0891b2'
    }
  ];

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="spinner-large"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <div className="admin-header">
        <div>
          <h1>Admin Dashboard</h1>
          <p>Welcome to your admin panel</p>
        </div>
      </div>

      <div className="dashboard-grid">
        {dashboardCards.map((card, index) => (
          <div key={index} className="dashboard-card">
            <div className="dashboard-card-header">
              <div className="dashboard-icon" style={{ color: card.color }}>
                {card.icon}
              </div>
              <div className="dashboard-stats">
                <h2>{card.count}</h2>
                <p>{card.title}</p>
              </div>
            </div>
            
            <div className="dashboard-card-actions">
              <Link to={card.link} className="dashboard-btn-view">
                <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                View All
              </Link>
              <Link to={card.addLink} className="dashboard-btn-add">
                <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add New
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-quick-actions">
        <h3>Quick Actions</h3>
        <div className="quick-actions-grid">
          <Link to="/admin/products/add" className="quick-action-card">
            <svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span>Add Product</span>
          </Link>
          <Link to="/admin/categories/add" className="quick-action-card">
            <svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m-4 1h10a2 2 0 002-2V7a2 2 0 00-2-2H6a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span>Add Category</span>
          </Link>
          <Link to="/admin/carousel/add" className="quick-action-card">
            <svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>Add Carousel Slide</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;