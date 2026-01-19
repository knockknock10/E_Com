import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './Admin.css';

const API_URL = "https://ecommerce-backend-1-8fi4.onrender.com/api";

const AdminCategoryForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });
  const [images, setImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  useEffect(() => {
    if (isEditMode) {
      fetchCategory();
    }
  }, [id]);

  const fetchCategory = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/categories/${id}/`);
      setFormData({
        name: response.data.name,
        description: response.data.description || ''
      });
      setExistingImages(response.data.images_url || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching category:', error);
      alert('Error loading category');
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
      data.append('name', formData.name);
      data.append('description', formData.description);

      // Add new images
      images.forEach((image) => {
        data.append('images', image);
      });

      if (isEditMode) {
        // Update category
        await axios.put(`${API_URL}/categories/${id}/`, data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });

        // Delete removed images
        const currentImageIds = existingImages.map(img => img.id);

        alert('Category updated successfully!');
      } else {
        
        await axios.post(`${API_URL}/categories/`, data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        alert('Category created successfully!');
      }

      navigate('/admin/categories');
    } catch (error) {
      console.error('Error saving category:', error);
      alert('Error saving category. Please try again.');
      setSubmitLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="spinner-large"></div>
        <p>Loading category...</p>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <div className="admin-header">
        <div>
          <h1>{isEditMode ? 'Edit Category' : 'Add New Category'}</h1>
          <p>{isEditMode ? 'Update category information' : 'Create a new category'}</p>
        </div>
        <button onClick={() => navigate('/admin/categories')} className="btn-admin-secondary">
          <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Categories
        </button>
      </div>

      <div className="admin-form-container">
        <form onSubmit={handleSubmit} className="admin-form">
          <div className="form-section">
            <h3>Basic Information</h3>
            
            <div className="form-group">
              <label htmlFor="name">
                Category Name <span className="required">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="e.g., Electronics, Clothing, Books"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe this category..."
                rows="4"
              />
            </div>
          </div>

          <div className="form-section">
            <h3>Category Images</h3>
            
            {existingImages.length > 0 && (
              <div className="existing-images">
                <label>Current Images</label>
                <div className="image-preview-grid">
                  {existingImages.map((img) => (
                    <div key={img.id} className="image-preview-item">
                      <img src={img.image} alt="Category" />
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
                {existingImages.length > 0 ? 'Add More Images' : 'Upload Images'}
              </label>
              <div className="file-input-wrapper">
                <input
                  type="file"
                  id="images"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                  className="file-input"
                />
                <label htmlFor="images" className="file-input-label">
                  <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <span>Choose images or drag and drop</span>
                  <span className="file-input-hint">PNG, JPG up to 10MB</span>
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
              onClick={() => navigate('/admin/categories')}
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
                  {isEditMode ? 'Update Category' : 'Create Category'}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminCategoryForm;