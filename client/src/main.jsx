import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { ShopContextProvider } from './context/ShopContext'; // Ensure the context provider is imported

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <ShopContextProvider> {/* Use the ShopContextProvider to wrap the App component */}
    <App />
  </ShopContextProvider>
</BrowserRouter>

)
