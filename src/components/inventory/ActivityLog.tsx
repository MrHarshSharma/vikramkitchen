"use client";

import { useInventory } from "./InventoryProvider";
import { formatQty, timeAgo, type TxnType } from "@/lib/inventory/types";

const meta: Record<TxnType, { icon: string; cls: string }> = {
  in: { icon: "↓", cls: "text-primary-dark bg-primary/10" },
  out: { icon: "↑", cls: "text-amber-700 bg-amber-100" },
  adjust: { icon: "≈", cls: "text-dark/70 bg-black/5" },
  create: { icon: "+", cls: "text-primary-dark bg-primary/10" },
  edit: { icon: "✎", cls: "text-dark/70 bg-black/5" },
  delete: { icon: "✕", cls: "text-red-600 bg-red-100" },
};

export function ActivityLog({ onViewAll }: { onViewAll: () => void }) {
  const { log } = useInventory();

  return (
    <div className="bg-white rounded-2xl shadow-sm ring-1 ring-black/5 p-5">
      <div className="flex items-center justify-between gap-3">
        <h3
          className="text-base font-semibold text-dark"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Recent Activity
        </h3>
        {log.length > 0 && (
          <button
            onClick={onViewAll}
            className="text-[13px] font-semibold text-primary hover:text-primary-dark transition-colors"
          >
            View all →
          </button>
        )}
      </div>

      {log.length === 0 ? (
        <p className="text-sm text-dark/50 mt-4">No activity recorded yet.</p>
      ) : (
        <ul className="mt-4 space-y-3.5 max-h-[380px] overflow-y-auto pr-3">
          {log.slice(0, 30).map((t) => (
            <li key={t.id} className="flex gap-3">
              <span
                className={`grid place-items-center w-7 h-7 shrink-0 rounded-full text-sm font-bold ${meta[t.type].cls}`}
              >
                {meta[t.type].icon}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline justify-between gap-2">
                  <p className="text-sm font-semibold text-dark truncate">{t.itemName}</p>
                  {t.delta !== 0 && (
                    <span
                      className={`shrink-0 text-[13px] font-bold tabular-nums ${
                        t.delta > 0 ? "text-primary-dark" : "text-amber-700"
                      }`}
                    >
                      {t.delta > 0 ? "+" : ""}
                      {formatQty(t.delta)}
                    </span>
                  )}
                </div>
                <p className="text-[13px] text-dark/55 truncate">{t.reason}</p>
                <p className="text-xs text-dark/40 mt-0.5">{timeAgo(t.at)}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
