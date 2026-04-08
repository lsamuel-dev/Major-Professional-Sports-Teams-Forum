import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './src/App'; // Note: No extension needed if capitalized correctly
import './App.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
    console.error("Failed to find the root element.");
} else {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
}