# Technology Stack (Proposal)

## フロントエンド
- **Framework**: Next.js 14 (App Router)
- **UI**: React 18, Tailwind CSS, Headless UI
- **State**: React Query (TanStack Query) + Zustand (軽量ローカル状態)
- **Forms**: React Hook Form + Zod
- **Testing**: Vitest + Testing Library, Playwright (E2E)

## バックエンド / API
- **Runtime**: Node.js 20 (Vercel Edge Functions + Node Functions)
- **Framework**: Next.js Server Actions / Route Handlers, tRPC or REST (決定 TBD)
- **Auth**: Auth.js (NextAuth) with SSO (SAML/OIDC) extension
- **Queue/Worker**: BullMQ (Redis) or Temporal (検討)
- **External APIs**: Google Business Profile API v5.2, POS/予約システム (Webhook/Batch)

## データ
- **Primary DB**: PostgreSQL 15 (Managed: Neon/Render/AWS RDS)
- **Analytics**: BigQuery + dbt for transformation (フェーズ 2)
- **Cache**: Redis (Upstash) for session & job queue
- **Storage**: AWS S3 / Cloudflare R2 for画像・テンプレ素材

## インフラ & デプロイ
- **Hosting**: Vercel (Web/Edge) + AWS (API/Worker) ハイブリッド
- **Container**: Docker Compose (local) / ECS or Fly.io (worker)
- **CDN**: Vercel Edge Network (静的ファイル)
- **Monitoring**: Datadog / Sentry / Logtail

## CI/CD
- **CI**: GitHub Actions (lint/test/build)
- **CD**: Vercel Preview/Production、Infrastructure IaC (Terraform) を検討
- **Quality Gates**: PR テンプレ、レビュー、required checks

## セキュリティ
- **Secret 管理**: Doppler / 1Password / Vercel Env
- **依存関係監査**: Renovate, GitHub Dependabot

## 開発ツール
- **Package Manager**: npm (v10) or pnpm (検討)
- **Formatting**: Prettier + ESLint + Biome (可能なら)
- **Docs**: Notion, GitHub Wiki, this repo docs

## オープンポイント
- Worker ランタイムは Temporal (耐久ワークフロー) と BullMQ (シンプルキュー) で検討。
- データウェアハウス導入タイミングは PoC 次第。
- 認証は Auth.js で開始し、企業 SSO 連携が必要になれば WorkOS 等を導入。

## 次アクション
- PoC で GBP API 連携を検証。
- テナント分離のマルチスキーマ vs Row-Level Security を設計。
