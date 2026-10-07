import React, { useState } from 'react';
import { 
  X, 
  CreditCard, 
  Truck, 
  CheckCircle2, 
  ArrowRight
} from 'lucide-react';
import '../styles/Modal.css';

export default function CheckoutModal({
  isOpen,
  onClose,
  cartItems,
  grandTotal,
  currentUser,
  onOrderCompleted
}) {
  const [step, setStep] = useState('form'); // 'form' or 'success'
  const [orderId, setOrderId] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [formData, setFormData] = useState({
    fullName: currentUser ? currentUser.name : 'Alex Rivera',
    email: currentUser ? currentUser.email : 'alex@example.com',
    address: '742 Evergreen Terrace',
    city: 'San Francisco',
    postalCode: '94102',
    cardNumber: '•••• •••• •••• 4242'
  });

  if (!isOpen) return null;

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    const generatedId = 'AUR-' + Math.floor(100000 + Math.random() * 900000);
    setOrderId(generatedId);
    setStep('success');
    onOrderCompleted();
  };

  const handleFinish = () => {
    setStep('form');
    onClose();
  };

  return (
    <div className="modal-backdrop-overlay" onClick={onClose}>
      <div 
        className="modal-card-container checkout-modal-card"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
      >
        <button className="modal-close-btn" onClick={onClose} aria-label="Close checkout modal">
          <X size={18} />
        </button>

        {step === 'form' ? (
          <div>
            <div style={{ marginBottom: '1.75rem' }}>
              <div className="badge-tag" style={{ marginBottom: '0.4rem' }}>Secure Checkout</div>
              <h2 style={{ fontSize: '1.7rem', fontWeight: 800 }}>Complete Your Purchase</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                Total to pay: <strong style={{ color: 'var(--brand-primary)', fontSize: '1.1rem' }}>${grandTotal.toFixed(2)}</strong> ({cartItems.length} items)
              </p>
            </div>

            <form onSubmit={handleSubmitOrder}>
              {/* Shipping Details */}
              <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.85rem' }}>1. Shipping Address</h4>
              <div className="checkout-steps-grid">
                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Recipient Name</label>
                  <input
                    type="text"
                    required
                    className="auth-input-field"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Email Address</label>
                  <input
                    type="email"
                    required
                    className="auth-input-field"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Street Address</label>
                <input
                  type="text"
                  required
                  className="auth-input-field"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                />
              </div>

              <div className="checkout-steps-grid">
                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600 }}>City</label>
                  <input
                    type="text"
                    required
                    className="auth-input-field"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Postal Code</label>
                  <input
                    type="text"
                    required
                    className="auth-input-field"
                    value={formData.postalCode}
                    onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                  />
                </div>
              </div>

              {/* Payment Method */}
              <h4 style={{ fontSize: '1rem', fontWeight: 700, margin: '1.25rem 0 0.85rem 0' }}>2. Payment Method</h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <div 
                  className={`payment-method-card ${paymentMethod === 'card' ? 'selected' : ''}`}
                  onClick={() => setPaymentMethod('card')}
                >
                  <CreditCard size={20} color="var(--brand-primary)" />
                  <div>
                    <div style={{ fontSize: '0.88rem', fontWeight: 700 }}>Credit / Debit Card</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Visa, Mastercard, Amex</div>
                  </div>
                </div>

                <div 
                  className={`payment-method-card ${paymentMethod === 'cod' ? 'selected' : ''}`}
                  onClick={() => setPaymentMethod('cod')}
                >
                  <Truck size={20} color="var(--accent-success)" />
                  <div>
                    <div style={{ fontSize: '0.88rem', fontWeight: 700 }}>Cash on Delivery</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Pay at your doorstep</div>
                  </div>
                </div>
              </div>

              <button 
                id="place-order-submit-btn"
                type="submit" 
                className="btn-primary" 
                style={{ width: '100%', padding: '0.9rem', fontSize: '1rem' }}
              >
                <span>Authorize & Place Order (${grandTotal.toFixed(2)})</span>
                <ArrowRight size={18} />
              </button>
            </form>
          </div>
        ) : (
          /* Order Success Confirmation */
          <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
            <div style={{ width: '70px', height: '70px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.15)', color: 'var(--accent-success)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem auto' }}>
              <CheckCircle2 size={42} />
            </div>

            <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '0.5rem' }}>Order Confirmed!</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', maxWidth: '440px', margin: '0 auto 1.5rem auto' }}>
              Thank you for shopping with AURA Luxe! Your order has been placed successfully and is being prepared for dispatch.
            </p>

            <div style={{ background: 'var(--bg-secondary)', padding: '1.25rem', borderRadius: 'var(--radius-lg)', maxWidth: '440px', margin: '0 auto 2rem auto', textAlign: 'left', border: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.88rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Order ID:</span>
                <strong>{orderId}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.88rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Estimated Delivery:</span>
                <strong style={{ color: 'var(--accent-success)' }}>2 Business Days</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Delivery Address:</span>
                <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{formData.address}, {formData.city}</span>
              </div>
            </div>

            <button 
              id="order-success-continue-btn"
              className="btn-primary" 
              style={{ padding: '0.85rem 2rem' }}
              onClick={handleFinish}
            >
              <span>Back to Store</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
