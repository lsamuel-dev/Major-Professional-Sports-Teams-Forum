import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '../App';
// Fixed: Changed 'app.css' to 'App.css' to match your file name
import './App.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
    console.error("Failed to find the root element. Make sure your public/index.html has <div id='root'></div>");
} else {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
}