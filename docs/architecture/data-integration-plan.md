# Data Integration Plan

## 1. サマリ
- GBP API (レビュー、投稿、ビジネス情報) と自社データソース (POS/予約、CRM) の連携方式を整理し、MVP と将来拡張を定義する。

## 2. データフロー概要
```
GBP API  --->  Ingestion Worker  --->  PostgreSQL (Operational DB)
                                         |
                                         v
                                   Analytics Exporter ---> BigQuery (Phase 2)

POS/予約 Webhook ---> Integration Service ---> PostgreSQL (Events)
CRM/Billing API ---> Scheduled Sync ---> PostgreSQL (Accounts)
```

## 3. GBP 同期
- **頻度**: レビューは 5 分間隔、投稿/ビジネス情報は 15 分間隔でポーリング。
- **取得方式**: `syncToken` を利用し増分取得。
- **エラーハンドリング**: 429/5xx は指数バックオフ、一定回数失敗で Dead-letter Queue に格納。
- **データ正規化**: レビュー本文、評価、作成日時、レビュアー情報 (匿名化) を格納。

## 4. POS/予約連携 (S-01 準備)
- **Webhook**: 来店予約完了/キャンセルイベントを受信。
- **バッチ**: 毎日午前 4 時に POS 日次売上を同期 (CSV/SFTP or API)。
- **マッピング**: `externalLocationId` で紐付け。存在しない場合は Pending キューに積む。
- **データ保持**: 生データは `raw_events` テーブル (JSONB) に保存し、ETL で集約テーブル更新。

## 5. CRM/Billing
- Stripe (課金) や Salesforce (契約状況) を 1 日 1 回同期。
- 目的: KPI ダッシュボードで継続率やアップセル情報を反映。

## 6. アーキテクチャ
- **Message Queue**: Redis Streams or SQS (本番)
- **Workers**: Node.js + BullMQ
- **ETL**: dbt (Phase 2)、現在は cron job で集計。

## 7. データ品質管理
- `sync_results` テーブルで成功/失敗ログを記録。
- SLA: GBP レビューは 10 分以内に UI へ反映。
- モニタリング: データ遅延が 30 分超の場合にアラート。

## 8. セキュリティ/プライバシー
- API キーは Secret Manager で管理。
- レビューの個人情報は最小限 (レビュアー名を hash)。
- POS/予約データはテナント分離 (Row Level Security)。

## 9. 将来拡張
- BigQuery へストリーミングし、Looker Studio 連携。
- イベントドリブンな改善提案 (S-04) に活用。

## 10. TODO
- GBP API の quota 管理と失敗時再処理仕様策定。
- POS ベンダー別アダプタの要件定義。
- データマッピング表の作成 (Location, Category, Menu)。
