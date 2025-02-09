export interface Product {
  id: number;
  name: string;
  price: number;
}

export interface ApiError {
  message: string;
  statusCode?: number;
} 