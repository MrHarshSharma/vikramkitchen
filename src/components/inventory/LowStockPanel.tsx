"use client";

import { useMemo, useState } from "react";
import { useInventory } from "./InventoryProvider";
import { ReorderModal } from "./ReorderModal";
import { formatQty, stockStatus, type InventoryItem } from "@/lib/inventory/types";

export function LowStockPanel({ onRestock }: { onRestock: (i: InventoryItem) => void }) {
  const { items } = useInventory();
  const [reorderOpen, setReorderOpen] = useState(false);

  const needsAttention = useMemo(
    () =>
      items
        .filter((i) => stockStatus(i) !== "ok")
        .sort((a, b) => stockStatus(a).localeCompare(stockStatus(b))),
    [items],
  );

  return (
    <div className="bg-white rounded-2xl shadow-sm ring-1 ring-amber-200/60 p-5">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <h3
            className="text-base font-semibold text-dark"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Reorder Alerts
          </h3>
          {needsAttention.length > 0 && (
            <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 text-xs font-bold">
              {needsAttention.length}
            </span>
          )}
        </div>
        {needsAttention.length > 0 && (
          <button
            onClick={() => setReorderOpen(true)}
            title="Review quantities and send the reorder list on WhatsApp"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#25D366] hover:bg-[#1ebe5d] text-white text-xs font-semibold transition-colors shadow-sm"
          >
            <WhatsAppIcon />
            Send list
          </button>
        )}
      </div>

      {needsAttention.length === 0 ? (
        <p className="text-sm text-dark/55 mt-3">✅ Everything is well stocked.</p>
      ) : (
        <ul className="mt-4 space-y-2.5">
          {needsAttention.map((it) => {
            const out = stockStatus(it) === "out";
            return (
              <li
                key={it.id}
                className="flex items-center justify-between gap-2 rounded-lg bg-cream/50 px-3 py-2"
              >
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-dark truncate">{it.name}</p>
                  <p className={`text-[13px] ${out ? "text-red-600" : "text-amber-700"}`}>
                    {out ? "Out of stock" : `${formatQty(it.quantity)} ${it.unit} left`}
                    {it.supplier ? ` · ${it.supplier}` : ""}
                  </p>
                </div>
                <button
                  onClick={() => onRestock(it)}
                  className="shrink-0 px-3 py-1.5 rounded-md bg-primary hover:bg-primary-dark text-white text-xs font-semibold transition-colors"
                >
                  Restock
                </button>
              </li>
            );
          })}
        </ul>
      )}

      <ReorderModal
        open={reorderOpen}
        alerts={needsAttention}
        onClose={() => setReorderOpen(false)}
      />
    </div>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden>
      <path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.945C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 018.413 3.488 11.824 11.824 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.51 5.26l-.999 3.648 3.739-.957zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.247-.694.247-1.289.173-1.413z" />
    </svg>
  );
}
