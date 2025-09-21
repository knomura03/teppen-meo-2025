"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { AppNavItem } from "@/config/navigation";
import { primaryNav, secondaryNav } from "@/config/navigation";

function NavSection({ title, items }: { title: string; items: AppNavItem[] }) {
  const pathname = usePathname();

  return (
    <nav aria-label={title} className="space-y-1">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        {title}
      </p>
      <ul className="space-y-1">
        {items.map((item) => {
          const isActive = pathname === item.href;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex flex-col rounded-lg border px-3 py-2 transition hover:border-slate-300 hover:bg-slate-50 ${
                  isActive
                    ? "border-slate-900 bg-slate-900 text-slate-50"
                    : "border-transparent text-slate-700"
                }`}
              >
                <span className="text-sm font-medium">{item.label}</span>
                <span
                  className={`text-xs ${
                    isActive ? "text-slate-200" : "text-slate-500"
                  }`}
                >
                  {item.description}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export function AppNav() {
  return (
    <aside className="flex w-full flex-col gap-6 md:w-72">
      <NavSection title="メイン" items={primaryNav} />
      <NavSection title="その他" items={secondaryNav} />
    </aside>
  );
}
