# TEPPEN MEO

TEPPEN MEO は多店舗ビジネス向けに Google ビジネスプロフィール運用を最適化するプラットフォームを目指しています。本リポジトリではドキュメントとアプリケーション実装を一元管理します。

## ドキュメント
- プロジェクト計画: [development_plan.md](development_plan.md)
- サイトマップ & IA: [docs/design/site-map.md](docs/design/site-map.md)
- 機能バックログ: [docs/requirements/feature-backlog.md](docs/requirements/feature-backlog.md)
- 非機能要件: [docs/requirements/non-functional-requirements.md](docs/requirements/non-functional-requirements.md)
- プロダクトコンセプト: [docs/strategy/product-concept.md](docs/strategy/product-concept.md)
- KPI 設定フレームワーク: [docs/strategy/kpi-framework.md](docs/strategy/kpi-framework.md)
- ユーザーストーリー: [docs/requirements/user-stories.md](docs/requirements/user-stories.md)
- 技術スタック: [docs/architecture/technology-stack.md](docs/architecture/technology-stack.md)
- 開発環境ガイド: [docs/architecture/development-environment.md](docs/architecture/development-environment.md)

## 開発環境
フロントエンドは Next.js (App Router, Tailwind CSS) を使用し、`apps/web` に配置しています。初期セットアップは下記を参照してください。

```bash
# Node.js 20.18.0 を使用（`nvm use` で切替）
nvm use

cd apps/web
npm install
# 環境変数テンプレートをコピー
cp .env.example .env.local
npm run dev
```

`http://localhost:3000` でアプリを確認できます。PostgreSQL と MailHog を利用する場合は、ルートで `docker compose up -d` を実行してください。詳細な環境構築手順や今後の TODO は [開発環境セットアップガイド](docs/architecture/development-environment.md) を参照してください。

## コミュニケーション
進捗更新は `development_plan.md` セクション 8 のログを更新し、タスクの着手/完了時にリンクする関連ドキュメントを明記してください。
