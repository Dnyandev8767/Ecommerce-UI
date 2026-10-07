import React, { useState } from 'react';
import { 
  X, 
  ShoppingCart, 
  Heart, 
  Star, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Plus, 
  Minus,
  Zap
} from 'lucide-react';
import '../styles/Modal.css';

export default function ProductDetailModal({
  product,
  onClose,
  addToCart,
  isWishlisted,
  onToggleWishlist,
  onBuyNow
}) {
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    onClose();
  };

  const handleBuyNow = () => {
    onBuyNow(product, quantity);
    onClose();
  };

  return (
    <div className="modal-backdrop-overlay" onClick={onClose}>
      <div 
        className="modal-card-container product-modal-grid"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-labelledby="modal-product-title"
      >
        <button 
          className="modal-close-btn" 
          onClick={onClose}
          aria-label="Close product modal"
        >
          <X size={20} />
        </button>

        {/* Product Image Column */}
        <div className="modal-product-img-box">
          <img 
            src={product.image} 
            alt={product.title} 
            className="modal-product-img" 
          />
        </div>

        {/* Product Info Column */}
        <div className="modal-product-info-box">
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.75rem' }}>
            <span className="badge-tag">{product.category}</span>
            {product.rating && (
              <span className="modal-rating-badge">
                <Star size={14} fill="currentColor" />
                <span>{product.rating.rate}</span>
                <span style={{ opacity: 0.8, fontSize: '0.75rem', fontWeight: 500 }}>
                  ({product.rating.count} reviews)
                </span>
              </span>
            )}
          </div>

          <h2 id="modal-product-title" style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '0.75rem', lineHeight: 1.25 }}>
            {product.title}
          </h2>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <span style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--brand-primary)', fontFamily: 'var(--font-display)' }}>
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span style={{ fontSize: '1.1rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
            <span style={{ color: 'var(--accent-success)', fontSize: '0.85rem', fontWeight: 700, marginLeft: 'auto' }}>
              ● In Stock ({product.stock || 12} available)
            </span>
          </div>

          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
            {product.description}
          </p>

          {/* Quantity Stepper */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <span style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Quantity:</span>
            <div className="qty-stepper">
              <button 
                className="qty-btn" 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
              >
                <Minus size={14} />
              </button>
              <span className="qty-number">{quantity}</span>
              <button 
                className="qty-btn" 
                onClick={() => setQuantity(quantity + 1)}
              >
                <Plus size={14} />
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <button 
              id="modal-add-cart-btn"
              className="btn-primary" 
              style={{ flex: 1, padding: '0.85rem' }}
              onClick={handleAddToCart}
            >
              <ShoppingCart size={18} />
              <span>Add to Cart (${(product.price * quantity).toFixed(2)})</span>
            </button>

            <button 
              id="modal-buy-now-btn"
              className="btn-secondary"
              style={{ padding: '0.85rem 1.25rem' }}
              onClick={handleBuyNow}
            >
              <Zap size={18} color="var(--accent-warning)" />
              <span>Buy Now</span>
            </button>

            <button 
              className={`btn-icon ${isWishlisted ? 'action-circle-btn wishlisted' : ''}`}
              style={{ width: '48px', height: '48px', flexShrink: 0 }}
              onClick={() => onToggleWishlist(product)}
              title={isWishlisted ? "In Wishlist" : "Add to Wishlist"}
            >
              <Heart size={20} fill={isWishlisted ? "currentColor" : "none"} />
            </button>
          </div>

          {/* Guarantees */}
          <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Truck size={15} color="var(--brand-primary)" />
              <span>Free express delivery on orders over $100</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <RotateCcw size={15} color="var(--accent-success)" />
              <span>30-Day risk-free money-back guarantee</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <ShieldCheck size={15} color="var(--accent-warning)" />
              <span>1-Year certified product warranty included</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
