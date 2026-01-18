import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';

import Home from './pages/Home.jsx';
import Products from './pages/Products.jsx';
import CategoryDetail from './pages/CategoryDetail.jsx';
import ProductDetail from './pages/ProductDetail.jsx';
import Technology from './pages/Technology.jsx';
import Contact from './pages/Contact.jsx';

// Admin pages
import AdminCategories from "./admin/AdminCategories.jsx";
import AdminCategoryForm from "./admin/AdminCategoryForm.jsx";
import AdminProducts from "./admin/AdminProduct.jsx";
import AdminProductForm from "./admin/AdminProductForm.jsx";

import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
  
      <main>
        <Routes>
          {/* ---------- Public Routes ---------- */}
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/technology" element={<Technology />} />
          <Route path="/contact" element={<Contact />} />

          <Route path="/category/:categoryId" element={<CategoryDetail />} />
          <Route path="/product/:productId" element={<ProductDetail />} />

          {/* ---------- Admin Routes ---------- */}
          {/* Redirect /admin → /admin/categories */}
          <Route path="/admin" element={<Navigate to="/admin/categories" replace />} />

          {/* Categories Management */}
          <Route path="/admin/categories" element={<AdminCategories />} />
          <Route path="/admin/categories/add" element={<AdminCategoryForm />} />
          <Route path="/admin/categories/edit/:id" element={<AdminCategoryForm />} />

          {/* Products Management */}
          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="/admin/products/add" element={<AdminProductForm />} />
          <Route path="/admin/products/edit/:id" element={<AdminProductForm />} />

          {/* ---------- 404 ---------- */}
          <Route
            path="*"
            element={
              <div className="not-found">
                <h1>404 - Page Not Found</h1>
                <p>The page you're looking for doesn't exist.</p>
                <a href="/">Go back home</a>
              </div>
            }
          />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;