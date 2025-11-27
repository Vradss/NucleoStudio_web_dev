# Nucleo Studio

Aplicación web moderna y minimalista con estética tecnológica/futurista cuyo isotipo central es un cubo 🧊. El proyecto implementa una página de inicio inmersiva y un sistema de gestión de recursos digitales (intranet) mediante autenticación exclusiva de Google y el stack Next.js/Supabase.

## Características

- ⚡️ Next.js 14 con App Router
- 🔷 TypeScript
- 🎨 Tailwind CSS
- 🧩 Shadcn UI
- 🎭 GSAP para animaciones avanzadas
- 📜 Lenis para scroll suave
- 🔐 Autenticación con Google OAuth (Supabase)
- 💾 Supabase como BaaS (Base de datos, Storage, Auth)
- 🎬 Gestión de recursos digitales (Videos, Documentos, Templates)
- 👥 Sistema de roles (Admin/Usuario)

## Estructura del Proyecto

```
/src
  /app              # Rutas y páginas (App Router)
    /login          # Página de login
    /dashboard      # Dashboard principal
    /resources      # Gestión de recursos
    /admin          # Panel de administración
  /components       # Componentes reutilizables
    /hero           # Componentes del Hero
    /auth           # Componentes de autenticación
    /resources      # Componentes de recursos
    /admin          # Componentes de administración
    /layout         # Componentes de layout
  /lib              # Utilidades y helpers
    /supabase       # Cliente de Supabase
  /hooks            # Custom hooks
  /types            # Tipos TypeScript
```

## Configuración Inicial

### 1. Instalar dependencias

```bash
npm install
```

### 2. Configurar Supabase

1. Crea un proyecto en [Supabase](https://supabase.com)
2. Obtén tu `NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Configura Google OAuth en Supabase Dashboard:
   - Ve a Authentication > Providers
   - Habilita Google OAuth
   - Configura las credenciales de Google OAuth

### 3. Configurar variables de entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```env
NEXT_PUBLIC_SUPABASE_URL=tu_url_de_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key
SUPABASE_SERVICE_ROLE_KEY=tu_service_role_key
```

### 4. Configurar Base de Datos

1. Ve al SQL Editor en Supabase Dashboard
2. Ejecuta el script `supabase-setup.sql` que está en la raíz del proyecto
3. Crea un bucket de storage llamado `resources` en Supabase Storage
4. Configura las políticas de acceso del bucket según tus necesidades

### 5. Configurar Usuario Admin

Después de crear tu primer usuario, actualiza su rol a 'admin' en la tabla `users`:

```sql
UPDATE public.users SET role = 'admin' WHERE email = 'tu-email@ejemplo.com';
```

## Inicio Rápido

1. Instalar dependencias:
```bash
npm install
```

2. Ejecutar en desarrollo:
```bash
npm run dev
```

3. Abrir [http://localhost:3000](http://localhost:3000) en el navegador.

## Convenciones

- Componentes en `src/components` con nombres en formato `kebab-case` (ej: `new-component.tsx`)
- Preferir componentes funcionales con TypeScript
- Usar interfaces en lugar de types
- Minimizar el uso de `use client` - favorecer Server Components
- Usar `nuqs` para gestión de estado en URL
- Optimizar imágenes con formato WebP

## Componentes Principales

### Hero Section
- **CubePattern**: Patrón de cubos animados con GSAP
- **ParallaxBoxes**: Cuadros con efecto parallax
- **ImageCarousel**: Carrusel de imágenes con parallax
- **AnimatedIcons**: Iconos SVG con animaciones de path changes

### Autenticación
- Login con Google OAuth
- Protección de rutas con middleware
- Sistema de roles (admin/usuario)

### Gestión de Recursos
- Visualización de videos
- Descarga de documentos y templates
- Panel de administración para subir/gestionar recursos

## Stack Tecnológico

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS, Shadcn UI
- **Animaciones**: GSAP, Lenis
- **Backend**: Supabase (Auth, Database, Storage)
- **Autenticación**: Google OAuth

## Licencia

MIT
