"use client";

import { useEffect, useState } from "react";
import { useInventory, type ItemDraft } from "./InventoryProvider";
import { Field, inputClass, Modal } from "./ui";
import type { Category, InventoryItem, Unit } from "@/lib/inventory/types";
import { CATEGORIES, UNITS } from "@/lib/inventory/types";

const empty: ItemDraft = {
  name: "",
  category: "Vegetables",
  unit: "kg",
  quantity: 0,
  reorderLevel: 0,
  costPerUnit: 0,
  supplier: "",
  supplierPhone: "",
  notes: "",
};

function toDraft(item: InventoryItem): ItemDraft {
  return {
    name: item.name,
    category: item.category,
    unit: item.unit,
    quantity: item.quantity,
    reorderLevel: item.reorderLevel,
    costPerUnit: item.costPerUnit,
    supplier: item.supplier,
    supplierPhone: item.supplierPhone ?? "",
    notes: item.notes,
  };
}

export function ItemFormModal({
  open,
  onClose,
  editing,
}: {
  open: boolean;
  onClose: () => void;
  editing: InventoryItem | null;
}) {
  const { addItem, updateItem } = useInventory();
  const [draft, setDraft] = useState<ItemDraft>(empty);
  const [error, setError] = useState("");

  // Sync the form to the item being edited each time the modal opens.
  useEffect(() => {
    if (open) {
      /* eslint-disable react-hooks/set-state-in-effect */
      setDraft(editing ? toDraft(editing) : empty);
      setError("");
      /* eslint-enable react-hooks/set-state-in-effect */
    }
  }, [open, editing]);

  const set = <K extends keyof ItemDraft>(key: K, val: ItemDraft[K]) =>
    setDraft((d) => ({ ...d, [key]: val }));

  const num = (v: string) => (v === "" ? 0 : Math.max(0, Number(v)));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!draft.name.trim()) {
      setError("Item name is required.");
      return;
    }
    const clean: ItemDraft = {
      ...draft,
      name: draft.name.trim(),
      supplier: draft.supplier.trim(),
      supplierPhone: draft.supplierPhone.trim(),
    };
    if (editing) updateItem(editing.id, clean);
    else addItem(clean);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title={editing ? "Edit Item" : "Add New Item"}>
      <form onSubmit={submit} className="space-y-4">
        <Field label="Item Name">
          <input
            className={inputClass}
            value={draft.name}
            onChange={(e) => set("name", e.target.value)}
            placeholder="e.g. Basmati Rice"
          />
        </Field>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Category">
            <select
              className={inputClass}
              value={draft.category}
              onChange={(e) => set("category", e.target.value as Category)}
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Unit">
            <select
              className={inputClass}
              value={draft.unit}
              onChange={(e) => set("unit", e.target.value as Unit)}
            >
              {UNITS.map((u) => (
                <option key={u} value={u}>
                  {u}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Field label={`Quantity (${draft.unit})`}>
            <input
              type="number"
              min={0}
              step="any"
              className={inputClass}
              value={draft.quantity}
              onChange={(e) => set("quantity", num(e.target.value))}
            />
          </Field>
          <Field label="Reorder Level" hint="Alert when at/below this">
            <input
              type="number"
              min={0}
              step="any"
              className={inputClass}
              value={draft.reorderLevel}
              onChange={(e) => set("reorderLevel", num(e.target.value))}
            />
          </Field>
        </div>

        <Field label={`Cost per ${draft.unit} (₹)`}>
          <input
            type="number"
            min={0}
            step="any"
            className={inputClass}
            value={draft.costPerUnit}
            onChange={(e) => set("costPerUnit", num(e.target.value))}
          />
        </Field>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Supplier">
            <input
              className={inputClass}
              value={draft.supplier}
              onChange={(e) => set("supplier", e.target.value)}
              placeholder="e.g. Kalamna Mandi"
            />
          </Field>
          <Field label="Supplier WhatsApp" hint="With country code, e.g. 9179…">
            <input
              type="tel"
              inputMode="tel"
              className={inputClass}
              value={draft.supplierPhone}
              onChange={(e) => set("supplierPhone", e.target.value)}
              placeholder="e.g. 919812345678"
            />
          </Field>
        </div>

        <Field label="Notes">
          <textarea
            className={`${inputClass} resize-none`}
            rows={2}
            value={draft.notes}
            onChange={(e) => set("notes", e.target.value)}
            placeholder="Optional"
          />
        </Field>

        {error && <p className="text-sm text-red-600">{error}</p>}

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
            className="flex-1 py-2.5 rounded-lg bg-primary hover:bg-primary-dark text-white font-semibold transition-colors shadow-lg shadow-primary/25"
          >
            {editing ? "Save Changes" : "Add Item"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
