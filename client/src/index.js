import React from 'react';
// eslint-disable-next-line 
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/auth';
import { SearchProvider } from './context/Search';
import { CartProvider } from './context/Cart';
import { FavouriteProvider } from './context/favourites';
import 'antd/dist/reset.css';
import { BuyProvider } from './context/buy';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    <SearchProvider>
      <CartProvider>
        <FavouriteProvider>
          <BuyProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </BuyProvider>
        </FavouriteProvider>   
       </CartProvider>
    </SearchProvider>   
  </AuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
