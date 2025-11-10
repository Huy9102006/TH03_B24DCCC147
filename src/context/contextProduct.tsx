import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Product, ProductAction, ProductContextType } from '../types/Product';
import { productReducer } from './reducerProduct';

const initialProducts: Product[] = [
  {
    id: 1,
    ten: 'Smart TV Samsung 55 inch 4K',
    danhMuc: 'Điện tử',
    gia: 12990000,
    soLuong: 25,
    moTa: 'Smart TV 4K UHD 55 inch, công nghệ Crystal 4K, HDR10+, hệ điều hành Tizen'
  },
  {
    id: 2,
    ten: 'Áo Polo Nam Cao Cấp',
    danhMuc: 'Quần áo',
    gia: 280000,
    soLuong: 100,
    moTa: 'Áo polo nam chất liệu cotton cao cấp, form regular fit, nhiều màu sắc'
  },
  {
    id: 3,
    ten: 'Máy Lọc Không Khí Xiaomi',
    danhMuc: 'Điện tử',
    gia: 3200000,
    soLuong: 40,
    moTa: 'Máy lọc không khí thông minh, diện tích 48m², HEPA filter, kết nối WiFi'
  },
  {
    id: 4,
    ten: 'Set Đồ Mặc Nhà Nữ',
    danhMuc: 'Quần áo',
    gia: 185000,
    soLuong: 150,
    moTa: 'Bộ pyjama nữ cotton mềm mại, họa tiết dễ thương, thoáng mát'
  },
  {
    id: 5,
    ten: 'Combo Mì Ý Barilla 500g',
    danhMuc: 'Đồ ăn',
    gia: 89000,
    soLuong: 200,
    moTa: 'Mì Ý chính hãng từ Italia, 100% lúa mì durum, combo 3 gói'
  },
  {
    id: 6,
    ten: 'Sách Tư Duy Nhanh Và Chậm',
    danhMuc: 'Sách',
    gia: 189000,
    soLuong: 75,
    moTa: 'Sách tâm lý học của Daniel Kahneman, bìa mềm, 599 trang'
  },
  {
    id: 7,
    ten: 'Tai Nghe Bluetooth JBL Tune 510BT',
    danhMuc: 'Điện tử',
    gia: 890000,
    soLuong: 60,
    moTa: 'Tai nghe không dây chụp tai, pin 40 giờ, âm thanh JBL Pure Bass'
  },
  {
    id: 8,
    ten: 'Quần Jean Nữ Skinny',
    danhMuc: 'Quần áo',
    gia: 399000,
    soLuong: 85,
    moTa: 'Quần jean nữ form skinny ôm dáng, vải co giãn tốt, nhiều size'
  },
  {
    id: 9,
    ten: 'Hộp Hạt Điều Rang Muối 500g',
    danhMuc: 'Đồ ăn',
    gia: 175000,
    soLuong: 120,
    moTa: 'Hạt điều cao cấp rang muối, đóng hộp kín, giữ độ giòn tự nhiên'
  },
  {
    id: 10,
    ten: 'Sách Nhà Giả Kim',
    danhMuc: 'Sách',
    gia: 79000,
    soLuong: 200,
    moTa: 'Tiểu thuyết kinh điển của Paulo Coelho, bản dịch Lê Chu Cầu'
  },
  {
    id: 11,
    ten: 'Chuột Không Dây Logitech M331',
    danhMuc: 'Điện tử',
    gia: 249000,
    soLuong: 95,
    moTa: 'Chuột không dây im lặng, pin 24 tháng, thiết kế ergonomic'
  },
  {
    id: 12,
    ten: 'Ba Lô Laptop Sakos 15.6 inch',
    danhMuc: 'Khác',
    gia: 520000,
    soLuong: 45,
    moTa: 'Ba lô chống sốc laptop, nhiều ngăn tiện dụng, chống nước'
  },
  {
    id: 13,
    ten: 'Đầm Maxi Hoa Nhí Dự Tiệc',
    danhMuc: 'Quần áo',
    gia: 450000,
    soLuong: 55,
    moTa: 'Váy maxi dáng dài, họa tiết hoa nhí, phù hợp dự tiệc, dạo phố'
  },
  {
    id: 14,
    ten: 'Cà Phê Trung Nguyên Legend',
    danhMuc: 'Đồ ăn',
    gia: 135000,
    soLuong: 180,
    moTa: 'Cà phê hòa tan 3in1, hộp 20 gói, hương vị đậm đà'
  },
  {
    id: 15,
    ten: 'Sách Đắc Nhân Tâm',
    danhMuc: 'Sách',
    gia: 89000,
    soLuong: 250,
    moTa: 'Sách kỹ năng sống kinh điển của Dale Carnegie, bìa mềm'
  },
  {
    id: 16,
    ten: 'Bàn Phím Cơ Có Dây Gaming',
    danhMuc: 'Điện tử',
    gia: 799000,
    soLuong: 35,
    moTa: 'Bàn phím cơ RGB, switch blue, phím full size 104 keys'
  },
  {
    id: 17,
    ten: 'Áo Khoác Hoodie Unisex',
    danhMuc: 'Quần áo',
    gia: 320000,
    soLuong: 110,
    moTa: 'Áo hoodie nỉ bông basic, form rộng unisex, màu đen trắng xám'
  },
  {
    id: 18,
    ten: 'Bình Giữ Nhiệt Elmich 500ml',
    danhMuc: 'Khác',
    gia: 189000,
    soLuong: 140,
    moTa: 'Bình giữ nhiệt inox 304, giữ lạnh 12h, giữ nóng 6h'
  },
  {
    id: 19,
    ten: 'Nồi Chiên Không Dầu 5.5L',
    danhMuc: 'Điện tử',
    gia: 1890000,
    soLuong: 28,
    moTa: 'Nồi chiên không dầu điện tử, dung tích 5.5L, 8 chế độ nấu'
  },
  {
    id: 20,
    ten: 'Sách SQL Cơ Bản Đến Nâng Cao',
    danhMuc: 'Sách',
    gia: 215000,
    soLuong: 65,
    moTa: 'Sách lập trình SQL từ cơ bản đến nâng cao, có ví dụ thực hành'
  }
];


const ProductContext = createContext<ProductContextType | null>(null);

export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, dispatch] = useReducer(productReducer, initialProducts);

  return (
    <ProductContext.Provider value={{ products, dispatch }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = (): ProductContextType => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};
