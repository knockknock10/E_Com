import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Admin.css';

const API_URL = "https://ecommerce-backend-1-8fi4.onrender.com/api";

const AdminCarousel = () => {
  const [carousels, setCarousels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteModal, setDeleteModal] = useState({ show: false, id: null, text: '' });

  useEffect(() => {
    fetchCarousels();
  }, []);

  const fetchCarousels = async () => {
    try {
      const response = await axios.get(`${API_URL}/carousel/`);
      setCarousels(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching carousels:', error);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/carousel/${id}/`);
      setCarousels(carousels.filter(c => c.id !== id));
      setDeleteModal({ show: false, id: null, text: '' });
      alert('Carousel slide deleted successfully!');
    } catch (error) {
      console.error('Error deleting carousel:', error);
      alert('Error deleting carousel slide. Please try again.');
    }
  };

  const filteredCarousels = carousels.filter(carousel =>
    carousel.text?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="spinner-large"></div>
        <p>Loading carousel slides...</p>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <div className="admin-header">
        <div>
          <h1>Carousel Management</h1>
          <p>Manage your homepage carousel slides</p>
        </div>
        <Link to="/admin/carousel/add" className="btn-admin-primary">
          <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Slide
        </Link>
      </div>

      <div className="admin-toolbar">
        <div className="search-box">
          <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search carousel slides..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="admin-stats">
          <span className="stat-badge">Total: {carousels.length}</span>
        </div>
      </div>

      {filteredCarousels.length === 0 ? (
        <div className="admin-empty">
          <svg width="64" height="64" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <h3>No carousel slides found</h3>
          <p>Start by creating your first carousel slide</p>
          <Link to="/admin/carousel/add" className="btn-admin-secondary">
            Create Slide
          </Link>
        </div>
      ) : (
        <div className="admin-grid">
          {filteredCarousels.map((carousel) => (
            <div key={carousel.id} className="product-admin-card">
              <div className="product-admin-image">
                {carousel.images?.[0]?.image ? (
                  <img src={carousel.images[0].image} alt={carousel.text} />
                ) : (
                  <div className="product-admin-placeholder">🖼️</div>
                )}
              </div>
              
              <div className="product-admin-content">
                <h3>{carousel.text || 'Untitled Slide'}</h3>
                <p className="product-admin-description">
                  {carousel.images?.length || 0} image(s)
                </p>
                <div className="product-admin-footer">
                  <div className="product-admin-date">
                    {new Date(carousel.created_date).toLocaleDateString()}
                  </div>
                </div>
              </div>

              <div className="product-admin-actions">
                <Link
                  to={`/admin/carousel/edit/${carousel.id}`}
                  className="btn-action btn-edit"
                  title="Edit"
                >
                  <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </Link>
                <button
                  onClick={() => setDeleteModal({ show: true, id: carousel.id, text: carousel.text })}
                  className="btn-action btn-delete"
                  title="Delete"
                >
                  <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {deleteModal.show && (
        <div className="modal-overlay" onClick={() => setDeleteModal({ show: false, id: null, text: '' })}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Delete Carousel Slide</h3>
              <button onClick={() => setDeleteModal({ show: false, id: null, text: '' })} className="modal-close">
                <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="modal-body">
              <div className="modal-icon-danger">
                <svg width="48" height="48" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <p>Are you sure you want to delete <strong>"{deleteModal.text || 'this slide'}"</strong>?</p>
              <p className="modal-warning">This action cannot be undone.</p>
            </div>
            <div className="modal-footer">
              <button
                onClick={() => setDeleteModal({ show: false, id: null, text: '' })}
                className="btn-admin-secondary"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteModal.id)}
                className="btn-admin-danger"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCarousel;