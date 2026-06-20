"use client";

import { useState } from "react";
import {
  formatINR,
  formatQty,
  itemValue,
  stockStatus,
  type InventoryItem,
  type StockStatus,
} from "@/lib/inventory/types";

const statusStyles: Record<StockStatus, { label: string; cls: string; dot: string }> = {
  ok: { label: "In stock", cls: "bg-primary/10 text-primary-dark", dot: "bg-primary" },
  low: { label: "Low", cls: "bg-amber-100 text-amber-700", dot: "bg-amber-500" },
  out: { label: "Out", cls: "bg-red-100 text-red-700", dot: "bg-red-500" },
};

function StatusBadge({ item }: { item: InventoryItem }) {
  const s = statusStyles[stockStatus(item)];
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${s.cls}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
      {s.label}
    </span>
  );
}

export interface ItemActions {
  onStockIn: (i: InventoryItem) => void;
  onStockOut: (i: InventoryItem) => void;
  onAdjust: (i: InventoryItem) => void;
  onEdit: (i: InventoryItem) => void;
  onDelete: (i: InventoryItem) => void;
}

const pill =
  "px-2.5 py-1.5 rounded-md text-xs font-semibold transition-colors whitespace-nowrap";

function RowMenu({ item, a }: { item: InventoryItem; a: ItemActions }) {
  const [open, setOpen] = useState(false);
  const entries = [
    { label: "Adjust count", fn: () => a.onAdjust(item) },
    { label: "Edit item", fn: () => a.onEdit(item) },
    { label: "Delete", fn: () => a.onDelete(item), danger: true },
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="More actions"
        aria-expanded={open}
        className={`grid place-items-center w-8 h-8 rounded-md text-lg leading-none text-dark/55 hover:bg-black/5 hover:text-dark transition-colors ${
          open ? "bg-black/5 text-dark" : ""
        }`}
      >
        ⋮
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-20" onClick={() => setOpen(false)} aria-hidden />
          <div className="absolute right-0 top-full mt-1 z-30 w-44 bg-white rounded-xl shadow-xl ring-1 ring-black/10 py-1.5">
            {entries.map((e) => (
              <button
                key={e.label}
                onClick={() => {
                  e.fn();
                  setOpen(false);
                }}
                className={`block w-full text-left px-4 py-2 text-sm font-medium transition-colors ${
                  e.danger ? "text-red-600 hover:bg-red-50" : "text-dark/75 hover:bg-black/5"
                }`}
              >
                {e.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function RowActions({ item, a }: { item: InventoryItem; a: ItemActions }) {
  return (
    <div className="flex items-center gap-1.5">
      <button
        onClick={() => a.onStockIn(item)}
        className={`${pill} bg-primary/10 text-primary-dark hover:bg-primary/20`}
      >
        + In
      </button>
      <button
        onClick={() => a.onStockOut(item)}
        className={`${pill} bg-amber-100 text-amber-700 hover:bg-amber-200`}
      >
        − Out
      </button>
      <RowMenu item={item} a={a} />
    </div>
  );
}

export function ItemTable({ items, actions }: { items: InventoryItem[]; actions: ItemActions }) {
  if (items.length === 0) {
    return (
      <div className="text-center py-16 px-4">
        <div className="text-4xl mb-3">📦</div>
        <p className="text-dark/70 font-medium">No items match your filters.</p>
        <p className="text-dark/45 text-sm mt-1">Try clearing the search or add a new item.</p>
      </div>
    );
  }

  return (
    <>
      {/* Desktop / tablet table */}
      <div className="hidden md:block">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="text-left text-[11px] uppercase tracking-wider text-dark/45 border-b border-black/10">
              <th className="py-3 pr-3 font-semibold">Item</th>
              <th className="py-3 px-3 font-semibold">Category</th>
              <th className="py-3 px-3 font-semibold">Stock</th>
              <th className="py-3 px-3 font-semibold">Value</th>
              <th className="py-3 px-3 font-semibold">Status</th>
              <th className="py-3 pl-3 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((it) => (
              <tr key={it.id} className="border-b border-black/5 hover:bg-cream/40 transition-colors">
                <td className="py-3.5 pr-3">
                  <p className="font-semibold text-dark text-[15px] leading-tight">{it.name}</p>
                  {it.supplier && <p className="text-xs text-dark/45 mt-0.5">{it.supplier}</p>}
                </td>
                <td className="py-3.5 px-3 text-dark/65">{it.category}</td>
                <td className="py-3.5 px-3 tabular-nums whitespace-nowrap">
                  <span className="font-semibold text-dark text-[15px]">{formatQty(it.quantity)}</span>{" "}
                  <span className="text-dark/45 text-xs">{it.unit}</span>
                  <div className="text-xs text-dark/40 mt-0.5">reorder ≤ {formatQty(it.reorderLevel)}</div>
                </td>
                <td className="py-3.5 px-3 tabular-nums text-dark/80 font-medium whitespace-nowrap">
                  {formatINR(itemValue(it))}
                </td>
                <td className="py-3.5 px-3">
                  <StatusBadge item={it} />
                </td>
                <td className="py-3.5 pl-3">
                  <div className="flex justify-end">
                    <RowActions item={it} a={actions} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden space-y-3">
        {items.map((it) => (
          <div key={it.id} className="rounded-xl border border-black/10 p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="font-semibold text-dark text-[15px] leading-tight truncate">{it.name}</p>
                <p className="text-xs text-dark/45 mt-0.5">
                  {it.category}
                  {it.supplier ? ` · ${it.supplier}` : ""}
                </p>
              </div>
              <StatusBadge item={it} />
            </div>
            <div className="mt-3 flex items-center justify-between text-sm border-t border-black/5 pt-3">
              <span className="tabular-nums">
                <span className="font-semibold text-dark text-[15px]">{formatQty(it.quantity)}</span>{" "}
                <span className="text-dark/45 text-xs">{it.unit}</span>
                <span className="text-dark/40 text-xs"> · reorder ≤ {formatQty(it.reorderLevel)}</span>
              </span>
              <span className="tabular-nums text-dark/75 font-medium">{formatINR(itemValue(it))}</span>
            </div>
            <div className="mt-3 flex justify-end">
              <RowActions item={it} a={actions} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
