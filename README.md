# TEPPEN MEO 2025 Architecture Overview

## Product Vision
TEPPEN MEO helps Japanese store owners handle every part of their social media work from one place. The app lets teams plan posts, answer comments, check analytics, and keep every platform in sync without jumping between tabs.

## Frontend Architecture
- **UI Framework**: Next.js 14 with the App Router. It gives us file-based routing, built-in data fetching, and smooth server-side rendering for fast first loads in Japan.
- **Component Library**: shadcn/ui components wrapped with custom business wrappers. They blend well with Material Design tokens and are easy to extend.
- **Styling**: Tailwind CSS with CSS variables that follow our Material Design color and elevation rules. Global theming lives in a `ThemeProvider` that toggles light/dark palettes.
- **State Management**: TanStack Query handles server state (posts, comments, analytics). Zustand keeps lightweight local UI state like filters and dialog flags.
- **Routing**: Next.js App Router with nested layouts for dashboard sections (Posts, Comments, Analytics, Settings). Route groups let us keep marketing pages separate from the authenticated workspace.
- **Forms**: React Hook Form with Zod schemas per platform. It gives strong validation, draft autosave, and clear error messaging for Japanese text.
- **Internationalization**: next-intl with message catalogs in Japanese. The UI uses Noto Sans JP as the primary font and falls back to Inter for Latin characters.

## Backend Architecture
- **Runtime**: Node.js 20 running on serverless edge functions for low-latency responses to Kanto and Kansai users.
- **Framework**: NestJS 10 with a modular domain layout (Accounts, Scheduling, Analytics, Integrations).
- **Database Layer**: PostgreSQL accessed through Prisma ORM. Prisma Client is generated in TypeScript for full type safety.
- **Session Management**: A hybrid session system powered by Lucia Auth with Redis-backed session storage. We issue short-lived access tokens and rotate refresh tokens automatically.
- **Development Workflow**: Turborepo monorepo housing web, backend, and shared packages. pnpm handles installs, and GitHub Actions run lint, type check, tests, and e2e flows on every pull request.

## Database Design
- **Primary Store**: PostgreSQL 15 hosted on Amazon RDS (Multi-AZ for resilience).
- **Users Table**: Uses UUID v7 primary keys, unique email index, password hash (Argon2id), locale preferences, and role flags (owner, staff, analyst).
- **Schema Evolution**: Prisma Migrate manages versioned migrations. Every deployment runs `prisma migrate deploy` so the schema stays consistent across environments.
- **Type Safety**: Prisma Client types flow into both the NestJS services and the Next.js frontend through shared `@teppen-meo/types` packages.

## Component Architecture
The UI follows atomic design for reuse and clarity:
- **Layout Components**: `AppShell`, `SidebarNav`, `TopBar`, and a floating "Create Post" action button. Responsive grid layouts adjust to desktop kiosks and tablets.
- **Business Components**: `PostCard`, `CommentThread`, `AnalyticsKPI`, and `PlatformConnectionCard` map directly to core features.
- **Form Components**: `PostComposer` handles multi-platform scheduling, media uploads, and preview tabs. Reusable `PlatformToggle` and `SchedulePicker` atoms keep the UX consistent.
- **UI Primitives**: We rely on the full shadcn/ui primitive set (buttons, inputs, dialogs, tabs) themed with our Material tokens.

## Design System
- **Color System**: Semantic tokens like `--color-surface`, `--color-primary`, and `--color-danger` defined per theme. Dark mode adds elevation overlays following Material guidelines.
- **Typography**: Noto Sans JP for body text, Inter for Latin UI hints, with font loading through `next/font` for optimal CLS.
- **Spacing**: Tailwind utilities enforce an 8px spacing scale (`gap-2`, `gap-3`, `py-4`, etc.). Layout wrappers snap to this rhythm.
- **Interactive States**: Hover, focus, and pressed states use elevation helpers (`shadow-md`, `shadow-lg`) plus subtle color blending for accessibility.

## Authentication & Security
- **User Management**: Users register with email and password. Passwords are hashed using Argon2id. Multi-factor authentication uses TOTP via authenticator apps.
- **Session Handling**: Lucia Auth issues HTTP-only cookies scoped to the app domain. Refresh tokens live in Redis with device fingerprints and automatic revocation on suspicious activity.
- **Type Safety**: End-to-end TypeScript with Zod validators on every API boundary. OpenAPI schemas are generated from the NestJS controllers to align client and server types.

## External Dependencies
- **Database Services**: Amazon RDS for PostgreSQL in production, Neon for developer preview environments, and Dockerized Postgres for local work.
- **UI & Component Libraries**: shadcn/ui, Radix UI primitives, Tailwind CSS, date-fns with Japanese locale, Recharts for analytics charts, and react-markdown for post previews.
- **Development Tools**: Turborepo, pnpm, ESLint, Prettier, Stylelint, Playwright for e2e tests, Storybook for UI review, and Vitest for unit tests.
- **External Integrations**:
  - Google Business Profile API for posts, insights, and review replies.
  - Instagram Graph API for scheduled publishing and comment sync.
  - Facebook Graph API for page publishing and message ingestion.
  - BigQuery data export for long-term analytics and Looker Studio dashboards.

## Fonts & Assets
- **Fonts**: `@next/font` pulls Noto Sans JP and Inter subsets. Fallbacks include system UI fonts for fast rendering.
- **Static Assets**: Brand logos and iconography live in the `apps/web/public` directory with automated optimization via `next/image`.
- **Date Handling**: `date-fns` with `ja` locale formats timestamps for posts, replies, and analytics dashboards.

## Deployment & Observability
- **Hosting**: Vercel handles the frontend. The NestJS backend and background workers run on AWS Fargate with auto-scaling.
- **Background Jobs**: BullMQ queues backed by Redis process scheduled posts, analytics pulls, and webhook callbacks.
- **Monitoring**: Datadog collects logs, metrics, and traces. Sentry captures frontend and backend errors with release tracking.
- **Feature Flags**: LaunchDarkly controls gradual rollout of new dashboard widgets and integration betas.

## Roadmap Highlights
1. AI-assisted copy suggestions tuned for Japanese business tone.
2. LINE Official Account integration for messaging and rich menus.
3. Offline-ready mobile dashboard using Next.js PWA features.
