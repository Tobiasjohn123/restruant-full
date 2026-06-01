import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { CartProvider } from './component/cartcontext.jsx';
import { LoadingProvider } from './component/loadingContent.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LoadingProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </LoadingProvider>
  </StrictMode>
);