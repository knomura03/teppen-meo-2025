# CI/CD Plan (Draft)

## 目的
- コード品質とデリバリー速度を両立し、MVP 期間中でも安定したリリースを実現する。

## ブランチ戦略
- `main`: 本番デプロイ対象。保護設定で直接 push 禁止。
- `develop` (必要に応じて): 複数機能の統合用、MVP 期間は省略も可。
- `feature/*`: 個別タスク単位で作成し PR を作る。
- `release/*`: 大型リリース前に利用 (GA フェーズ想定)。

## GitHub Actions ワークフロー
1. **Pull Request**
   - `lint-test.yaml`
     - `npm run lint`
     - `npm run test` (unit)
     - `npm run typecheck`
   - `playwright.yaml` (nightly or label)
2. **Main merge**
   - `build-deploy.yaml`
     - Static build (`npm run build`)
     - Vercel preview → production promotion
     - Terraform plan/apply (infra changesありの場合 manual approval)
3. **Scheduled**
   - 毎日深夜に E2E smoke、依存更新チェック。

## 環境
- Preview: Vercel Preview
- Staging: Vercel + Managed DB (staging schema)
- Production: Vercel Production + Managed DB (prod)

## リリースフロー (MVP)
1. PR レビュー (2 名 or 1 名 + 自動チェック合格)
2. `main` へ merge → 自動デプロイ (Preview → Promote)
3. リリースノートを GitHub Releases or Notion へ記録
4. ロールバック: Vercel のロールバック機能 or `git revert`

## QA ポリシー
- ストーリーポイント 5 以上の機能はステークホルダーレビュー必須。
- 主要 UX フローは Playwright シナリオを用意。
- バグ報告は GitHub Issues + テンプレート。

## シークレット管理
- GitHub Secrets → Vercel 環境変数同期
- Local 開発は `.env.local` (dotenv-vault / Doppler)

## 指標
- デプロイ頻度: 週 2 回以上
- 変更失敗率: < 10%
- 平均リリースリードタイム: 2 日以内

## 今後の拡張
- Infrastructure IaC を Terraform でコード化 (AWS, DB, Queue)。
- マルチサービス化した際に ArgoCD/GitOps を検討。
