# Quotation Configuration - Frontend

Interfaz administrativa moderna y responsive para gestionar la configuración de márgenes de cotización. Construida con Next.js 16, Apollo Client y TailwindCSS.

---

## 📦 Ubicación de Entregables (Frontend)

### 3️⃣ Componentes React (Tabla de Márgenes)

**Componente principal de la tabla:**

| Componente | Ubicación | Descripción |
|------------|-----------|-------------|
| **Tabla principal** | [`modules/margin-config/components/table/margin-table.tsx`](./modules/margin-config/components/table/margin-table.tsx) | Tabla completa con agrupación |
| **Grupo por tipo** | [`modules/margin-config/components/table/client-type-group.tsx`](./modules/margin-config/components/table/client-type-group.tsx) | Agrupación expandible/colapsable |
| **Header del grupo** | [`modules/margin-config/components/table/client-type-header.tsx`](./modules/margin-config/components/table/client-type-header.tsx) | Header con botón expandir/colapsar |
| **Fila tipo (grupo)** | [`modules/margin-config/components/table/client-type-margin-row.tsx`](./modules/margin-config/components/table/client-type-margin-row.tsx) | Fila del tipo de cliente |
| **Fila de cliente** | [`modules/margin-config/components/table/client-row.tsx`](./modules/margin-config/components/table/client-row.tsx) | Fila individual con datos del cliente |
| **Celda editable** | [`modules/margin-config/components/table/margin-cell.tsx`](./modules/margin-config/components/table/margin-cell.tsx) | Celda de margen con edición inline |
| **Panel contenedor** | [`modules/margin-config/components/margin-panel.tsx`](./modules/margin-config/components/margin-panel.tsx) | Panel que envuelve la tabla |

**Hooks de lógica:**
- [`modules/margin-config/hooks/use-margin-config.ts`](./modules/margin-config/hooks/use-margin-config.ts) - Orquestador principal
- [`modules/margin-config/hooks/use-margin-draft.ts`](./modules/margin-config/hooks/use-margin-draft.ts) - Gestión del draft y userEdits
- [`modules/margin-config/hooks/use-save-margin.ts`](./modules/margin-config/hooks/use-save-margin.ts) - Lógica de guardado con Apollo
- [`modules/margin-config/hooks/use-client-actions.ts`](./modules/margin-config/hooks/use-client-actions.ts) - CRUD de clientes

**Diálogos/Modales:**
- [`modules/margin-config/components/dialogs/create-client-dialog.tsx`](./modules/margin-config/components/dialogs/create-client-dialog.tsx) - Modal para crear cliente
- [`modules/margin-config/components/dialogs/edit-client-dialog.tsx`](./modules/margin-config/components/dialogs/edit-client-dialog.tsx) - Modal para editar cliente

**Toolbar:**
- [`modules/margin-config/components/toolbar/plant-selector.tsx`](./modules/margin-config/components/toolbar/plant-selector.tsx) - Selector de planta
- [`modules/margin-config/components/toolbar/save-toolbar.tsx`](./modules/margin-config/components/toolbar/save-toolbar.tsx) - Botón guardar con badge

**Página principal:**
- [`app/page.tsx`](./app/page.tsx) - Orquesta todos los componentes

**Características implementadas:**
- ✅ Tabla agrupada por tipo de cliente (expandible/colapsable)
- ✅ Edición inline de márgenes (click → editar → Enter/Esc)
- ✅ Alertas visuales para márgenes ≤ 5% (color rojo)
- ✅ 8 columnas de rangos de volumen (300kg, 500kg, 1T, 3T, 5T, 10T, 20T, 30T)
- ✅ Crear y editar clientes con modales
- ✅ Selector de tipo de cliente con "Sin tipo de cliente"
- ✅ Selector de planta
- ✅ Botón guardar sticky (siempre visible)
- ✅ Badge "Sin guardar" cuando hay cambios pendientes
- ✅ Toasts con Sonner para feedback
- ✅ Responsive (mobile, tablet, desktop)
- ✅ Optimizaciones: cache-first, refetch inteligente

---

### 4️⃣ Instrucciones para Correr el Proyecto (Frontend)

**README completo:** [`README.md`](./README.md) (este archivo)

**Quick Start:**

```bash
# 1. Instalar dependencias
pnpm install

# 2. Configurar variables de entorno
cp .env.example .env.local
# Editar .env.local:
# NEXT_PUBLIC_GRAPHQL_URL=http://localhost:4000/api-v1/graphql

# 3. Iniciar el servidor de desarrollo
pnpm dev

# 4. Abrir en navegador
# http://localhost:3000
```

