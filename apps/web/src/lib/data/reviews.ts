export type ReviewStatus = "pending" | "in_progress" | "completed" | "escalated";

export type ReviewItem = {
  id: string;
  location: string;
  rating: number;
  author: string;
  comment: string;
  status: ReviewStatus;
  receivedAt: string;
  slaDueAt: string;
};

export const MOCK_REVIEWS: ReviewItem[] = [
  {
    id: "rev-001",
    location: "渋谷スクランブル店",
    rating: 2,
    author: "匿名",
    comment: "席に案内されるまでの待ち時間が長かったです。",
    status: "pending",
    receivedAt: "2025-09-24T10:32:00+09:00",
    slaDueAt: "2025-09-24T22:32:00+09:00",
  },
  {
    id: "rev-002",
    location: "横浜みなとみらい店",
    rating: 5,
    author: "Sato",
    comment: "スタッフの対応が素晴らしく、すぐに再訪したいです。",
    status: "in_progress",
    receivedAt: "2025-09-24T09:00:00+09:00",
    slaDueAt: "2025-09-24T21:00:00+09:00",
  },
  {
    id: "rev-003",
    location: "池袋サンシャイン店",
    rating: 3,
    author: "匿名",
    comment: "味は良かったですが、店内が少し騒がしかったです。",
    status: "completed",
    receivedAt: "2025-09-23T19:45:00+09:00",
    slaDueAt: "2025-09-24T07:45:00+09:00",
  },
];

export async function getReviews(): Promise<ReviewItem[]> {
  await new Promise((resolve) => setTimeout(resolve, 80));
  return MOCK_REVIEWS;
}
