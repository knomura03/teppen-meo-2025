# Test Plan (Iteration 0)

## 1. スケジュール
| 期間 | アクティビティ |
| --- | --- |
| Sprint 1 | ユニット/コンポーネントテスト整備、Playwright ベース設定 |
| Sprint 2 | Reviews/Updates/Posts フローの E2E シナリオ作成 |
| Sprint 3 | KPI ダッシュボード・権限テスト、回帰テスト準備 |
| Pre-Release (Week 6) | フル回帰、負荷テスト (限定) |

## 2. テストケースサマリ
| カテゴリ | ケース数 (目標) |
| --- | --- |
| ユニット (hooks/utils) | 60 |
| コンポーネント | 40 |
| API ハンドラー | 25 |
| E2E | 12 |
| アクセシビリティ | 6 |

## 3. 主要シナリオ (E2E)
1. HQ ユーザーがレビューを確認 → テンプレート適用 → 承認 → 返信送信。
2. 店舗ユーザーが営業時間変更を申請 → HQ が承認 → GBP 更新結果を確認。
3. HQ ユーザーが投稿テンプレートを作成 → スケジュール → 公開。
4. ダッシュボードで期間フィルタを変更 → KPI が更新される。
5. 通知設定を変更 → SLA 期限のメール通知が届く。
6. 権限がないユーザーが管理画面へアクセス → 403 表示。

## 4. テストリソース
- QA リード 1 名、開発者レビューシフト。
- Staging 環境: `staging.teppen-meo.com`
- テストアカウント: `hq-admin@test`, `store-manager@test`, `cs@test`

## 5. エントリー/エグジット基準
- **エントリー**: Story の AC 定義、テストデータ準備、依存サービスが稼働。
- **エグジット**:
  - 重大/高欠陥が 0 件。
  - ユニット/コンポーネントカバレッジ 70% 以上。
  - E2E シナリオ成功率 100%。

## 6. リスクと緩和策
- 時間不足 → スプリントレビューでテスト進捗を可視化。
- データ同期遅延 → テスト用モックサーバで制御。
- アクセシビリティ検証の遅れ → Storybook 組み込みレポートを活用。

## 7. ツール & 手順
- `npm run test:unit`
- `npm run test:component`
- `npm run test:e2e`
- `npm run lint`, `npm run typecheck`
- Playwright CI with GitHub Actions (matrix: chromium, webkit)

## 8. 不具合管理
- GitHub Issues (template: bug)
- 優先度付け: P0 (Blocker), P1 (Major), P2 (Minor), P3 (Low)
- SLA: P0 4h, P1 1d, P2 3d, P3 7d

## 9. レポーティング
- デイリースタンドアップで QA 進捗共有。
- スプリントレビューで品質メトリック報告。
- リリース後 1 週間のバグトリアージ。

## 10. 今後の改善
- ビジュアルリグレッション (Chromatic) を導入検討。
- 合成モニタリングとの連携でリリース後監視強化。
