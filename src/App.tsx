import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProductProvider } from './context/contextProduct';
import HomePage from './page/HomePage';
import ProductDetail from './page/ProductDetail';
import AddProduct from './page/AddProduct';
import EditProduct from './page/EditProduct';
import './App.css';

const App: React.FC = () => {
  return (
    <ProductProvider>
      <BrowserRouter>
        <div className="app">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/add" element={<AddProduct />} />
            <Route path="/edit/:id" element={<EditProduct />} />
          </Routes>
        </div>
      </BrowserRouter>
    </ProductProvider>
  );
};

export default App;
