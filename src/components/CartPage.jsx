import React, { useState } from 'react';
import { 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowLeft, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  X
} from 'lucide-react';
import '../styles/Cart.css';

/**
 * CartPage Component
 * 
 * Satisfies the requirement:
 * "The cart functionality is another important part of this project. 
 * The cart stores selected products and displays them on a separate page. 
 * State is used to keep track of cart items, and routing is used to navigate 
 * between the product page and the cart page."
 */
export default function CartPage({
  cartItems,
  updateQuantity,
  removeFromCart,
  clearCart,
  onNavigateHome,
  onProceedToCheckout,
  discountPercent = 0,
  appliedPromo = '',
  onApplyPromo,
  onRemovePromo
}) {
  const [promoInput, setPromoInput] = useState('');
  const [promoMessage, setPromoMessage] = useState('');

  // Calculate pricing
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity, 
    0
  );
  const discountAmount = (subtotal * discountPercent) / 100;
  const shipping = subtotal > 100 || subtotal === 0 ? 0 : 9.99;
  const tax = (subtotal - discountAmount) * 0.08; // 8% sales tax
  const grandTotal = Math.max(0, subtotal - discountAmount + shipping + tax);

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (!promoInput.trim()) return;

    if (promoInput.trim().toUpperCase() === 'SAVE20') {
      onApplyPromo('SAVE20', 20);
      setPromoMessage('20% discount applied successfully!');
      setPromoInput('');
    } else if (promoInput.trim().toUpperCase() === 'VIP50') {
      onApplyPromo('VIP50', 50);
      setPromoMessage('Special 50% VIP discount applied!');
      setPromoInput('');
    } else {
      setPromoMessage('Invalid coupon code. Try SAVE20');
    }
  };

  // If cart is empty
  if (cartItems.length === 0) {
    return (
      <section className="cart-page-section" id="cart-empty-view">
        <div className="container">
          <div className="cart-empty-view">
            <div className="cart-empty-icon-circle">
              <ShoppingBag size={40} />
            </div>
            <h2>Your Shopping Cart is Empty</h2>
            <p style={{ color: 'var(--text-secondary)', margin: '0.85rem 0 1.5rem 0' }}>
              Looks like you haven't added any products to your bag yet. 
              Explore our curated catalog to find items you love!
            </p>
            <button 
              id="cart-empty-browse-btn"
              className="btn-primary" 
              onClick={onNavigateHome}
            >
              <ArrowLeft size={18} />
              <span>Continue Shopping</span>
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="cart-page-section" id="cart-full-page">
      <div className="container">
        {/* Navigation Breadcrumb / Header */}
        <div className="cart-header-title-row">
          <button 
            className="btn-secondary" 
            style={{ padding: '0.4rem 0.9rem', fontSize: '0.85rem', marginBottom: '1rem' }}
            onClick={onNavigateHome}
          >
            <ArrowLeft size={16} />
            <span>Back to Shopping</span>
          </button>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h1 style={{ fontSize: '2.2rem', fontWeight: 800 }}>Shopping Bag</h1>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                You have {cartItems.reduce((acc, i) => acc + i.quantity, 0)} items in your cart
              </p>
            </div>
            <button 
              className="btn-secondary" 
              style={{ fontSize: '0.85rem', padding: '0.4rem 0.9rem', color: 'var(--accent-danger)' }}
              onClick={clearCart}
            >
              Clear Cart
            </button>
          </div>
        </div>

        {/* 2-Column Cart Grid: Items vs Order Summary */}
        <div className="cart-layout-grid">
          {/* Left Column: Cart Items */}
          <div className="cart-items-container">
            <div className="cart-items-header">
              <span>Product</span>
              <span style={{ textAlign: 'center' }}>Quantity</span>
              <span style={{ textAlign: 'right' }}>Total</span>
              <span></span>
            </div>

            {cartItems.map((item) => (
              <div key={item.id} className="cart-item-row" id={`cart-item-${item.id}`}>
                {/* Product Info */}
                <div className="cart-item-info">
                  <img src={item.image} alt={item.title} className="cart-item-img" />
                  <div className="cart-item-details">
                    <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--brand-primary)', fontWeight: 700 }}>
                      {item.category}
                    </span>
                    <h4>{item.title}</h4>
                    <span className="cart-item-unit-price">${item.price.toFixed(2)} each</span>
                  </div>
                </div>

                {/* Quantity Stepper */}
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <div className="qty-stepper">
                    <button
                      className="qty-btn"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                      aria-label="Decrease quantity"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="qty-number">{item.quantity}</span>
                    <button
                      className="qty-btn"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      aria-label="Increase quantity"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>

                {/* Line Item Total */}
                <div style={{ textAlign: 'right' }}>
                  <span className="cart-item-total-col">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>

                {/* Remove button */}
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <button
                    className="cart-item-remove-btn"
                    onClick={() => removeFromCart(item.id)}
                    aria-label={`Remove ${item.title}`}
                    title="Remove item"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Order Summary Card */}
          <div className="order-summary-card">
            <h3 className="summary-heading">Order Summary</h3>

            <div className="summary-line-row">
              <span>Subtotal</span>
              <strong>${subtotal.toFixed(2)}</strong>
            </div>

            {discountPercent > 0 && (
              <div className="summary-line-row" style={{ color: 'var(--accent-success)' }}>
                <span>Discount ({appliedPromo})</span>
                <strong>-${discountAmount.toFixed(2)}</strong>
              </div>
            )}

            <div className="summary-line-row">
              <span>Estimated Shipping</span>
              <span>{shipping === 0 ? <strong style={{ color: 'var(--accent-success)' }}>FREE</strong> : `$${shipping.toFixed(2)}`}</span>
            </div>

            <div className="summary-line-row">
              <span>Estimated Sales Tax (8%)</span>
              <strong>${tax.toFixed(2)}</strong>
            </div>

            {/* Promo Code Form */}
            {appliedPromo ? (
              <div className="applied-coupon-tag">
                <span>Code <strong>{appliedPromo}</strong> applied ({discountPercent}% OFF)</span>
                <button 
                  onClick={onRemovePromo} 
                  style={{ color: 'inherit', display: 'flex', alignItems: 'center' }}
                  aria-label="Remove promo code"
                >
                  <X size={15} />
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyPromo} className="promo-input-group">
                <input
                  type="text"
                  className="promo-input"
                  placeholder="Promo Code (SAVE20)"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                />
                <button type="submit" className="promo-apply-btn">Apply</button>
              </form>
            )}

            {promoMessage && !appliedPromo && (
              <p style={{ fontSize: '0.75rem', color: 'var(--accent-warning)', marginBottom: '0.75rem' }}>
                {promoMessage}
              </p>
            )}

            {/* Total Line */}
            <div className="summary-line-row total-line">
              <span>Grand Total</span>
              <span style={{ color: 'var(--brand-primary)', fontSize: '1.4rem' }}>
                ${grandTotal.toFixed(2)}
              </span>
            </div>

            {/* Checkout Action */}
            <button
              id="cart-proceed-checkout-btn"
              className="btn-primary checkout-btn-full"
              onClick={onProceedToCheckout}
            >
              <span>Proceed to Checkout</span>
            </button>

            {/* Guarantees */}
            <div className="security-badges">
              <div className="security-badge-item">
                <ShieldCheck size={16} color="var(--accent-success)" />
                <span>256-Bit Bank-Grade Secure Checkout</span>
              </div>
              <div className="security-badge-item">
                <Truck size={16} color="var(--brand-primary)" />
                <span>Complimentary Delivery on orders over $100</span>
              </div>
              <div className="security-badge-item">
                <RotateCcw size={16} color="var(--accent-cyan)" />
                <span>30-Day Risk-Free Return Guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
