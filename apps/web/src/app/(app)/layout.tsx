import type { ReactNode } from "react";
import { AppNav } from "@/components/navigation/app-nav";

export default function AppLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-6 py-8 lg:px-8">
        <header className="flex flex-col gap-2">
          <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            TEPPEN MEO
          </span>
          <h1 className="text-2xl font-semibold text-slate-900">
            オペレーションコマンドセンター
          </h1>
          <p className="text-sm text-slate-600">
            多店舗運用の主要ワークフローを順番に実装していく進行中のビルドです。
          </p>
        </header>
        <div className="flex flex-col gap-6 md:flex-row md:items-start">
          <AppNav />
          <main className="flex-1 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
