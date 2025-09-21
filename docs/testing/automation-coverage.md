# Test Automation Coverage Plan

## 1. 目的
- MVP リリースまでに自動テストカバレッジの目標を設定し、欠落領域を把握する。

## 2. カバレッジ目標
| 層 | 指標 | 目標 |
| --- | --- | --- |
| ユニット | statements/branches | 70% |
| コンポーネント | 主要 UI のスナップ + 相互作用 | 80% |
| API | ハンドラー網羅率 | 90% |
| E2E | 主要シナリオ (12 ケース) | 100% |

## 3. クリティカルシナリオ
1. レビュー返信フロー
2. 情報更新承認フロー
3. 投稿スケジュール作成
4. KPI フィルタ操作
5. 通知設定変更 → SLA 通知受信
6. ロールベースアクセス制御

## 4. テストケース割当
| コンポーネント | 担当 | 備考 |
| --- | --- | --- |
| Dashboard | FE #1 | KPI カード、フィルタ |
| Reviews Queue | FE #2 | Table/Board、Detail モーダル |
| Update Requests | Full-stack | 承認フロー |
| Posts | FE #1 | テンプレ/カレンダー |
| Reports | FE #2 | フィルタ/エクスポート |
| Settings | Full-stack | Users, Locations |

## 5. 自動化ツール
- ユニット/コンポーネント: Vitest + Testing Library + Storybook interaction tests。
- API: supertest + MSW。
- E2E: Playwright (GitHub Actions matrix)。
- Visual Regression: Chromatic (検討)。

## 6. データ戦略
- Seed scripts でテストデータを生成 (prisma seed)。
- Playwright は `staging` と `local` で切替可能な config。

## 7. ギャップ分析
- 手動テストが必要な領域: POS 連携 (β)、AI 機能 (GA)、メール配信 (一部モック)。
- アクセシビリティ自動化は axe-core で 1 次検証し、手動レビューを補完。

## 8. レポーティング
- GitHub Actions で coverage レポートを Artifacts に保存。
- SonarCloud 等の導入を検討。

## 9. 保守
- 新機能追加時にテスト責任を定義。
- テストフレークフラグ: 連続 3 回失敗で調査タスク起票。

## 10. TODO
- Coverage バッジを README に追加 (CI 環境整備後)。
- テスト実行時間を 10 分以内に保持するため parallelism 調整。
