# 🚀 Configuración Final de Supabase

## ✅ Estado Actual
- ✅ Código actualizado para usar Supabase
- ✅ Dependencias instaladas (`@supabase/supabase-js`)
- ✅ Variables de entorno configuradas en `.env.local`
- ✅ Credenciales correctas

## 📋 Pasos para Completar la Configuración

### Paso 1: Crear las Tablas en Supabase

1. Ve a tu proyecto en Supabase:
   https://supabase.com/dashboard/project/gpnablxgbcpvsvudnwjm

2. Click en **"SQL Editor"** en el menú lateral

3. Click en **"New query"**

4. Copia y pega este SQL completo:

```sql
-- Crear tablas
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL CHECK(role IN ('admin', 'vendedor', 'comprador')),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS brands (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category_id TEXT NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  description TEXT NOT NULL,
  image TEXT NOT NULL,
  brand_id TEXT NOT NULL REFERENCES brands(id) ON DELETE CASCADE,
  price DECIMAL(10,2),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Habilitar Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Políticas de acceso (permitir todo por ahora)
CREATE POLICY "Allow all operations on users" ON users FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on categories" ON categories FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on brands" ON brands FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on products" ON products FOR ALL USING (true) WITH CHECK (true);

-- Índices para mejor rendimiento
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_brand ON products(brand_id);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
```

5. Click en **"RUN"** o presiona `Ctrl+Enter`

6. Deberías ver: **"Success. No rows returned"**

### Paso 2: Verificar las Tablas

1. En el menú lateral, click en **"Table Editor"**
2. Deberías ver 4 tablas:
   - ✅ users
   - ✅ categories
   - ✅ brands
   - ✅ products

### Paso 3: Probar en Local

```bash
npm run dev
```

1. Abre http://localhost:8080
2. Login con: `admin@demo.com` / `123456`
3. Ve a **Admin Dashboard** > **Productos**
4. Agrega un producto de prueba con precio
5. Ve a Supabase > Table Editor > products
6. ✅ Deberías ver el producto que acabas de crear

### Paso 4: Configurar Vercel

1. Ve a https://vercel.com/dashboard
2. Selecciona tu proyecto
3. Ve a **Settings** > **Environment Variables**
4. Agrega estas 2 variables:

```
VITE_SUPABASE_URL = https://gpnablxgbcpvsvudnwjm.supabase.co
VITE_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdwbmFibHhnYmNwdnN2dWRud2ptIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU3NzE2NzAsImV4cCI6MjA1MTM0NzY3MH0.vw-9SpxOc1rYRAHUj2ocEQ_B3aXr1RK
```

5. Click en **"Save"**

### Paso 5: Desplegar a Vercel

```bash
git add .
git commit -m "feat: Supabase integration complete"
git push origin main
```

Espera a que Vercel termine de desplegar (1-2 minutos).

### Paso 6: Probar en Producción

1. Abre tu sitio en Vercel
2. Login como admin
3. Agrega un producto
4. **Abre en OTRO navegador o dispositivo**
5. Login como admin
6. ✅ Deberías ver el mismo producto

## 🎉 ¡Listo!

Ahora tus datos se guardan en Supabase y se comparten entre todos los dispositivos y navegadores.

## 🔍 Verificar que Todo Funciona

### En la Consola del Navegador (F12):
- ❌ NO deberías ver errores de "sql-wasm"
- ❌ NO deberías ver "filter is not a function"
- ✅ Deberías ver datos cargándose correctamente

### En Supabase:
- Ve a Table Editor
- Deberías ver datos en las tablas cuando agregues productos/categorías

## 🆘 Si Algo Falla

### Error: "Failed to fetch"
- Verifica que ejecutaste el SQL en Supabase
- Verifica las variables de entorno en Vercel

### Error: "relation does not exist"
- Las tablas no se crearon
- Ejecuta el SQL del Paso 1 nuevamente

### Pantalla en blanco
- Abre la consola (F12) y revisa los errores
- Verifica que las variables de entorno estén en Vercel

---

**Usuario Admin:**
- Email: `admin@demo.com`
- Password: `123456`
