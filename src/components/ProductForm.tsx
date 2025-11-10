import React, { useState, useEffect } from 'react';
import { Product } from '../types/Product';

interface ProductFormProps {
  product?: Product;
  onSubmit: (product: Omit<Product, 'id'>) => void;
  onCancel: () => void;
}

interface FormErrors {
  ten?: string;
  gia?: string;
  soLuong?: string;
  danhMuc?: string;
}

const ProductForm: React.FC<ProductFormProps> = ({ product, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    ten: product?.ten || '',
    danhMuc: product?.danhMuc || '' as 'Điện tử' | 'Quần áo' | 'Đồ ăn' | 'Sách' | 'Khác',
    gia: product?.gia || 0,
    soLuong: product?.soLuong || 0,
    moTa: product?.moTa || ''
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.ten || formData.ten.trim().length < 3) {
      newErrors.ten = 'Tên sản phẩm phải có ít nhất 3 ký tự';
    }

    if (!formData.danhMuc) {
      newErrors.danhMuc = 'Vui lòng chọn danh mục';
    }

    if (!formData.gia || formData.gia <= 0) {
      newErrors.gia = 'Giá phải là số dương';
    }

    if (!formData.soLuong || formData.soLuong <= 0 || !Number.isInteger(formData.soLuong)) {
      newErrors.soLuong = 'Số lượng phải là số nguyên dương';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="product-form">
      <div className="form-group">
        <label>Tên sản phẩm *</label>
        <input
          type="text"
          value={formData.ten}
          onChange={(e) => setFormData({ ...formData, ten: e.target.value })}
          className={errors.ten ? 'error' : ''}
        />
        {errors.ten && <span className="error-message">{errors.ten}</span>}
      </div>

      <div className="form-group">
        <label>Danh mục *</label>
        <select
          value={formData.danhMuc}
          onChange={(e) => setFormData({ ...formData, danhMuc: e.target.value as any })}
          className={errors.danhMuc ? 'error' : ''}
        >
          <option value="">Chọn danh mục</option>
          <option value="Điện tử">Điện tử</option>
          <option value="Quần áo">Quần áo</option>
          <option value="Đồ ăn">Đồ ăn</option>
          <option value="Sách">Sách</option>
          <option value="Khác">Khác</option>
        </select>
        {errors.danhMuc && <span className="error-message">{errors.danhMuc}</span>}
      </div>

      <div className="form-group">
        <label>Giá *</label>
        <input
          type="number"
          value={formData.gia}
          onChange={(e) => setFormData({ ...formData, gia: Number(e.target.value) })}
          className={errors.gia ? 'error' : ''}
        />
        {errors.gia && <span className="error-message">{errors.gia}</span>}
      </div>

      <div className="form-group">
        <label>Số lượng *</label>
        <input
          type="number"
          value={formData.soLuong}
          onChange={(e) => setFormData({ ...formData, soLuong: Number(e.target.value) })}
          className={errors.soLuong ? 'error' : ''}
        />
        {errors.soLuong && <span className="error-message">{errors.soLuong}</span>}
      </div>

      <div className="form-group">
        <label>Mô tả</label>
        <textarea
          value={formData.moTa}
          onChange={(e) => setFormData({ ...formData, moTa: e.target.value })}
          rows={4}
        />
      </div>

      <div className="form-actions">
        <button type="submit" className="btn-submit">
          {product ? 'Cập nhật' : 'Thêm sản phẩm'}
        </button>
        <button type="button" onClick={onCancel} className="btn-cancel">
          Hủy
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
