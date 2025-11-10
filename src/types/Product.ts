export interface Product {
    id: number;
    ten: string;
    danhMuc: 'Điện tử' | 'Quần áo' | 'Đồ ăn' | 'Sách' | 'Khác';
    gia: number;
    soLuong: number;
    moTa: string;
  }
  
  export interface FilterState {
    searchTerm: string;
    category: string;
    minPrice: number;
    maxPrice: number;
  }
  
  export type ProductAction =
    | { type: 'ADD_PRODUCT'; payload: Product }
    | { type: 'UPDATE_PRODUCT'; payload: Product }
    | { type: 'DELETE_PRODUCT'; payload: number }
    | { type: 'SET_PRODUCTS'; payload: Product[] };
  
  export interface ProductContextType {
    products: Product[];
    dispatch: React.Dispatch<ProductAction>;
  }
  