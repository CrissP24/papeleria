# ⚡ Inicio Rápido - 3 Pasos

## 🎯 Objetivo
Hacer que tus datos se guarden en Supabase y se vean en todos los navegadores/dispositivos.

## ✅ Ya Está Listo
- ✅ Código actualizado
- ✅ Build exitoso
- ✅ Variables de entorno configuradas

## 🚀 Solo Necesitas Hacer Esto

### 1️⃣ Crear Tablas en Supabase (5 min)

**a)** Abre: https://supabase.com/dashboard/project/gpnablxgbcpvsvudnwjm/sql

**b)** Click en **"New query"**

**c)** Copia y pega este SQL:

```sql
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

**d)** Click en **"RUN"** (o Ctrl+Enter)

**e)** Deberías ver: **"Success. No rows returned"**

### 2️⃣ Configurar Vercel (3 min)

**a)** Ve a: https://vercel.com/dashboard

**b)** Selecciona tu proyecto

**c)** Settings > Environment Variables

**d)** Agrega estas 2 variables (copia y pega exactamente):

```
VITE_SUPABASE_URL
https://gpnablxgbcpvsvudnwjm.supabase.co
```

```
VITE_SUPABASE_ANON_KEY
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdwbmFibHhnYmNwdnN2dWRud2ptIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU3NzE2NzAsImV4cCI6MjA1MTM0NzY3MH0.vw-9SpxOc1rYRAHUj2ocEQ_B3aXr1RK
```

**e)** Click **"Save"**

### 3️⃣ Desplegar (2 min)

Abre tu terminal y ejecuta:

```bash
git add .
git commit -m "feat: Supabase integration"
git push origin main
```

Espera 1-2 minutos a que Vercel despliegue.

## ✅ Probar que Funciona

### En tu sitio:
1. Abre tu sitio en Vercel
2. Login: `admin@demo.com` / `123456`
3. Ve a Admin Dashboard > Productos
4. Agrega un producto con precio

### En otro navegador/dispositivo:
1. Abre tu sitio
2. Login: `admin@demo.com` / `123456`
3. Ve a Productos
4. ✅ **Deberías ver el producto que agregaste**

## 🎉 ¡Listo!

Ahora tus datos están en Supabase y se ven en todos lados.

## 🆘 Si Algo Falla

### "relation does not exist"
→ Ejecuta el SQL del Paso 1 otra vez

### "Failed to fetch"
→ Verifica las variables en Vercel (Paso 2)

### Pantalla en blanco
→ Abre la consola (F12) y mira los errores

---

**Tiempo total: ~10 minutos** ⏰

**¿Dudas?** Revisa `RESUMEN_FINAL.md` para más detalles.
