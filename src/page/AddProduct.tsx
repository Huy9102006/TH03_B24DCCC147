import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '../context/contextProduct';
import ProductForm from '../components/ProductForm';
import { Product } from '../types/Product';

const AddProduct: React.FC = () => {
  const navigate = useNavigate();
  const { products, dispatch } = useProducts();

  const handleSubmit = (productData: Omit<Product, 'id'>) => {
    const newId = Math.max(...products.map(p => p.id), 0) + 1;
    const newProduct: Product = {
      ...productData,
      id: newId
    };

    dispatch({ type: 'ADD_PRODUCT', payload: newProduct });
    navigate('/');
  };

  return (
    <div className="add-product-page">
      <h1 style={{color:'white'}}>Thêm sản phẩm mới</h1>
      <ProductForm onSubmit={handleSubmit} onCancel={() => navigate('/')} />
    </div>
  );
};

export default AddProduct;
