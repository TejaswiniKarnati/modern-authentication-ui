import React from 'react';

function AuthCard({ children, shake }) {
  return (
    <div className={`auth-card ${shake ? 'shake-animation' : ''}`}>
      {children}
    </div>
  );
}

export default AuthCard;
