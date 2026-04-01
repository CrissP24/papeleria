# Configuración de Supabase

## ✅ Paso 1: Crear las Tablas

1. Ve a tu proyecto en Supabase: https://supabase.com/dashboard
2. Click en "SQL Editor" en el menú lateral
3. Copia y pega el contenido del archivo `supabase-schema.sql`
4. Click en "Run" para ejecutar el SQL

## ✅ Paso 2: Obtener las Credenciales

1. Ve a "Settings" > "API" en tu proyecto de Supabase
2. Copia estos valores:

   - **Project URL**: `https://gpnablxgbcpvsvudnwjm.supabase.co`
   - **anon/public key**: (copia la clave que dice "anon" o "public")

## ✅ Paso 3: Configurar Variables de Entorno

### Para Desarrollo Local:

Actualiza el archivo `.env.local` con tus credenciales:

```
VITE_SUPABASE_URL=https://gpnablxgbcpvsvudnwjm.supabase.co
VITE_SUPABASE_ANON_KEY=tu_anon_key_aqui
```

### Para Vercel (Producción):

1. Ve a tu proyecto en Vercel
2. Settings > Environment Variables
3. Agrega estas variables:

```
VITE_SUPABASE_URL = https://gpnablxgbcpvsvudnwjm.supabase.co
VITE_SUPABASE_ANON_KEY = tu_anon_key_aqui
```

## ✅ Paso 4: Probar Localmente

```bash
npm run dev
```

Abre http://localhost:8080 y verifica que:
- Puedes hacer login
- Puedes ver productos
- Puedes agregar/editar productos
- Los cambios se guardan en Supabase

## ✅ Paso 5: Desplegar a Vercel

```bash
git add .
git commit -m "feat: Migrate to Supabase for shared data"
git push origin main
```

Vercel desplegará automáticamente.

## 🔍 Verificar que Funciona

1. Abre tu sitio en Vercel
2. Agrega un producto
3. Abre el sitio en otro navegador o dispositivo
4. ✅ Deberías ver el mismo producto

## 📊 Ver los Datos en Supabase

1. Ve a "Table Editor" en Supabase
2. Selecciona una tabla (products, categories, etc.)
3. Verás todos los datos en tiempo real

## 🎯 Ventajas de Supabase

- ✅ Datos compartidos entre todos los dispositivos
- ✅ Datos persistentes y seguros
- ✅ Backups automáticos
- ✅ Puedes ver/editar datos desde el dashboard
- ✅ API REST automática
- ✅ Tiempo real (los cambios se ven instantáneamente)

## 🔐 Seguridad

Las políticas actuales permiten acceso completo. Para producción, deberías:

1. Implementar autenticación real de Supabase
2. Configurar Row Level Security (RLS) apropiado
3. Restringir acceso según roles

## 🆘 Solución de Problemas

### Error: "Invalid API key"
- Verifica que copiaste la clave correcta de Settings > API
- Debe ser la clave "anon" o "public", NO la "service_role"

### Error: "relation does not exist"
- Las tablas no se crearon correctamente
- Ejecuta el SQL del archivo `supabase-schema.sql` nuevamente

### No veo los datos
- Verifica que las variables de entorno están configuradas
- Revisa la consola del navegador (F12) para errores
- Verifica que las tablas existen en Supabase

## 📝 Próximos Pasos

Una vez que funcione:

1. ✅ Los datos se compartirán entre dispositivos
2. ✅ Puedes agregar productos desde cualquier lugar
3. ✅ Los cambios se ven en tiempo real
4. ✅ Los datos están seguros en la nube

---

**¿Necesitas ayuda?** Revisa los logs en:
- Navegador: F12 > Console
- Supabase: Logs en el dashboard
- Vercel: Deployment logs
