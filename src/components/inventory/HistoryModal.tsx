"use client";

import { useMemo, useState } from "react";
import { useInventory } from "./InventoryProvider";
import { Modal } from "./ui";
import {
  formatDateTime,
  formatQty,
  TXN_LABELS,
  type InventoryItem,
  type Transaction,
  type TxnType,
} from "@/lib/inventory/types";

const typeMeta: Record<TxnType, { icon: string; cls: string; ring: string }> = {
  in: { icon: "↓", cls: "text-primary-dark bg-primary/10", ring: "ring-primary/20" },
  out: { icon: "↑", cls: "text-amber-700 bg-amber-100", ring: "ring-amber-200" },
  adjust: { icon: "≈", cls: "text-dark/70 bg-black/5", ring: "ring-black/10" },
  create: { icon: "+", cls: "text-primary-dark bg-primary/10", ring: "ring-primary/20" },
  edit: { icon: "✎", cls: "text-dark/70 bg-black/5", ring: "ring-black/10" },
  delete: { icon: "✕", cls: "text-red-600 bg-red-100", ring: "ring-red-200" },
};

type ChipKey = "all" | "in" | "out" | "adjust";
const chips: { key: ChipKey; label: string }[] = [
  { key: "all", label: "All" },
  { key: "in", label: "Restocks" },
  { key: "out", label: "Usage" },
  { key: "adjust", label: "Adjustments" },
];

export function HistoryModal({
  open,
  onClose,
  item,
}: {
  open: boolean;
  onClose: () => void;
  item: InventoryItem | null;
}) {
  const { log } = useInventory();
  const [filter, setFilter] = useState<ChipKey>("all");

  const entries = useMemo(() => {
    return log.filter((t) => {
      if (item && t.itemId !== item.id) return false;
      if (filter === "all") return true;
      return t.type === filter;
    });
  }, [log, item, filter]);

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={item ? `History · ${item.name}` : "Stock History"}
      maxWidth="max-w-2xl"
    >
      <div className="flex flex-wrap gap-2 mb-5">
        {chips.map((c) => (
          <button
            key={c.key}
            onClick={() => setFilter(c.key)}
            className={`px-3.5 py-1.5 rounded-full text-[13px] font-semibold transition-colors ${
              filter === c.key
                ? "bg-primary text-white shadow-sm shadow-primary/25"
                : "bg-black/5 text-dark/60 hover:bg-black/10"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {entries.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-3xl mb-2">🕑</div>
          <p className="text-sm text-dark/55">No history for this filter yet.</p>
        </div>
      ) : (
        <ol className="space-y-2.5 max-h-[58vh] overflow-y-auto pr-1">
          {entries.map((t) => (
            <HistoryRow key={t.id} txn={t} showItem={!item} />
          ))}
        </ol>
      )}
    </Modal>
  );
}

function HistoryRow({ txn, showItem }: { txn: Transaction; showItem: boolean }) {
  const m = typeMeta[txn.type];
  return (
    <li className={`flex items-start gap-3.5 rounded-xl bg-cream/40 ring-1 ${m.ring} px-3.5 py-3`}>
      <span
        className={`grid place-items-center w-9 h-9 shrink-0 rounded-full text-base font-bold ${m.cls}`}
      >
        {m.icon}
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-3">
          <p className="text-sm font-semibold text-dark truncate">
            {showItem ? txn.itemName : TXN_LABELS[txn.type]}
          </p>
          {txn.delta !== 0 && (
            <span
              className={`shrink-0 text-sm font-bold tabular-nums ${
                txn.delta > 0 ? "text-primary-dark" : "text-amber-700"
              }`}
            >
              {txn.delta > 0 ? "+" : ""}
              {formatQty(txn.delta)}
            </span>
          )}
        </div>
        <p className="text-[13px] text-dark/60 mt-0.5">
          {showItem && (
            <span className="font-medium text-dark/75">{TXN_LABELS[txn.type]} · </span>
          )}
          {txn.reason}
        </p>
        <div className="flex items-center gap-2 mt-1 text-xs text-dark/45">
          <span>{formatDateTime(txn.at)}</span>
          <span aria-hidden>·</span>
          <span className="tabular-nums">balance {formatQty(txn.resultingQty)}</span>
        </div>
      </div>
    </li>
  );
}
