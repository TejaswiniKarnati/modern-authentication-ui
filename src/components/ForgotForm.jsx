import React, { useState } from 'react';
import { Mail, ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react';

function ForgotForm({ onBackToLogin, triggerShake }) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Email address is required');
      triggerShake();
      return;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address');
      triggerShake();
      return;
    }

    setLoading(true);
    // Simulate sending email
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 1800);
  };

  if (sent) {
    return (
      <div className="success-wrapper">
        <div className="success-icon-container">
          <CheckCircle className="success-icon" />
        </div>
        <h2 className="brand-title" style={{ fontSize: '1.6rem', marginBottom: '12px' }}>Email Sent</h2>
        <p className="brand-subtitle" style={{ marginBottom: '26px', lineHeight: '1.5' }}>
          We've sent a password reset link to <strong style={{ color: 'var(--text-primary)' }}>{email}</strong>. 
          Please check your inbox.
        </p>
        <button type="button" className="btn-submit" onClick={onBackToLogin}>
          <ArrowLeft size={18} />
          Back to Login
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <p className="brand-subtitle" style={{ marginBottom: '24px', textAlign: 'center', lineHeight: '1.5' }}>
        No worries! Enter your email below and we will send you instructions to reset your password.
      </p>

      {/* Email Input */}
      <div className="form-group" style={{ marginBottom: '26px' }}>
        <label className="form-label" htmlFor="forgot-email">Email Address</label>
        <div className="input-wrapper">
          <Mail className="input-icon" size={18} />
          <input
            id="forgot-email"
            type="email"
            className="form-input"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (error) setError('');
            }}
          />
        </div>
        {error && (
          <div className="error-msg">
            <AlertCircle size={14} />
            <span>{error}</span>
          </div>
        )}
      </div>

      {/* Submit Button */}
      <button type="submit" className="btn-submit" disabled={loading}>
        {loading ? (
          <>
            <span className="spinner" aria-hidden="true"></span>
            Sending Instructions...
          </>
        ) : (
          'Send Reset Link'
        )}
      </button>

      {/* Back to Login Footer */}
      <div className="auth-footer" style={{ marginTop: '26px' }}>
        <button type="button" className="footer-link" onClick={onBackToLogin} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
          <ArrowLeft size={16} />
          Back to Sign In
        </button>
      </div>
    </form>
  );
}

export default ForgotForm;
