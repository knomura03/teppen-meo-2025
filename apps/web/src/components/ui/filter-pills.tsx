"use client";

import { useState } from "react";

type FilterPillsProps<T extends string> = {
  items: { value: T; label: string }[];
  defaultValue: T;
  onChange?: (value: T) => void;
};

export function FilterPills<T extends string>({
  items,
  defaultValue,
  onChange,
}: FilterPillsProps<T>) {
  const [active, setActive] = useState<T>(defaultValue);

  return (
    <div className="flex flex-wrap gap-2 text-xs">
      {items.map((item) => {
        const isActive = item.value === active;
        return (
          <button
            key={item.value}
            type="button"
            aria-pressed={isActive}
            className={`rounded-full border px-3 py-1 font-medium transition ${
              isActive
                ? "border-slate-900 bg-slate-900 text-slate-50"
                : "border-slate-200 bg-slate-100 text-slate-600 hover:border-slate-300 hover:bg-slate-50"
            }`}
            onClick={() => {
              setActive(item.value);
              onChange?.(item.value);
            }}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
