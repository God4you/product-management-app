import React, { useState, useEffect } from 'react';
import { productApi } from '../services/api';
import { ErrorMessage } from './ErrorMessage';
import { Product } from '../types';

interface EditingProduct extends Product {}
interface NewProduct extends Omit<Product, 'id'> {}

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [newProduct, setNewProduct] = useState<NewProduct>({ name: '', price: '' as unknown as number });
  const [editingProduct, setEditingProduct] = useState<EditingProduct | null>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await productApi.fetchProducts();
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      setError('Error fetching products');
    } finally {
      setLoading(false);
    }
  };

  const createProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError(null);
      const response = await productApi.createProduct(newProduct);
      if (response.ok) {
        setNewProduct({ name: '', price: '' as unknown as number });
        fetchProducts();
      } else {
        setError('Failed to create product');
      }
    } catch (error) {
      setError('Error creating product');
    }
  };

  const updateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    
    try {
      setError(null);
      const response = await productApi.updateProduct(editingProduct.id, editingProduct);
      if (response.ok) {
        setEditingProduct(null);
        fetchProducts();
      } else {
        setError('Failed to update product');
      }
    } catch (error) {
      setError('Error updating product');
    }
  };

  const deleteProduct = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        setError(null);
        const response = await productApi.deleteProduct(id);
        if (response.ok) {
          fetchProducts();
        } else {
          setError('Failed to delete product');
        }
      } catch (error) {
        setError('Error deleting product');
      }
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      <ErrorMessage error={error} />
      <div className="w-full max-w-md mb-8">
        <h2 className="text-xl font-bold mb-4 text-center">Add New Product</h2>
        <form onSubmit={createProduct} className="space-y-4">
          <input
            type="text"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            placeholder="Product Name"
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="number"
            value={newProduct.price || ''}
            onChange={(e) => setNewProduct({ 
              ...newProduct, 
              price: e.target.value ? Number(e.target.value) : '' as unknown as number 
            })}
            placeholder="Price"
            className="w-full p-2 border rounded"
            required
          />
          <button 
            type="submit"
            className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Add Product
          </button>
        </form>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="w-full max-w-md">
          {products.map((product) => (
            <div key={product.id} className="py-4 border-b">
              {editingProduct?.id === product.id ? (
                <form onSubmit={updateProduct} className="space-y-2">
                  <input
                    type="text"
                    value={editingProduct.name}
                    onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                    className="w-full p-2 border rounded"
                  />
                  <input
                    type="number"
                    value={editingProduct.price}
                    onChange={(e) => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
                    className="w-full p-2 border rounded"
                  />
                  <div className="flex gap-2">
                    <button type="submit" className="p-2 bg-green-500 text-white rounded hover:bg-green-600">
                      Save
                    </button>
                    <button 
                      type="button" 
                      onClick={() => setEditingProduct(null)}
                      className="p-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div className="text-center">
                  <p>Name: {product.name}</p>
                  <p>ID: {product.id}</p>
                  <p>Price: ${product.price}</p>
                  <div className="mt-2 space-x-2">
                    <button 
                      onClick={() => setEditingProduct(product)}
                      className="p-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => deleteProduct(product.id)}
                      className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList; 