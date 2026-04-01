# Ejemplos de Uso - Base de Datos SQLite

Este documento muestra cómo usar la base de datos SQLite en tus componentes.

## Usando los Hooks Personalizados (Recomendado)

Los hooks personalizados simplifican el manejo de datos asíncronos y el estado de carga.

### Ejemplo: Componente de Productos

```typescript
import React from 'react';
import { useProducts, useCategories, useBrands } from '@/hooks/useDatabase';
import { generateId } from '@/services/storage';

function ProductsComponent() {
  const { products, loading, addProduct, updateProduct, deleteProduct } = useProducts();
  const { categories } = useCategories();
  const { brands } = useBrands();

  const handleAddProduct = async () => {
    const newProduct = {
      id: generateId(),
      name: 'Nuevo Producto',
      categoryId: categories[0]?.id || 'cat1',
      description: 'Descripción del producto',
      image: '/productos/imagen.jpeg',
      brandId: brands[0]?.id || 'br1'
    };
    
    await addProduct(newProduct);
  };

  const handleUpdateProduct = async (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    await updateProduct({
      ...product,
      name: 'Nombre Actualizado'
    });
  };

  const handleDeleteProduct = async (productId: string) => {
    await deleteProduct(productId);
  };

  if (loading) {
    return <div>Cargando productos...</div>;
  }

  return (
    <div>
      <h2>Productos ({products.length})</h2>
      <button onClick={handleAddProduct}>Agregar Producto</button>
      
      <ul>
        {products.map(product => (
          <li key={product.id}>
            {product.name}
            <button onClick={() => handleUpdateProduct(product.id)}>Editar</button>
            <button onClick={() => handleDeleteProduct(product.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

### Ejemplo: Componente de Categorías

```typescript
import React, { useState } from 'react';
import { useCategories } from '@/hooks/useDatabase';
import { generateId } from '@/services/storage';

function CategoriesComponent() {
  const { categories, loading, addCategory, updateCategory, deleteCategory } = useCategories();
  const [newCategoryName, setNewCategoryName] = useState('');

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategoryName.trim()) return;

    await addCategory({
      id: generateId(),
      name: newCategoryName
    });

    setNewCategoryName('');
  };

  if (loading) {
    return <div>Cargando categorías...</div>;
  }

  return (
    <div>
      <h2>Categorías</h2>
      
      <form onSubmit={handleAddCategory}>
        <input
          type="text"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          placeholder="Nueva categoría"
        />
        <button type="submit">Agregar</button>
      </form>

      <ul>
        {categories.map(category => (
          <li key={category.id}>
            {category.name}
            <button onClick={() => deleteCategory(category.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

## Usando las Funciones Directamente

Si prefieres no usar los hooks, puedes usar las funciones directamente:

```typescript
import React, { useState, useEffect } from 'react';
import { getProducts, addProduct, generateId } from '@/services/storage';
import { Product } from '@/types';

function ProductsComponentDirect() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setLoading(true);
    const data = await getProducts();
    setProducts(data);
    setLoading(false);
  };

  const handleAddProduct = async () => {
    const newProduct = {
      id: generateId(),
      name: 'Nuevo Producto',
      categoryId: 'cat1',
      description: 'Descripción',
      image: '/productos/imagen.jpeg',
      brandId: 'br1'
    };
    
    await addProduct(newProduct);
    await loadProducts(); // Recargar la lista
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <button onClick={handleAddProduct}>Agregar Producto</button>
      <ul>
        {products.map(product => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </div>
  );
}
```

## Hooks Disponibles

### useProducts()
Retorna: `{ products, loading, addProduct, updateProduct, deleteProduct, refresh }`

### useCategories()
Retorna: `{ categories, loading, addCategory, updateCategory, deleteCategory, refresh }`

### useBrands()
Retorna: `{ brands, loading, addBrand, updateBrand, deleteBrand, refresh }`

### useUsers()
Retorna: `{ users, loading, addUser, updateUser, deleteUser, refresh }`

## Funciones de Storage Disponibles

Todas las funciones son asíncronas y deben usarse con `await`:

```typescript
// Productos
await getProducts()
await addProduct(product)
await updateProduct(product)
await deleteProduct(id)
await saveProducts(products)

// Categorías
await getCategories()
await addCategory(category)
await updateCategory(category)
await deleteCategory(id)
await saveCategories(categories)

// Marcas
await getBrands()
await addBrand(brand)
await updateBrand(brand)
await deleteBrand(id)
await saveBrands(brands)

// Usuarios
await getUsers()
await addUser(user)
await updateUser(user)
await deleteUser(id)
await saveUsers(users)

// Sesión
await getSession()
await setSession(user)
await clearSession()

// Utilidades
generateId() // Genera un ID único (no es asíncrono)
await initializeData() // Inicializa la base de datos
```

## Notas Importantes

1. Todas las operaciones de base de datos son asíncronas
2. La base de datos se guarda automáticamente en localStorage después de cada operación
3. Los hooks manejan automáticamente el estado de carga y la recarga de datos
4. Usa `generateId()` para crear IDs únicos para nuevos registros
5. La función `refresh()` en los hooks recarga los datos desde la base de datos
