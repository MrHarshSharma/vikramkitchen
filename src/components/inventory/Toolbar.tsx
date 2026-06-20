"use client";

import { CATEGORIES } from "@/lib/inventory/types";
import { inputClass } from "./ui";

// Native arrow removed (appearance-none) so we can draw our own chevron with
// proper spacing; pr-8 leaves room for it.
const selectClass =
  "w-full appearance-none rounded-lg border border-black/10 bg-cream/40 pl-3 pr-8 py-2 text-sm text-dark outline-none transition-colors cursor-pointer focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20";

// A styled <select> with a custom chevron. Layout classes (flex-1, min-w) go on the wrapper.
function Select({
  className = "",
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <select {...props} className={selectClass} />
      <svg
        viewBox="0 0 24 24"
        className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-dark/50"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <polyline points="6 9 12 15 18 9" />
      </svg>
    </div>
  );
}

export type StatusFilter = "all" | "low" | "out" | "ok";
export type SortKey = "name" | "quantity" | "value" | "category";

export interface Filters {
  search: string;
  category: string;
  status: StatusFilter;
  sort: SortKey;
}

export function Toolbar({
  filters,
  setFilters,
  onAdd,
  resultCount,
}: {
  filters: Filters;
  setFilters: (f: Filters) => void;
  onAdd: () => void;
  resultCount: number;
}) {
  const set = <K extends keyof Filters>(key: K, val: Filters[K]) =>
    setFilters({ ...filters, [key]: val });

  return (
    <div className="space-y-3">
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-dark/35 text-sm">
            🔍
          </span>
          <input
            className={`${inputClass} pl-9`}
            placeholder="Search items or suppliers…"
            value={filters.search}
            onChange={(e) => set("search", e.target.value)}
          />
        </div>
        <button
          onClick={onAdd}
          className="shrink-0 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-primary hover:bg-primary-dark text-white font-semibold transition-colors shadow-lg shadow-primary/25"
        >
          <span className="text-lg leading-none">＋</span> Add Item
        </button>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="flex flex-1 flex-wrap gap-2">
          <Select
            className="flex-1 min-w-[130px]"
            value={filters.category}
            onChange={(e) => set("category", e.target.value)}
          >
            <option value="all">All categories</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </Select>

          <Select
            className="flex-1 min-w-[120px]"
            value={filters.status}
            onChange={(e) => set("status", e.target.value as StatusFilter)}
          >
            <option value="all">All stock</option>
            <option value="ok">In stock</option>
            <option value="low">Low stock</option>
            <option value="out">Out of stock</option>
          </Select>

          <Select
            className="flex-1 min-w-[140px]"
            value={filters.sort}
            onChange={(e) => set("sort", e.target.value as SortKey)}
          >
            <option value="name">Sort: Name</option>
            <option value="category">Sort: Category</option>
            <option value="quantity">Sort: Quantity</option>
            <option value="value">Sort: Stock value</option>
          </Select>
        </div>

        <span className="shrink-0 text-xs text-dark/50 sm:text-right">
          {resultCount} item{resultCount === 1 ? "" : "s"}
        </span>
      </div>
    </div>
  );
}
