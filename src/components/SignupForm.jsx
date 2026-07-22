import React, { useState } from 'react';
import { User, Mail, Lock, Eye, EyeOff, UserPlus, AlertCircle } from 'lucide-react';

function SignupForm({ onSuccess, onLoginClick, triggerShake }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Check password strength dynamically
  const getPasswordStrength = () => {
    if (!password) return { score: 0, text: '', className: '' };
    
    let score = 0;
    if (password.length >= 6) score++;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password) || /[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 1) {
      return { score, text: 'Weak password', className: 'weak' };
    } else if (score <= 3) {
      return { score, text: 'Medium strength', className: 'medium' };
    } else {
      return { score, text: 'Strong password', className: 'strong' };
    }
  };

  const strength = getPasswordStrength();

  const validate = () => {
    const tempErrors = {};
    // Name validation
    if (!name.trim()) {
      tempErrors.name = 'Full name is required';
    } else if (name.trim().length < 2) {
      tempErrors.name = 'Name must be at least 2 characters';
    }
    // Email validation
    if (!email) {
      tempErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      tempErrors.email = 'Please enter a valid email address';
    }
    // Password validation
    if (!password) {
      tempErrors.password = 'Password is required';
    } else if (password.length < 6) {
      tempErrors.password = 'Password must be at least 6 characters';
    }
    // Confirm Password validation
    if (password !== confirmPassword) {
      tempErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        onSuccess(name.trim());
      }, 1800);
    } else {
      triggerShake();
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      {/* Full Name Input */}
      <div className="form-group">
        <label className="form-label" htmlFor="name-input">Full Name</label>
        <div className="input-wrapper">
          <User className="input-icon" size={18} />
          <input
            id="name-input"
            type="text"
            className="form-input"
            placeholder="John Doe"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (errors.name) setErrors({ ...errors, name: '' });
            }}
          />
        </div>
        {errors.name && (
          <div className="error-msg">
            <AlertCircle size={14} />
            <span>{errors.name}</span>
          </div>
        )}
      </div>

      {/* Email Input */}
      <div className="form-group">
        <label className="form-label" htmlFor="signup-email">Email Address</label>
        <div className="input-wrapper">
          <Mail className="input-icon" size={18} />
          <input
            id="signup-email"
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
        <label className="form-label" htmlFor="signup-password">Password</label>
        <div className="input-wrapper">
          <Lock className="input-icon" size={18} />
          <input
            id="signup-password"
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
        
        {/* Strength Indicator */}
        {password && (
          <>
            <div className="strength-bar-container">
              <div className={`strength-bar ${strength.score >= 1 ? strength.className : ''}`}></div>
              <div className={`strength-bar ${strength.score >= 3 ? strength.className : ''}`}></div>
              <div className={`strength-bar ${strength.score >= 4 ? strength.className : ''}`}></div>
            </div>
            <span className="strength-text">{strength.text}</span>
          </>
        )}
        
        {errors.password && (
          <div className="error-msg">
            <AlertCircle size={14} />
            <span>{errors.password}</span>
          </div>
        )}
      </div>

      {/* Confirm Password Input */}
      <div className="form-group">
        <label className="form-label" htmlFor="confirm-password">Confirm Password</label>
        <div className="input-wrapper">
          <Lock className="input-icon" size={18} />
          <input
            id="confirm-password"
            type={showConfirmPassword ? 'text' : 'password'}
            className="form-input form-input-password"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: '' });
            }}
          />
          <button
            type="button"
            className="password-toggle"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
          >
            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        {errors.confirmPassword && (
          <div className="error-msg">
            <AlertCircle size={14} />
            <span>{errors.confirmPassword}</span>
          </div>
        )}
      </div>

      {/* Submit Button */}
      <button type="submit" className="btn-submit" style={{ marginTop: '30px' }} disabled={loading}>
        {loading ? (
          <>
            <span className="spinner" aria-hidden="true"></span>
            Creating Account...
          </>
        ) : (
          <>
            Create Account
            <UserPlus size={18} />
          </>
        )}
      </button>

      {/* Switch to Login */}
      <div className="auth-footer" style={{ marginTop: '26px' }}>
        Already have an account?
        <button type="button" className="footer-link" onClick={onLoginClick}>
          Sign In
        </button>
      </div>
    </form>
  );
}

export default SignupForm;
