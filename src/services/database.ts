import initSqlJs, { Database as SqlJsDatabase } from 'sql.js';
import { User, Category, Brand, Product } from '@/types';

let db: SqlJsDatabase | null = null;
let isInitialized = false;

const DB_KEY = 'catalina_sqlite_db';

async function getDatabase(): Promise<SqlJsDatabase> {
  if (db) return db;

  const SQL = await initSqlJs({
    locateFile: (file) => `/${file}`
  });

  // Try to load existing database from localStorage
  const savedDb = localStorage.getItem(DB_KEY);
  if (savedDb) {
    const uint8Array = new Uint8Array(JSON.parse(savedDb));
    db = new SQL.Database(uint8Array);
  } else {
    db = new SQL.Database();
  }

  return db;
}

function saveDatabase() {
  if (!db) return;
  const data = db.export();
  const buffer = Array.from(data);
  localStorage.setItem(DB_KEY, JSON.stringify(buffer));
}

async function createTables() {
  const database = await getDatabase();
  
  database.run(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      name TEXT NOT NULL,
      role TEXT NOT NULL CHECK(role IN ('admin', 'vendedor', 'comprador'))
    );

    CREATE TABLE IF NOT EXISTS categories (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS brands (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS products (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      categoryId TEXT NOT NULL,
      description TEXT NOT NULL,
      image TEXT NOT NULL,
      brandId TEXT NOT NULL,
      FOREIGN KEY (categoryId) REFERENCES categories(id),
      FOREIGN KEY (brandId) REFERENCES brands(id)
    );

    CREATE TABLE IF NOT EXISTS session (
      id INTEGER PRIMARY KEY CHECK (id = 1),
      userId TEXT,
      FOREIGN KEY (userId) REFERENCES users(id)
    );
  `);

  saveDatabase();
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
}

// --- USERS ---
export async function getUsers(): Promise<User[]> {
  const database = await getDatabase();
  const result = database.exec('SELECT * FROM users');
  if (result.length === 0) return [];
  
  return result[0].values.map(row => ({
    id: row[0] as string,
    email: row[1] as string,
    password: row[2] as string,
    name: row[3] as string,
    role: row[4] as 'admin' | 'vendedor' | 'comprador'
  }));
}

export async function saveUsers(users: User[]) {
  const database = await getDatabase();
  database.run('DELETE FROM users');
  
  const stmt = database.prepare('INSERT INTO users (id, email, password, name, role) VALUES (?, ?, ?, ?, ?)');
  for (const user of users) {
    stmt.run([user.id, user.email, user.password, user.name, user.role]);
  }
  stmt.free();
  
  saveDatabase();
}

export async function addUser(user: User) {
  const database = await getDatabase();
  database.run(
    'INSERT INTO users (id, email, password, name, role) VALUES (?, ?, ?, ?, ?)',
    [user.id, user.email, user.password, user.name, user.role]
  );
  saveDatabase();
}

export async function updateUser(user: User) {
  const database = await getDatabase();
  database.run(
    'UPDATE users SET email = ?, password = ?, name = ?, role = ? WHERE id = ?',
    [user.email, user.password, user.name, user.role, user.id]
  );
  saveDatabase();
}

export async function deleteUser(id: string) {
  const database = await getDatabase();
  database.run('DELETE FROM users WHERE id = ?', [id]);
  saveDatabase();
}

// --- PRODUCTS ---
export async function getProducts(): Promise<Product[]> {
  const database = await getDatabase();
  const result = database.exec('SELECT * FROM products');
  if (result.length === 0) return [];
  
  return result[0].values.map(row => ({
    id: row[0] as string,
    name: row[1] as string,
    categoryId: row[2] as string,
    description: row[3] as string,
    image: row[4] as string,
    brandId: row[5] as string
  }));
}

export async function saveProducts(products: Product[]) {
  const database = await getDatabase();
  database.run('DELETE FROM products');
  
  const stmt = database.prepare('INSERT INTO products (id, name, categoryId, description, image, brandId) VALUES (?, ?, ?, ?, ?, ?)');
  for (const product of products) {
    stmt.run([product.id, product.name, product.categoryId, product.description, product.image, product.brandId]);
  }
  stmt.free();
  
  saveDatabase();
}

export async function addProduct(product: Product) {
  const database = await getDatabase();
  database.run(
    'INSERT INTO products (id, name, categoryId, description, image, brandId) VALUES (?, ?, ?, ?, ?, ?)',
    [product.id, product.name, product.categoryId, product.description, product.image, product.brandId]
  );
  saveDatabase();
}

export async function updateProduct(product: Product) {
  const database = await getDatabase();
  database.run(
    'UPDATE products SET name = ?, categoryId = ?, description = ?, image = ?, brandId = ? WHERE id = ?',
    [product.name, product.categoryId, product.description, product.image, product.brandId, product.id]
  );
  saveDatabase();
}

export async function deleteProduct(id: string) {
  const database = await getDatabase();
  database.run('DELETE FROM products WHERE id = ?', [id]);
  saveDatabase();
}

// --- CATEGORIES ---
export async function getCategories(): Promise<Category[]> {
  const database = await getDatabase();
  const result = database.exec('SELECT * FROM categories');
  if (result.length === 0) return [];
  
  return result[0].values.map(row => ({
    id: row[0] as string,
    name: row[1] as string
  }));
}

export async function saveCategories(categories: Category[]) {
  const database = await getDatabase();
  database.run('DELETE FROM categories');
  
  const stmt = database.prepare('INSERT INTO categories (id, name) VALUES (?, ?)');
  for (const category of categories) {
    stmt.run([category.id, category.name]);
  }
  stmt.free();
  
  saveDatabase();
}

export async function addCategory(category: Category) {
  const database = await getDatabase();
  database.run('INSERT INTO categories (id, name) VALUES (?, ?)', [category.id, category.name]);
  saveDatabase();
}

export async function updateCategory(category: Category) {
  const database = await getDatabase();
  database.run('UPDATE categories SET name = ? WHERE id = ?', [category.name, category.id]);
  saveDatabase();
}

export async function deleteCategory(id: string) {
  const database = await getDatabase();
  database.run('DELETE FROM categories WHERE id = ?', [id]);
  saveDatabase();
}

// --- BRANDS ---
export async function getBrands(): Promise<Brand[]> {
  const database = await getDatabase();
  const result = database.exec('SELECT * FROM brands');
  if (result.length === 0) return [];
  
  return result[0].values.map(row => ({
    id: row[0] as string,
    name: row[1] as string
  }));
}

export async function saveBrands(brands: Brand[]) {
  const database = await getDatabase();
  database.run('DELETE FROM brands');
  
  const stmt = database.prepare('INSERT INTO brands (id, name) VALUES (?, ?)');
  for (const brand of brands) {
    stmt.run([brand.id, brand.name]);
  }
  stmt.free();
  
  saveDatabase();
}

export async function addBrand(brand: Brand) {
  const database = await getDatabase();
  database.run('INSERT INTO brands (id, name) VALUES (?, ?)', [brand.id, brand.name]);
  saveDatabase();
}

export async function updateBrand(brand: Brand) {
  const database = await getDatabase();
  database.run('UPDATE brands SET name = ? WHERE id = ?', [brand.name, brand.id]);
  saveDatabase();
}

export async function deleteBrand(id: string) {
  const database = await getDatabase();
  database.run('DELETE FROM brands WHERE id = ?', [id]);
  saveDatabase();
}

// --- SESSION ---
export async function getSession(): Promise<User | null> {
  const database = await getDatabase();
  const result = database.exec('SELECT u.* FROM session s JOIN users u ON s.userId = u.id WHERE s.id = 1');
  if (result.length === 0 || result[0].values.length === 0) return null;
  
  const row = result[0].values[0];
  return {
    id: row[0] as string,
    email: row[1] as string,
    password: row[2] as string,
    name: row[3] as string,
    role: row[4] as 'admin' | 'vendedor' | 'comprador'
  };
}

export async function setSession(user: User) {
  const database = await getDatabase();
  database.run('INSERT OR REPLACE INTO session (id, userId) VALUES (1, ?)', [user.id]);
  saveDatabase();
}

export async function clearSession() {
  const database = await getDatabase();
  database.run('DELETE FROM session WHERE id = 1');
  saveDatabase();
}

// --- SEED DATA ---
async function seedInitialData() {
  const database = await getDatabase();
  
  // Check if data already exists
  const result = database.exec('SELECT COUNT(*) as count FROM users');
  if (result.length > 0 && result[0].values[0][0] > 0) return;

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

  // Insert all data
  await saveCategories(categories);
  await saveBrands(brands);
  await saveUsers(users);
  await saveProducts(products);
}

export async function initDatabase() {
  if (isInitialized) return;
  
  await createTables();
  await seedInitialData();
  
  isInitialized = true;
}
