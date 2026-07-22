import React, { useState, useEffect } from 'react';
import AuthCard from './components/AuthCard';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import ForgotForm from './components/ForgotForm';
import SuccessState from './components/SuccessState';

function App() {
  const [view, setView] = useState('login'); // 'login' | 'signup' | 'forgot' | 'success'
  const [successData, setSuccessData] = useState({ name: '', action: '' });
  const [shake, setShake] = useState(false);

  // Background spotlight mouse tracking logic
  useEffect(() => {
    const handleMouseMove = (e) => {
      const appContainer = document.querySelector('.app-container');
      if (appContainer) {
        // Set coordinates relative to the screen or container
        appContainer.style.setProperty('--mouse-x', `${e.clientX}px`);
        appContainer.style.setProperty('--mouse-y', `${e.clientY}px`);
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 500);
  };

  const handleSuccess = (name, actionType) => {
    setSuccessData({ name, action: actionType });
    setView('success');
  };

  const handleReset = () => {
    setView('login');
    setSuccessData({ name: '', action: '' });
  };

  return (
    <div className="app-container">
      {/* Decorative Orbs in Background */}
      <div className="background-orbs">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
      </div>

      <AuthCard shake={shake}>
        {view === 'login' && (
          <div className="form-transition-wrapper">
            <div className="brand-header">
              <h1 id="main-title" className="brand-title">Welcome Back</h1>
              <p className="brand-subtitle">Login to access your creative space</p>
            </div>
            <LoginForm 
              onSuccess={(name) => handleSuccess(name, 'login')}
              onForgotPassword={() => setView('forgot')}
              onSignupClick={() => setView('signup')}
              triggerShake={triggerShake}
            />
          </div>
        )}

        {view === 'signup' && (
          <div className="form-transition-wrapper">
            <div className="brand-header">
              <h1 className="brand-title">Create Account</h1>
              <p className="brand-subtitle">Join us and start your journey today</p>
            </div>
            <SignupForm 
              onSuccess={(name) => handleSuccess(name, 'signup')}
              onLoginClick={() => setView('login')}
              triggerShake={triggerShake}
            />
          </div>
        )}

        {view === 'forgot' && (
          <div className="form-transition-wrapper">
            <div className="brand-header">
              <h1 className="brand-title">Reset Password</h1>
              <p className="brand-subtitle">Enter your email to recover your account</p>
            </div>
            <ForgotForm 
              onBackToLogin={() => setView('login')}
              triggerShake={triggerShake}
            />
          </div>
        )}

        {view === 'success' && (
          <div className="form-transition-wrapper">
            <SuccessState 
              name={successData.name} 
              action={successData.action} 
              onReset={handleReset} 
            />
          </div>
        )}
      </AuthCard>
    </div>
  );
}

export default App;
