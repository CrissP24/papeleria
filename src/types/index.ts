export type UserRole = 'admin' | 'vendedor' | 'comprador';

export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  role: UserRole;
}

export interface Category {
  id: string;
  name: string;
}

export interface Brand {
  id: string;
  name: string;
}

export interface Product {
  id: string;
  name: string;
  categoryId: string;
  description: string;
  image: string;
  brandId: string;
}

export type AuthUser = Omit<User, 'password'>;
