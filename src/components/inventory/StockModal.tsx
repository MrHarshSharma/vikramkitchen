"use client";

import { useEffect, useState } from "react";
import { useInventory } from "./InventoryProvider";
import { Field, inputClass, Modal } from "./ui";
import { formatQty, type InventoryItem } from "@/lib/inventory/types";

type Mode = "in" | "out" | "adjust";

const config: Record<Mode, { title: string; verb: string; tone: string }> = {
  in: { title: "Stock In", verb: "Add to stock", tone: "bg-primary hover:bg-primary-dark" },
  out: { title: "Stock Out", verb: "Remove from stock", tone: "bg-amber-600 hover:bg-amber-700" },
  adjust: { title: "Adjust Count", verb: "Set new count", tone: "bg-dark hover:bg-black" },
};

export function StockModal({
  item,
  mode,
  onClose,
}: {
  item: InventoryItem | null;
  mode: Mode;
  onClose: () => void;
}) {
  const { moveStock } = useInventory();
  const [amount, setAmount] = useState("");
  const [reason, setReason] = useState("");

  // Seed the form whenever a new item/mode is selected.
  useEffect(() => {
    if (item) {
      /* eslint-disable react-hooks/set-state-in-effect */
      setAmount(mode === "adjust" ? String(item.quantity) : "");
      setReason("");
      /* eslint-enable react-hooks/set-state-in-effect */
    }
  }, [item, mode]);

  if (!item) return null;
  const cfg = config[mode];
  const value = Number(amount) || 0;

  const exceedsStock = mode === "out" && value > item.quantity;

  const projected =
    mode === "adjust"
      ? Math.max(0, value)
      : mode === "in"
        ? item.quantity + Math.abs(value)
        : Math.max(0, item.quantity - Math.abs(value));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode !== "adjust" && value <= 0) return;
    if (exceedsStock) return;
    moveStock(item.id, mode, value, reason);
    onClose();
  };

  return (
    <Modal open={!!item} onClose={onClose} title={`${cfg.title} · ${item.name}`} maxWidth="max-w-md">
      <form onSubmit={submit} className="space-y-4">
        <div className="flex items-center justify-between rounded-xl bg-cream/60 px-4 py-3 text-sm">
          <span className="text-dark/60">Current stock</span>
          <span className="font-bold text-dark">
            {formatQty(item.quantity)} {item.unit}
          </span>
        </div>

        <Field
          label={mode === "adjust" ? `New counted quantity (${item.unit})` : `Quantity to ${mode === "in" ? "add" : "remove"} (${item.unit})`}
        >
          <input
            type="number"
            min={0}
            max={mode === "out" ? item.quantity : undefined}
            step="any"
            autoFocus
            className={`${inputClass} ${exceedsStock ? "!border-red-400 !ring-red-200 focus:!border-red-400" : ""}`}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0"
          />
          {exceedsStock && (
            <p className="mt-1.5 text-xs font-medium text-red-600">
              Cannot remove more than the current stock ({formatQty(item.quantity)} {item.unit}).
            </p>
          )}
        </Field>

        <Field label="Reason / Note" hint="Optional — kept in the activity log">
          <input
            className={inputClass}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder={
              mode === "in"
                ? "e.g. Delivery from supplier"
                : mode === "out"
                  ? "e.g. Used for lunch service"
                  : "e.g. Physical stock count"
            }
          />
        </Field>

        <div className="flex items-center justify-between rounded-xl border border-dashed border-primary/30 px-4 py-3 text-sm">
          <span className="text-dark/60">New stock will be</span>
          <span className="font-bold text-primary-dark">
            {formatQty(projected)} {item.unit}
          </span>
        </div>

        <div className="flex gap-3 pt-1">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2.5 rounded-lg border border-black/10 text-dark/70 font-semibold hover:bg-black/5 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={exceedsStock}
            className={`flex-1 py-2.5 rounded-lg text-white font-semibold transition-colors shadow-lg ${cfg.tone} disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none`}
          >
            {cfg.verb}
          </button>
        </div>
      </form>
    </Modal>
  );
}
