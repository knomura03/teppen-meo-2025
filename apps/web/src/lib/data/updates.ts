export type UpdateRequestType = "hours" | "menu" | "attribute";
export type UpdateRequestStatus = "pending" | "approved" | "rejected";

export type UpdateRequest = {
  id: string;
  location: string;
  type: UpdateRequestType;
  submittedBy: string;
  status: UpdateRequestStatus;
  submittedAt: string;
  summary: string;
};

export const MOCK_REQUESTS: UpdateRequest[] = [
  {
    id: "req-101",
    location: "渋谷スクランブル店",
    type: "hours",
    submittedBy: "store_manager@shibuya",
    status: "pending",
    submittedAt: "2025-09-24T08:15:00+09:00",
    summary: "金曜の閉店時間を 23:00 → 24:00 へ延長",
  },
  {
    id: "req-102",
    location: "横浜みなとみらい店",
    type: "menu",
    submittedBy: "store_manager@yokohama",
    status: "approved",
    submittedAt: "2025-09-23T17:10:00+09:00",
    summary: "秋季限定メニューを追加",
  },
  {
    id: "req-103",
    location: "池袋サンシャイン店",
    type: "attribute",
    submittedBy: "store_manager@ikebukuro",
    status: "rejected",
    submittedAt: "2025-09-22T14:42:00+09:00",
    summary: "Wi-Fi あり → なし (誤情報修正)",
  },
];

export async function getUpdateRequests(): Promise<UpdateRequest[]> {
  await new Promise((resolve) => setTimeout(resolve, 80));
  return MOCK_REQUESTS;
}
