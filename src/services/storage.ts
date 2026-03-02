import { User, Category, Brand, Product } from '@/types';

const KEYS = {
  users: 'catalina_users',
  products: 'catalina_products',
  categories: 'catalina_categories',
  brands: 'catalina_brands',
  session: 'catalina_session',
  initialized: 'catalina_initialized',
  dataVersion: 'catalina_data_version',
};

const DATA_VERSION = '3';

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
  const currentVersion = localStorage.getItem(KEYS.dataVersion);
  if (localStorage.getItem(KEYS.initialized) && currentVersion === DATA_VERSION) return;

  // Clear old data when version changes
  if (currentVersion !== DATA_VERSION) {
    localStorage.removeItem(KEYS.products);
    localStorage.removeItem(KEYS.categories);
    localStorage.removeItem(KEYS.brands);
    localStorage.removeItem(KEYS.initialized);
  }

  const categories: Category[] = [
    { id: 'cat1', name: 'Cuadernos Aula Universal' },
    { id: 'cat2', name: 'Cuadernos Nivel Inicial' },
    { id: 'cat3', name: 'Cuadernos A7' },
    { id: 'cat4', name: 'Cuadernos A3' },
    { id: 'cat5', name: 'Cuadernos N°3' },
    { id: 'cat6', name: 'Repuestos de Hojas' },
  ];

  const brands: Brand[] = [
    { id: 'br1', name: 'ABC' },
    { id: 'br2', name: 'Aula Universal' },
  ];

  const users: User[] = [
    { id: 'u1', email: 'admin@demo.com', password: '123456', name: 'Administrador', role: 'admin' },
    { id: 'u2', email: 'vendedor@demo.com', password: '123456', name: 'Vendedor Demo', role: 'vendedor' },
    { id: 'u3', email: 'comprador@demo.com', password: '123456', name: 'Comprador Demo', role: 'comprador' },
  ];

  const products: Product[] = [
    // Cuadernos Aula Universal
    { id: 'p1', name: 'Cuaderno ABC Aula Universal - Cuaderno Abierto', categoryId: 'cat1', description: 'Cuaderno ABC Aula Universal con vista abierta. Diseñado para facilitar el aprendizaje inclusivo en el aula.', image: '/productos/cuaderno-abc-aula-universal-cuaderno-abierto.jpeg', brandId: 'br1' },
    { id: 'p2', name: 'Cuaderno ABC Aula Universal con Espiral - Nivel Inicial Abierto', categoryId: 'cat1', description: 'Cuaderno ABC Aula Universal con espiral, nivel inicial. Vista abierta mostrando el formato de renglones facilitadores.', image: '/productos/cuaderno-abc-aula-universal-con-espiral-nivel-inicial-abierto.jpeg', brandId: 'br1' },
    { id: 'p3', name: 'Cuaderno ABC Aula Universal Nivel Inicial Abierto - Renglón Completo', categoryId: 'cat1', description: 'Cuaderno ABC Aula Universal nivel inicial abierto con renglón completo. Ideal para primeros trazos y escritura guiada.', image: '/productos/cuaderno-abc-aula-universal-nivel-inicial-abierto-renglon-completo.jpeg', brandId: 'br1' },
    { id: 'p4', name: 'Cuaderno ABC Aula Universal Nivel Inicial con Espiral', categoryId: 'cat1', description: 'Cuaderno ABC Aula Universal nivel inicial con espiral. Encuadernación práctica para uso diario en el aula.', image: '/productos/cuaderno-abc-aula-universal-nivel-inicial-con-espiral.jpeg', brandId: 'br1' },
    { id: 'p5', name: 'Cuaderno ABC Aula Universal Nivel Inicial', categoryId: 'cat1', description: 'Cuaderno ABC Aula Universal nivel inicial. Renglones facilitadores pensados para el desarrollo de la escritura.', image: '/productos/cuaderno-abc-aula-universal-nivel-inicial.jpeg', brandId: 'br1' },
    { id: 'p6', name: 'Cuaderno Aula Universal Nivel Inicial con Espiral Abierto', categoryId: 'cat1', description: 'Cuaderno Aula Universal nivel inicial con espiral, vista abierta. Muestra el diseño de renglones inclusivos.', image: '/productos/cuaderno-aula-universal-nivel-inicial-con-espiral-abierto.jpeg', brandId: 'br2' },

    // Cuadernos Nivel Inicial (ABC sin "Aula Universal")
    { id: 'p7', name: 'Cuaderno ABC Nivel Inicial - Renglones por la Mitad', categoryId: 'cat2', description: 'Cuaderno ABC nivel inicial con renglones por la mitad. Facilita la ubicación espacial y el tamaño de la letra.', image: '/productos/cuaderno-abc-nivel-incial-renglones-por-la-mitad.jpeg', brandId: 'br1' },
    { id: 'p8', name: 'Cuaderno ABC Nivel Inicial - Renglón Completo', categoryId: 'cat2', description: 'Cuaderno ABC nivel inicial con renglón completo. Guía visual para la escritura en etapa de aprendizaje.', image: '/productos/cuaderno-abc-nivel-incial-cuaderno-renglon-completo.jpeg', brandId: 'br1' },

    // Cuadernos A7
    { id: 'p9', name: 'Cuaderno Abierto A7 - Hojas Rayadas', categoryId: 'cat3', description: 'Cuaderno tamaño A7 abierto con hojas rayadas. Compacto y práctico para anotaciones y tareas rápidas.', image: '/productos/cuaderno-abierto-a7-hojas-rayadas.jpeg', brandId: 'br2' },
    { id: 'p10', name: 'Cuaderno Abierto A7 - Hojas Cuadriculadas', categoryId: 'cat3', description: 'Cuaderno tamaño A7 abierto con hojas cuadriculadas. Ideal para matemáticas y dibujos con cuadrícula.', image: '/productos/cuaderno-abierto-a7-hojascuadriculadas.jpeg', brandId: 'br2' },
    { id: 'p11', name: 'Cuadernos Aula Universal Abiertos A7', categoryId: 'cat3', description: 'Cuadernos Aula Universal en formato A7 abiertos. Vista comparativa de los diferentes tipos de renglones disponibles.', image: '/productos/cuadernos-aula-univ-abiertos-a7.jpeg', brandId: 'br2' },

    // Cuadernos A3
    { id: 'p12', name: 'Cuaderno Universal A3 Abierto - Cuadrado', categoryId: 'cat4', description: 'Cuaderno Universal tamaño A3 abierto con cuadrícula. Formato grande para trabajos que requieren más espacio.', image: '/productos/cuaderno-universal-a3-abierto-cuadrado.jpeg', brandId: 'br2' },
    { id: 'p13', name: 'Cuaderno Universal A3 Abierto - Rayado', categoryId: 'cat4', description: 'Cuaderno Universal tamaño A3 abierto con rayas. Renglones amplios para escritura cómoda y legible.', image: '/productos/cuaderno-universal-a3-abierto-rayado.jpeg', brandId: 'br2' },
    { id: 'p14', name: 'Cuadernos Aula Universal A3 - Rayados y Cuadriculados', categoryId: 'cat4', description: 'Colección de cuadernos Aula Universal tamaño A3 en versiones rayadas y cuadriculadas. Vista comparativa de la línea completa.', image: '/productos/cuadernos-aula-universal-a3-rayados-y-cuadriculados.jpeg', brandId: 'br2' },

    // Cuadernos N°3
    { id: 'p15', name: 'Cuadernos N°3 ABC', categoryId: 'cat5', description: 'Cuadernos tamaño N°3 marca ABC. El clásico formato escolar con renglones facilitadores para el aprendizaje inclusivo.', image: '/productos/cuadernos-no-3-abc.jpeg', brandId: 'br1' },

    // Repuestos de Hojas
    { id: 'p16', name: 'Detalle de Repuesto de Hojas Cuadriculadas', categoryId: 'cat6', description: 'Detalle del repuesto de hojas cuadriculadas. Muestra la calidad del papel y el formato de la cuadrícula facilitadora.', image: '/productos/detalle-de-resp-de-hojas-cuadriculadas.jpeg', brandId: 'br2' },
    { id: 'p17', name: 'Detalle de Repuesto de Hojas Rayadas', categoryId: 'cat6', description: 'Detalle del repuesto de hojas rayadas. Muestra el gramaje del papel y el diseño de renglones inclusivos.', image: '/productos/detalle-resp-de-hojasrayadas.jpeg', brandId: 'br2' },
  ];

  saveUsers(users);
  saveProducts(products);
  saveCategories(categories);
  saveBrands(brands);
  localStorage.setItem(KEYS.initialized, 'true');
  localStorage.setItem(KEYS.dataVersion, DATA_VERSION);
}
