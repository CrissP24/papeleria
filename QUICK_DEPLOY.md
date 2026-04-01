# Guía Rápida de Despliegue a Vercel

## 🚀 Pasos Rápidos

### 1. Preparar el Proyecto

```bash
# Asegúrate de que el archivo WASM está copiado
npm run copy-wasm

# Verifica que existe
ls public/sql-wasm.wasm

# Haz un build de prueba
npm run build

# Verifica que está en dist
ls dist/sql-wasm.wasm
```

### 2. Commit y Push

```bash
git add .
git commit -m "feat: Add SQLite database with sql.js"
git push origin main
```

### 3. Desplegar en Vercel

**Opción A: Desde la Web**
1. Ve a [vercel.com](https://vercel.com)
2. Click en "Add New Project"
3. Importa tu repositorio de GitHub
4. Vercel detectará automáticamente la configuración
5. Click en "Deploy"

**Opción B: Desde la CLI**
```bash
# Instalar Vercel CLI (si no lo tienes)
npm i -g vercel

# Login
vercel login

# Desplegar
vercel --prod
```

### 4. Verificar

Una vez desplegado, verifica:

1. ✅ La página carga sin errores
2. ✅ No hay errores 404 en la consola (F12)
3. ✅ Puedes ver el catálogo de productos
4. ✅ Puedes hacer login con:
   - Admin: `admin@demo.com` / `123456`
   - Vendedor: `vendedor@demo.com` / `123456`
   - Comprador: `comprador@demo.com` / `123456`
5. ✅ Puedes agregar/editar productos (como admin)
6. ✅ Los datos persisten al recargar

## 📋 Checklist Pre-Despliegue

- [ ] `npm install` ejecutado
- [ ] `npm run copy-wasm` ejecutado
- [ ] Archivo `public/sql-wasm.wasm` existe
- [ ] `npm run build` funciona sin errores
- [ ] Archivo `dist/sql-wasm.wasm` existe
- [ ] Archivo `vercel.json` está en la raíz
- [ ] Cambios commiteados y pusheados

## 🔧 Configuración de Vercel

La configuración ya está lista en `vercel.json`:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "installCommand": "npm install"
}
```

## 🐛 Solución Rápida de Problemas

### Error 404 en sql-wasm.wasm

```bash
npm run copy-wasm
npm run build
git add .
git commit -m "fix: Include WASM file"
git push
```

### Base de datos no funciona

1. Abre DevTools (F12)
2. Ve a Console
3. Busca errores
4. Verifica que localStorage está habilitado

### Build falla en Vercel

1. Ve a los logs de Vercel
2. Busca el error específico
3. Verifica que `scripts/copy-wasm.js` existe
4. Verifica que `sql.js` está en `package.json`

## 📦 Archivos Importantes

```
proyecto/
├── public/
│   └── sql-wasm.wasm          ← Debe existir
├── scripts/
│   └── copy-wasm.js           ← Script de copia
├── vercel.json                ← Configuración de Vercel
├── package.json               ← Scripts configurados
└── vite.config.ts             ← Plugin de copia
```

## 🎯 Comandos Útiles

```bash
# Copiar WASM manualmente
npm run copy-wasm

# Build local
npm run build

# Preview del build
npm run preview

# Desarrollo local
npm run dev

# Desplegar a Vercel (CLI)
vercel --prod
```

## ✅ Todo Listo

Si seguiste estos pasos, tu aplicación debería estar funcionando en Vercel con:

- ✅ Base de datos SQLite funcionando
- ✅ Persistencia de datos en localStorage
- ✅ Todos los productos, categorías y marcas
- ✅ Sistema de autenticación
- ✅ Panel de administración

## 🔗 URLs Útiles

- **Vercel Dashboard**: https://vercel.com/dashboard
- **Documentación Vercel**: https://vercel.com/docs
- **sql.js Docs**: https://sql.js.org/

---

**¡Tu aplicación está lista para producción!** 🎉
