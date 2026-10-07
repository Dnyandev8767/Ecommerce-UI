import React, { useState } from 'react';
import { X, Sparkles } from 'lucide-react';
import '../styles/Modal.css';

/**
 * AuthModal Component
 * 
 * Demonstrates basic authentication flow at a UI level:
 * - Controlled input forms with validation
 * - Switch between Login and Register views
 * - Convenient 1-Click Demo Account login
 * - Stores user profile in parent state & localStorage
 */
export default function AuthModal({ isOpen, onClose, onLoginSuccess }) {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError('Please fill in all required fields.');
      return;
    }
    if (isRegister && !name.trim()) {
      setError('Please provide your name.');
      return;
    }

    const userData = {
      name: isRegister ? name : (email.split('@')[0] || 'Alex Rivera'),
      email: email,
      token: 'demo-jwt-token-2026'
    };

    onLoginSuccess(userData);
    onClose();
  };

  const handleDemoLogin = () => {
    const demoUser = {
      name: 'Alex Rivera',
      email: 'alex.rivera@aura.io',
      token: 'demo-jwt-token-2026'
    };
    onLoginSuccess(demoUser);
    onClose();
  };

  return (
    <div className="modal-backdrop-overlay" onClick={onClose}>
      <div 
        className="modal-card-container auth-modal-card"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-labelledby="auth-modal-title"
      >
        <button className="modal-close-btn" onClick={onClose} aria-label="Close auth modal">
          <X size={18} />
        </button>

        <div className="auth-header-text">
          <div style={{ width: '48px', height: '48px', margin: '0 auto 1rem auto', borderRadius: '12px', background: 'var(--brand-gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
            <Sparkles size={24} />
          </div>
          <h2 id="auth-modal-title" style={{ fontSize: '1.6rem', fontWeight: 800 }}>
            {isRegister ? 'Create an Account' : 'Welcome Back'}
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.4rem' }}>
            {isRegister ? 'Join AURA Luxe for member rewards & tracking' : 'Sign in to access your orders and wishlist'}
          </p>
        </div>

        {error && (
          <div style={{ padding: '0.6rem 0.8rem', background: 'rgba(239, 68, 68, 0.15)', color: 'var(--accent-danger)', borderRadius: 'var(--radius-sm)', fontSize: '0.85rem', marginBottom: '1rem' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {isRegister && (
            <div>
              <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Full Name</label>
              <input
                id="auth-name-input"
                type="text"
                className="auth-input-field"
                placeholder="Alex Rivera"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}

          <div>
            <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Email Address</label>
            <input
              id="auth-email-input"
              type="email"
              className="auth-input-field"
              placeholder="you@domain.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Password</label>
            <input
              id="auth-password-input"
              type="password"
              className="auth-input-field"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button 
            type="submit" 
            id="auth-submit-btn"
            className="btn-primary" 
            style={{ width: '100%', padding: '0.85rem', marginBottom: '1rem' }}
          >
            {isRegister ? 'Create Account' : 'Sign In'}
          </button>
        </form>

        {/* 1-Click Demo Login */}
        <button
          type="button"
          id="demo-user-login-btn"
          className="btn-secondary"
          style={{ width: '100%', padding: '0.75rem', marginBottom: '1.5rem', borderColor: 'var(--border-accent)' }}
          onClick={handleDemoLogin}
        >
          <Sparkles size={16} color="var(--brand-primary)" />
          <span>Quick 1-Click Demo Login</span>
        </button>

        <div style={{ textAlign: 'center', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          {isRegister ? (
            <span>
              Already have an account?{' '}
              <button 
                type="button"
                style={{ color: 'var(--brand-primary)', fontWeight: 700 }}
                onClick={() => { setIsRegister(false); setError(''); }}
              >
                Sign In
              </button>
            </span>
          ) : (
            <span>
              Don't have an account yet?{' '}
              <button 
                type="button"
                style={{ color: 'var(--brand-primary)', fontWeight: 700 }}
                onClick={() => { setIsRegister(true); setError(''); }}
              >
                Create Account
              </button>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
