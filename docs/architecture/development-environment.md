# Development Environment Guide

## 前提
- Node.js 20.18.0 (nvm 管理推奨)
- npm 10 以上 (pnpm 検討中)
- Docker Desktop (PostgreSQL, MailHog 用)

## 初期セットアップ
```bash
nvm install 20.18.0
nvm use 20.18.0

npm install
cp apps/web/.env.example apps/web/.env.local
```

## ルート構成 (予定)
```
apps/
  web/        # Next.js フロントエンド
packages/
  ui/         # 共有 UI コンポーネント (予定)
  config/     # ESLint/TS Config (予定)
```

## ローカル開発フロー
1. `npm run dev` (apps/web)
2. API モックは MSW or Next.js Route Handler で提供
3. コード整形: `npm run lint`, `npm run format`

## Docker サービス
```bash
docker compose up -d db mailhog
```
- `db`: PostgreSQL 15、接続情報は `.env.local`
- `mailhog`: テスト用メールキャプチャ (http://localhost:8025)

## テスト
- ユニット: `npm run test`
- E2E (Playwright): `npm run test:e2e`
- 型チェック: `npm run typecheck`

## ツール
- 推奨エディタ: VS Code + ESLint/Prettier プラグイン
- コミット規約: Conventional Commits (例: `feat: add review queue page`)
- 変更検出: Husky + lint-staged

## 環境変数
| 変数 | 用途 | 備考 |
| --- | --- | --- |
| `DATABASE_URL` | Postgres 接続 | ローカルは docker 内 | 
| `GBP_API_KEY` | Google Business Profile API | PoC 用のサービスアカウント |
| `MAILHOG_SMTP` | メール送信 | dev のみ |

## トラブルシューティング
- `node-gyp` ビルド失敗 → `xcode-select --install`
- Docker のポート競合 → `docker compose down` 後に再起動
- npm キャッシュ問題 → `npm cache clean --force`

## 今後の TODO
- TurboRepo などモノレポツールの導入検討
- Storybook 環境構築
- Git hooks 設定スクリプトの追加
