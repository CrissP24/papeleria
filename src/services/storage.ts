import { User, Category, Brand, Product } from '@/types';

const KEYS = {
  users: 'catalina_users',
  products: 'catalina_products',
  categories: 'catalina_categories',
  brands: 'catalina_brands',
  session: 'catalina_session',
  initialized: 'catalina_initialized',
};

function get<T>(key: string): T[] {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
}

function set<T>(key: string, data: T[]) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
}

// --- USERS ---
export const getUsers = (): User[] => get<User>(KEYS.users);
export const saveUsers = (users: User[]) => set(KEYS.users, users);
export const addUser = (user: User) => { const u = getUsers(); u.push(user); saveUsers(u); };
export const updateUser = (user: User) => { saveUsers(getUsers().map(u => u.id === user.id ? user : u)); };
export const deleteUser = (id: string) => { saveUsers(getUsers().filter(u => u.id !== id)); };

// --- PRODUCTS ---
export const getProducts = (): Product[] => get<Product>(KEYS.products);
export const saveProducts = (p: Product[]) => set(KEYS.products, p);
export const addProduct = (p: Product) => { const ps = getProducts(); ps.push(p); saveProducts(ps); };
export const updateProduct = (p: Product) => { saveProducts(getProducts().map(x => x.id === p.id ? p : x)); };
export const deleteProduct = (id: string) => { saveProducts(getProducts().filter(x => x.id !== id)); };

// --- CATEGORIES ---
export const getCategories = (): Category[] => get<Category>(KEYS.categories);
export const saveCategories = (c: Category[]) => set(KEYS.categories, c);
export const addCategory = (c: Category) => { const cs = getCategories(); cs.push(c); saveCategories(cs); };
export const updateCategory = (c: Category) => { saveCategories(getCategories().map(x => x.id === c.id ? c : x)); };
export const deleteCategory = (id: string) => { saveCategories(getCategories().filter(x => x.id !== id)); };

// --- BRANDS ---
export const getBrands = (): Brand[] => get<Brand>(KEYS.brands);
export const saveBrands = (b: Brand[]) => set(KEYS.brands, b);
export const addBrand = (b: Brand) => { const bs = getBrands(); bs.push(b); saveBrands(bs); };
export const updateBrand = (b: Brand) => { saveBrands(getBrands().map(x => x.id === b.id ? b : x)); };
export const deleteBrand = (id: string) => { saveBrands(getBrands().filter(x => x.id !== id)); };

// --- SESSION ---
export const getSession = (): User | null => {
  const data = localStorage.getItem(KEYS.session);
  return data ? JSON.parse(data) : null;
};
export const setSession = (user: User) => localStorage.setItem(KEYS.session, JSON.stringify(user));
export const clearSession = () => localStorage.removeItem(KEYS.session);

// --- SEED DATA ---
export function initializeData() {
  if (localStorage.getItem(KEYS.initialized)) return;

  const categories: Category[] = [
    { id: 'cat1', name: 'Útiles Escolares' },
    { id: 'cat2', name: 'Cuadernos y Carpetas' },
    { id: 'cat3', name: 'Material Didáctico' },
    { id: 'cat4', name: 'Arte y Creatividad' },
    { id: 'cat5', name: 'Mochilas y Cartucheras' },
    { id: 'cat6', name: 'Herramientas para el Aula' },
  ];

  const brands: Brand[] = [
    { id: 'br1', name: 'Rivadavia' },
    { id: 'br2', name: 'Faber-Castell' },
    { id: 'br3', name: 'Maped' },
    { id: 'br4', name: 'Pelikan' },
    { id: 'br5', name: 'Giotto' },
  ];

  const users: User[] = [
    { id: 'u1', email: 'admin@demo.com', password: '123456', name: 'Administrador', role: 'admin' },
    { id: 'u2', email: 'vendedor@demo.com', password: '123456', name: 'Vendedor Demo', role: 'vendedor' },
    { id: 'u3', email: 'comprador@demo.com', password: '123456', name: 'Comprador Demo', role: 'comprador' },
  ];

  const products: Product[] = [
    { id: 'p1', name: 'Cuaderno Rivadavia Tapa Dura 48 hojas', categoryId: 'cat2', description: 'Cuaderno escolar tapa dura rayado. Hojas de alto gramaje ideales para el uso diario en el aula.', image: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=400&h=300&fit=crop', brandId: 'br1' },
    { id: 'p2', name: 'Lápices de Colores x24', categoryId: 'cat4', description: 'Set de 24 lápices de colores acuarelables. Minas resistentes y colores vibrantes para estimular la creatividad.', image: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=400&h=300&fit=crop', brandId: 'br2' },
    { id: 'p3', name: 'Témperas x12 colores', categoryId: 'cat4', description: 'Set de 12 témperas escolares lavables. Ideales para trabajos en el aula y el hogar. No tóxicas.', image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&h=300&fit=crop', brandId: 'br5' },
    { id: 'p4', name: 'Tijera Escolar Punta Redonda', categoryId: 'cat1', description: 'Tijera escolar con punta redonda de seguridad. Ergonómica, ideal para manos pequeñas. Incluye adaptador.', image: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=400&h=300&fit=crop', brandId: 'br3' },
    { id: 'p5', name: 'Mochila Escolar Reforzada', categoryId: 'cat5', description: 'Mochila escolar resistente con espalda ergonómica, múltiples compartimentos y diseño colorido.', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop', brandId: 'br3' },
    { id: 'p6', name: 'Regla Flexible 30cm', categoryId: 'cat1', description: 'Regla flexible irrompible de 30cm. Material suave y seguro para el uso escolar diario.', image: 'https://images.unsplash.com/photo-1596496050827-8299e0220de1?w=400&h=300&fit=crop', brandId: 'br3' },
    { id: 'p7', name: 'Juego Geométrico Completo', categoryId: 'cat6', description: 'Set de geometría: regla 30cm, escuadra, transportador y compás. Ideal para nivel primario y secundario.', image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400&h=300&fit=crop', brandId: 'br3' },
    { id: 'p8', name: 'Plasticola x6 colores', categoryId: 'cat4', description: 'Pack de 6 adhesivos vinílicos de colores para manualidades escolares. Lavables y no tóxicos.', image: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=400&h=300&fit=crop', brandId: 'br4' },
  ];

  saveUsers(users);
  saveProducts(products);
  saveCategories(categories);
  saveBrands(brands);
  localStorage.setItem(KEYS.initialized, 'true');
}
