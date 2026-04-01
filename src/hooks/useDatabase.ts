import { useState, useEffect } from 'react';
import * as storage from '@/services/storage';
import { User, Product, Category, Brand } from '@/types';

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const loadUsers = async () => {
    setLoading(true);
    const data = await storage.getUsers();
    setUsers(data);
    setLoading(false);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const addUser = async (user: User) => {
    await storage.addUser(user);
    await loadUsers();
  };

  const updateUser = async (user: User) => {
    await storage.updateUser(user);
    await loadUsers();
  };

  const deleteUser = async (id: string) => {
    await storage.deleteUser(id);
    await loadUsers();
  };

  return { users, loading, addUser, updateUser, deleteUser, refresh: loadUsers };
}

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const loadProducts = async () => {
    setLoading(true);
    const data = await storage.getProducts();
    setProducts(data);
    setLoading(false);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const addProduct = async (product: Product) => {
    await storage.addProduct(product);
    await loadProducts();
  };

  const updateProduct = async (product: Product) => {
    await storage.updateProduct(product);
    await loadProducts();
  };

  const deleteProduct = async (id: string) => {
    await storage.deleteProduct(id);
    await loadProducts();
  };

  return { products, loading, addProduct, updateProduct, deleteProduct, refresh: loadProducts };
}

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const loadCategories = async () => {
    setLoading(true);
    const data = await storage.getCategories();
    setCategories(data);
    setLoading(false);
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const addCategory = async (category: Category) => {
    await storage.addCategory(category);
    await loadCategories();
  };

  const updateCategory = async (category: Category) => {
    await storage.updateCategory(category);
    await loadCategories();
  };

  const deleteCategory = async (id: string) => {
    await storage.deleteCategory(id);
    await loadCategories();
  };

  return { categories, loading, addCategory, updateCategory, deleteCategory, refresh: loadCategories };
}

export function useBrands() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);

  const loadBrands = async () => {
    setLoading(true);
    const data = await storage.getBrands();
    setBrands(data);
    setLoading(false);
  };

  useEffect(() => {
    loadBrands();
  }, []);

  const addBrand = async (brand: Brand) => {
    await storage.addBrand(brand);
    await loadBrands();
  };

  const updateBrand = async (brand: Brand) => {
    await storage.updateBrand(brand);
    await loadBrands();
  };

  const deleteBrand = async (id: string) => {
    await storage.deleteBrand(id);
    await loadBrands();
  };

  return { brands, loading, addBrand, updateBrand, deleteBrand, refresh: loadBrands };
}
