# ✅ Checklist - Migración a Supabase

## 📋 Estado Actual

### ✅ Completado (Ya está hecho)
- [x] Código actualizado para usar Supabase
- [x] Dependencia `@supabase/supabase-js` instalada
- [x] Archivo `src/lib/supabase.ts` creado
- [x] Archivo `src/services/supabase-storage.ts` creado
- [x] Archivo `src/services/storage.ts` actualizado
- [x] Variables de entorno en `.env.local`
- [x] Build exitoso sin errores
- [x] Todos los componentes actualizados
- [x] Hooks de React actualizados

### ⏳ Pendiente (Lo que tienes que hacer)

#### 1. Crear Tablas en Supabase
- [ ] Ir a https://supabase.com/dashboard/project/gpnablxgbcpvsvudnwjm/sql
- [ ] Click en "New query"
- [ ] Copiar el SQL de `supabase-schema.sql`
- [ ] Pegar en el editor
- [ ] Click en "RUN"
- [ ] Verificar: "Success. No rows returned"
- [ ] Ir a "Table Editor" y verificar que existen 4 tablas

#### 2. Configurar Variables en Vercel
- [ ] Ir a https://vercel.com/dashboard
- [ ] Seleccionar tu proyecto
- [ ] Settings > Environment Variables
- [ ] Agregar `VITE_SUPABASE_URL`
- [ ] Agregar `VITE_SUPABASE_ANON_KEY`
- [ ] Click en "Save"

#### 3. Desplegar a Vercel
- [ ] Ejecutar: `git add .`
- [ ] Ejecutar: `git commit -m "feat: Supabase integration"`
- [ ] Ejecutar: `git push origin main`
- [ ] Esperar a que Vercel termine de desplegar

#### 4. Probar en Producción
- [ ] Abrir tu sitio en Vercel
- [ ] Login: `admin@demo.com` / `123456`
- [ ] Agregar un producto de prueba
- [ ] Abrir en OTRO navegador/dispositivo
- [ ] Login como admin
- [ ] Verificar que se ve el producto

## 🎯 Resultado Esperado

Después de completar todos los pasos:

✅ Los datos se guardan en Supabase (PostgreSQL)
✅ Los datos se ven en TODOS los navegadores y dispositivos
✅ No más errores de "sql-wasm"
✅ No más "filter is not a function"
✅ No más pantallas en blanco
✅ No más 404 al recargar

## 📚 Documentos de Ayuda

- `INICIO_RAPIDO.md` - Guía super simple (3 pasos)
- `RESUMEN_FINAL.md` - Guía completa con detalles
- `PASOS_SUPABASE.md` - Guía paso a paso detallada
- `supabase-schema.sql` - SQL para crear tablas
- `test-supabase.html` - Herramienta de prueba

## 🔑 Credenciales

### Usuario Admin
```
Email: admin@demo.com
Password: 123456
```

### Supabase
```
URL: https://gpnablxgbcpvsvudnwjm.supabase.co
Anon Key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdwbmFibHhnYmNwdnN2dWRud2ptIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU3NzE2NzAsImV4cCI6MjA1MTM0NzY3MH0.vw-9SpxOc1rYRAHUj2ocEQ_B3aXr1RK
```

## ⏱️ Tiempo Estimado

- Paso 1: 5 minutos
- Paso 2: 3 minutos
- Paso 3: 2 minutos
- Paso 4: 2 minutos

**Total: ~12 minutos**

## 🆘 Problemas Comunes

### Error: "relation does not exist"
**Solución:** Ejecuta el SQL del Paso 1

### Error: "Failed to fetch"
**Solución:** Verifica las variables en Vercel (Paso 2)

### Pantalla en blanco
**Solución:** Abre la consola (F12) y revisa los errores

### No se ven los datos en otro navegador
**Solución:** Verifica que completaste los Pasos 1 y 2

---

## 🚀 Comando Rápido

```bash
# Después de completar Pasos 1 y 2
git add . && git commit -m "feat: Supabase integration" && git push origin main
```

---

**Marca cada casilla cuando la completes** ✅
