import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, ArrowRight, AlertCircle } from 'lucide-react';

function LoginForm({ onSuccess, onForgotPassword, onSignupClick, triggerShake }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const tempErrors = {};
    // Email validate
    if (!email) {
      tempErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      tempErrors.email = 'Please enter a valid email address';
    }
    // Password validate
    if (!password) {
      tempErrors.password = 'Password is required';
    } else if (password.length < 6) {
      tempErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        setLoading(false);
        const name = email.split('@')[0]; // Simple display name extraction
        // Capitalize name
        const displayName = name.charAt(0).toUpperCase() + name.slice(1);
        onSuccess(displayName);
      }, 1800);
    } else {
      triggerShake();
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      {/* Email Input */}
      <div className="form-group">
        <label className="form-label" htmlFor="email-input">Email Address</label>
        <div className="input-wrapper">
          <Mail className="input-icon" size={18} />
          <input
            id="email-input"
            type="email"
            className="form-input"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email) setErrors({ ...errors, email: '' });
            }}
          />
        </div>
        {errors.email && (
          <div className="error-msg">
            <AlertCircle size={14} />
            <span>{errors.email}</span>
          </div>
        )}
      </div>

      {/* Password Input */}
      <div className="form-group">
        <label className="form-label" htmlFor="password-input">Password</label>
        <div className="input-wrapper">
          <Lock className="input-icon" size={18} />
          <input
            id="password-input"
            type={showPassword ? 'text' : 'password'}
            className="form-input form-input-password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (errors.password) setErrors({ ...errors, password: '' });
            }}
          />
          <button
            type="button"
            className="password-toggle"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        {errors.password && (
          <div className="error-msg">
            <AlertCircle size={14} />
            <span>{errors.password}</span>
          </div>
        )}
      </div>

      {/* Remember Me & Forgot Password Link */}
      <div className="form-options">
        <label className="remember-me">
          <input
            type="checkbox"
            className="checkbox-native"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          <span className="checkbox-custom"></span>
          Remember me
        </label>
        <button
          type="button"
          className="forgot-link footer-link"
          style={{ padding: 0, margin: 0 }}
          onClick={onForgotPassword}
        >
          Forgot Password?
        </button>
      </div>

      {/* Submit Button */}
      <button type="submit" className="btn-submit" disabled={loading}>
        {loading ? (
          <>
            <span className="spinner" aria-hidden="true"></span>
            Signing In...
          </>
        ) : (
          <>
            Sign In
            <ArrowRight size={18} />
          </>
        )}
      </button>

      {/* Divider */}
      <div className="divider">Or continue with</div>

      {/* Social Logins */}
      <div className="social-grid">
        <button type="button" className="btn-social" aria-label="Sign in with Google">
          <svg className="social-icon" viewBox="0 0 24 24">
            <path d="M12.24 10.285V13.4h6.887c-.275 1.565-1.88 4.604-6.887 4.604-4.33 0-7.859-3.579-7.859-8s3.529-8 7.859-8c2.46 0 4.105 1.025 5.047 1.926l2.427-2.334C18.155 2.114 15.42 1 12.24 1 6.033 1 1 6.033 1 12.24s5.033 11.24 11.24 11.24c6.478 0 10.793-4.537 10.793-10.985 0-.743-.08-1.3-.176-1.71H12.24z"/>
          </svg>
        </button>
        <button type="button" className="btn-social" aria-label="Sign in with GitHub">
          <svg className="social-icon" viewBox="0 0 24 24">
            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
          </svg>
        </button>
        <button type="button" className="btn-social" aria-label="Sign in with Apple">
          <svg className="social-icon" viewBox="0 0 24 24">
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.2.67-2.92 1.49-.62.71-1.16 1.85-1.01 2.96 1.12.09 2.27-.57 2.94-1.39z"/>
          </svg>
        </button>
      </div>

      {/* Switch to Signup */}
      <div className="auth-footer">
        Don't have an account?
        <button type="button" className="footer-link" onClick={onSignupClick}>
          Sign Up
        </button>
      </div>
    </form>
  );
}

export default LoginForm;
