import { SectionHeader } from "@/components/ui/section-header";
import { StatCard } from "@/components/ui/stat-card";
import { useAnalyticsSummary } from "@/lib/api/hooks";

export default function ReportsPage() {
  const { data } = useAnalyticsSummary();
  const summary = data?.summary;
  const locations = data?.locations ?? [];

  return (
    <section className="space-y-6">
      <SectionHeader
        title="レポート & KPI"
        description="レビュー・投稿・来店指標を組み合わせたモニタリングビューです。"
      />

      {summary ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            label="レビュークリック率"
            value={`${Math.round(summary.reviewClickRate * 100)}%`}
            helper="来店/予約への誘導"
          />
          <StatCard
            label="レビュー獲得数"
            value={`${summary.reviewCount.toLocaleString()} 件`}
            helper="直近 30 日"
          />
          <StatCard
            label="SLA 遵守率"
            value={`${Math.round(summary.slaCompliance * 100)}%`}
            helper="Must 指標"
          />
          <StatCard
            label="投稿 CTR"
            value={`${Math.round(summary.postClickThrough * 100)}%`}
            helper="投稿→サイト遷移"
          />
        </div>
      ) : (
        <div className="rounded-lg border border-slate-200 bg-white p-4 text-sm text-slate-600">
          KPI データの読込中…
        </div>
      )}

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-4 py-3">店舗</th>
              <th className="px-4 py-3">レビュー数</th>
              <th className="px-4 py-3">平均評価</th>
              <th className="px-4 py-3">クリック→来店率</th>
              <th className="px-4 py-3">SLA 遵守</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 text-sm text-slate-700">
          {locations.map((loc) => (
            <tr key={loc.id} className="hover:bg-slate-50">
              <td className="px-4 py-3 font-medium text-slate-900">{loc.location}</td>
              <td className="px-4 py-3">{loc.reviewCount}</td>
                <td className="px-4 py-3">★{loc.averageRating.toFixed(1)}</td>
                <td className="px-4 py-3 text-xs text-slate-500">
                  {Math.round(loc.clickToVisit * 100)}%
                </td>
                <td className="px-4 py-3 text-xs text-slate-500">
                  {Math.round(loc.slaCompliance * 100)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
        <p className="font-semibold text-slate-700">TODO</p>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          <li>期間・ブランド・店舗フィルタリング</li>
          <li>チャートコンポーネント (ライン / 棒グラフ)</li>
          <li>レポート出力 (CSV / PDF) と自動配信</li>
        </ul>
      </div>
    </section>
  );
}
