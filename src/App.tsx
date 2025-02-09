import React from 'react';
import ProductList from './components/ProductList';

const App: React.FC = () => {
  return (
    <div className="min-h-screen">
      <div className="py-4">
        <h1 className="text-2xl font-bold text-center mb-4">
          Products
        </h1>
        <ProductList />
      </div>
    </div>
  );
};

export default App; 