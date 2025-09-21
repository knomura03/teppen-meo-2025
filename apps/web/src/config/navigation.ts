export type AppNavItem = {
  label: string;
  description: string;
  href: string;
};

export const primaryNav: AppNavItem[] = [
  {
    label: "ダッシュボード",
    description: "KPI ハイライトとアラート",
    href: "/dashboard",
  },
  {
    label: "レビュー",
    description: "SLA 管理と返信ワークフロー",
    href: "/reviews",
  },
  {
    label: "情報更新",
    description: "申請と承認フロー",
    href: "/updates",
  },
  {
    label: "投稿",
    description: "テンプレートとスケジュール",
    href: "/posts",
  },
  {
    label: "レポート",
    description: "KPI レポートとエクスポート",
    href: "/reports",
  },
];

export const secondaryNav: AppNavItem[] = [
  {
    label: "設定",
    description: "ロケーション・権限・通知",
    href: "/settings",
  },
];
