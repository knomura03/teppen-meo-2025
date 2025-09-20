# 技術スタック (ドラフト)

## フロントエンド
- Framework: Next.js 15 (App Router)
- 言語: TypeScript
- UI: Tailwind CSS, Headless UI, Radix UI
- グラフライブラリ: Recharts / Visx (検討中)
- 認証: next-auth (OIDC 連携)

## バックエンド
- API: tRPC / Next.js Route Handlers
- BFF: Next.js 内で統合、外部 API コールをラップ
- データ取得: Google Business Profile API, Google Analytics Data API
- Queue/Job: Cloud Tasks or BullMQ (要比較)

## データ & インフラ
- DB: PostgreSQL (Neon / Supabase 検討)
- キャッシュ: Redis (Upstash)
- メッセージング: Slack Webhook, SendGrid
- ホスティング: Vercel (FE) + Fly.io / Railway (BE ジョブ)
- IaC: Terraform (将来的に)

## DevOps / 開発支援
- バージョン管理: GitHub
- CI/CD: GitHub Actions (Lint / Test / Deploy)
- モニタリング: Datadog, Sentry
- 分析基盤: BigQuery + Looker Studio

## セキュリティ
- シークレット管理: Doppler / 1Password を検討
- 監査ログ: Cloud Logging + BigQuery Export
- 依存関係管理: Renovate / Dependabot

## 次アクション
- Queue 実装方式の比較検証 (マネージド vs OSS)
- ホスティングコスト試算とリザーブドプランの評価
- モニタリングダッシュボードの初期セット作成
