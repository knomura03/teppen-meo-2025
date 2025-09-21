# TEPPEN MEO

TEPPEN MEO は多店舗ビジネス向けに Google ビジネスプロフィール運用を最適化するプラットフォームを目指しています。本リポジトリではドキュメントとアプリケーション実装を一元管理します。

## ドキュメント
- プロジェクト計画
  - 開発計画: [development_plan.md](development_plan.md)
  - プロジェクト計画書: [docs/project-plan.md](docs/project-plan.md)
- ロードマップ: [docs/strategy/roadmap.md](docs/strategy/roadmap.md)
- リサーチ
  - デスクリサーチ: [docs/research/desk-research.md](docs/research/desk-research.md)
  - インタビュープラン & インサイト: [docs/research/user-interviews.md](docs/research/user-interviews.md)
  - 競合 SWOT 分析: [docs/research/competitor-swot.md](docs/research/competitor-swot.md)
  - インサイトメモ: [docs/research/insights-memo.md](docs/research/insights-memo.md)
- 戦略
  - ペルソナ: [docs/strategy/personas.md](docs/strategy/personas.md)
  - カスタマージャーニー: [docs/strategy/customer-journey.md](docs/strategy/customer-journey.md)
  - バリュープロポジションキャンバス: [docs/strategy/value-proposition-canvas.md](docs/strategy/value-proposition-canvas.md)
  - ステークホルダー合意メモ: [docs/strategy/stakeholder-alignment.md](docs/strategy/stakeholder-alignment.md)
  - プロダクトビジョン: [docs/strategy/product-vision.md](docs/strategy/product-vision.md)
  - UX ゴール & 成功シナリオ: [docs/strategy/ux-goals.md](docs/strategy/ux-goals.md)
- 要件
  - 機能バックログ (MoSCoW): [docs/requirements/feature-backlog.md](docs/requirements/feature-backlog.md)
  - ユーザーストーリー: [docs/requirements/user-stories.md](docs/requirements/user-stories.md)
  - 非機能要件: [docs/requirements/non-functional-requirements.md](docs/requirements/non-functional-requirements.md)
  - MVP スコープ定義: [docs/requirements/mvp-scope.md](docs/requirements/mvp-scope.md)
- 設計 / アーキテクチャ
  - サイトマップ & IA: [docs/design/site-map.md](docs/design/site-map.md)
  - ワイヤーフレーム概要: [docs/design/wireframe-outline.md](docs/design/wireframe-outline.md)
  - フロントエンド設計: [docs/design/ui-blueprint.md](docs/design/ui-blueprint.md)
  - 技術スタック提案: [docs/architecture/technology-stack.md](docs/architecture/technology-stack.md)
  - API 設計: [docs/architecture/api-design.md](docs/architecture/api-design.md)
  - データ連携計画: [docs/architecture/data-integration-plan.md](docs/architecture/data-integration-plan.md)
  - セキュリティ計画: [docs/architecture/security-plan.md](docs/architecture/security-plan.md)
  - パフォーマンス計画: [docs/architecture/performance-plan.md](docs/architecture/performance-plan.md)
  - データガバナンス計画: [docs/architecture/data-governance.md](docs/architecture/data-governance.md)
  - CI/CD 設計案: [docs/architecture/ci-cd-plan.md](docs/architecture/ci-cd-plan.md)
  - 開発環境ガイド: [docs/architecture/development-environment.md](docs/architecture/development-environment.md)
- テスト
  - テスト戦略: [docs/testing/test-strategy.md](docs/testing/test-strategy.md)
  - テスト計画: [docs/testing/test-plan.md](docs/testing/test-plan.md)
  - 自動化カバレッジ計画: [docs/testing/automation-coverage.md](docs/testing/automation-coverage.md)
- 運用
  - リリース計画: [docs/operations/release-plan.md](docs/operations/release-plan.md)
  - モニタリング計画: [docs/operations/monitoring-plan.md](docs/operations/monitoring-plan.md)
  - サポートプレイブック: [docs/operations/support-playbook.md](docs/operations/support-playbook.md)
  - インシデントレスポンス計画: [docs/operations/incident-response-plan.md](docs/operations/incident-response-plan.md)
  - オンボーディングチェックリスト: [docs/operations/onboarding-checklist.md](docs/operations/onboarding-checklist.md)
  - リリースノートテンプレ: [docs/operations/templates/release-notes.md](docs/operations/templates/release-notes.md)
  - リリースチェックリスト: [docs/operations/checklists/release-checklist.md](docs/operations/checklists/release-checklist.md)
  - ナレッジベース: [docs/operations/knowledge-base/index.md](docs/operations/knowledge-base/index.md)

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

フロントエンド (`apps/web`) にはダッシュボード / レビュー / 情報更新 / 投稿 / レポート / 設定の各ページ骨組みと共通ナビゲーションを実装済みです。現在はモックデータによる表示のみで、今後 API 連携と UI 詳細を順番に拡張していきます。

## コミュニケーション
進捗更新は `development_plan.md` セクション 8 のログを更新し、タスクの着手/完了時にリンクする関連ドキュメントを明記してください。
