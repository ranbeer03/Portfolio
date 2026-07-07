import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './styles/theme.css';
import './styles/global.css';
import App from './App';
import ShopContextProvider from './context/ShopContext';
import CartProvider from './context/CartContext';
import AuthProvider from './context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <ShopContextProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </ShopContextProvider>
    </AuthProvider>
  </React.StrictMode>
);
