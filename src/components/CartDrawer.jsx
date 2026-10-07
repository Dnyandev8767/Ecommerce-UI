import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  updateQuantity,
  removeFromCart,
  onNavigateToCartPage,
  onProceedToCheckout
}) {
  const subtotal = cartItems.reduce((acc, i) => acc + i.price * i.quantity, 0);

  return (
    <div className={`cart-drawer-overlay ${isOpen ? 'open' : ''}`} onClick={onClose}>
      <aside 
        className="cart-drawer-content" 
        onClick={(e) => e.stopPropagation()}
        aria-label="Quick Shopping Cart"
      >
        {/* Header */}
        <div className="cart-drawer-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <ShoppingBag size={20} color="var(--brand-primary)" />
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>Your Bag</h3>
            <span className="badge-tag">{cartItems.reduce((acc, i) => acc + i.quantity, 0)}</span>
          </div>
          <button 
            id="close-cart-drawer-btn"
            className="btn-icon" 
            onClick={onClose} 
            aria-label="Close cart drawer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="cart-drawer-body">
          {cartItems.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-secondary)' }}>
              <ShoppingBag size={48} style={{ opacity: 0.3, margin: '0 auto 1rem auto' }} />
              <p style={{ fontWeight: 600, fontSize: '1.1rem', color: 'var(--text-primary)' }}>Your bag is empty</p>
              <p style={{ fontSize: '0.85rem', marginTop: '0.5rem' }}>Add items from our catalog to get started.</p>
            </div>
          ) : (
            cartItems.map((item) => (
              <div 
                key={item.id} 
                style={{
                  display: 'flex',
                  gap: '1rem',
                  paddingBottom: '1rem',
                  borderBottom: '1px solid var(--border-subtle)',
                  alignItems: 'center'
                }}
              >
                <img 
                  src={item.image} 
                  alt={item.title} 
                  style={{ width: '60px', height: '60px', borderRadius: '10px', objectFit: 'cover' }} 
                />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h4 style={{ fontSize: '0.88rem', fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {item.title}
                  </h4>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: '0.2rem 0' }}>
                    ${item.price.toFixed(2)}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.4rem' }}>
                    <div className="qty-stepper" style={{ transform: 'scale(0.85)', transformOrigin: 'left center' }}>
                      <button 
                        className="qty-btn" 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        <Minus size={12} />
                      </button>
                      <span className="qty-number">{item.quantity}</span>
                      <button 
                        className="qty-btn" 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus size={12} />
                      </button>
                    </div>

                    <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>

                <button 
                  onClick={() => removeFromCart(item.id)}
                  style={{ color: 'var(--text-muted)', cursor: 'pointer', padding: '4px' }}
                  title="Remove"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="cart-drawer-footer">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <span style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>Subtotal</span>
              <span style={{ fontSize: '1.25rem', fontWeight: 800 }}>${subtotal.toFixed(2)}</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <button 
                id="drawer-view-cart-btn"
                className="btn-secondary" 
                style={{ width: '100%', padding: '0.75rem' }}
                onClick={() => {
                  onClose();
                  onNavigateToCartPage();
                }}
              >
                <span>View Full Cart Page</span>
              </button>

              <button 
                id="drawer-checkout-btn"
                className="btn-primary" 
                style={{ width: '100%', padding: '0.75rem' }}
                onClick={() => {
                  onClose();
                  onProceedToCheckout();
                }}
              >
                <span>Checkout Now</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}
