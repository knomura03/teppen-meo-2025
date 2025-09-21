import { SectionHeader } from "@/components/ui/section-header";

export default function SettingsOverviewPage() {
  return (
    <section className="space-y-6">
      <SectionHeader
        title="設定センター"
        description="店舗・ユーザー・通知・連携設定を管理するハブです。"
        action={<span className="rounded-full bg-slate-100 px-3 py-1 text-xs">ドラフト</span>}
      />

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="space-y-3 rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <div>
            <h3 className="text-sm font-semibold text-slate-700">ロケーション管理</h3>
            <p className="mt-1 text-sm text-slate-600">
              外部 ID、住所、営業時間を統合管理し、GBP との同期状態を表示予定です。
            </p>
          </div>
          <form className="space-y-3 text-sm text-slate-600">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                店舗名
              </label>
              <input
                className="rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-900 focus:outline-none"
                placeholder="渋谷スクランブル店"
                disabled
              />
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  外部 ID
                </label>
                <input
                  className="rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-900 focus:outline-none"
                  placeholder="GBP-123456"
                  disabled
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  同期ステータス
                </label>
                <input
                  className="rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-900 focus:outline-none"
                  placeholder="連携中"
                  disabled
                />
              </div>
            </div>
            <p className="rounded-md border border-dashed border-slate-300 bg-slate-50 px-3 py-2 text-xs text-slate-500">
              店舗詳細の編集フォームは今後の実装で有効化されます。
            </p>
          </form>
        </div>

        <div className="space-y-3 rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <div>
            <h3 className="text-sm font-semibold text-slate-700">ユーザー & 権限</h3>
            <p className="mt-1 text-sm text-slate-600">
              ロールベースアクセス制御と SSO 連携の設定を提供します。
            </p>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-slate-700">
              <div>
                <p className="font-semibold">HQ 管理者</p>
                <p className="text-xs text-slate-500">レビュー承認 / 設定変更 / KPI 閲覧</p>
              </div>
              <span className="rounded-full bg-slate-200 px-3 py-1 text-xs">5 名</span>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-slate-700">
              <div>
                <p className="font-semibold">店舗マネージャー</p>
                <p className="text-xs text-slate-500">レビュー返信 / 情報更新申請</p>
              </div>
              <span className="rounded-full bg-slate-200 px-3 py-1 text-xs">18 名</span>
            </div>
            <button
              type="button"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-600 transition hover:border-slate-400 hover:bg-slate-50"
              disabled
            >
              + ユーザー招待 (準備中)
            </button>
          </div>
        </div>

        <div className="space-y-3 rounded-lg border border-slate-200 bg-white p-4 shadow-sm lg:col-span-2">
          <div>
            <h3 className="text-sm font-semibold text-slate-700">通知 & アラート</h3>
            <p className="mt-1 text-sm text-slate-600">
              SLA 通知、投稿リマインド、エラーアラートのチャネルを事前設定できます。
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              { label: "SLA 違反アラート", channel: "メール + Slack" },
              { label: "レビュー日次サマリ", channel: "メール" },
              { label: "投稿リマインド", channel: "Slack" },
            ].map((item) => (
              <div key={item.label} className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-600">
                <p className="font-semibold text-slate-700">{item.label}</p>
                <p className="mt-1 text-slate-500">{item.channel}</p>
              </div>
            ))}
          </div>
          <p className="rounded-md border border-dashed border-slate-300 bg-slate-50 px-3 py-2 text-xs text-slate-500">
            通知ルールの編集 UI とオン/オフ切り替えは次のイテレーションで実装予定です。
          </p>
        </div>
      </div>
    </section>
  );
}
