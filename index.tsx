
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const renderApp = () => {
  const rootElement = document.getElementById('root');
  if (!rootElement) return;

  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  
  // Limpieza de seguridad del loader
  const loader = document.getElementById('loader');
  if (loader) {
    setTimeout(() => {
      loader.style.opacity = '0';
      setTimeout(() => loader.remove(), 500);
    }, 500);
  }
};

// Asegurar que el DOM esté cargado antes de intentar montar React
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderApp);
} else {
  renderApp();
}
