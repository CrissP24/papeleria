# 🚀 EJECUTAR AHORA - Paso a Paso

## ✅ Paso 1: Crear las Tablas en Supabase

### 1.1 Ir a Supabase
Ve a: https://supabase.com/dashboard/project/gpnablxgbcpvsvudnwjm

### 1.2 Abrir SQL Editor
- En el menú lateral izquierdo, busca y click en **"SQL Editor"**
- O ve directamente a: https://supabase.com/dashboard/project/gpnablxgbcpvsvudnwjm/sql

### 1.3 Ejecutar el SQL
1. Click en **"New query"** (botón verde)
2. Copia TODO el texto de abajo:

```sql
-- Crear tablas en Supabase
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

ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all operations on users" ON users FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on categories" ON categories FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on brands" ON brands FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on products" ON products FOR ALL USING (true) WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_brand ON products(brand_id);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
```

3. Pega el SQL en el editor
4. Click en **"RUN"** (botón verde abajo a la derecha) o presiona **Ctrl+Enter**
5. Deberías ver: **"Success. No rows returned"**

### 1.4 Verificar que se crearon las tablas
1. En el menú lateral, click en **"Table Editor"**
2. Deberías ver 4 tablas: `users`, `categories`, `brands`, `products`

## ✅ Paso 2: Configurar Variables en Vercel

1. Ve a: https://vercel.com/dashboard
2. Selecciona tu proyecto
3. Ve a **Settings** > **Environment Variables**
4. Agrega estas 2 variables:

**Variable 1:**
```
Name: VITE_SUPABASE_URL
Value: https://gpnablxgbcpvsvudnwjm.supabase.co
```

**Variable 2:**
```
Name: VITE_SUPABASE_ANON_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdwbmFibHhnYmNwdnN2dWRud2ptIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU3NzE2NzAsImV4cCI6MjA1MTM0NzY3MH0.vw-9SpxOc1rYRAHUj2ocEQ_B3aXr1RK
```

5. Click en **"Save"**

## ✅ Paso 3: Desplegar

Abre tu terminal y ejecuta:

```bash
git add .
git commit -m "feat: Supabase integration with shared data"
git push origin main
```

## ✅ Paso 4: Probar

### En Local:
```bash
npm run dev
```

1. Abre http://localhost:8080
2. Login: `admin@demo.com` / `123456`
3. Ve a Productos
4. Agrega un producto con precio
5. Ve a Supabase > Table Editor > products
6. ✅ Deberías ver el producto

### En Producción:
1. Espera que Vercel termine de desplegar
2. Abre tu sitio
3. Login como admin
4. Agrega un producto
5. Abre en OTRO navegador o dispositivo
6. ✅ Deberías ver el mismo producto

## 🎉 ¡Listo!

Ahora tus datos se comparten entre TODOS los dispositivos y navegadores.

## 🆘 Si algo falla:

1. Revisa la consola del navegador (F12)
2. Verifica que las tablas existen en Supabase
3. Verifica las variables de entorno en Vercel
4. Revisa los logs de Vercel

---

**¡Ejecuta estos pasos ahora y tendrás datos compartidos!** 🚀
