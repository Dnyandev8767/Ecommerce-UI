import React, { useState } from 'react';
import { ShoppingCart, Heart, Eye, Star, Check } from 'lucide-react';
import '../styles/ProductCard.css';

/**
 * ProductCard Component
 * 
 * Demonstrates clean separation of UI and logic:
 * - Receives product data via props
 * - Receives addToCart callback as a prop so parent controls cart logic
 */
export default function ProductCard({ 
  product, 
  addToCart, 
  isWishlisted = false, 
  onToggleWishlist, 
  onQuickView 
}) {
  const [justAdded, setJustAdded] = useState(false);

  const handleAddToCartClick = (e) => {
    e.stopPropagation();
    if (addToCart) {
      addToCart(product);
    }
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1400);
  };

  const handleWishlistClick = (e) => {
    e.stopPropagation();
    if (onToggleWishlist) {
      onToggleWishlist(product);
    }
  };

  const handleQuickViewClick = (e) => {
    e.stopPropagation();
    if (onQuickView) {
      onQuickView(product);
    }
  };

  return (
    <article className="product-card" id={`product-card-${product.id}`}>
      {/* Product Image Area */}
      <div 
        className="product-image-container"
        onClick={handleQuickViewClick}
        style={{ cursor: 'pointer' }}
        title="Click to view details"
      >
        <img 
          src={product.image} 
          alt={product.title} 
          className="product-image"
          loading="lazy"
        />

        {/* Badges */}
        <div className="product-badges-container">
          {product.badge && (
            <span className="product-badge">{product.badge}</span>
          )}
        </div>

        {/* Quick Action Floating Buttons */}
        <div className="product-quick-actions">
          <button
            type="button"
            className={`action-circle-btn ${isWishlisted ? 'wishlisted' : ''}`}
            onClick={handleWishlistClick}
            aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
            title={isWishlisted ? "In Wishlist" : "Add to Wishlist"}
          >
            <Heart size={16} fill={isWishlisted ? "currentColor" : "none"} />
          </button>

          <button
            type="button"
            className="action-circle-btn"
            onClick={handleQuickViewClick}
            aria-label="Quick preview"
            title="Quick View"
          >
            <Eye size={16} />
          </button>
        </div>
      </div>

      {/* Product Details Body */}
      <div className="product-card-body">
        <div className="product-category-row">
          <span className="product-category-text">{product.category}</span>
          {product.rating && (
            <div className="product-rating-row" title={`${product.rating.rate} out of 5 stars`}>
              <Star size={13} fill="currentColor" />
              <span>{product.rating.rate}</span>
              <span className="rating-count-text">({product.rating.count})</span>
            </div>
          )}
        </div>

        <h3 
          className="product-card-title" 
          onClick={handleQuickViewClick}
          title={product.title}
        >
          {product.title}
        </h3>

        {/* Pricing & Add to Cart Action */}
        <div className="product-card-pricing">
          <div>
            <span className="price-current">${product.price.toFixed(2)}</span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="price-original">${product.originalPrice.toFixed(2)}</span>
            )}
          </div>

          <button
            type="button"
            id={`add-to-cart-btn-${product.id}`}
            className={`add-cart-btn ${justAdded ? 'added-state' : ''}`}
            onClick={handleAddToCartClick}
            aria-label={`Add ${product.title} to Cart`}
          >
            {justAdded ? (
              <>
                <Check size={16} />
                <span>Added</span>
              </>
            ) : (
              <>
                <ShoppingCart size={15} />
                <span>Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}
