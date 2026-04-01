# Base de Datos SQLite (sql.js)

Este proyecto utiliza SQLite (a través de sql.js) para almacenar todos los datos de forma persistente en el navegador.

## Características

- **Base de datos**: SQLite en el navegador usando sql.js (WebAssembly)
- **Almacenamiento**: Los datos se guardan en localStorage como array de bytes
- **Motor**: sql.js - SQLite compilado a WebAssembly para funcionar en navegadores
- **Persistencia**: Automática después de cada operación

## Estructura de Tablas

### users
- `id` (TEXT, PRIMARY KEY)
- `email` (TEXT, UNIQUE, NOT NULL)
- `password` (TEXT, NOT NULL)
- `name` (TEXT, NOT NULL)
- `role` (TEXT, NOT NULL) - Valores: 'admin', 'vendedor', 'comprador'

### categories
- `id` (TEXT, PRIMARY KEY)
- `name` (TEXT, NOT NULL)

### brands
- `id` (TEXT, PRIMARY KEY)
- `name` (TEXT, NOT NULL)

### products
- `id` (TEXT, PRIMARY KEY)
- `name` (TEXT, NOT NULL)
- `categoryId` (TEXT, NOT NULL, FOREIGN KEY → categories.id)
- `description` (TEXT, NOT NULL)
- `image` (TEXT, NOT NULL)
- `brandId` (TEXT, NOT NULL, FOREIGN KEY → brands.id)

### session
- `id` (INTEGER, PRIMARY KEY, CHECK id = 1)
- `userId` (TEXT, FOREIGN KEY → users.id)

## Datos Iniciales

Al iniciar la aplicación por primera vez, se cargan automáticamente:

- 8 categorías de productos
- 4 marcas
- 3 usuarios de prueba:
  - Admin: admin@demo.com / 123456
  - Vendedor: vendedor@demo.com / 123456
  - Comprador: comprador@demo.com / 123456
- Todos los productos con sus imágenes

## Uso

La base de datos se inicializa automáticamente al arrancar la aplicación. No necesitas hacer nada manualmente. Todas las funciones son asíncronas, así que debes usar `await`.

### Agregar nuevos productos

```typescript
import { addProduct, generateId } from '@/services/storage';

const newProduct = {
  id: generateId(),
  name: 'Nuevo Producto',
  categoryId: 'cat1',
  description: 'Descripción del producto',
  image: '/productos/imagen.jpeg',
  brandId: 'br1'
};

await addProduct(newProduct);
```

### Agregar nuevas categorías

```typescript
import { addCategory, generateId } from '@/services/storage';

const newCategory = {
  id: generateId(),
  name: 'Nueva Categoría'
};

await addCategory(newCategory);
```

### Agregar nuevas marcas

```typescript
import { addBrand, generateId } from '@/services/storage';

const newBrand = {
  id: generateId(),
  name: 'Nueva Marca'
};

await addBrand(newBrand);
```

## Migración desde localStorage

El código anterior que usaba localStorage ha sido reemplazado por SQLite usando sql.js (SQLite compilado a WebAssembly). La base de datos se almacena en localStorage como un array de bytes, lo que permite persistencia en el navegador. La interfaz de las funciones se mantiene similar, pero ahora todas son asíncronas.

## Backup

La base de datos se guarda automáticamente en localStorage con la clave `catalina_sqlite_db`. Para hacer un backup manual, puedes exportar este valor desde las herramientas de desarrollador del navegador.

## Resetear la base de datos

Si quieres resetear la base de datos a su estado inicial:

1. Abre las herramientas de desarrollador del navegador (F12)
2. Ve a la pestaña "Application" o "Almacenamiento"
3. En "Local Storage", elimina la clave `catalina_sqlite_db`
4. Recarga la página (se creará una nueva base de datos con los datos iniciales)
