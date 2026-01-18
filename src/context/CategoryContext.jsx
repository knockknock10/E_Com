import { createContext, useEffect, useState, useMemo, useCallback } from "react";
import api from "../services/api";

// 1. Create context with a meaningful default (helps with debugging)
export const CategoryContext = createContext({
  categories: [],
  loading: true,
  error: null,
  refreshCategories: () => {},
});

export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 2. Wrap in useCallback so it can be used as a dependency elsewhere
  const fetchCategories = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get("/categories/");
      setCategories(res.data);
      setError(null);
    } catch (err) {
      console.error("Error fetching categories:", err);
      setError(err.message || "Failed to fetch categories");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // 3. Memoize the value to prevent re-rendering all consumers 
  // every time the Provider's parent re-renders.
  const value = useMemo(() => ({
    categories,
    loading,
    error,
    refreshCategories: fetchCategories
  }), [categories, loading, error, fetchCategories]);

  return (
    <CategoryContext.Provider value={value}>
      {children}
    </CategoryContext.Provider>
  );
};