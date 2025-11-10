import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProducts } from '../context/contextProduct';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { products, dispatch } = useProducts();

  const product = products.find(p => p.id === Number(id));

  if (!product) {
    return (
      <div className="product-detail">
        <h2>Sản phẩm không tồn tại</h2>
        <button onClick={() => navigate('/')} className="btn-back">
          Quay lại
        </button>
      </div>
    );
  }

  const handleDelete = () => {
    if (window.confirm(`Bạn có chắc muốn xóa "${product.ten}"?`)) {
      dispatch({ type: 'DELETE_PRODUCT', payload: product.id });
      navigate('/');
    }
  };

  return (
    <div className="product-detail">
      <h1>{product.ten}</h1>
      <div className="detail-content">
        <div className="detail-item">
          <strong>Danh mục:</strong> {product.danhMuc}
        </div>
        <div className="detail-item">
          <strong>Giá:</strong> {product.gia.toLocaleString('vi-VN')} ₫
        </div>
        <div className="detail-item">
          <strong>Số lượng:</strong> {product.soLuong}
        </div>
        <div className="detail-item">
          <strong>Mô tả:</strong>
          <p>{product.moTa}</p>
        </div>
      </div>

      <div className="detail-actions">
        <button onClick={() => navigate('/')} className="btn-back">
          Quay lại
        </button>
        <button onClick={() => navigate(`/edit/${product.id}`)} className="btn-edit">
          Chỉnh sửa
        </button>
        <button onClick={handleDelete} className="btn-delete">
          Xóa
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
