import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { CATEGORIES } from '../data/mockProducts';
import { fetchProductsFromAPI } from '../services/api';
import { Sparkles, RefreshCw, AlertCircle, ShoppingBag } from 'lucide-react';
import '../styles/ProductList.css';

/**
 * ProductList Component
 * 
 * Demonstrates:
 * - useEffect loads product data from API on component mount
 * - Product list is stored in state (products)
 * - Clean UI rendering using Array.prototype.map()
 * - Category filtering and sorting
 * - Passes addToCart prop down to each ProductCard
 */
export default function ProductList({
  searchTerm = '',
  addToCart,
  wishlist = [],
  onToggleWishlist,
  onQuickView
}) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');

  // Load products when component mounts using useEffect
  useEffect(() => {
    let isMounted = true;

    async function loadProducts() {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchProductsFromAPI();
        if (isMounted) {
          setProducts(data);
          setLoading(false);
        }
      } catch (err) {
        console.error("Error loading products:", err);
        if (isMounted) {
          setError("Failed to fetch products. Please try again.");
          setLoading(false);
        }
      }
    }

    loadProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  // Filter products by category and search keyword
  const filteredProducts = products.filter((product) => {
    const matchesCategory = 
      selectedCategory === 'all' || 
      product.category.toLowerCase() === selectedCategory.toLowerCase();

    const matchesSearch = 
      searchTerm.trim() === '' ||
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return (b.rating?.rate || 0) - (a.rating?.rate || 0);
    return a.id - b.id; // Default / Featured
  });

  return (
    <section className="product-section-wrapper" id="products-catalog-section">
      <div className="container">
        {/* Catalog Header & Filters */}
        <div className="catalog-header-area">
          <div className="catalog-title-row">
            <div>
              <div className="badge-tag" style={{ marginBottom: '0.5rem' }}>
                <Sparkles size={13} />
                <span>Curated Catalog</span>
              </div>
              <h2 className="catalog-main-title">Explore Premium Products</h2>
              <p className="catalog-subtitle">
                Carefully selected tech essentials, timeless accessories, and modern apparel.
              </p>
            </div>

            {/* Category Quick Chips */}
            <div className="category-filter-chips">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  id={`cat-filter-${cat.id}`}
                  className={`category-chip-btn ${selectedCategory === cat.id ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(cat.id)}
                >
                  <span>{cat.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Results Bar and Sorting Dropdown */}
          <div className="catalog-toolbar">
            <div className="catalog-results-info">
              {loading ? (
                <span>Loading products from API...</span>
              ) : (
                <span>
                  Showing <strong>{sortedProducts.length}</strong> {sortedProducts.length === 1 ? 'item' : 'items'}
                  {selectedCategory !== 'all' && ` in ${selectedCategory}`}
                  {searchTerm && ` matching "${searchTerm}"`}
                </span>
              )}
            </div>

            <div className="catalog-sort-group">
              <label htmlFor="catalog-sort-select" className="sort-label">Sort By:</label>
              <select
                id="catalog-sort-select"
                className="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="featured">Featured / Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Loading Skeleton State */}
        {loading && (
          <div className="product-grid">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
              <div key={n} className="skeleton-card">
                <div className="skeleton skeleton-image" />
                <div className="skeleton skeleton-line" style={{ width: '40%' }} />
                <div className="skeleton skeleton-line" style={{ width: '85%' }} />
                <div className="skeleton skeleton-line" style={{ width: '60%' }} />
                <div className="skeleton skeleton-line" style={{ width: '50%', marginTop: 'auto' }} />
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="catalog-empty-state">
            <AlertCircle size={48} color="var(--accent-danger)" />
            <h3>Failed to Load Products</h3>
            <p>{error}</p>
            <button 
              className="btn-primary" 
              onClick={() => window.location.reload()}
            >
              <RefreshCw size={16} />
              <span>Retry</span>
            </button>
          </div>
        )}

        {/* Empty Search / Filter State */}
        {!loading && !error && sortedProducts.length === 0 && (
          <div className="catalog-empty-state">
            <ShoppingBag size={48} color="var(--brand-primary)" />
            <h3>No Products Found</h3>
            <p>
              {searchTerm 
                ? `We couldn't find any products matching "${searchTerm}". Try checking your spelling or adjusting filters.`
                : `No products found in this category.`}
            </p>
            <button 
              className="btn-secondary" 
              onClick={() => {
                setSelectedCategory('all');
              }}
            >
              Show All Products
            </button>
          </div>
        )}

        {/* Product Cards Grid using map() */}
        {!loading && !error && sortedProducts.length > 0 && (
          <div className="product-grid" id="product-cards-grid">
            {sortedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                addToCart={addToCart}
                isWishlisted={wishlist.some((item) => item.id === product.id)}
                onToggleWishlist={onToggleWishlist}
                onQuickView={onQuickView}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
