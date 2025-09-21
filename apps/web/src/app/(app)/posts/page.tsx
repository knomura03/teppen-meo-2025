import { Suspense } from "react";
import { SectionHeader } from "@/components/ui/section-header";
import { usePosts } from "@/lib/api/hooks";

const STATUS_STYLE: Record<string, string> = {
  draft: "bg-slate-200 text-slate-700",
  scheduled: "bg-indigo-100 text-indigo-700",
  published: "bg-emerald-100 text-emerald-700",
};

export default function PostsPage() {
  return (
    <section className="space-y-6">
      <SectionHeader
        title="ローカル投稿管理"
        description="テンプレート作成からスケジュール設定、承認フローまでを一元管理します。"
      />

      <div className="grid gap-4 lg:grid-cols-[2fr,1fr]">
        <div className="space-y-4">
          <div className="rounded-lg border border-slate-200 bg-white p-4 text-sm text-slate-600 shadow-sm">
            <p className="font-medium text-slate-700">カレンダー表示 (Coming Soon)</p>
            <p className="mt-1 text-xs text-slate-500">
              週 / 月ビューで投稿スケジュールを可視化し、ドラッグ & ドロップで調整予定。
            </p>
          </div>

          <Suspense fallback={<div className="text-sm text-slate-500">Loading posts...</div>}>
            <PostsTable />
          </Suspense>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-slate-700">実装メモ</h3>
          <ul className="list-disc space-y-2 pl-5 text-sm text-slate-600">
            <li>リッチテキスト + 画像アップロードに対応した投稿エディタ</li>
            <li>配信対象店舗の一括選択とプレビュー</li>
            <li>承認フローとスケジュールの整合性チェック</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

function PostsTable() {
  const { data } = usePosts();
  const posts = data?.data ?? [];

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <table className="min-w-full divide-y divide-slate-200">
        <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
          <tr>
            <th className="px-4 py-3">タイトル</th>
            <th className="px-4 py-3">ステータス</th>
            <th className="px-4 py-3">配信予定</th>
            <th className="px-4 py-3">対象店舗</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 text-sm text-slate-700">
          {posts.map((post) => (
            <tr key={post.id} className="hover:bg-slate-50">
              <td className="px-4 py-3 font-medium text-slate-900">{post.title}</td>
              <td className="px-4 py-3">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    STATUS_STYLE[post.status]
                  }`}
                >
                  {post.status.toUpperCase()}
                </span>
              </td>
              <td className="px-4 py-3 text-xs text-slate-500">
                {new Date(post.scheduledAt).toLocaleString("ja-JP", {
                  month: "numeric",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </td>
              <td className="px-4 py-3 text-xs text-slate-500">
                {post.locations.join(", ")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
