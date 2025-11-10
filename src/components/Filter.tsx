import React from 'react';

interface FilterProps {
  category: string;
  minPrice: number;
  maxPrice: number;
  onCategoryChange: (value: string) => void;
  onMinPriceChange: (value: number) => void;
  onMaxPriceChange: (value: number) => void;
}

const Filter: React.FC<FilterProps> = ({
  category,
  minPrice,
  maxPrice,
  onCategoryChange,
  onMinPriceChange,
  onMaxPriceChange
}) => {
  return (
    <div className="filter-container">
      <div className="filter-group">
        <label>Danh mục:</label>
        <select value={category} onChange={(e) => onCategoryChange(e.target.value)}>
          <option value="">Tất cả</option>
          <option value="Điện tử">Điện tử</option>
          <option value="Quần áo">Quần áo</option>
          <option value="Đồ ăn">Đồ ăn</option>
          <option value="Sách">Sách</option>
          <option value="Khác">Khác</option>
        </select>
      </div>
      
      <div className="filter-group">
        <label>Giá tối thiểu:</label>
        <input
          type="number"
          value={minPrice}
          onChange={(e) => onMinPriceChange(Number(e.target.value))}
          min="0"
        />
      </div>
      
      <div className="filter-group">
        <label>Giá tối đa:</label>
        <input
          type="number"
          value={maxPrice}
          onChange={(e) => onMaxPriceChange(Number(e.target.value))}
          min="0"
        />
      </div>
    </div>
  );
};

export default Filter;
