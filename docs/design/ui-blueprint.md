# MVP Frontend Blueprint

## 1. 技術スタック確認
- Next.js 14 App Router
- Typescript / Tailwind CSS / React Query / Zustand
- Component Library: Headless UI + custom components (atoms/molecules)

## 2. ルーティング構成
| Route | Layout | 内容 |
| --- | --- | --- |
| `/login` | AuthLayout | 認証画面、SSO/メールログイン |
| `/` → `/dashboard` | AppLayout | KPI カード、SLA アラート、店舗フィルタ |
| `/reviews` | AppLayout | タスクリスト、ボード切替、レビュー詳細モーダル |
| `/updates` | AppLayout | 申請一覧、詳細ドロワー、作成フォーム |
| `/posts` | AppLayout | カレンダー、テンプレート編集モーダル |
| `/reports` | AppLayout | KPI セクション、エクスポート設定 |
| `/settings/locations` | SettingsLayout | 店舗一覧、登録/編集モーダル |
| `/settings/users` | SettingsLayout | ユーザー・ロール管理 |
| `/settings/notifications` | SettingsLayout | 通知チャネル設定 |

## 3. コンポーネント階層
```
AppLayout
├── GlobalNav (Search, Filters, UserMenu)
├── SidebarNav (NavItem, Badge)
└── PageContainer
    └── PageSpecific Components

ReviewsPage
├── ReviewSummaryCards
├── ReviewQueueTabs
│   ├── ReviewTable (DataGrid)
│   └── ReviewBoard (Kanban)
└── ReviewDetailModal
    ├── ReviewHeader
    ├── ReplyComposer (TemplatePicker, RichTextEditor)
    ├── SLAStatusBadge
    └── ActivityTimeline
```

## 4. 状態管理
- `react-query`
  - `useReviews`, `useReviewMutations`
  - `useRequests`, `usePosts`, `useKpiMetrics`
- `zustand`
  - UI 状態 (モーダル、フィルタ、トースト)
  - グローバル選択店舗/ブランド
- `Server Components`
  - ダッシュボード KPI, 初期データフェッチ

## 5. API コールフロー
1. AppLayout ロード時に `getSession` → ロールに応じて Nav を制御
2. `useQuery(['reviews', filters])` でレビュー一覧取得 (分页)
3. 返信送信は `mutateReviewReply` → 成功時に `invalidate`、トースト表示
4. 情報更新申請は `mutateRequest` → ワークフロー履歴更新
5. 投稿テンプレートはドラフト保存 → 承認後に公開スケジュール作成

## 6. UI トピック
- **アクセシビリティ**: フォーカストラップ、ARIA 属性、色コントラスト
- **レスポンシブ**: md 以上で 3 カラム、sm 以下でリストビュー
- **国際化**: `next-intl` で en/ja 切替 (Phase 2)

## 7. テンプレート & デザインシステム
- Tokens: spacing, color palette, typography を `tailwind.config.js` に定義
- Components: `Button`, `Card`, `Tag`, `StatCard`, `StatusBadge`
- Forms: 共通 `FormField` コンポーネント、バリデーションメッセージ統一

## 8. 依存
- API エンドポイント (reviews, requests, posts, analytics)
- Auth セッション (role-based)
- Feature flag (Phase 2: POS integration)

## 9. 次アクション
- 画面別ワイヤーフレーム (draw.io/Figma) 作成
- コンポーネント実装順序: Layout → Dashboard → Reviews → Updates → Posts → Reports → Settings
- Storybook 導入とアクセシビリティチェック
