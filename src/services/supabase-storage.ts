import { supabase } from '@/lib/supabase';
import { User, Category, Brand, Product } from '@/types';

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
}

// --- USERS ---
export async function getUsers(): Promise<User[]> {
  const { data, error } = await supabase.from('users').select('*');
  if (error) {
    console.error('Error getting users:', error);
    return [];
  }
  return data || [];
}

export async function addUser(user: User) {
  const { error } = await supabase.from('users').insert([user]);
  if (error) console.error('Error adding user:', error);
}

export async function updateUser(user: User) {
  const { error } = await supabase.from('users').update(user).eq('id', user.id);
  if (error) console.error('Error updating user:', error);
}

export async function deleteUser(id: string) {
  const { error } = await supabase.from('users').delete().eq('id', id);
  if (error) console.error('Error deleting user:', error);
}

// --- PRODUCTS ---
export async function getProducts(): Promise<Product[]> {
  const { data, error } = await supabase.from('products').select('*');
  if (error) {
    console.error('Error getting products:', error);
    return [];
  }
  return (data || []).map(p => ({
    id: p.id,
    name: p.name,
    categoryId: p.category_id,
    description: p.description,
    image: p.image,
    brandId: p.brand_id,
    price: p.price
  }));
}

export async function addProduct(product: Product) {
  const { error } = await supabase.from('products').insert([{
    id: product.id,
    name: product.name,
    category_id: product.categoryId,
    description: product.description,
    image: product.image,
    brand_id: product.brandId,
    price: product.price
  }]);
  if (error) console.error('Error adding product:', error);
}

export async function updateProduct(product: Product) {
  const { error } = await supabase.from('products').update({
    name: product.name,
    category_id: product.categoryId,
    description: product.description,
    image: product.image,
    brand_id: product.brandId,
    price: product.price
  }).eq('id', product.id);
  if (error) console.error('Error updating product:', error);
}

export async function deleteProduct(id: string) {
  const { error } = await supabase.from('products').delete().eq('id', id);
  if (error) console.error('Error deleting product:', error);
}

// --- CATEGORIES ---
export async function getCategories(): Promise<Category[]> {
  const { data, error } = await supabase.from('categories').select('*');
  if (error) {
    console.error('Error getting categories:', error);
    return [];
  }
  return data || [];
}

export async function addCategory(category: Category) {
  const { error } = await supabase.from('categories').insert([category]);
  if (error) console.error('Error adding category:', error);
}

export async function updateCategory(category: Category) {
  const { error } = await supabase.from('categories').update(category).eq('id', category.id);
  if (error) console.error('Error updating category:', error);
}

export async function deleteCategory(id: string) {
  const { error } = await supabase.from('categories').delete().eq('id', id);
  if (error) console.error('Error deleting category:', error);
}

// --- BRANDS ---
export async function getBrands(): Promise<Brand[]> {
  const { data, error } = await supabase.from('brands').select('*');
  if (error) {
    console.error('Error getting brands:', error);
    return [];
  }
  return data || [];
}

export async function addBrand(brand: Brand) {
  const { error } = await supabase.from('brands').insert([brand]);
  if (error) console.error('Error adding brand:', error);
}

export async function updateBrand(brand: Brand) {
  const { error } = await supabase.from('brands').update(brand).eq('id', brand.id);
  if (error) console.error('Error updating brand:', error);
}

export async function deleteBrand(id: string) {
  const { error } = await supabase.from('brands').delete().eq('id', id);
  if (error) console.error('Error deleting brand:', error);
}

// --- SESSION ---
let currentSession: User | null = null;

export async function getSession(): Promise<User | null> {
  return currentSession;
}

export async function setSession(user: User) {
  currentSession = user;
  localStorage.setItem('catalina_session', JSON.stringify(user));
}

export async function clearSession() {
  currentSession = null;
  localStorage.removeItem('catalina_session');
}

// --- INITIALIZATION ---
export async function initDatabase() {
  // Restore session from localStorage
  const savedSession = localStorage.getItem('catalina_session');
  if (savedSession) {
    currentSession = JSON.parse(savedSession);
  }

  // Check if data exists
  const { data: users } = await supabase.from('users').select('id').limit(1);
  if (users && users.length > 0) return; // Data already exists

  // Seed initial data
  await seedInitialData();
}

async function seedInitialData() {
  console.log('Seeding initial data...');

  const categories: Category[] = [
    { id: 'cat1', name: 'Cuadernos y Repuestos' },
    { id: 'cat2', name: 'Cartas Didacticas' },
    { id: 'cat3', name: 'Lectoescritura y Libros' },
    { id: 'cat4', name: 'Matematica Manipulativa' },
    { id: 'cat5', name: 'Baja Vision y Geometria Adaptada' },
    { id: 'cat6', name: 'Escritura Adaptada y Zurdos' },
    { id: 'cat7', name: 'Juego y Vida Practica' },
    { id: 'cat8', name: 'Material Didactico General' },
  ];

  const brands: Brand[] = [
    { id: 'br1', name: 'ABC' },
    { id: 'br2', name: 'Aula Universal' },
    { id: 'br3', name: 'Adaptaciones Escolares' },
    { id: 'br4', name: 'Creciendo con Catalina' },
  ];

  const users: User[] = [
    { id: 'u1', email: 'admin@demo.com', password: '123456', name: 'Administrador', role: 'admin' },
    { id: 'u2', email: 'vendedor@demo.com', password: '123456', name: 'Vendedor Demo', role: 'vendedor' },
    { id: 'u3', email: 'comprador@demo.com', password: '123456', name: 'Comprador Demo', role: 'comprador' },
  ];

  // Insert categories
  await supabase.from('categories').insert(categories);
  
  // Insert brands
  await supabase.from('brands').insert(brands);
  
  // Insert users
  await supabase.from('users').insert(users);

  console.log('Initial data seeded successfully!');
}

// Compatibility functions (not used with Supabase)
export async function saveUsers(users: User[]) {}
export async function saveProducts(products: Product[]) {}
export async function saveCategories(categories: Category[]) {}
export async function saveBrands(brands: Brand[]) {}
