import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Product } from '../types/Product';

interface ProductCardProps {
  product: Product;
  onDelete: (id: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onDelete }) => {
  const navigate = useNavigate();

  const handleDelete = () => {
    if (window.confirm(`Bạn có chắc muốn xóa "${product.ten}"?`)) {
      onDelete(product.id);
    }
  };

  return (
    <div className="product-card">
      <h3>{product.ten}</h3>
      <p className="category">{product.danhMuc}</p>
      <p className="price">{product.gia.toLocaleString('vi-VN')} ₫</p>
      <p className="quantity">Số lượng: {product.soLuong}</p>
      <p className="description">{product.moTa.substring(0, 50)}...</p>
      
      <div className="card-actions">
        <button onClick={() => navigate(`/products/${product.id}`)} className="btn-view">
          Chi tiết
        </button>
        <button onClick={() => navigate(`/edit/${product.id}`)} className="btn-edit">
          Sửa
        </button>
        <button onClick={handleDelete} className="btn-delete">
          Xóa
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
