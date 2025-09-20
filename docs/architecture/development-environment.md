# 開発環境セットアップガイド

TEPPEN MEO のアプリケーション開発環境を構築するための手順とベストプラクティスをまとめる。

## 1. 前提条件
- Node.js 20.18.0 (nvm 推奨)
- npm 10.x
- Docker / Docker Compose (バックエンドサービス & ツール用)
- Git, GitHub CLI (任意)

## 2. 初期セットアップ
```bash
nvm install 20.18.0
nvm use 20.18.0
npm install -g corepack
cd apps/web
npm install
cp .env.example .env.local
```

## 3. ローカル開発
- `npm run dev`: Next.js Dev Server (http://localhost:3000)
- `docker compose up -d`: PostgreSQL, MailHog, その他ツールを起動 (将来追加)
- `npm run lint`: ESLint チェック
- `npm run test`: 単体テスト (Jest 予定)

## 4. 環境変数
| 変数 | 用途 | メモ |
| --- | --- | --- |
| `NEXT_PUBLIC_APP_NAME` | 表示用アプリ名 | 例: `TEPPEN MEO` |
| `GBP_API_KEY` | Google Business Profile API キー | Vault/Doppler で管理 |
| `DATABASE_URL` | PostgreSQL 接続文字列 | ローカルは docker compose で供給 |
| `SENTRY_DSN` | エラートラッキング | 任意 | 

## 5. Git 運用
- main ブランチは常にデプロイ可能な状態を維持
- PR 作成時は自動テストを通過させる (GitHub Actions で実装予定)
- Conventional Commits (feat, fix, docs, chore 等) を推奨

## 6. サービスモック
- GBP API はまだ利用申請中のため、当面はモックレスポンスを `apps/web/mocks` に配置し、API ライブラリで切り替える予定
- Slack Webhook は `.env.local` にテスト用 URL を記載し、`npm run notify:test` で疎通確認できるようにする

## 7. トラブルシューティング
- `node-gyp` 系エラー: `npm install --include=dev` 後に Xcode Command Line Tools / build-essential を確認
- Docker 起動失敗: `docker compose logs` で原因特定し、ポート衝突を解消
- npm キャッシュ不整合: `npm cache clean --force`

## 8. 次ステップ
- Lint / Test を統合した GitHub Actions ワークフローの整備
- DB マイグレーションツール (Prisma) の導入と README 追記
- Back-end API スタブの自動生成スクリプト検討
