# Test Strategy (MVP)

## 1. 目的
- MVP リリースに向けた品質保証の方針を定義し、リスクベースでテスト資源を配分する。

## 2. 範囲
- 対象機能: レビュータスク、情報更新、投稿管理、KPI ダッシュボード、権限/通知。
- 非対象: POS 連携、AI 機能、SNS 連携 (後続フェーズ)。

## 3. 品質ゴール
| 領域 | 指標 | 目標 |
| --- | --- | --- |
| 機能 | クリティカル欠陥 | 0 件 (リリース前) |
| パフォーマンス | レビュー一覧 API | 95p < 800ms |
| セキュリティ | OWASP Top 10 | 主要項目を静的解析で検出ゼロ |
| アクセシビリティ | WCAG 2.1 AA | 主要画面で達成 |

## 4. テストタイプ
- **ユニットテスト**: UI ロジック、hooks、ユーティリティ。
- **コンポーネントテスト**: Storybook + Testing Library。
- **API テスト**: supertest + MSW (モック) でハンドラー検証。
- **E2E テスト**: Playwright で主要シナリオ (レビュー返信、更新承認、投稿作成、KPI フィルタ)。
- **アクセシビリティ**: axe-core 自動チェック + 手動レビュー。
- **パフォーマンス**: Lighthouse CI (Dashboard, Reviews)。
- **セキュリティ**: npm audit、Snyk (CI 連携)、OWASP Zap スキャン (Staging)。

## 5. テスト環境
- `dev-local`: MSW + sqlite (in-memory) で軽量検証。
- `staging`: PostgreSQL ステージング、外部 API は sandbox。
- データシード: テナントごとのサンプル店舗/レビューを fixture として準備。

## 6. プロセス
1. スプリント内で story 定義時に受入条件 (AC) を明記。
2. 開発が PR を作成 → 自動テスト (lint/test/typecheck) → レビュー。
3. Merge 後に Staging へ自動デプロイ → QA チェックリスト実施。
4. リリース前に回帰テスト (E2E suite) を実行。

## 7. リスク & 対応
- **GBP API 依存**: sandbox が限られる → MSW でモック、統合テストは限定的に実施。
- **データ一貫性**: Many-to-many 関係の検証 → Prisma schema で制約、テスト fixture でカバー。
- **UI 変更頻度**: Storybook Visual Regression を検討 (Chromatic)。

## 8. 役割
- QA オーナー: PM/QA リード。
- 開発者: 自身のユニット/コンポーネントテスト作成。
- CS: UAT サポート、シナリオ検証。

## 9. 指標 (継続監視)
- 自動テストパス率 95% 以上。
- リリース後 1 週間の重大欠陥 0 件。
- バグ検知から修正までの平均リードタイム < 2 日。

## 10. 次ステップ
- テストケースリストを `docs/testing/test-plan.md` に整理。
- Playwright smoke シナリオのドラフトを作成。
