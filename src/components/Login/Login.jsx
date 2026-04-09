import React, { useState } from 'react';
import './Login.css';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      onLogin(username);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <header className="login-header">
          <h1>MAJOR PRO SPORTS TEAMS FORUM</h1>
          <h2>Member Secure Access</h2>
        </header>
        
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">USERNAME</label>
            <input 
              id="username"
              type="text" 
              placeholder="Case-Sensitive" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required 
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">PASSWORD</label>
            <input id="password" type="password" placeholder="Min. 8 characters" required />
          </div>

          <button type="submit" className="login-submit-btn">
            SUBMIT CREDENTIALS
          </button>
        </form>

        <footer className="login-footer">
          <p>This is a secure gateway. Unauthorized access is prohibited.</p>
        </footer>
      </div>
    </div>
  );
}

export default Login;