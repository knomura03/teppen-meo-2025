export type PostStatus = "draft" | "scheduled" | "published";

export type LocalPost = {
  id: string;
  title: string;
  scheduledAt: string;
  status: PostStatus;
  locations: string[];
};

export const MOCK_POSTS: LocalPost[] = [
  {
    id: "post-201",
    title: "秋の味覚フェア開始",
    scheduledAt: "2025-09-30T10:00:00+09:00",
    status: "scheduled",
    locations: ["渋谷スクランブル店", "新宿南口店"],
  },
  {
    id: "post-202",
    title: "レビューキャンペーン開催中",
    scheduledAt: "2025-09-25T09:00:00+09:00",
    status: "published",
    locations: ["横浜みなとみらい店"],
  },
  {
    id: "post-203",
    title: "ハロウィン限定メニュー準備中",
    scheduledAt: "2025-10-05T12:00:00+09:00",
    status: "draft",
    locations: ["池袋サンシャイン店"],
  },
];

export async function getLocalPosts(): Promise<LocalPost[]> {
  await new Promise((resolve) => setTimeout(resolve, 80));
  return MOCK_POSTS;
}
