import React, { useState } from 'react';
import './Login.css';

function Login({ onLogin }) {
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleAuth = (e) => {
    e.preventDefault();
    setError('');

    // Get the "User Database" from LocalStorage
    const users = JSON.parse(localStorage.getItem('forum_users') || '{}');

    if (isRegistering) {
      if (users[username]) {
        setError('USERNAME ALREADY EXISTS');
      } else {
        // Register the new user
        users[username] = password;
        localStorage.setItem('forum_users', JSON.stringify(users));
        onLogin(username);
      }
    } else {
      // Login attempt
      if (users[username] && users[username] === password) {
        onLogin(username);
      } else {
        setError('INVALID CREDENTIALS');
      }
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <header className="login-header">
          <h1>{isRegistering ? 'CREATE ACCOUNT' : 'MEMBER ACCESS'}</h1>
        </header>
        
        <form className="login-form" onSubmit={handleAuth}>
          {error && <div style={{ color: 'red', fontWeight: 'bold', textAlign: 'center' }}>{error}</div>}
          
          <div className="input-group">
            <label>USERNAME</label>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required 
            />
          </div>

          <div className="input-group">
            <label>PASSWORD</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>

          <button type="submit" className="login-submit-btn">
            {isRegistering ? 'REGISTER' : 'LOGIN'}
          </button>
        </form>

        <footer className="login-footer">
          <p onClick={() => setIsRegistering(!isRegistering)} style={{ cursor: 'pointer', textDecoration: 'underline' }}>
            {isRegistering ? 'ALREADY HAVE AN ACCOUNT? LOGIN' : 'NEED AN ACCOUNT? SIGN UP'}
          </p>
        </footer>
      </div>
    </div>
  );
}

export default Login;