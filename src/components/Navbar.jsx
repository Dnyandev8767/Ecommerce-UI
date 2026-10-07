import React, { useState } from 'react';
import { 
  ShoppingCart, 
  Heart, 
  Search, 
  Sun, 
  Moon, 
  User, 
  X, 
  Sparkles, 
  LogOut, 
  ChevronDown 
} from 'lucide-react';
import '../styles/Navbar.css';

export default function Navbar({
  activeTab,
  setActiveTab,
  searchTerm,
  setSearchTerm,
  cartCount,
  wishlistCount,
  theme,
  toggleTheme,
  currentUser,
  onOpenAuth,
  onOpenCartDrawer,
  onLogout
}) {
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  return (
    <header className="navbar-header" id="main-navigation">
      <div className="container navbar-container">
        {/* Brand Logo */}
        <div 
          className="brand-logo" 
          onClick={() => setActiveTab('products')}
          role="button"
          tabIndex={0}
          id="brand-logo-btn"
        >
          <div className="brand-icon-wrap">
            <Sparkles size={20} />
          </div>
          <span>AURA</span>
          <span className="brand-badge">LUXE</span>
        </div>

        {/* Global Search Bar */}
        <div className="search-bar-wrapper">
          <Search size={18} className="search-icon-left" />
          <input
            id="product-search-input"
            type="text"
            className="search-input"
            placeholder="Search audio, watches, apparel, gear..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              if (activeTab !== 'products') setActiveTab('products');
            }}
          />
          {searchTerm && (
            <button 
              className="search-clear-btn" 
              onClick={() => setSearchTerm('')} 
              aria-label="Clear search"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Navigation Center Tabs */}
        <nav className="nav-center-links">
          <button
            id="nav-shop-btn"
            className={`nav-link ${activeTab === 'products' ? 'active' : ''}`}
            onClick={() => setActiveTab('products')}
          >
            <span>Shop</span>
          </button>
          <button
            id="nav-cart-btn"
            className={`nav-link ${activeTab === 'cart' ? 'active' : ''}`}
            onClick={() => setActiveTab('cart')}
          >
            <span>Cart</span>
            {cartCount > 0 && <span className="counter-badge" style={{ position: 'static' }}>{cartCount}</span>}
          </button>
          <button
            id="nav-wishlist-btn"
            className={`nav-link ${activeTab === 'wishlist' ? 'active' : ''}`}
            onClick={() => setActiveTab('wishlist')}
          >
            <span>Wishlist</span>
            {wishlistCount > 0 && <span className="counter-badge" style={{ position: 'static' }}>{wishlistCount}</span>}
          </button>
        </nav>

        {/* Action Controls */}
        <div className="nav-actions">
          {/* Theme Switcher */}
          <button 
            id="theme-toggle-btn"
            className="btn-icon" 
            onClick={toggleTheme}
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={19} /> : <Moon size={19} />}
          </button>

          {/* Wishlist Button */}
          <button 
            id="nav-wishlist-icon-btn"
            className="btn-icon action-btn-relative" 
            onClick={() => setActiveTab('wishlist')}
            title="Wishlist"
            aria-label="View Wishlist"
          >
            <Heart size={19} />
            {wishlistCount > 0 && (
              <span className="counter-badge">{wishlistCount}</span>
            )}
          </button>

          {/* Cart Drawer Trigger */}
          <button 
            id="nav-cart-drawer-btn"
            className="btn-icon action-btn-relative" 
            onClick={onOpenCartDrawer}
            title="Open Quick Cart Drawer"
            aria-label="Quick Cart"
          >
            <ShoppingCart size={19} />
            {cartCount > 0 && (
              <span className="counter-badge">{cartCount}</span>
            )}
          </button>

          {/* User Auth Pill */}
          {currentUser ? (
            <div style={{ position: 'relative' }}>
              <button 
                id="user-profile-menu-btn"
                className="user-pill-btn" 
                onClick={() => setShowUserDropdown(!showUserDropdown)}
              >
                <div className="user-avatar-small">
                  {currentUser.name ? currentUser.name[0].toUpperCase() : 'U'}
                </div>
                <span>{currentUser.name.split(' ')[0]}</span>
                <ChevronDown size={14} />
              </button>

              {showUserDropdown && (
                <div 
                  style={{
                    position: 'absolute',
                    right: 0,
                    top: 'calc(100% + 8px)',
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-strong)',
                    borderRadius: 'var(--radius-md)',
                    padding: '0.6rem',
                    minWidth: '180px',
                    boxShadow: 'var(--shadow-lg)',
                    zIndex: 200
                  }}
                >
                  <div style={{ padding: '0.4rem 0.6rem', borderBottom: '1px solid var(--border-subtle)', marginBottom: '0.4rem' }}>
                    <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-primary)' }}>{currentUser.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{currentUser.email}</div>
                  </div>
                  <button 
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      width: '100%',
                      padding: '0.5rem 0.6rem',
                      fontSize: '0.85rem',
                      color: 'var(--accent-danger)',
                      borderRadius: 'var(--radius-sm)',
                      cursor: 'pointer'
                    }}
                    onClick={() => {
                      onLogout();
                      setShowUserDropdown(false);
                    }}
                  >
                    <LogOut size={16} />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button 
              id="header-login-btn"
              className="btn-primary" 
              style={{ padding: '0.5rem 1.1rem', fontSize: '0.85rem' }}
              onClick={onOpenAuth}
            >
              <User size={16} />
              <span>Sign In</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
