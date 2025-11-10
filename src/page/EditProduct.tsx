import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProducts } from '../context/contextProduct';
import ProductForm from '../components/ProductForm';
import { Product } from '../types/Product';

const EditProduct: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { products, dispatch } = useProducts();

  const product = products.find(p => p.id === Number(id));

  if (!product) {
    return (
      <div className="edit-product-page">
        <h2>Sản phẩm không tồn tại</h2>
        <button onClick={() => navigate('/')} className="btn-back">
          Quay lại
        </button>
      </div>
    );
  }

  const handleSubmit = (productData: Omit<Product, 'id'>) => {
    const updatedProduct: Product = {
      ...productData,
      id: product.id
    };

    dispatch({ type: 'UPDATE_PRODUCT', payload: updatedProduct });
    
    navigate(`/products/${product.id}`);
  };

  const handleCancel = () => {
    navigate(`/products/${product.id}`);
  };

  return (
    <div className="edit-product-page">
      <h1 style={{color:'white'}}>Chỉnh sửa sản phẩm</h1>
      <ProductForm
        product={product}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default EditProduct;
