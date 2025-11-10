import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '../context/contextProduct';
import ProductList from '../components/ProductList';
import SearchBar from '../components/SearchBar';
import Filter from '../components/Filter';
import Pagination from '../components/Pagination';

const ITEMS_PER_PAGE = 6;

const HomePage: React.FC = () => {
  const { products, dispatch } = useProducts();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(Infinity);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, category, minPrice, maxPrice]);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.ten.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = !category || product.danhMuc === category;
      const matchesPrice = product.gia >= minPrice && 
        (maxPrice === 0 || maxPrice === Infinity || product.gia <= maxPrice);
      
      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [products, searchTerm, category, minPrice, maxPrice]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleDelete = (id: number) => {
    dispatch({ type: 'DELETE_PRODUCT', payload: id });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="home-page">
      <header className="page-header">
        <h1 style={{color:'white'}}>Quản lý Sản phẩm</h1>
        <button style={{background:'#3498db'}} onClick={() => navigate('/add')} className="btn-add">
          Thêm sản phẩm mới
        </button>
      </header>

      <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      
      <Filter
        category={category}
        minPrice={minPrice}
        maxPrice={maxPrice === Infinity ? 0 : maxPrice}
        onCategoryChange={setCategory}
        onMinPriceChange={setMinPrice}
        onMaxPriceChange={(value) => setMaxPrice(value || Infinity)}
      />

      <ProductList products={paginatedProducts} onDelete={handleDelete} />

      {filteredProducts.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={filteredProducts.length}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default HomePage;
