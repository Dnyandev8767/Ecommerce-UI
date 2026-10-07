import React from 'react';
import ProductCard from './ProductCard';
import { Heart, ArrowLeft } from 'lucide-react';

export default function WishlistPage({
  wishlist = [],
  addToCart,
  onToggleWishlist,
  onQuickView,
  onNavigateHome
}) {
  if (wishlist.length === 0) {
    return (
      <section className="cart-page-section" id="wishlist-empty-view">
        <div className="container">
          <div className="cart-empty-view">
            <div className="cart-empty-icon-circle" style={{ color: 'var(--accent-danger)', background: 'rgba(244, 63, 94, 0.1)' }}>
              <Heart size={40} />
            </div>
            <h2>Your Wishlist is Empty</h2>
            <p style={{ color: 'var(--text-secondary)', margin: '0.85rem 0 1.5rem 0' }}>
              Save your favorite items here while browsing so you can easily purchase them later!
            </p>
            <button 
              id="wishlist-empty-browse-btn"
              className="btn-primary" 
              onClick={onNavigateHome}
            >
              <ArrowLeft size={18} />
              <span>Explore Catalog</span>
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="product-section-wrapper" id="wishlist-page">
      <div className="container">
        <div className="cart-header-title-row">
          <button 
            className="btn-secondary" 
            style={{ padding: '0.4rem 0.9rem', fontSize: '0.85rem', marginBottom: '1rem' }}
            onClick={onNavigateHome}
          >
            <ArrowLeft size={16} />
            <span>Back to Shopping</span>
          </button>
          <div>
            <h1 style={{ fontSize: '2.2rem', fontWeight: 800 }}>My Wishlist</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
              {wishlist.length} saved {wishlist.length === 1 ? 'item' : 'items'}
            </p>
          </div>
        </div>

        <div className="product-grid" style={{ marginTop: '2rem' }}>
          {wishlist.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              addToCart={addToCart}
              isWishlisted={true}
              onToggleWishlist={onToggleWishlist}
              onQuickView={onQuickView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
