import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './Admin.css';

const API_URL = "https://ecommerce-backend-1-8fi4.onrender.com/api";

const AdminCarouselForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const [formData, setFormData] = useState({
    text: ''
  });
  const [images, setImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  useEffect(() => {
    if (isEditMode) {
      fetchCarousel();
    }
  }, [id]);

  const fetchCarousel = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/carousel/${id}/`);
      setFormData({
        text: response.data.text || ''
      });
      setExistingImages(response.data.images || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching carousel:', error);
      alert('Error loading carousel slide');
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };

  const handleRemoveExistingImage = (imageId) => {
    setExistingImages(existingImages.filter(img => img.id !== imageId));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);

    try {
      const data = new FormData();
      data.append('text', formData.text);

      // Add new images
      images.forEach((image) => {
        data.append('images', image);
      });

      if (isEditMode) {
        // Update carousel
        await axios.put(`${API_URL}/carousel/${id}/`, data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        alert('Carousel slide updated successfully!');
      } else {
        // Create new carousel
        await axios.post(`${API_URL}/carousel/`, data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        alert('Carousel slide created successfully!');
      }

      navigate('/admin/carousel');
    } catch (error) {
      console.error('Error saving carousel:', error);
      alert('Error saving carousel slide. Please try again.');
      setSubmitLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="spinner-large"></div>
        <p>Loading carousel slide...</p>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <div className="admin-header">
        <div>
          <h1>{isEditMode ? 'Edit Carousel Slide' : 'Add New Carousel Slide'}</h1>
          <p>{isEditMode ? 'Update carousel slide information' : 'Create a new carousel slide'}</p>
        </div>
        <button onClick={() => navigate('/admin/carousel')} className="btn-admin-secondary">
          <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Carousel
        </button>
      </div>

      <div className="admin-form-container">
        <form onSubmit={handleSubmit} className="admin-form">
          <div className="form-section">
            <h3>Slide Information</h3>
            
            <div className="form-group">
              <label htmlFor="text">
                Slide Text
              </label>
              <textarea
                id="text"
                name="text"
                value={formData.text}
                onChange={handleInputChange}
                placeholder="Enter text for this carousel slide (optional)..."
                rows="4"
              />
            </div>
          </div>

          <div className="form-section">
            <h3>Carousel Images</h3>
            
            {existingImages.length > 0 && (
              <div className="existing-images">
                <label>Current Images</label>
                <div className="image-preview-grid">
                  {existingImages.map((img) => (
                    <div key={img.id} className="image-preview-item">
                      <img src={img.image} alt="Carousel" />
                      <button
                        type="button"
                        onClick={() => handleRemoveExistingImage(img.id)}
                        className="image-remove-btn"
                      >
                        <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="form-group">
              <label htmlFor="images">
                {existingImages.length > 0 ? 'Add More Images' : 'Upload Images'} {!isEditMode && <span className="required">*</span>}
              </label>
              <div className="file-input-wrapper">
                <input
                  type="file"
                  id="images"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                  className="file-input"
                  required={!isEditMode && existingImages.length === 0}
                />
                <label htmlFor="images" className="file-input-label">
                  <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <span>Choose images or drag and drop</span>
                  <span className="file-input-hint">PNG, JPG up to 10MB each (recommended: 1920x600)</span>
                </label>
              </div>
              {images.length > 0 && (
                <div className="selected-files">
                  <p>{images.length} file(s) selected</p>
                  <ul>
                    {images.map((file, index) => (
                      <li key={index}>{file.name}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          <div className="form-actions">
            <button
              type="button"
              onClick={() => navigate('/admin/carousel')}
              className="btn-admin-secondary"
              disabled={submitLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-admin-primary"
              disabled={submitLoading}
            >
              {submitLoading ? (
                <>
                  <span className="spinner-small"></span>
                  {isEditMode ? 'Updating...' : 'Creating...'}
                </>
              ) : (
                <>
                  <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {isEditMode ? 'Update Slide' : 'Create Slide'}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminCarouselForm;