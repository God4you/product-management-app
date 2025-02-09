interface Product {
  id: number;
  name: string;
  price: number;
}

export const productApi = {
  fetchProducts: (): Promise<Response> => 
    fetch('/api/v1/Products', {
      headers: { 'Accept': 'application/json' }
    }),
  
  createProduct: (product: Omit<Product, 'id'>): Promise<Response> => 
    fetch('/api/v1/Products', {
      method: 'POST',
      headers: { 
        'Accept': 'application/json',
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify(product)
    }),

  updateProduct: (id: number, product: Product): Promise<Response> => 
    fetch(`/api/v1/Products/${id}`, {
      method: 'PUT',
      headers: { 
        'Accept': 'application/json',
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify(product)
    }),

  deleteProduct: (id: number): Promise<Response> => 
    fetch(`/api/v1/Products/${id}`, {
      method: 'DELETE',
      headers: { 'Accept': 'application/json' }
    })
}; 