# Guía de Despliegue

## Despliegue en Vercel

### Configuración Automática

El proyecto está configurado para desplegarse automáticamente en Vercel. El archivo `vercel.json` ya está configurado correctamente.

### Pasos para Desplegar

1. **Conecta tu repositorio a Vercel**
   - Ve a [vercel.com](https://vercel.com)
   - Importa tu repositorio de GitHub
   - Vercel detectará automáticamente que es un proyecto Vite

2. **Configuración del Build**
   - Build Command: `npm run build` (ya configurado)
   - Output Directory: `dist` (ya configurado)
   - Install Command: `npm install` (ya configurado)

3. **Variables de Entorno**
   - No se requieren variables de entorno adicionales

4. **Despliega**
   - Haz push a tu rama principal
   - Vercel desplegará automáticamente

### Archivo WASM

El archivo `sql-wasm.wasm` se copia automáticamente durante el build:

- Script `copy-wasm` se ejecuta antes del build
- El archivo se copia de `node_modules/sql.js/dist/` a `public/`
- Vite lo incluye automáticamente en el directorio `dist/`

### Verificación

Después del despliegue, verifica que:

1. La aplicación carga correctamente
2. No hay errores 404 para `sql-wasm.wasm`
3. La base de datos funciona (puedes agregar/editar productos)

### Solución de Problemas

#### Error 404 en sql-wasm.wasm

Si ves este error:
```
Failed to load resource: sql-wasm.wasm 404
```

**Solución:**
1. Verifica que el archivo existe en `public/sql-wasm.wasm`
2. Ejecuta `npm run copy-wasm` manualmente
3. Vuelve a hacer build: `npm run build`
4. Verifica que el archivo está en `dist/sql-wasm.wasm`

#### Error de CORS

Si ves errores de CORS, verifica que `vercel.json` tiene los headers correctos.

#### Base de datos no se inicializa

Si la base de datos no se inicializa:
1. Abre las herramientas de desarrollador (F12)
2. Ve a Console y busca errores
3. Verifica que localStorage está habilitado en el navegador

## Despliegue en Netlify

### Configuración

Crea un archivo `netlify.toml`:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[headers]]
  for = "/sql-wasm.wasm"
  [headers.values]
    Content-Type = "application/wasm"
    Cache-Control = "public, max-age=31536000, immutable"
```

### Pasos

1. Conecta tu repositorio a Netlify
2. Netlify detectará automáticamente la configuración
3. Despliega

## Despliegue en GitHub Pages

### Configuración

1. Actualiza `vite.config.ts` con la base URL:

```typescript
export default defineConfig({
  base: '/nombre-de-tu-repo/',
  // ... resto de la configuración
});
```

2. Crea un workflow de GitHub Actions (`.github/workflows/deploy.yml`):

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm install
      
      - name: Build
        run: npm run build
      
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

3. Habilita GitHub Pages en la configuración del repositorio

## Otros Servicios de Hosting

### Render

1. Conecta tu repositorio
2. Build Command: `npm run build`
3. Publish Directory: `dist`

### Railway

1. Conecta tu repositorio
2. Railway detectará automáticamente la configuración
3. Despliega

### Cloudflare Pages

1. Conecta tu repositorio
2. Build Command: `npm run build`
3. Build Output Directory: `dist`

## Notas Importantes

### Archivo WASM

- El archivo `sql-wasm.wasm` debe estar en el directorio `public/`
- Se copia automáticamente con `npm run copy-wasm`
- Se incluye automáticamente en el build
- Tamaño: ~800 KB

### Headers HTTP

Es importante que el servidor sirva el archivo WASM con el Content-Type correcto:
```
Content-Type: application/wasm
```

Esto está configurado en `vercel.json` para Vercel.

### Cache

El archivo WASM se puede cachear indefinidamente ya que no cambia:
```
Cache-Control: public, max-age=31536000, immutable
```

### Tamaño del Bundle

El bundle final incluye:
- React y dependencias: ~150 KB (gzipped)
- sql.js: ~15 KB (gzipped)
- sql-wasm.wasm: ~800 KB (comprimido por el servidor)
- Tu código: ~20 KB (gzipped)

Total: ~1 MB aproximadamente

## Verificación Post-Despliegue

Después de desplegar, verifica:

1. ✅ La página carga sin errores
2. ✅ No hay errores 404 en la consola
3. ✅ Puedes ver el catálogo de productos
4. ✅ Puedes hacer login
5. ✅ Puedes agregar/editar productos (como admin)
6. ✅ Los datos persisten al recargar la página

## Soporte

Si tienes problemas con el despliegue:

1. Revisa los logs del servicio de hosting
2. Verifica que `sql-wasm.wasm` está en el directorio de salida
3. Verifica los headers HTTP del archivo WASM
4. Abre las herramientas de desarrollador y busca errores en Console

---

**¡Tu aplicación está lista para producción!** 🚀
