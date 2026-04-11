import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App.jsx';

const rootElement = document.getElementById('root');

if (!rootElement) {
    console.error('Failed to find the root element.');
} else {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <HashRouter>
          <App />
        </HashRouter>
      </React.StrictMode>
    );
}