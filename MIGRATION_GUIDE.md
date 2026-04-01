# Guía de Migración a SQLite (sql.js)

## Resumen de Cambios

Tu aplicación ahora usa SQLite en el navegador mediante sql.js (SQLite compilado a WebAssembly) en lugar de localStorage directo. Esto te da:

✅ Base de datos SQL completa en el navegador
✅ Consultas SQL para búsquedas y filtros complejos
✅ Relaciones entre tablas con foreign keys
✅ Persistencia automática en localStorage
✅ Mejor organización y escalabilidad de datos

## Cambios Principales

### 1. Nueva Dependencia

Se agregó `sql.js` al proyecto:

```json
{
  "dependencies": {
    "sql.js": "^1.x.x"
  }
}
```

### 2. Nuevos Archivos

- `src/services/database.ts` - Implementación de SQLite con sql.js
- `src/hooks/useDatabase.ts` - Hooks personalizados para facilitar el uso
- `DATABASE.md` - Documentación de la base de datos
- `USAGE_EXAMPLES.md` - Ejemplos de uso
- `MIGRATION_GUIDE.md` - Esta guía

### 3. Archivos Modificados

- `src/services/storage.ts` - Ahora re-exporta funciones de database.ts
- `src/main.tsx` - Inicialización asíncrona de la base de datos
- `src/context/AuthContext.tsx` - Funciones de login/logout ahora son asíncronas
- `src/pages/LoginPage.tsx` - handleSubmit ahora es asíncrono
- `README.md` - Actualizado con información de sql.js
- `package.json` - Eliminados scripts de db-utils
- `.gitignore` - Eliminadas referencias a archivos .db

### 4. Archivos Eliminados

- `scripts/db-utils.js` - Ya no es necesario con sql.js

## Funciones Ahora Asíncronas

Todas las funciones de storage ahora son asíncronas. Debes usar `await`:

### Antes (localStorage)
```typescript
const products = getProducts();
addProduct(newProduct);
```

### Ahora (sql.js)
```typescript
const products = await getProducts();
await addProduct(newProduct);
```

## Cómo Actualizar tus Componentes

### Opción 1: Usar los Hooks Personalizados (Recomendado)

```typescript
import { useProducts } from '@/hooks/useDatabase';

function MyComponent() {
  const { products, loading, addProduct } = useProducts();
  
  const handleAdd = async () => {
    await addProduct(newProduct);
    // Los datos se recargan automáticamente
  };

  if (loading) return <div>Cargando...</div>;
  
  return <div>{/* Tu UI */}</div>;
}
```

### Opción 2: Usar las Funciones Directamente

```typescript
import { getProducts, addProduct } from '@/services/storage';
import { useEffect, useState } from 'react';

function MyComponent() {
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    loadProducts();
  }, []);
  
  const loadProducts = async () => {
    const data = await getProducts();
    setProducts(data);
  };
  
  const handleAdd = async () => {
    await addProduct(newProduct);
    await loadProducts(); // Recargar manualmente
  };
  
  return <div>{/* Tu UI */}</div>;
}
```

## Componentes que Necesitan Actualización

Si tienes componentes personalizados que usan las funciones de storage, necesitarás:

1. Hacer las funciones `async`
2. Agregar `await` antes de cada llamada a storage
3. Considerar usar los hooks personalizados para simplificar el código

### Ejemplo de Actualización

**Antes:**
```typescript
const handleSubmit = (e) => {
  e.preventDefault();
  const products = getProducts();
  addProduct(newProduct);
};
```

**Después:**
```typescript
const handleSubmit = async (e) => {
  e.preventDefault();
  const products = await getProducts();
  await addProduct(newProduct);
};
```

## Estructura de la Base de Datos

La base de datos tiene las siguientes tablas:

- `users` - Usuarios del sistema
- `products` - Productos del catálogo
- `categories` - Categorías de productos
- `brands` - Marcas de productos
- `session` - Sesión actual del usuario

Ver `DATABASE.md` para más detalles sobre la estructura.

## Datos Iniciales

Al iniciar la aplicación por primera vez, se cargan automáticamente:

- 8 categorías
- 4 marcas
- 3 usuarios de prueba
- Todos los productos con sus imágenes

## Resetear la Base de Datos

Para resetear la base de datos:

1. Abre las herramientas de desarrollador (F12)
2. Ve a Application > Local Storage
3. Elimina la clave `catalina_sqlite_db`
4. Recarga la página

## Ventajas de sql.js

1. **SQL Completo**: Puedes hacer consultas complejas con JOIN, WHERE, ORDER BY, etc.
2. **Relaciones**: Foreign keys para mantener integridad referencial
3. **Transacciones**: Operaciones atómicas para consistencia de datos
4. **Escalabilidad**: Mejor rendimiento con grandes cantidades de datos
5. **Portabilidad**: Fácil migración a un backend real en el futuro

## Soporte y Documentación

- Ver `DATABASE.md` para documentación completa de la base de datos
- Ver `USAGE_EXAMPLES.md` para ejemplos de código
- Consulta la [documentación de sql.js](https://sql.js.org/)

## Preguntas Frecuentes

### ¿Los datos se pierden al cerrar el navegador?
No, los datos se guardan automáticamente en localStorage después de cada operación.

### ¿Puedo hacer consultas SQL personalizadas?
Sí, puedes acceder a la base de datos directamente desde `src/services/database.ts`.

### ¿Funciona en todos los navegadores?
Sí, sql.js funciona en todos los navegadores modernos que soportan WebAssembly.

### ¿Cuál es el límite de almacenamiento?
El límite depende del navegador, típicamente 5-10 MB para localStorage. Para más datos, considera IndexedDB.

### ¿Puedo migrar a un backend real?
Sí, la estructura SQL facilita la migración a PostgreSQL, MySQL, o cualquier base de datos SQL.
