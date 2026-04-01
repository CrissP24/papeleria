# Creciendo con Catalina - Sistema de Gestión de Útiles Escolares

🌱 **Creciendo con Catalina**

Sistema web integral para la gestión de productos, usuarios y catálogo de útiles escolares facilitadores para el aprendizaje. Desarrollado con tecnologías modernas para ofrecer una experiencia fluida tanto para administradores, vendedores y clientes.

## 🚀 Características Principales

- **Catálogo Público**: Visualización de útiles escolares con filtros por categoría y marca
- **Sistema de Autenticación**: Multi-rol con permisos diferenciados (Admin, Vendedor, Comprador)
- **Panel de Administración**: Gestión completa de productos, categorías, marcas y usuarios
- **Panel de Vendedor**: Acceso a catálogo y gestión de ventas
- **Base de Datos SQLite**: Persistencia de datos con SQLite para almacenamiento local
- **Diseño Responsive**: Interfaz adaptable a dispositivos móviles, tablets y desktop
- **Integración WhatsApp**: Contacto directo para consultas sobre productos
- **Interfaz Moderna**: Diseño profesional con animaciones y transiciones suaves

## 🛠️ Tecnologías Utilizadas

- **Frontend Framework**: React 18 con TypeScript
- **Build Tool**: Vite
- **Routing**: React Router DOM v6
- **Database**: SQLite en el navegador con sql.js (WebAssembly)
- **UI Components**: shadcn/ui + Radix UI
- **Styling**: Tailwind CSS
- **State Management**: React Context API + TanStack Query
- **Animations**: Framer Motion
- **Form Handling**: React Hook Form + Zod
- **Icons**: Lucide React

## 📋 Requisitos Previos

- Node.js 18+ 
- npm o bun como gestor de paquetes

## 🔧 Instalación

1. **Clonar el repositorio**
```sh
git clone <URL_DEL_REPOSITORIO>
cd creciendo-con-catalina
```

2. **Instalar dependencias**
```sh
npm install
# o con bun
bun install
```

3. **Iniciar el servidor de desarrollo**
```sh
npm run dev
# o con bun
bun dev
```

4. **Abrir en el navegador**
```
http://localhost:5173
```

## 📦 Scripts Disponibles

```json
{
  "dev": "Inicia el servidor de desarrollo",
  "build": "Compila para producción",
  "build:dev": "Compila para desarrollo",
  "lint": "Ejecuta el linter",
  "preview": "Previsualiza el build de producción",
  "test": "Ejecuta los tests",
  "test:watch": "Ejecuta los tests en modo watch"
}
```

## 💾 Base de Datos

Este proyecto utiliza SQLite en el navegador mediante sql.js (SQLite compilado a WebAssembly). La base de datos se almacena automáticamente en localStorage y se carga al iniciar la aplicación.

### Características de la Base de Datos

- Persistencia automática en localStorage
- SQLite completo funcionando en el navegador
- Sin necesidad de servidor backend
- Datos iniciales precargados (usuarios, productos, categorías, marcas)

Para más detalles sobre la base de datos, consulta [DATABASE.md](./DATABASE.md).

## 🗂️ Estructura del Proyecto

```
creciendo-con-catalina/
├── public/
│   └── robots.txt
├── src/
│   ├── components/        # Componentes reutilizables
│   │   ├── admin/        # Componentes del panel admin
│   │   └── ui/           # Componentes UI de shadcn
│   ├── context/          # Context providers
│   ├── hooks/            # Custom hooks
│   ├── lib/              # Utilidades
│   ├── pages/            # Páginas de la aplicación
│   ├── services/         # Servicios y lógica de negocio
│   ├── types/            # Definiciones de TypeScript
│   └── utils/            # Funciones auxiliares
├── index.html
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── vite.config.ts
```

## 👥 Roles de Usuario

### Administrador
- Gestión completa de productos (crear, editar, eliminar)
- Gestión de categorías y marcas
- Administración de usuarios
- Acceso a todas las funcionalidades

### Vendedor
- Visualización del catálogo completo
- Consulta de productos
- Gestión de ventas

### Comprador
- Acceso al catálogo de productos
- Filtrado por categorías y marcas
- Información detallada de productos

## 🎨 Personalización

### Tema y Estilos
Los estilos están centralizados en:
- `src/index.css` - Variables CSS y estilos globales
- `tailwind.config.ts` - Configuración de Tailwind

## 🚀 Despliegue

### Build de Producción
```sh
npm run build
```

Los archivos compilados se generarán en la carpeta `dist/`.

### Despliegue en Vercel (Recomendado)

1. Conecta tu repositorio a Vercel
2. Vercel detectará automáticamente la configuración
3. El archivo `vercel.json` ya está configurado
4. Despliega automáticamente con cada push

Ver [DEPLOYMENT.md](./DEPLOYMENT.md) para instrucciones detalladas y otros servicios de hosting.

### Archivo WASM Importante

El archivo `sql-wasm.wasm` se copia automáticamente durante el build. Si tienes problemas:

```sh
npm run copy-wasm
npm run build
```

## 🔐 Configuración de Seguridad

El sistema utiliza autenticación basada en roles. En un entorno de producción, se recomienda:
- Implementar backend con API REST o GraphQL
- Usar tokens JWT para autenticación
- Configurar HTTPS
- Implementar rate limiting
- Sanitizar inputs de usuario

## 📱 Contacto

- **WhatsApp**: [Contactar](https://wa.me/c/5493584015546)
- **Teléfono**: +54 9 358 401-5546

## 📄 Licencia

Este proyecto es privado y pertenece a Creciendo con Catalina.

---

**Desarrollado con ❤️ para Creciendo con Catalina 🌱**
