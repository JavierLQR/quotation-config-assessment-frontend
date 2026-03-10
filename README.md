# Quotation Configuration - Frontend

Interfaz administrativa moderna y responsive para gestionar la configuración de márgenes de cotización. Construida con Next.js 15, Apollo Client y TailwindCSS.

---

## 📋 Tabla de contenidos

- [Descripción general](#descripción-general)
- [Stack tecnológico](#stack-tecnológico)
- [Características principales](#características-principales)
- [Requisitos previos](#requisitos-previos)
- [Variables de entorno](#variables-de-entorno)
- [Instalación y ejecución](#instalación-y-ejecución)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Arquitectura y patrones](#arquitectura-y-patrones)
- [Optimizaciones](#optimizaciones)
- [Decisiones técnicas](#decisiones-técnicas)

---

## Descripción general

Aplicación web administrativa que permite:

- 🏭 **Seleccionar plantas** para configurar márgenes específicos
- 📊 **Visualizar márgenes** agrupados por tipo de cliente en tabla editable
- ✏️ **Editar márgenes inline** con validación en tiempo real
- ⚠️ **Alertas visuales** para márgenes críticos (≤ 5%)
- 👥 **Gestionar clientes** (crear, editar, asignar tipo)
- 🔄 **Soportar clientes sin tipo** en sección dedicada "Sin tipo de cliente"
- 💾 **Guardar cambios** con feedback visual y optimización de red
- 📱 **Diseño responsive** adaptado a mobile, tablet y desktop

---

## Stack tecnológico

| Capa | Tecnología | Versión |
|------|-----------|---------|
| Framework | [Next.js](https://nextjs.org/) | 16.1.6 |
| Routing | App Router | - |
| Lenguaje | TypeScript | 5.x |
| Runtime | React | 19.2.3 |
| GraphQL Client | [Apollo Client](https://www.apollographql.com/docs/react/) | 4.1.6 |
| GraphQL | [GraphQL](https://graphql.org/) | 16.13.1 |
| Styling | [Tailwind CSS](https://tailwindcss.com/) | 4.x |
| UI Components | [Radix UI](https://www.radix-ui.com/) | 2.x |
| - Dialog | @radix-ui/react-dialog | 1.1.15 |
| - Select | @radix-ui/react-select | 2.2.6 |
| - Label | @radix-ui/react-label | 2.1.8 |
| - Slot | @radix-ui/react-slot | 1.2.4 |
| Component Library | [Shadcn/ui](https://ui.shadcn.com/) | 4.0.2 |
| Notifications | [Sonner](https://sonner.emilkowal.ski/) | 2.0.7 |
| Validación | [Zod](https://zod.dev/) | 4.3.6 |
| Icons | [Lucide React](https://lucide.dev/) | 0.577.0 |
| Icons Alt | [Huge Icons](https://hugeicons.com/) | 4.0.0 |
| Class utilities | clsx | 2.1.1 |
| Class utilities | class-variance-authority | 0.7.1 |
| Class utilities | tailwind-merge | 3.5.0 |
| Animations | tw-animate-css | 1.4.0 |
| Node.js | Node.js | >= 20 |
| Package manager | pnpm | >= 9 |

---

## Características principales

### 📊 Tabla editable dinámica

- **Agrupación por tipo de cliente** con filas expandibles/colapsables
- **Edición inline** de márgenes con Enter para confirmar, Esc para cancelar
- **8 rangos de volumen**: 300kg, 500kg, 1T, 3T, 5T, 10T, 20T, 30T
- **Validación en tiempo real** con alertas visuales para márgenes ≤ 5%
- **Columnas sticky** para scroll horizontal sin perder contexto
- **Estados visuales** diferenciados (sin configurar, normal, advertencia, crítico)

### 🔄 Gestión de clientes

- **Crear clientes** con modal moderno y validación Zod
- **Editar clientes existentes** (nombre, tipo, precio base, vinculación)
- **Selector de tipo de cliente** con opción "Sin tipo de cliente"
- **Asignación de precio base propio** (opcional, sobreescribe el del tipo)
- **Estrategia de vinculación**: Por estructura / No vincular
- **Botones contextuales** (+ para agregar, lápiz para editar)

### 💾 Sistema de guardado inteligente

- **Botón sticky** siempre visible en el header
- **Badge "Sin guardar"** cuando hay cambios pendientes
- **Solo envía cambios modificados** (optimización de red)
- **Toasts informativos** con Sonner (éxito/error)
- **Sin skeleton al refetch** para UX fluida
- **Loading spinner** en el botón durante guardado

### 🚀 Optimizaciones de performance

- **Cache-first de Apollo Client** → Cambio de planta instantáneo
- **Refetch automático** solo después de guardar (con `refetchQueries`)
- **Estado derivado con `useMemo`** para evitar recálculos innecesarios
- **Hooks modulares** separados por responsabilidad
- **Lazy queries** para datos bajo demanda
- **Flag `hasLoadedData`** para diferenciar carga inicial vs refetch

### 📱 Diseño responsive

- **Mobile-first approach** con breakpoints adaptativos
- **Header fijo** con selector de planta y botón guardar
- **Scroll horizontal** en tabla con columnas sticky
- **Diálogos adaptables** con layout mobile/desktop
- **Tipografía escalable** y espaciado responsive

---

## Requisitos previos

- **Node.js** >= 20 — [descargar](https://nodejs.org/)
- **pnpm** >= 9 — `npm install -g pnpm`
- **Backend GraphQL corriendo** en `http://localhost:4000` (ver [backend README](../laik-tech/README.md))

---

## Variables de entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```bash
NEXT_PUBLIC_GRAPHQL_URL=http://localhost:4000/api-v1/graphql
```

> **Nota**: La variable debe empezar con `NEXT_PUBLIC_` para estar disponible en el cliente.

---

## Instalación y ejecución

### Primera vez (setup completo)

```bash
# 1. Instalar dependencias
pnpm install

# 2. Configurar variables de entorno
cp .env.example .env.local
# Edita .env.local si tu backend corre en otro puerto

# 3. Iniciar el servidor de desarrollo
pnpm dev
```

La aplicación estará disponible en: **http://localhost:3000**

### Ejecución en días siguientes

```bash
# Asegúrate de que el backend esté corriendo primero
# Luego inicia el frontend:
pnpm dev
```

### Build para producción

```bash
# Compilar
pnpm build

# Iniciar en modo producción
pnpm start
```

---

## Estructura del proyecto

```
laik-tech-frontend/
├── app/
│   ├── layout.tsx              # Root layout con providers
│   ├── page.tsx                # Página principal (orquesta componentes)
│   ├── globals.css             # Estilos globales + Tailwind
│   └── providers/
│       └── apollo-client.tsx   # Apollo Client setup con cache
│
├── modules/                    # Módulos por feature
│   ├── margin-config/
│   │   ├── components/
│   │   │   ├── dialogs/        # CreateClientDialog, EditClientDialog
│   │   │   │   ├── create-client-dialog.tsx
│   │   │   │   └── edit-client-dialog.tsx
│   │   │   ├── table/          # Componentes de tabla
│   │   │   │   ├── margin-table.tsx
│   │   │   │   ├── client-type-group.tsx
│   │   │   │   ├── client-type-header.tsx
│   │   │   │   ├── client-type-margin-row.tsx
│   │   │   │   ├── client-row.tsx
│   │   │   │   └── margin-cell.tsx
│   │   │   ├── toolbar/        # Controles superiores
│   │   │   │   ├── plant-selector.tsx
│   │   │   │   └── save-toolbar.tsx
│   │   │   └── margin-panel.tsx
│   │   │
│   │   ├── graphql/
│   │   │   ├── queries.ts      # GET_MARGINS_BY_PLANT
│   │   │   └── mutations.ts    # SAVE_PLANT_CONFIG
│   │   │
│   │   ├── hooks/
│   │   │   ├── use-margin-config.ts    # Hook principal (orquestador)
│   │   │   ├── use-margin-draft.ts     # Gestión del draft + userEdits
│   │   │   ├── use-save-margin.ts      # Lógica de guardado
│   │   │   └── use-client-actions.ts   # CRUD de clientes
│   │   │
│   │   └── types/              # Interfaces TypeScript
│   │       ├── index.ts
│   │       ├── margin.types.ts
│   │       └── client-actions.types.ts
│   │
│   ├── plants/graphql/         # Queries de plantas
│   ├── clients/graphql/        # Mutations de clientes
│   └── client-types/graphql/   # Queries de tipos de cliente
│
├── shared/
│   ├── components/
│   │   ├── layout/             # PageHeader, ContextBar, EmptyState
│   │   └── ui/                 # Shadcn/ui components
│   │       ├── button.tsx
│   │       ├── select.tsx
│   │       ├── dialog.tsx
│   │       ├── input.tsx
│   │       ├── label.tsx
│   │       └── badge.tsx
│   │
│   └── types/
│       ├── entities.ts         # Client, Plant, ClientType, MarginConfig
│       └── enums.ts            # VolumeRange, PricingStrategy
│
├── lib/
│   └── utils.ts                # Helpers (cn, clsx, etc)
│
├── tailwind.config.ts          # Configuración Tailwind + tema Shadcn
├── tsconfig.json               # TypeScript strict mode
├── next.config.ts              # Next.js config
└── .env.local                  # Variables de entorno (no commitear)
```

---

## Arquitectura y patrones

### 🎯 Separación de responsabilidades

```
Page (app/page.tsx)
  │
  ├─→ useMarginConfig()          # Hook principal (state management)
  │     ├─→ useMarginDraft()     # Gestión del draft local
  │     └─→ useSaveMargin()      # Lógica de guardado
  │
  ├─→ useClientActions()         # CRUD de clientes
  │
  └─→ Componentes presentacionales
        ├─→ MarginPanel
        ├─→ CreateClientDialog
        └─→ EditClientDialog
```

### 📦 Módulos por feature

Cada feature (margin-config, plants, clients) tiene su propia carpeta con:
- `components/` - UI components
- `graphql/` - Queries y mutations
- `hooks/` - Lógica reutilizable
- `types/` - Interfaces TypeScript

### 🔄 Estado derivado

En lugar de múltiples `useState`, usamos `useMemo` para calcular estado derivado:

```typescript
const clientTypeRows = useMemo(() => {
  // Agrupa clientes por tipo
  // Crea grupo "Sin tipo de cliente" si hay clientes sin tipo
  return [...];
}, [clientTypes, allClients]);
```

### 🎨 Componentes "dumb" vs "smart"

- **Dumb components** (`margin-cell.tsx`, `client-row.tsx`) → Solo presentación, reciben props
- **Smart components** (`page.tsx`) → Manejan estado y lógica, orquestan dumb components

---

## Optimizaciones

### 🚀 Apollo Client Cache

```typescript
// use-margin-config.ts
const [fetchMargins] = useLazyQuery(GET_MARGINS_BY_PLANT, {
  fetchPolicy: 'cache-first', // ← Usa caché cuando disponible
});
```

**Beneficios:**
- Primera visita a planta → Fetch desde red
- Vuelta a planta ya visitada → **Instantáneo** desde caché
- Guardado → Refetch forzado actualiza caché

### 💾 Solo envía cambios modificados

```typescript
// use-margin-draft.ts
const userEdits = {} // Solo márgenes editados

// use-save-margin.ts
await save(userEdits) // ← No envía todo el draft
```

**Beneficios:**
- Menos datos en la red
- Backend procesa menos
- Guardado más rápido

### 🎭 Sin skeleton al refetch

```typescript
const [hasLoadedData, setHasLoadedData] = useState(false);

// Solo muestra skeleton si NO ha cargado datos aún
marginsLoading: marginsLoading && !hasLoadedData
```

**Beneficios:**
- UX fluida al guardar
- Skeleton solo en carga inicial

### ⚡ Hooks modulares

Cada hook tiene una responsabilidad única:
- `useMarginConfig` → Orquestador principal
- `useMarginDraft` → Estado local del draft
- `useSaveMargin` → Lógica de guardado
- `useClientActions` → CRUD de clientes

**Beneficios:**
- Fácil de testear
- Reutilizable
- Mantenible

---

## Decisiones técnicas

### ¿Por qué Next.js 15 con App Router?

- **Server Components** por defecto → Mejor performance
- **Client Components** solo donde se necesita interactividad
- **Routing basado en archivos** → Más intuitivo
- **Built-in optimization** → Imágenes, fonts, código

### ¿Por qué Apollo Client?

- **Cache normalizado** → Evita re-fetches innecesarios
- **Optimistic UI** → Mejor UX
- **DevTools** → Debugging del cache y queries
- **TypeScript support** → Type-safe queries/mutations

### ¿Por qué Shadcn/ui en lugar de MUI/Chakra?

- **Ownership del código** → Los componentes están en tu proyecto
- **Personalización total** → No limitado por API de librería
- **Bundle size** → Solo importas lo que usas
- **Tailwind-first** → Consistente con el resto del proyecto

### ¿Por qué Sonner para toasts?

- **Beautiful by default** → Diseño moderno sin config
- **Lightweight** → ~3KB
- **Accessible** → ARIA compliant
- **Simple API** → `toast.success('Mensaje')`

### ¿Por qué separar draft y userEdits?

- **draft** = Estado completo de la tabla (incluye datos del servidor + edits)
- **userEdits** = Solo lo modificado por el usuario

**Ventaja:** Al guardar, solo enviamos `userEdits` → Optimización de red

---

## Scripts disponibles

```bash
pnpm dev          # Desarrollo con hot-reload
pnpm build        # Build para producción
pnpm start        # Servidor de producción
pnpm lint         # ESLint
pnpm type-check   # TypeScript check sin emitir archivos
```

---

## Troubleshooting

### El frontend no conecta con el backend

1. Verifica que el backend esté corriendo en `http://localhost:4000`
2. Revisa la variable de entorno `NEXT_PUBLIC_GRAPHQL_URL` en `.env.local`
3. Abre DevTools → Network → Verifica que las llamadas GraphQL lleguen al endpoint correcto

### Los cambios no se guardan

1. Abre DevTools → Console → Revisa logs de `🔍 Saving margins:` y `✅ Refetch completed`
2. Verifica que el backend esté respondiendo correctamente
3. Revisa que `userEdits` contenga los cambios esperados

### El caché de Apollo no se actualiza

1. Verifica que `refetchQueries` esté configurado en `useSaveMargin`
2. Abre Apollo DevTools → Verifica el estado del caché
3. Como último recurso, limpia el caché: `client.clearStore()`

---

## Próximas mejoras

- [ ] Tests unitarios con Jest + React Testing Library
- [ ] Tests E2E con Playwright
- [ ] Storybook para documentar componentes
- [ ] Skeleton loader más específico (por filas)
- [ ] Paginación en la tabla (si hay muchos clientes)
- [ ] Filtros por tipo de cliente
- [ ] Búsqueda de clientes
- [ ] Exportar configuración a Excel/CSV
- [ ] Historial de cambios (audit log)
- [ ] Permisos por usuario

---

## Licencia

MIT

---

## Autor

Desarrollado como assessment técnico para Laik Tech
