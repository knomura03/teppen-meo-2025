import { StatCard } from "@/components/ui/stat-card";
import { getDashboardSummary } from "@/lib/data/dashboard";

export default async function DashboardPage() {
  const summary = await getDashboardSummary();

  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold text-slate-900">ダッシュボード</h2>
        <p className="text-sm text-slate-600">
          KPI ハイライトと SLA アラート、店舗フィルタリングを表示するトップビューです。
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <StatCard
          label="レビュー獲得数 (直近30日)"
          value={`${summary.reviewCount.toLocaleString()} 件`}
          helper="PoC ダミーデータ"
        />
        <StatCard
          label="SLA 遵守率"
          value={`${Math.round(summary.slaCompliance * 100)}%`}
          helper="目標: 95% 以上"
        />
        <StatCard
          label="平均投稿頻度"
          value={`${summary.postFrequency.toFixed(1)} 回/週`}
          helper="スタータープラン基準"
        />
      </div>
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-slate-700">アラート (モック)</h3>
        <ul className="space-y-2">
          {summary.alerts.map((alert) => (
            <li
              key={alert.id}
              className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900"
            >
              <p className="font-medium">{alert.title}</p>
              <p className="text-xs text-amber-800">{alert.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
