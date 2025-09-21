# Site Map & IA (MVP)

## トップレベル構成
- `/login` 認証画面
- `/dashboard`
  - KPI ハイライト
  - SLA アラート
- `/reviews`
  - タスクキュー (リスト・カンバン切替)
  - レビュー詳細 (返信テンプレ、履歴)
- `/updates`
  - 情報更新申請一覧
  - 申請フォーム (営業時間、メニュー、属性)
- `/posts`
  - 投稿テンプレート管理
  - 投稿スケジュール
- `/reports`
  - KPI 詳細レポート
  - エクスポートセンター
- `/settings`
  - 店舗管理 (ロケーション一覧)
  - ユーザー & 権限
  - 通知設定

## ナビゲーション階層
```
App Shell (Header + Left Nav)
└── Dashboard
└── Reviews
│   ├── Queue (Table)
│   ├── Queue (Board)
│   └── Review Detail
└── Updates
│   ├── Requests
│   └── New Request Form
└── Posts
│   ├── Templates
│   ├── Calendar
│   └── Post Detail
└── Reports
│   ├── Overview
│   └── Custom Report
└── Settings
    ├── Locations
    ├── Users & Roles
    ├── Integrations
    └── Notifications
```

## 主要ユーザーフロー
1. Dashboard → Reviews Queue → Review Detail → 承認 → 投稿
2. Dashboard → Updates → Request Detail → 承認/差し戻し → 履歴確認
3. Dashboard → Reports → カスタムレポート → エクスポート

## 情報アーキテクチャの原則
- タスク中心の左ナビ構成 (日次オペレーション → レビュー/更新/投稿)。
- 設定・権限・インテグレーションは `/settings` に集約。
- レポート機能は独立し、フィルタとエクスポートを強調。

## 次ステップ
- 各ページのワイヤーフレーム作成。
- Onboarding Flow (初回セットアップ) の画面遷移図を別途作成。
