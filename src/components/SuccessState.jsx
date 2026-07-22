import React from 'react';
import { CheckCircle, LogOut } from 'lucide-react';

function SuccessState({ name, action, onReset }) {
  return (
    <div className="success-wrapper">
      <div className="success-icon-container">
        <CheckCircle className="success-icon" />
      </div>
      
      <h1 className="brand-title" style={{ fontSize: '2rem', marginBottom: '12px' }}>
        {action === 'login' ? 'Welcome Back!' : 'Account Created!'}
      </h1>
      
      <p className="brand-subtitle" style={{ marginBottom: '32px', fontSize: '1rem', lineHeight: '1.6', textAlign: 'center' }}>
        {action === 'login' ? (
          <>
            Hello, <strong style={{ color: 'var(--text-primary)' }}>{name}</strong>! You have successfully signed back into your dashboard.
          </>
        ) : (
          <>
            Welcome aboard, <strong style={{ color: 'var(--text-primary)' }}>{name}</strong>! Your brand new account is ready and configured.
          </>
        )}
      </p>

      <button type="button" className="btn-submit" onClick={onReset}>
        <LogOut size={18} />
        Sign Out
      </button>
    </div>
  );
}

export default SuccessState;
