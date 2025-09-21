import { Suspense } from "react";
import { SectionHeader } from "@/components/ui/section-header";
import { FilterPills } from "@/components/ui/filter-pills";
import { useReviews } from "@/lib/api/hooks";

const STATUS_LABEL: Record<string, string> = {
  pending: "Pending",
  in_progress: "In Progress",
  completed: "Completed",
  escalated: "Escalated",
};

export default function ReviewsPage() {
  return (
    <section className="space-y-6">
      <SectionHeader
        title="レビュータスク"
        description="レビューの一覧、テンプレート返信、SLA 管理のワークスペースです。"
      />

      <FilterPills
        items={[
          { value: "all", label: "All" },
          { value: "pending", label: "Pending" },
          { value: "in_progress", label: "In Progress" },
          { value: "completed", label: "Completed" },
          { value: "escalated", label: "Escalated" },
        ]}
        defaultValue="all"
      />

      <Suspense fallback={<div className="text-sm text-slate-500">Loading reviews...</div>}>
        <ReviewsTable />
      </Suspense>

      <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
        <p className="font-semibold text-slate-700">TODO</p>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          <li>タブ別のフィルタリングとページネーション</li>
          <li>レビュー詳細モーダル / ドロワー</li>
          <li>返信テンプレートと承認フロー</li>
        </ul>
      </div>
    </section>
  );
}

function ReviewsTable() {
  const { data } = useReviews();
  const reviews = data?.data ?? [];

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <table className="min-w-full divide-y divide-slate-200">
        <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
          <tr>
            <th className="px-4 py-3">店舗</th>
            <th className="px-4 py-3">評価</th>
            <th className="px-4 py-3">コメント</th>
            <th className="px-4 py-3">ステータス</th>
            <th className="px-4 py-3">SLA 期限</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 text-sm text-slate-700">
          {reviews.map((review) => (
            <tr key={review.id} className="hover:bg-slate-50">
              <td className="px-4 py-3">
                <p className="font-medium text-slate-900">{review.location}</p>
                <p className="text-xs text-slate-500">{review.author}</p>
              </td>
              <td className="px-4 py-3">
                <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-800">
                  ★{review.rating}
                </span>
              </td>
              <td className="px-4 py-3 text-slate-600">{review.comment}</td>
              <td className="px-4 py-3">
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                  {STATUS_LABEL[review.status]}
                </span>
              </td>
              <td className="px-4 py-3 text-xs text-slate-500">
                {new Date(review.slaDueAt).toLocaleString("ja-JP", {
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
