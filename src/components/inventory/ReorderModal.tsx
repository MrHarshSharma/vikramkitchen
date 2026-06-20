"use client";

import { useEffect, useMemo, useState } from "react";
import { Modal, inputClass } from "./ui";
import { formatQty, type InventoryItem } from "@/lib/inventory/types";

// Single WhatsApp number the reorder message is sent to.
// Override with NEXT_PUBLIC_RESTOCK_WHATSAPP (include country code, e.g. 91 for India).
const RESTOCK_PHONE = (
  process.env.NEXT_PUBLIC_RESTOCK_WHATSAPP || "919665654326"
).replace(/\D/g, "");
const PHONE_DISPLAY = "+91 96656 54326";

export function ReorderModal({
  open,
  alerts,
  onClose,
}: {
  open: boolean;
  alerts: InventoryItem[];
  onClose: () => void;
}) {
  const [qty, setQty] = useState<Record<string, string>>({});

  // Pre-fill each item's order quantity with its reorder level when the modal opens.
  useEffect(() => {
    if (open) {
      const init: Record<string, string> = {};
      for (const it of alerts) init[it.id] = String(it.reorderLevel || 0);
      /* eslint-disable react-hooks/set-state-in-effect */
      setQty(init);
      /* eslint-enable react-hooks/set-state-in-effect */
    }
  }, [open, alerts]);

  const groups = useMemo(() => {
    const m = new Map<string, InventoryItem[]>();
    for (const it of alerts) {
      const key = it.supplier || "Unassigned supplier";
      const list = m.get(key) ?? [];
      list.push(it);
      m.set(key, list);
    }
    return Array.from(m.entries());
  }, [alerts]);

  const selectedCount = alerts.reduce(
    (n, it) => n + ((parseFloat(qty[it.id]) || 0) > 0 ? 1 : 0),
    0,
  );

  const send = () => {
    const blocks: string[] = [];
    for (const [supplier, list] of groups) {
      const lines = list
        .filter((it) => (parseFloat(qty[it.id]) || 0) > 0)
        .map((it) => `• ${it.name} — ${formatQty(parseFloat(qty[it.id]) || 0)} ${it.unit}`);
      if (lines.length) blocks.push(`*${supplier}*\n${lines.join("\n")}`);
    }
    if (!blocks.length) return;

    const message =
      `The Vikram's Kitchen — Reorder request (${selectedCount} item${selectedCount === 1 ? "" : "s"})\n\n` +
      blocks.join("\n\n");
    window.open(
      `https://wa.me/${RESTOCK_PHONE}?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener",
    );
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title="Send Reorder on WhatsApp" maxWidth="max-w-lg">
      <p className="text-sm text-dark/60 -mt-1 mb-4">
        Set the quantity to order for each item, then send. Items left at 0 are skipped. Message
        goes to <span className="font-semibold text-dark">{PHONE_DISPLAY}</span>.
      </p>

      <div className="space-y-4 max-h-[55vh] overflow-y-auto pr-1">
        {groups.map(([supplier, list]) => (
          <div key={supplier}>
            <p className="text-xs font-semibold uppercase tracking-wide text-dark/45 mb-2">
              {supplier}
            </p>
            <div className="space-y-2">
              {list.map((it) => (
                <div
                  key={it.id}
                  className="flex items-center justify-between gap-3 rounded-lg bg-cream/40 px-3 py-2"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-dark truncate">{it.name}</p>
                    <p className="text-xs text-dark/45">
                      In stock: {formatQty(it.quantity)} {it.unit} · reorder ≤{" "}
                      {formatQty(it.reorderLevel)}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <input
                      type="number"
                      min={0}
                      step="any"
                      value={qty[it.id] ?? ""}
                      onChange={(e) => setQty((q) => ({ ...q, [it.id]: e.target.value }))}
                      className={`${inputClass} w-24 text-right`}
                    />
                    <span className="text-xs text-dark/50 w-10">{it.unit}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-3 pt-5">
        <button
          type="button"
          onClick={onClose}
          className="flex-1 py-2.5 rounded-lg border border-black/10 text-dark/70 font-semibold hover:bg-black/5 transition-colors"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={send}
          disabled={selectedCount === 0}
          className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 rounded-lg bg-[#25D366] hover:bg-[#1ebe5d] text-white font-semibold transition-colors shadow-lg shadow-[#25D366]/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
        >
          Send on WhatsApp{selectedCount > 0 ? ` (${selectedCount})` : ""}
        </button>
      </div>
    </Modal>
  );
}
