export type DashboardSummary = {
  reviewCount: number;
  slaCompliance: number;
  postFrequency: number;
  alerts: {
    id: string;
    title: string;
    description: string;
  }[];
};

export async function getDashboardSummary(): Promise<DashboardSummary> {
  // TODO: Replace with real data fetching once API 実装が整い次第更新する。
  await new Promise((resolve) => setTimeout(resolve, 120));

  return {
    reviewCount: 428,
    slaCompliance: 0.92,
    postFrequency: 1.4,
    alerts: [
      {
        id: "sla-001",
        title: "SLA 期限まで 6 時間",
        description: "渋谷スクランブル店の★2レビューが未返信です。",
      },
      {
        id: "post-002",
        title: "投稿スロット未設定",
        description: "横浜みなとみらい店の来週スケジュールが空き状態です。",
      },
    ],
  };
}
