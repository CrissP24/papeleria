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

const DATA_VERSION = '4';

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

  const seedImages: Array<{ name: string; fileName: string }> = [
    { name: 'CAJITA DE PIZZAS PARA TRABJAR LA NOCION DE FRACCIONES', fileName: 'cajita-de-pizzas-para-trabjar-la-nocion-de-fracciones.jpeg' },
    { name: 'CARTA FORMAS Y COLORES', fileName: 'carta-formas-y-colores.jpeg' },
    { name: 'CARTAS DEL MERCADO', fileName: 'cartas-del-mercado.jpeg' },
    { name: 'CARTAS EL CUERPO HUMANO', fileName: 'cartas-el-cuerpo-humano.jpeg' },
    { name: 'CARTAS EL MERCADO', fileName: 'cartas-el-mercado.jpeg' },
    { name: 'cARTAS EMPIEZO A ESCRIBIR EN CURSIVA, MAYUSCULAS Y MINUSCULAS', fileName: 'cartas-empiezo-a-escribir-en-cursiva-mayusculas-y-minusculas.jpeg' },
    { name: 'CARTAS EMPIEZO A ESCRIBIR IMPRENTA MAYUSCULAS Y MINUSCULAS', fileName: 'cartas-empiezo-a-escribir-imprenta-mayusculas-y-minusculas.jpeg' },
    { name: 'CARTAS LAS ESTACIONES DEL CLIMA Y LA ROPA', fileName: 'cartas-las-estaciones-del-clima-y-la-ropa.jpeg' },
    { name: 'CARTAS MATEMATICA 2. MULTIPLICACION Y DIVISION', fileName: 'cartas-matematica-2-multiplicacion-y-division.jpeg' },
    { name: 'CARTAS', fileName: 'cartas.jpeg' },
    { name: 'CASITA DE MULTIPLICACION DE 1 CIFRA', fileName: 'casita-de-multiplicacion-de-1-cifra.jpeg' },
    { name: 'CASITAS DE + Y - CENTENAS', fileName: 'casitas-de-y-centenas.jpeg' },
    { name: 'CASITAS DE + Y - UNIDAD DE MIL', fileName: 'casitas-de-y-unidad-de-mil.jpeg' },
    { name: 'CASITAS DE DIVISION', fileName: 'casitas-de-division.jpeg' },
    { name: 'COMPAS ADAPTADO', fileName: 'compas-adaptado.jpeg' },
    { name: 'CUADERNO ABC AULA UNIVERSAL  CUADERNO ABIERTO', fileName: 'cuaderno-abc-aula-universal-cuaderno-abierto.jpeg' },
    { name: 'CUADERNO ABC AULA UNIVERSAL CON ESPIRAL NIVEL INICIAL ABIERTO', fileName: 'cuaderno-abc-aula-universal-con-espiral-nivel-inicial-abierto.jpeg' },
    { name: 'CUADERNO ABC AULA UNIVERSAL NIVEL INICIAL ABIERTO. RENGLON COMPLETO', fileName: 'cuaderno-abc-aula-universal-nivel-inicial-abierto-renglon-completo.jpeg' },
    { name: 'CUADERNO ABC AULA UNIVERSAL NIVEL INICIAL CON ESPIRAL', fileName: 'cuaderno-abc-aula-universal-nivel-inicial-con-espiral.jpeg' },
    { name: 'CUADERNO ABC AULA UNIVERSAL NIVEL INICIAL', fileName: 'cuaderno-abc-aula-universal-nivel-inicial.jpeg' },
    { name: 'CUADERNO ABC NIVEL INCIAL  RENGLONES POR LA MITAD', fileName: 'cuaderno-abc-nivel-incial-renglones-por-la-mitad.jpeg' },
    { name: 'CUADERNO ABC NIVEL INCIAL CUADERNO RENGLON COMPLETO', fileName: 'cuaderno-abc-nivel-incial-cuaderno-renglon-completo.jpeg' },
    { name: 'CUADERNO ABIERTO A7  HOJAS RAYADAS', fileName: 'cuaderno-abierto-a7-hojas-rayadas.jpeg' },
    { name: 'CUADERNO ABIERTO A7 HOJASCUADRICULADAS', fileName: 'cuaderno-abierto-a7-hojascuadriculadas.jpeg' },
    { name: 'CUADERNO AULA UNIVERSAL NIVEL INICIAL CON ESPIRAL ABIERTO', fileName: 'cuaderno-aula-universal-nivel-inicial-con-espiral-abierto.jpeg' },
    { name: 'CUADERNO UNIVERSAL A3 ABIERTO CUADRADO', fileName: 'cuaderno-universal-a3-abierto-cuadrado.jpeg' },
    { name: 'CUADERNO UNIVERSAL A3 ABIERTO RAYADO', fileName: 'cuaderno-universal-a3-abierto-rayado.jpeg' },
    { name: 'CUADERNOS AULA UNIV ABIERTOS A7', fileName: 'cuadernos-aula-univ-abiertos-a7.jpeg' },
    { name: 'CUADERNOS AULA UNIVERSAL A3 RAYADOS Y CUADRICULADOS', fileName: 'cuadernos-aula-universal-a3-rayados-y-cuadriculados.jpeg' },
    { name: 'CUADERNOS N 3 ABC', fileName: 'cuadernos-n-3-abc.jpeg' },
    { name: 'DA DA DO 1', fileName: 'da-da-do-1.jpeg' },
    { name: 'DA DA DO', fileName: 'da-da-do.jpeg' },
    { name: 'DETALLE DE RESP DE HOJAS CUADRICULADAS', fileName: 'detalle-de-resp-de-hojas-cuadriculadas.jpeg' },
    { name: 'DETALLE RESP DE HOJASRAYADAS', fileName: 'detalle-resp-de-hojasrayadas.jpeg' },
    { name: 'ESCUADRA BAJA VISION', fileName: 'escuadra-baja-vision.jpeg' },
    { name: 'EXPLICACION JUGUEMOS A LA CARTAS NUMEROS', fileName: 'explicacion-juguemos-a-la-cartas-numeros.jpeg' },
    { name: 'EXPLICACION JUGUEMOS A LA CARTAS', fileName: 'explicacion-juguemos-a-la-cartas.jpeg' },
    { name: 'EXPLICACION JUGUEMOS A LAS CARTAS. CURSIVA', fileName: 'explicacion-juguemos-a-las-cartas-cursiva.jpeg' },
    { name: 'FICHAS DE LETRAS', fileName: 'fichas-de-letras.jpeg' },
    { name: 'FICHAS EL ABECEDARIO', fileName: 'fichas-el-abecedario.jpeg' },
    { name: 'FICHAS NUMERICAS DEL 1 AL 10', fileName: 'fichas-numericas-del-1-al-10.jpeg' },
    { name: 'FICHAS POSICION NUMERICA', fileName: 'fichas-posicion-numerica.jpeg' },
    { name: 'FOTO GRAL CARTAS', fileName: 'foto-gral-cartas.jpeg' },
    { name: 'GRIP PARA LAPIZ FACIL AGARRE', fileName: 'grip-para-lapiz-facil-agarre.jpeg' },
    { name: 'GRIPS PARA LAPICES CON DOS DEDOS', fileName: 'grips-para-lapices-con-dos-dedos.jpeg' },
    { name: 'GRPS PARA  LAPIZ LISOS', fileName: 'grps-para-lapiz-lisos.jpeg' },
    { name: 'JUEGO Y APRENDO EN EL ESPACIO', fileName: 'juego-y-aprendo-en-el-espacio.jpeg' },
    { name: 'JUEGO Y APRENDO EN EL MUNDO', fileName: 'juego-y-aprendo-en-el-mundo.jpeg' },
    { name: 'JUGAMOS A LA CARTAS EN IMPRENTA', fileName: 'jugamos-a-la-cartas-en-imprenta.jpeg' },
    { name: 'JUGAMOS A LAS CARTAS CURSIVA', fileName: 'jugamos-a-las-cartas-cursiva.jpeg' },
    { name: 'JUGAMOS A LAS CARTAS', fileName: 'jugamos-a-las-cartas.jpeg' },
    { name: 'JUGUEMOS A LA CARTAS. CARTAS NUMERICAS', fileName: 'juguemos-a-la-cartas-cartas-numericas.jpeg' },
    { name: 'JUGUEMOS A LAS CARTAS VOCALES (2)', fileName: 'juguemos-a-las-cartas-vocales-2.jpeg' },
    { name: 'JUGUEMOS A LAS CARTAS VOCALES', fileName: 'juguemos-a-las-cartas-vocales.jpeg' },
    { name: 'LAPICERA CON GOMA BORRABLE', fileName: 'lapicera-con-goma-borrable.jpeg' },
    { name: 'LAPICERA PARA ZURDOS', fileName: 'lapicera-para-zurdos.jpeg' },
    { name: 'LAPIZ INFINITO (NO SE ACABA LA MINA)', fileName: 'lapiz-infinito-no-se-acaba-la-mina.jpeg' },
    { name: 'LIBRO DE LAS EMOCIONES ABIERTO', fileName: 'libro-de-las-emociones-abierto.jpeg' },
    { name: 'LIBRO DE LAS EMOCIONES', fileName: 'libro-de-las-emociones.jpeg' },
    { name: 'LIBRO ORACIONES ABIERTO', fileName: 'libro-oraciones-abierto.jpeg' },
    { name: 'LIBRO ORACIONES', fileName: 'libro-oraciones.jpeg' },
    { name: 'LIBRO PALABRAS ABIERTO', fileName: 'libro-palabras-abierto.jpeg' },
    { name: 'LIBRO PALABRAS', fileName: 'libro-palabras.jpeg' },
    { name: 'LIBRO SUMAS Y RESTAS AABIERTO', fileName: 'libro-sumas-y-restas-aabierto.jpeg' },
    { name: 'LIBRO SUMAS Y RESTAS', fileName: 'libro-sumas-y-restas.jpeg' },
    { name: 'LIBROS (GENERAL)', fileName: 'libros-general.jpeg' },
    { name: 'MI OTRA MITAD', fileName: 'mi-otra-mitad.jpeg' },
    { name: 'NOMBRE PARA LAPICES', fileName: 'nombre-para-lapices.jpeg' },
    { name: 'SACAPUNTAS PARA ZURDOS', fileName: 'sacapuntas-para-zurdos.jpeg' },
    { name: 'silabario', fileName: 'silabario.jpeg' },
    { name: 'SUMO 10', fileName: 'sumo-10.jpeg' },
    { name: 'TABLA DE MULTIPLICAR DISTINTOS TAMANOS', fileName: 'tabla-de-multiplicar-distintos-tamaos.jpeg' },
    { name: 'tabla de multplicar', fileName: 'tabla-de-multplicar.jpg' },
    { name: 'tablas de multplicar', fileName: 'tablas-de-multplicar.jpeg' },
    { name: 'TOPIN PARA LAPICES EN FORMA DE CORAZON', fileName: 'topin-para-lapices-en-forma-de-corazon.jpeg' },
    { name: 'TRANSPORTADOR BAJA VISION', fileName: 'transportador-baja-vision.jpeg' },
    { name: 'TRASNPORTADOR DOBLE MEDICION BAJA VISION', fileName: 'trasnportador-doble-medicion-baja-vision.jpeg' },
    { name: 'ZAPATILLA PARA ATARSE LOS CORDONES', fileName: 'zapatilla-para-atarse-los-cordones.jpeg' },
  ];

  const inferCategoryId = (name: string): string => {
    const n = name.toLowerCase();

    if (n.includes('cuaderno') || n.includes('cuadernos') || n.includes('repuesto') || n.includes('resp de hojas') || n.includes('hojas')) {
      return 'cat1';
    }
    if (n.includes('carta') || n.includes('cartas')) {
      return 'cat2';
    }
    if (n.includes('fichas') || n.includes('silabario') || n.includes('libro') || n.includes('da da do') || n.includes('oraciones') || n.includes('palabras')) {
      return 'cat3';
    }
    if (n.includes('multiplic') || n.includes('division') || n.includes('fracciones') || n.includes('sumo 10') || n.includes('numeric') || n.includes('tabla') || n.includes('centenas') || n.includes('unidad de mil')) {
      return 'cat4';
    }
    if (n.includes('baja vision') || n.includes('transportador') || n.includes('escuadra') || n.includes('compas')) {
      return 'cat5';
    }
    if (n.includes('zurdo') || n.includes('grip') || n.includes('grps') || n.includes('lapicera') || n.includes('lapiz') || n.includes('sacapuntas') || n.includes('topin')) {
      return 'cat6';
    }
    if (n.includes('juego y aprendo') || n.includes('zapatilla para atarse los cordones') || n.includes('mi otra mitad')) {
      return 'cat7';
    }

    return 'cat8';
  };

  const inferBrandId = (name: string): string => {
    const n = name.toLowerCase();

    if (n.includes('abc')) return 'br1';
    if (n.includes('aula universal') || n.includes('universal')) return 'br2';
    if (n.includes('baja vision') || n.includes('zurdo') || n.includes('grip') || n.includes('compas') || n.includes('transportador') || n.includes('escuadra')) return 'br3';

    return 'br4';
  };

  const categoryById = new Map(categories.map((c) => [c.id, c.name]));

  const products: Product[] = seedImages.map((item, index) => {
    const categoryId = inferCategoryId(item.name);
    const brandId = inferBrandId(item.name);
    const categoryName = categoryById.get(categoryId) || 'Material Didactico General';

    return {
      id: `p${index + 1}`,
      name: item.name,
      categoryId,
      description: `${item.name}. Categoria: ${categoryName}. Material para acompanar el aprendizaje inclusivo.`,
      image: `/productos/${item.fileName}`,
      brandId,
    };
  });

  saveUsers(users);
  saveProducts(products);
  saveCategories(categories);
  saveBrands(brands);
  localStorage.setItem(KEYS.initialized, 'true');
  localStorage.setItem(KEYS.dataVersion, DATA_VERSION);
}
