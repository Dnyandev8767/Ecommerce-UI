import React from 'react';
import { CheckCircle2, AlertCircle, Info, Sparkles } from 'lucide-react';
import '../styles/Toast.css';

export default function ToastContainer({ toasts, onDismiss }) {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="toast-container" aria-live="polite">
      {toasts.map((toast) => {
        let Icon = CheckCircle2;
        let iconColor = 'var(--accent-success)';

        if (toast.type === 'info') {
          Icon = Info;
          iconColor = 'var(--brand-primary)';
        } else if (toast.type === 'warning') {
          Icon = AlertCircle;
          iconColor = 'var(--accent-warning)';
        } else if (toast.type === 'sparkle') {
          Icon = Sparkles;
          iconColor = 'var(--brand-primary)';
        }

        return (
          <div 
            key={toast.id} 
            className={`toast-item ${toast.type || 'success'}`}
            onClick={() => onDismiss && onDismiss(toast.id)}
            role="alert"
          >
            <Icon size={18} color={iconColor} style={{ flexShrink: 0 }} />
            <span style={{ flex: 1 }}>{toast.message}</span>
          </div>
        );
      })}
    </div>
  );
}
