# Wireframe Outline (MVP)

## 1. Dashboard
- **Hero KPI Cards**: レビュー数、SLA 遵守率、投稿回数。
- **Alert List**: SLA 違反寸前の店舗 (タップで詳細へ)。
- **Filter Bar**: ブランド/地域/店舗/期間。

## 2. Reviews Queue
- **Tabs**: `Pending`, `In Progress`, `Completed`, `Escalated`。
- **List View**: レビュー概要、評価、期限、担当者。
- **Detail Drawer**: レビュー本文、履歴、テンプレ選択、返信エディタ。
- **SLA Progress Bar**: 残り時間を色で表示。

## 3. Update Requests
- **Table**: 種別、店舗、申請者、ステータス、提出日時。
- **Detail**: 変更内容 diff、承認履歴、コメント欄。
- **Action Buttons**: Approve / Reject / Request Changes。

## 4. Posts
- **Calendar View**: 週/月切替、投稿タイトル、ステータス。
- **Template Library**: カテゴリ分類 (キャンペーン、季節、クーポン)。
- **Editor**: タイトル、本文、CTA、画像アップロード、プレビュー。

## 5. Reports
- **Metrics Overview**: 折れ線 + 棒グラフ。
- **Table**: 店舗別 KPI (ソート/フィルタ)。
- **Export Panel**: CSV/PDF、スケジュール設定。

## 6. Settings
- **Locations**: リスト + 詳細カード、外部 ID、同期ステータス。
- **Users**: ロール、店舗権限、最終ログイン。
- **Integrations**: GBP 接続状態、POS 連携設定。
- **Notifications**: SLA、レビュー、投稿の通知設定。

## 7. Empty States / Loading
- Empty states に CTA (テンプレ作成、店舗追加)。
- Skeleton UI を設計。

## 8. モバイル考慮
- レビュー詳細は全画面モーダル。
- カレンダーはリストビューへフォールバック。

## 9. 次ステップ
- Figma で low-fi ワイヤーフレーム作成。
- ユーザビリティテストのプロトタイプ準備。
