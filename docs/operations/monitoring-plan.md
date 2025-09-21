# Monitoring & Alerting Plan

## 1. 目的
- MVP 運用中にサービス状態とビジネス指標を継続監視し、SLA を満たす。

## 2. モニタリング対象
| レイヤー | 指標 | ツール |
| --- | --- | --- |
| アプリ | HTTP 5xx, レスポンスタイム, Queue backlog | Datadog APM, Sentry |
| バッチ/ワーカー | ジョブ失敗率、遅延 | Datadog Metrics / Grafana |
| インフラ | CPU, メモリ, DB 接続数 | Cloud Provider Metrics |
| ビジネス | SLA 違反数, レビュー同期遅延, 投稿成功率 | 内製 KPI ダッシュボード |

## 3. アラートポリシー
- **P0**: API 5xx > 10% (5 min), DB 接続不可 → 即時通知 (PagerDuty)。
- **P1**: Queue backlog > 50, GBP 同期遅延 > 30 分 → Slack + Email。
- **P2**: KPI ダッシュボード同期遅延、MailHog 送信不可 → チケット発行。

## 4. 通知フロー
1. モニタリングツール → PagerDuty (オンコール)
2. オンコール通知: Slack `#alerts`, SMS (夜間)
3. インシデント発生時は `incident-yyyyMMdd` チャンネルでハンドオフ
4. 重大障害は 30 分以内にステークホルダーへ報告

## 5. ログ管理
- Structured logging (JSON) → Logtail + S3 (90 日)
- トレース: OpenTelemetry → Datadog
- PII マスク: ログ出力前にフィルタ

## 6. 監視ダッシュボード
- Overview: リクエスト数、エラー率、レスポンス中央値
- Worker: ジョブ成功率、リトライ回数
- GBP Sync: 呼び出し数、失敗率、最終同期時間
- Business KPI: SLA 違反、レビュー件数、投稿数

## 7. 運用手順
- 毎朝 9:00 にダッシュボード確認
- 週次でアラートレビュー＆閾値調整
- インシデント後 48h 以内に Postmortem 作成

## 8. テスト
- Chaos 実験 (API 応答遅延、GBP 障害) をベータ前に実施
- アラートの自動テスト (ステージングで閾値トリガ)

## 9. 未決事項
- PagerDuty ライセンス確保
- Business KPI の合成監視 (Synthetic) ツール選定

## 10. 次ステップ
- ダッシュボードの初期セットアップを sprint 2 で着手
- オンコールスケジュールを CS/Dev チームで合意