**Secciones importantes del README:**
- [Variables de entorno](#variables-de-entorno)
- [Instalación y ejecución](#instalación-y-ejecución)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Arquitectura y patrones](#arquitectura-y-patrones)
- [Optimizaciones](#optimizaciones)
- [Decisiones técnicas](#decisiones-técnicas)

**Requisito previo:**
- El backend GraphQL debe estar corriendo en `http://localhost:4000`
- Ver: [Backend README](https://github.com/JavierLQR/quotation-config-assessment#-ubicación-de-entregables-backend)

---

## 📋 Tabla de contenidos

- [Ubicación de Entregables (Frontend)](#-ubicación-de-entregables-frontend)
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
- [Scripts disponibles](#scripts-disponibles)
- [Troubleshooting](#troubleshooting)
- [Git Workflow y Branching Strategy](#git-workflow-y-branching-strategy)

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
- **Backend GraphQL corriendo** en `http://localhost:4000` (ver [Backend README](https://github.com/JavierLQR/quotation-config-assessment))

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

### ¿Por qué Next.js 16 con App Router?

- **Server Components** por defecto → Mejor performance
- **Client Components** solo donde se necesita interactividad
- **Routing basado en archivos** → Más intuitivo
- **Built-in optimization** → Imágenes, fonts, código
- **React 19** → Últimas características de React

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

## Git Workflow y Branching Strategy

### Convención de Branching

Este proyecto frontend sigue la misma estrategia de Git Flow que el backend:

#### Branches principales:

- **`main`** — Código en producción (solo merges desde `staging` después de QA)
- **`staging`** — Pre-producción para QA y testing final
- **`develop`** — Integración continua de features (branch de desarrollo activo)

#### Estrategia de promoción:

```
┌─────────────┐
│   develop   │  ← PRs desde feature/* (desarrollo activo)
└──────┬──────┘
       │ merge (cuando se completa sprint/milestone)
       ↓
┌─────────────┐
│   staging   │  ← Testing y QA
└──────┬──────┘
       │ merge (solo después de QA OK)
       ↓
┌─────────────┐
│    main     │  ← Producción (código estable + deployment)
└─────────────┘
```

**Reglas importantes:**

- ✅ Features se crean desde `develop`: `git checkout -b feature/xxx develop`
- ✅ PRs de features van hacia `develop`, **nunca directo a main o staging**
- ✅ `develop` → `staging`: Merge cuando se completa un sprint o milestone
- ✅ `staging` → `main`: Merge **solo después** de QA aprobado
- ❌ NUNCA hacer merge directo de feature → main
- ❌ NUNCA hacer commits directos en `main`, `staging` o `develop`
- ❌ NUNCA hacer `git push --force` en branches principales

#### Branches de trabajo:

```
feature/<nombre-descriptivo>    # Nuevas funcionalidades UI/UX
fix/<nombre-del-bug>            # Corrección de bugs
refactor/<area>                 # Refactorización de componentes
chore/<tarea>                   # Mantenimiento (deps, config, etc.)
style/<componente>              # Ajustes de estilos/diseño
```

#### Ejemplos reales de este proyecto frontend:

```bash
feature/margin-table            # Tabla editable de márgenes
feature/client-dialogs          # Diálogos de crear/editar cliente
feature/plant-selector          # Selector de plantas
feature/responsive-design       # Adaptación responsive
fix/cache-update-bug            # Fix del bug de caché de Apollo
refactor/hooks-modularity       # Separación de hooks
style/mobile-improvements       # Mejoras visuales mobile
chore/upgrade-nextjs            # Upgrade a Next.js 16
```

---

### Mantener Branch Actualizado con Develop

#### Estrategia recomendada: **Rebase con develop**

```bash
# 1. Estando en tu feature branch
git checkout feature/margin-table

# 2. Traer últimos cambios de develop
git fetch origin develop

# 3. Rebase interactivo
git rebase origin/develop

# 4. Si hay conflictos, resolverlos y continuar
git add .
git rebase --continue

# 5. Forzar push (solo en branches personales)
git push --force-with-lease origin feature/margin-table
```

#### Workflow completo con develop → staging → main:

```bash
# ──────────────────────────────────────────────────────────
# Día 1: Crear feature branch desde develop
# ──────────────────────────────────────────────────────────
git checkout develop
git pull origin develop
git checkout -b feature/margin-table

# ... trabajar en componentes React ...
git add .
git commit -m "feat: add MarginTable component with inline editing"
git push origin feature/margin-table

# ──────────────────────────────────────────────────────────
# Día 2: Actualizar con cambios de develop
# ──────────────────────────────────────────────────────────
git fetch origin develop
git rebase origin/develop
git push --force-with-lease origin feature/margin-table

# ──────────────────────────────────────────────────────────
# Día 3: Feature completa - PR hacia develop
# ──────────────────────────────────────────────────────────
git fetch origin develop
git rebase origin/develop
pnpm lint    # Verificar linting
pnpm build   # Verificar que compila
git push --force-with-lease origin feature/margin-table
# Crear Pull Request: feature/margin-table → develop

# ──────────────────────────────────────────────────────────
# Después del merge a develop: Deploy a staging
# ──────────────────────────────────────────────────────────
git checkout staging
git pull origin staging
git merge develop
git push origin staging
# Vercel/CI despliega automáticamente a https://staging.app.com

# ──────────────────────────────────────────────────────────
# Después de QA en staging: Deploy a producción
# ──────────────────────────────────────────────────────────
git checkout main
git pull origin main
git merge staging
git tag -a v1.2.0 -m "Release v1.2.0: Margin configuration UI"
git push origin main --tags
# Vercel/CI despliega automáticamente a https://app.com
```

---

### Manejo de Conflictos en Componentes React

#### Escenario común en frontend:

Dos desarrolladores editando el mismo componente o hook:

- **Developer A (tú):** Agregando funcionalidad de edición inline
- **Developer B:** Agregando funcionalidad de filtros

#### Ejemplo: Conflicto en `use-margin-config.ts`

**Conflicto durante rebase:**

```typescript
<<<<<<< HEAD (develop - Developer B)
// Developer B agregó filtros
const [filters, setFilters] = useState({ clientType: null, search: '' });

const filteredRows = useMemo(() => {
  return clientTypeRows.filter(row => 
    !filters.clientType || row.clientType.id === filters.clientType
  );
}, [clientTypeRows, filters]);
=======
// Tú agregaste draft management
const { draft, userEdits, updateMargin, resetDraft, hasChanges } =
  useMarginDraft(margins);

const handleSave = useCallback(async () => {
  await save(userEdits);
}, [save, userEdits]);
>>>>>>> feature/margin-table
```

**Resolución: Combinar ambas funcionalidades:**

```typescript
// ✅ Ambos cambios son compatibles, incluir ambos
const [filters, setFilters] = useState({ clientType: null, search: '' });

const { draft, userEdits, updateMargin, resetDraft, hasChanges } =
  useMarginDraft(margins);

const filteredRows = useMemo(() => {
  return clientTypeRows.filter(row => 
    !filters.clientType || row.clientType.id === filters.clientType
  );
}, [clientTypeRows, filters]);

const handleSave = useCallback(async () => {
  await save(userEdits);
}, [save, userEdits]);
```

```bash
git add modules/margin-config/hooks/use-margin-config.ts
git rebase --continue
pnpm lint && pnpm build  # Verificar que todo funciona
git push --force-with-lease origin feature/margin-table
```

---

### Prevención de Conflictos en Frontend

#### 1. **Modularidad de componentes:**

```
✅ Bueno: Cada dev en su propio componente
Developer A → margin-table.tsx
Developer B → filter-panel.tsx

❌ Malo: Ambos editando el mismo archivo
Developer A → page.tsx (líneas 1-100)
Developer B → page.tsx (líneas 50-150) ← ¡Conflicto seguro!
```

#### 2. **Atomic Design para componentes:**

```
shared/components/ui/     ← Componentes base (button, input)
modules/margin-config/    ← Feature-specific components
  ├── table/              ← Sub-componentes de tabla
  └── dialogs/            ← Sub-componentes de diálogos
```

Esto reduce conflictos porque cada dev trabaja en su carpeta específica.

#### 3. **Comunicación para shared hooks:**

```bash
# Si vas a modificar un hook compartido, avisar:
"Voy a refactorizar use-margin-config.ts"

# Otros devs esperan o coordinan para no causar conflictos
```

---

### Deployment Automático con Vercel

#### Setup recomendado:

```yaml
# vercel.json (o configuración en dashboard)
{
  "git": {
    "deploymentEnabled": {
      "main": true,      # → https://app.com
      "staging": true,   # → https://staging.app.com
      "develop": true    # → https://dev.app.com
    }
  }
}
```

**Flujo de deployment:**

- Push a `develop` → Auto-deploy a `https://dev.app.com`
- Push a `staging` → Auto-deploy a `https://staging.app.com`
- Push a `main` → Auto-deploy a `https://app.com` (producción)

---

### Best Practices Específicas del Frontend

✅ **Lint antes de push:** `pnpm lint` siempre antes de crear PR  
✅ **Build verification:** `pnpm build` para verificar que no hay errores de TypeScript  
✅ **Component isolation:** Cada feature en su carpeta de módulo  
✅ **Shared components stable:** No modificar `shared/ui/` sin consenso del equipo  
✅ **Tailwind classes:** Usar utilidades de Tailwind, evitar CSS custom que cause conflictos  
✅ **TypeScript strict:** Nunca usar `any`, siempre tipar correctamente  
✅ **Hooks modulares:** Un hook = una responsabilidad (fácil de mantener sin conflictos)

---

## Licencia

MIT

---

## Autor

Desarrollado como assessment técnico para Laik Tech
