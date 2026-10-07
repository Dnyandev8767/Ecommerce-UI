import React from 'react';
import { ArrowRight, Zap, Tag } from 'lucide-react';
import '../styles/HeroBanner.css';

export default function HeroBanner({ onExploreClick, onCopyPromo, promoCode = 'SAVE20' }) {
  return (
    <section className="hero-banner-section" aria-label="Featured Collection">
      <div className="container hero-grid">
        {/* Left Column: Copy & Actions */}
        <div>
          <div className="hero-tag-pill">
            <span className="dot"></span>
            <span>New Season • Spring 2026</span>
          </div>

          <h1 className="hero-title">
            Curated Elegance, <br />
            <span className="hero-gradient-text">Engineered Perfection.</span>
          </h1>

          <p className="hero-subtitle">
            Explore premium audio, timeless timepieces, and artisan craftsmanship. 
            Enjoy complimentary express shipping and 30-day hassle-free returns.
          </p>

          <div className="hero-cta-group">
            <button 
              id="hero-explore-btn"
              className="btn-primary" 
              onClick={onExploreClick}
            >
              <span>Explore Collection</span>
              <ArrowRight size={18} />
            </button>

            <button 
              id="hero-copy-promo-btn"
              className="coupon-pill" 
              onClick={() => onCopyPromo(promoCode)}
              title="Click to copy code"
            >
              <Tag size={15} />
              <span>Use Code: <strong>{promoCode}</strong> (20% Off)</span>
            </button>
          </div>

          <div className="hero-stats-row">
            <div className="hero-stat-item">
              <h4>40k+</h4>
              <p>Happy Customers</p>
            </div>
            <div className="hero-stat-item">
              <h4>4.9 ★</h4>
              <p>Top Rated Store</p>
            </div>
            <div className="hero-stat-item">
              <h4>48 Hrs</h4>
              <p>Express Delivery</p>
            </div>
          </div>
        </div>

        {/* Right Column: Hero Visual Card */}
        <div>
          <div className="hero-visual-card">
            <div className="hero-floating-badge">
              <Zap size={14} color="#f59e0b" fill="#f59e0b" />
              <span>Trending Spotlight</span>
            </div>

            <img
              src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80"
              alt="Sony WH-1000XM5 Wireless Headphones"
              className="hero-card-featured-img"
              loading="eager"
            />

            <div className="hero-card-meta">
              <div>
                <span className="badge-tag">Audiophile Choice</span>
                <h3 style={{ fontSize: '1.15rem', marginTop: '0.35rem' }}>Sony WH-1000XM5 Wireless</h3>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>$399.99</span>
                <div className="hero-card-price">$349.99</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
