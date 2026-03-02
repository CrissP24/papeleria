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

const DATA_VERSION = '2';

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
    { id: 'cat1', name: 'Escritura y Dibujo' },
    { id: 'cat2', name: 'Cuadernos y Carpetas' },
    { id: 'cat3', name: 'Arte y Manualidades' },
    { id: 'cat4', name: 'Mochilas y Cartucheras' },
    { id: 'cat5', name: 'Geometría y Medición' },
    { id: 'cat6', name: 'Pegamentos y Adhesivos' },
    { id: 'cat7', name: 'Papelería General' },
  ];

  const brands: Brand[] = [
    { id: 'br1', name: 'Rivadavia' },
    { id: 'br2', name: 'Faber-Castell' },
    { id: 'br3', name: 'Maped' },
    { id: 'br4', name: 'Pelikan' },
    { id: 'br5', name: 'Giotto' },
    { id: 'br6', name: 'Filgo' },
    { id: 'br7', name: 'Ledesma' },
    { id: 'br8', name: 'Éxito' },
    { id: 'br9', name: 'Staedtler' },
    { id: 'br10', name: 'BIC' },
  ];

  const users: User[] = [
    { id: 'u1', email: 'admin@demo.com', password: '123456', name: 'Administrador', role: 'admin' },
    { id: 'u2', email: 'vendedor@demo.com', password: '123456', name: 'Vendedor Demo', role: 'vendedor' },
    { id: 'u3', email: 'comprador@demo.com', password: '123456', name: 'Comprador Demo', role: 'comprador' },
  ];

  const products: Product[] = [
    // Escritura y Dibujo
    { id: 'p1', name: 'Lápiz Negro HB x12 unidades', categoryId: 'cat1', description: 'Caja de 12 lápices grafito HB de alta calidad. Mina resistente ideal para escritura escolar diaria. Trazo suave y uniforme.', image: 'https://images.unsplash.com/photo-1585336261022-680e295ce3fe?w=400&h=300&fit=crop', brandId: 'br2' },
    { id: 'p2', name: 'Lápices de Colores Largos x24', categoryId: 'cat1', description: 'Estuche de 24 lápices de colores largos acuarelables. Colores vibrantes, minas resistentes a la rotura. Ideales para estimular la creatividad.', image: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=400&h=300&fit=crop', brandId: 'br2' },
    { id: 'p3', name: 'Lápices de Colores Cortos x12', categoryId: 'cat1', description: 'Set de 12 lápices de colores cortos, perfectos para manos pequeñas de jardín e inicial. Colores surtidos.', image: 'https://images.unsplash.com/photo-1595231712607-2f32cb497458?w=400&h=300&fit=crop', brandId: 'br5' },
    { id: 'p4', name: 'Marcadores Escolares x10', categoryId: 'cat1', description: 'Pack de 10 marcadores de punta cónica lavables. Tintas al agua no tóxicas. Colores brillantes que se lavan fácilmente de la ropa.', image: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=400&h=300&fit=crop', brandId: 'br6' },
    { id: 'p5', name: 'Resaltadores Pastel x6', categoryId: 'cat1', description: 'Set de 6 resaltadores en tonos pastel: rosa, lila, celeste, verde, amarillo y durazno. Punta biselada.', image: 'https://images.unsplash.com/photo-1607013407627-6ee814329547?w=400&h=300&fit=crop', brandId: 'br9' },
    { id: 'p6', name: 'Bolígrafos Azul/Negro/Rojo x3', categoryId: 'cat1', description: 'Pack de 3 bolígrafos: azul, negro y rojo. Punta mediana 1.0mm, escritura suave y fluida. Cuerpo hexagonal.', image: 'https://images.unsplash.com/photo-1585336261022-680e295ce3fe?w=400&h=300&fit=crop', brandId: 'br10' },
    { id: 'p7', name: 'Crayones de Cera x12', categoryId: 'cat1', description: 'Caja de 12 crayones de cera gruesos. No tóxicos, ideales para jardín de infantes. Colores intensos y resistentes.', image: 'https://images.unsplash.com/photo-1596495577886-d920f1fb7238?w=400&h=300&fit=crop', brandId: 'br5' },

    // Cuadernos y Carpetas
    { id: 'p8', name: 'Cuaderno Tapa Dura 48 hojas Rayado', categoryId: 'cat2', description: 'Cuaderno escolar tapa dura rayado, 48 hojas de alto gramaje. Ideal para el uso diario en el aula.', image: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=400&h=300&fit=crop', brandId: 'br1' },
    { id: 'p9', name: 'Cuaderno Tapa Dura 48 hojas Cuadriculado', categoryId: 'cat2', description: 'Cuaderno escolar tapa dura cuadriculado, 48 hojas. Perfecto para matemáticas y ciencias.', image: 'https://images.unsplash.com/photo-1517842645767-c639042777db?w=400&h=300&fit=crop', brandId: 'br1' },
    { id: 'p10', name: 'Cuaderno Tapa Dura 96 hojas Rayado', categoryId: 'cat2', description: 'Cuaderno escolar tapa dura de 96 hojas rayadas. Mayor capacidad para secundario y proyectos largos.', image: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=400&h=300&fit=crop', brandId: 'br7' },
    { id: 'p11', name: 'Carpeta Escolar N°3 con Ganchos', categoryId: 'cat2', description: 'Carpeta escolar N°3 con 3 ganchos metálicos. Tapa flexible, disponible en colores surtidos.', image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&h=300&fit=crop', brandId: 'br8' },
    { id: 'p12', name: 'Repuesto de Hojas Rayadas N°3 x96', categoryId: 'cat2', description: 'Repuesto de 96 hojas rayadas tamaño N°3 para carpeta escolar. Papel de 80g de alto gramaje.', image: 'https://images.unsplash.com/photo-1517842645767-c639042777db?w=400&h=300&fit=crop', brandId: 'br7' },

    // Arte y Manualidades
    { id: 'p13', name: 'Témperas Escolares x12 Colores', categoryId: 'cat3', description: 'Set de 12 témperas escolares lavables en potes de 15ml. Colores brillantes, no tóxicas. Ideales para trabajos artísticos.', image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&h=300&fit=crop', brandId: 'br5' },
    { id: 'p14', name: 'Acuarelas x12 colores con Pincel', categoryId: 'cat3', description: 'Estuche de 12 acuarelas escolares con pincel incluido. Colores mezclables, fáciles de lavar con agua.', image: 'https://images.unsplash.com/photo-1560087637-bf797bc7796a?w=400&h=300&fit=crop', brandId: 'br5' },
    { id: 'p15', name: 'Masa para Modelar x6 colores', categoryId: 'cat3', description: 'Pack de 6 potes de masa para modelar en colores surtidos. No tóxica, no mancha, se seca al aire. Ideal para motricidad fina.', image: 'https://images.unsplash.com/photo-1596495577886-d920f1fb7238?w=400&h=300&fit=crop', brandId: 'br4' },
    { id: 'p16', name: 'Tijera Escolar Punta Redonda', categoryId: 'cat3', description: 'Tijera escolar de seguridad con punta redonda. Mango ergonómico, ideal para manos pequeñas. Diferentes colores.', image: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=400&h=300&fit=crop', brandId: 'br3' },
    { id: 'p17', name: 'Papel Glasé x50 hojas', categoryId: 'cat3', description: 'Paquete de 50 hojas de papel glasé en colores surtidos. Tamaño 10x10cm, ideal para origami y collage.', image: 'https://images.unsplash.com/photo-1560087637-bf797bc7796a?w=400&h=300&fit=crop', brandId: 'br7' },

    // Mochilas y Cartucheras
    { id: 'p18', name: 'Mochila Escolar Reforzada 17"', categoryId: 'cat4', description: 'Mochila escolar de 17 pulgadas con espalda acolchada, múltiples compartimentos, bolsillos laterales y tiras ajustables. Diseños surtidos.', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop', brandId: 'br8' },
    { id: 'p19', name: 'Mochila con Carro Desmontable', categoryId: 'cat4', description: 'Mochila escolar con carro de ruedas desmontable. Estructura reforzada, ideal para cargar cuadernos pesados. Colores surtidos.', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop', brandId: 'br8' },
    { id: 'p20', name: 'Cartuchera de Tela 1 Cierre', categoryId: 'cat4', description: 'Cartuchera escolar de tela resistente con 1 cierre. Amplia capacidad para lápices, bolígrafos y accesorios. Colores surtidos.', image: 'https://images.unsplash.com/photo-1596495577886-d920f1fb7238?w=400&h=300&fit=crop', brandId: 'br8' },
    { id: 'p21', name: 'Cartuchera 2 Pisos Completa', categoryId: 'cat4', description: 'Cartuchera de 2 pisos equipada con 24 lápices de colores, regla, goma, sacapuntas y bolígrafos. Lista para usar.', image: 'https://images.unsplash.com/photo-1596495577886-d920f1fb7238?w=400&h=300&fit=crop', brandId: 'br2' },

    // Geometría y Medición
    { id: 'p22', name: 'Juego Geométrico Completo', categoryId: 'cat5', description: 'Set completo: regla 30cm, escuadra, transportador 180° y compás. Material resistente, ideal para primaria y secundaria.', image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400&h=300&fit=crop', brandId: 'br3' },
    { id: 'p23', name: 'Regla 30cm Irrompible', categoryId: 'cat5', description: 'Regla de 30cm en material flexible irrompible. Con números claros y borde recto. Color cristal.', image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400&h=300&fit=crop', brandId: 'br3' },

    // Pegamentos y Adhesivos
    { id: 'p24', name: 'Plasticola Blanca 40g', categoryId: 'cat6', description: 'Adhesivo vinílico escolar de 40g. Fórmula no tóxica, lavable con agua. Pico dosificador preciso. Uso diario.', image: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=400&h=300&fit=crop', brandId: 'br4' },
    { id: 'p25', name: 'Plasticola Color x6 unidades', categoryId: 'cat6', description: 'Pack de 6 adhesivos vinílicos de colores. Ideales para decorar trabajos y manualidades. Lavables y no tóxicos.', image: 'https://images.unsplash.com/photo-1596495577886-d920f1fb7238?w=400&h=300&fit=crop', brandId: 'br4' },
    { id: 'p26', name: 'Barra de Pegamento 21g', categoryId: 'cat6', description: 'Barra adhesiva de 21g. No mancha, no arruga el papel. Ideal para pegado limpio y rápido en clase.', image: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=400&h=300&fit=crop', brandId: 'br4' },
    { id: 'p27', name: 'Cinta Scotch Transparente', categoryId: 'cat6', description: 'Cinta adhesiva transparente de 18mm x 25m. Alta adherencia, fácil de cortar. Para sellar y pegar trabajos.', image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&h=300&fit=crop', brandId: 'br8' },

    // Papelería General
    { id: 'p28', name: 'Goma de Borrar Blanca Grande', categoryId: 'cat7', description: 'Goma de borrar blanca suave. Borra limpiamente sin dañar el papel. Tamaño grande para mayor duración.', image: 'https://images.unsplash.com/photo-1585336261022-680e295ce3fe?w=400&h=300&fit=crop', brandId: 'br9' },
    { id: 'p29', name: 'Sacapuntas Doble con Depósito', categoryId: 'cat7', description: 'Sacapuntas con doble orificio (lápiz fino y grueso) y depósito para viruta. Cuchilla de acero inoxidable.', image: 'https://images.unsplash.com/photo-1596495577886-d920f1fb7238?w=400&h=300&fit=crop', brandId: 'br3' },
    { id: 'p30', name: 'Corrector Líquido 20ml', categoryId: 'cat7', description: 'Corrector líquido blanco de secado rápido. Pincel aplicador fino para correcciones precisas. Fórmula al agua.', image: 'https://images.unsplash.com/photo-1607013407627-6ee814329547?w=400&h=300&fit=crop', brandId: 'br4' },
    { id: 'p31', name: 'Block de Hojas Blancas A4 x100', categoryId: 'cat7', description: 'Block de 100 hojas blancas tamaño A4 de 80g. Multipropósito: impresión, dibujo, trabajos prácticos.', image: 'https://images.unsplash.com/photo-1517842645767-c639042777db?w=400&h=300&fit=crop', brandId: 'br7' },
    { id: 'p32', name: 'Papel Afiche x5 hojas colores', categoryId: 'cat7', description: 'Pack de 5 hojas de papel afiche en colores surtidos. Tamaño 70x100cm, ideal para carteleras y trabajos grupales.', image: 'https://images.unsplash.com/photo-1560087637-bf797bc7796a?w=400&h=300&fit=crop', brandId: 'br7' },
  ];

  saveUsers(users);
  saveProducts(products);
  saveCategories(categories);
  saveBrands(brands);
  localStorage.setItem(KEYS.initialized, 'true');
  localStorage.setItem(KEYS.dataVersion, DATA_VERSION);
}
