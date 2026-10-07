import React, { useState } from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Truck, Headphones, Check } from 'lucide-react';

export default function Footer({ onCategorySelect, onNewsletterSubscribe }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      if (onNewsletterSubscribe) onNewsletterSubscribe(email);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-subtle)', paddingTop: '4rem', paddingBottom: '3rem' }}>
      <div className="container">
        {/* Features Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2rem', paddingBottom: '3rem', borderBottom: '1px solid var(--border-subtle)', marginBottom: '3rem' }}>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--brand-gradient-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--brand-primary)', flexShrink: 0 }}>
              <Truck size={24} />
            </div>
            <div>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 700 }}>Express Worldwide Shipping</h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Fast and insured doorstep delivery</p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--brand-gradient-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--brand-primary)', flexShrink: 0 }}>
              <ShieldCheck size={24} />
            </div>
            <div>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 700 }}>100% Genuine Guaranteed</h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Certified authenticity on all items</p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--brand-gradient-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--brand-primary)', flexShrink: 0 }}>
              <Headphones size={24} />
            </div>
            <div>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 700 }}>24/7 Concierge Support</h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Dedicated support team on call</p>
            </div>
          </div>
        </div>

        {/* Links & Newsletter */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2.5rem', marginBottom: '3rem' }}>
          {/* Brand info */}
          <div style={{ maxWidth: '300px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.3rem', fontWeight: 800, marginBottom: '0.85rem' }}>
              <div style={{ width: '30px', height: '30px', borderRadius: '8px', background: 'var(--brand-gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                <Sparkles size={16} />
              </div>
              <span>AURA LUXE</span>
            </div>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              Crafted for discerning shoppers. Premium technology, timeless fine jewelry, and contemporary fashion curated with excellence.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Categories</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
              <li><a href="#electronics" onClick={() => onCategorySelect && onCategorySelect('electronics')}>Electronics</a></li>
              <li><a href="#jewelery" onClick={() => onCategorySelect && onCategorySelect('jewelery')}>Fine Jewelry</a></li>
              <li><a href="#mens" onClick={() => onCategorySelect && onCategorySelect("men's clothing")}>Men's Fashion</a></li>
              <li><a href="#womens" onClick={() => onCategorySelect && onCategorySelect("women's clothing")}>Women's Fashion</a></li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Customer Care</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
              <li>Order Tracking</li>
              <li>Shipping & Customs</li>
              <li>30-Day Returns</li>
              <li>Privacy Policy & Terms</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Stay Updated</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.85rem' }}>
              Subscribe to get exclusive early access to product drops and secret promos.
            </p>
            <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '0.5rem' }}>
              <input
                type="email"
                required
                placeholder="your.email@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  flex: 1,
                  padding: '0.6rem 0.9rem',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--bg-input)',
                  border: '1px solid var(--border-strong)',
                  color: 'var(--text-primary)',
                  fontSize: '0.85rem'
                }}
              />
              <button 
                type="submit" 
                className="btn-primary" 
                style={{ padding: '0.6rem 1rem', borderRadius: 'var(--radius-md)' }}
                aria-label="Subscribe to newsletter"
              >
                {subscribed ? <Check size={16} /> : <ArrowRight size={16} />}
              </button>
            </form>
            {subscribed && (
              <p style={{ fontSize: '0.78rem', color: 'var(--accent-success)', marginTop: '0.4rem' }}>
                ✓ Subscribed! Welcome to AURA Luxe VIP.
              </p>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', paddingTop: '2rem', borderTop: '1px solid var(--border-subtle)', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
          <div>
            © 2026 AURA Luxe Inc. Built with React. Designed for exceptional performance.
          </div>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <span>Powered by React 19 & Vanilla CSS</span>
            <span>Live API Ready</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
