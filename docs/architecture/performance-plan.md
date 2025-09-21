# Performance & Scalability Plan

## 1. 目標指標
- Web LCP < 2.5s、TTI < 3s。
- API p95 < 800ms、p99 < 1200ms。
- タスクキュー遅延 < 2 分。

## 2. アプリ最適化
- Next.js ISR + Edge キャッシュでダッシュボード初期表示を高速化。
- React Query でデータキャッシュ、HTTP/2 使用。
- コード分割 (`app/` で route-based chunking)、画像最適化。

## 3. API/バックエンド
- Prisma + PostgreSQL。インデックス設計: `reviews(location_id, status, sla_due_at)`、`requests(status, created_at)`。
- キュー処理: BullMQ、同時実行数を動的調整。
- レート制限/サーキットブレーカー (resilience4node) 実装。

## 4. データベース
- 500 店舗までは単一 Postgres、1,000 店舗以上は Read Replica & パーティショニング検討。
- バキューム/統計更新ジョブを週次実行。
- テーブル監視: pg_stat_statements、Query 実行計画レビュー。

## 5. 負荷テスト
- k6 で API 負荷試験 (Reviews, Updates, Posts) を 1 万リクエスト規模で実施。
- Lighthouse CI による UI パフォーマンス測定。
- ワーカーは Synthetic data で 5 倍負荷を再現。

## 6. キャッシュ戦略
- CDN: Vercel Edge / Cloudflare。
- Application Cache: Redis (review summaries, stats)。
- Client-side caching: Stale-While-Revalidate。

## 7. モニタリング
- Datadog APM, p95/p99 トラッキング。
- カスタムメトリクス: キュー遅延、GBP 同期時間。

## 8. ボトルネック想定と対策
| リスク | 対応 |
| --- | --- |
| GBP API レート制限 | テナント別キュー、バックオフ、差分同期 |
| 集計クエリ負荷 | Materialized View、夜間更新 |
| 画像ストレージ | CDN キャッシュ、画像最適化 pipeline |

## 9. 将来拡張
- マイクロサービス化を検討する際の判定基準 (単一モノリスで 150% コスト超過時)。
- イベントストリーミング (Kafka) への移行ロードマップ。

## 10. TODO
- k6 スクリプトの雛形作成。
- p95 監視ダッシュボード初期設定。
- 依存サービス (POS API) の SLA 確認。
