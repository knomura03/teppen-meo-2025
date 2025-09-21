import { Suspense } from "react";
import { SectionHeader } from "@/components/ui/section-header";
import { useUpdateRequests } from "@/lib/api/hooks";

const TYPE_LABEL: Record<string, string> = {
  hours: "営業時間",
  menu: "メニュー",
  attribute: "属性",
};

const STATUS_BADGE: Record<string, string> = {
  pending: "bg-amber-100 text-amber-800",
  approved: "bg-emerald-100 text-emerald-700",
  rejected: "bg-rose-100 text-rose-700",
};

const TIMELINE = [
  {
    id: "evt-1",
    title: "営業時間変更 受付",
    description: "渋谷スクランブル店が金曜の閉店延長を申請",
    timestamp: "2025-09-24T08:15:00+09:00",
  },
  {
    id: "evt-2",
    title: "メニュー更新 承認",
    description: "横浜みなとみらい店が秋メニューを公開",
    timestamp: "2025-09-23T18:05:00+09:00",
  },
  {
    id: "evt-3",
    title: "属性変更 差し戻し",
    description: "池袋サンシャイン店の Wi-Fi 設定を再確認",
    timestamp: "2025-09-22T15:10:00+09:00",
  },
];

export default function UpdatesPage() {
  return (
    <section className="space-y-6">
      <SectionHeader
        title="情報更新ワークフロー"
        description="営業時間や属性などの更新申請を承認フローと履歴で管理します。"
      />

      <Suspense fallback={<div className="text-sm text-slate-500">Loading requests...</div>}>
        <RequestsTable />
      </Suspense>

      <div className="grid gap-4 lg:grid-cols-[2fr,1fr]">
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
          <p className="font-semibold text-slate-700">TODO</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>差分比較ビューと承認モーダル</li>
            <li>承認履歴タイムラインと監査ログ</li>
            <li>フィルタリング (店舗 / 種類 / ステータス)</li>
          </ul>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-4 text-sm text-slate-600 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-700">最近のアクティビティ (モック)</h3>
          <ol className="mt-3 space-y-3 border-l-2 border-slate-200 pl-4">
            {TIMELINE.map((event) => (
              <li key={event.id} className="space-y-1">
                <p className="text-xs font-semibold text-slate-500">
                  {new Date(event.timestamp).toLocaleString("ja-JP", {
                    month: "numeric",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
                <p className="text-sm font-medium text-slate-800">{event.title}</p>
                <p className="text-xs text-slate-500">{event.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function RequestsTable() {
  const { data } = useUpdateRequests();
  const requests = data?.data ?? [];

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <table className="min-w-full divide-y divide-slate-200">
        <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
          <tr>
            <th className="px-4 py-3">店舗</th>
            <th className="px-4 py-3">種類</th>
            <th className="px-4 py-3">概要</th>
            <th className="px-4 py-3">ステータス</th>
            <th className="px-4 py-3">申請者</th>
            <th className="px-4 py-3">申請日時</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 text-sm text-slate-700">
          {requests.map((request) => (
            <tr key={request.id} className="hover:bg-slate-50">
              <td className="px-4 py-3 font-medium text-slate-900">{request.location}</td>
              <td className="px-4 py-3 text-xs text-slate-600">
                {TYPE_LABEL[request.type] ?? request.type}
              </td>
              <td className="px-4 py-3 text-slate-600">{request.summary}</td>
              <td className="px-4 py-3">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    STATUS_BADGE[request.status]
                  }`}
                >
                  {request.status.toUpperCase()}
                </span>
              </td>
              <td className="px-4 py-3 text-xs text-slate-500">{request.submittedBy}</td>
              <td className="px-4 py-3 text-xs text-slate-500">
                {new Date(request.submittedAt).toLocaleString("ja-JP", {
                  month: "numeric",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
