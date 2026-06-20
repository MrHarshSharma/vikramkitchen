"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { InventoryItem, Transaction, TxnType } from "@/lib/inventory/types";
import {
  loadItems,
  loadLog,
  newId,
  saveItems,
  saveLog,
  seedItems,
} from "@/lib/inventory/storage";

export type ItemDraft = Omit<InventoryItem, "id" | "createdAt" | "updatedAt">;

type Toast = { id: string; message: string; tone: "success" | "error" | "info" };

interface InventoryContextValue {
  hydrated: boolean;
  items: InventoryItem[];
  log: Transaction[];
  addItem: (draft: ItemDraft) => void;
  updateItem: (id: string, draft: ItemDraft) => void;
  deleteItem: (id: string) => void;
  moveStock: (id: string, type: "in" | "out" | "adjust", amount: number, reason: string) => void;
  resetToSeed: () => void;
  clearAll: () => void;
  importData: (json: string) => boolean;
  exportData: () => string;
  toasts: Toast[];
  notify: (message: string, tone?: Toast["tone"]) => void;
  dismissToast: (id: string) => void;
}

const InventoryContext = createContext<InventoryContextValue | null>(null);

export function useInventory() {
  const ctx = useContext(InventoryContext);
  if (!ctx) throw new Error("useInventory must be used within <InventoryProvider>");
  return ctx;
}

const MAX_LOG = 300;

export function InventoryProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [log, setLog] = useState<Transaction[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Load from localStorage after mount. Reading on mount (not via lazy initial
  // state) is the SSR-safe pattern: the server renders empty, then the client
  // hydrates the persisted data without a markup mismatch.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setItems(loadItems());
    setLog(loadLog());
    setHydrated(true);
  }, []);

  // Persist on change, but only once we've hydrated real data.
  useEffect(() => {
    if (hydrated) saveItems(items);
  }, [items, hydrated]);
  useEffect(() => {
    if (hydrated) saveLog(log);
  }, [log, hydrated]);

  const dismissToast = useCallback((id: string) => {
    setToasts((t) => t.filter((x) => x.id !== id));
  }, []);

  const notify = useCallback(
    (message: string, tone: Toast["tone"] = "success") => {
      const id = newId();
      setToasts((t) => [...t, { id, message, tone }]);
      setTimeout(() => dismissToast(id), 3200);
    },
    [dismissToast],
  );

  const record = useCallback(
    (entry: { itemId: string; itemName: string; type: TxnType; delta: number; resultingQty: number; reason: string }) => {
      const txn: Transaction = { id: newId(), at: new Date().toISOString(), ...entry };
      setLog((prev) => [txn, ...prev].slice(0, MAX_LOG));
    },
    [],
  );

  const addItem = useCallback(
    (draft: ItemDraft) => {
      const now = new Date().toISOString();
      const item: InventoryItem = { ...draft, id: newId(), createdAt: now, updatedAt: now };
      setItems((prev) => [...prev, item]);
      record({
        itemId: item.id,
        itemName: item.name,
        type: "create",
        delta: item.quantity,
        resultingQty: item.quantity,
        reason: "Item added to inventory",
      });
      notify(`Added “${item.name}”`);
    },
    [record, notify],
  );

  const updateItem = useCallback(
    (id: string, draft: ItemDraft) => {
      setItems((prev) =>
        prev.map((it) =>
          it.id === id ? { ...it, ...draft, updatedAt: new Date().toISOString() } : it,
        ),
      );
      record({
        itemId: id,
        itemName: draft.name,
        type: "edit",
        delta: 0,
        resultingQty: draft.quantity,
        reason: "Item details updated",
      });
      notify(`Updated “${draft.name}”`);
    },
    [record, notify],
  );

  const deleteItem = useCallback(
    (id: string) => {
      const target = items.find((it) => it.id === id);
      setItems((prev) => prev.filter((it) => it.id !== id));
      if (target) {
        record({
          itemId: id,
          itemName: target.name,
          type: "delete",
          delta: -target.quantity,
          resultingQty: 0,
          reason: "Item removed from inventory",
        });
        notify(`Deleted “${target.name}”`, "info");
      }
    },
    [items, record, notify],
  );

  const moveStock = useCallback(
    (id: string, type: "in" | "out" | "adjust", amount: number, reason: string) => {
      const target = items.find((it) => it.id === id);
      if (!target) return;

      let nextQty: number;
      let delta: number;
      if (type === "adjust") {
        nextQty = Math.max(0, amount);
        delta = nextQty - target.quantity;
      } else {
        delta = type === "in" ? Math.abs(amount) : -Math.abs(amount);
        nextQty = Math.max(0, target.quantity + delta);
        delta = nextQty - target.quantity; // clamp the recorded delta too
      }

      setItems((prev) =>
        prev.map((it) =>
          it.id === id ? { ...it, quantity: nextQty, updatedAt: new Date().toISOString() } : it,
        ),
      );
      record({
        itemId: id,
        itemName: target.name,
        type,
        delta,
        resultingQty: nextQty,
        reason: reason.trim() || defaultReason(type),
      });

      const label =
        type === "in" ? "Stock added" : type === "out" ? "Stock used" : "Stock corrected";
      notify(`${label}: ${target.name}`);
    },
    [items, record, notify],
  );

  const resetToSeed = useCallback(() => {
    const seeded = seedItems();
    setItems(seeded);
    setLog([]);
    notify("Inventory reset to sample data", "info");
  }, [notify]);

  const clearAll = useCallback(() => {
    setItems([]);
    setLog([]);
    notify("All inventory cleared", "info");
  }, [notify]);

  const exportData = useCallback(
    () => JSON.stringify({ version: 1, exportedAt: new Date().toISOString(), items, log }, null, 2),
    [items, log],
  );

  const importData = useCallback(
    (json: string) => {
      try {
        const parsed = JSON.parse(json);
        const nextItems = Array.isArray(parsed) ? parsed : parsed.items;
        if (!Array.isArray(nextItems)) throw new Error("No items array found");
        setItems(nextItems);
        if (Array.isArray(parsed.log)) setLog(parsed.log);
        notify(`Imported ${nextItems.length} item(s)`);
        return true;
      } catch {
        notify("Import failed — invalid file", "error");
        return false;
      }
    },
    [notify],
  );

  const value = useMemo<InventoryContextValue>(
    () => ({
      hydrated,
      items,
      log,
      addItem,
      updateItem,
      deleteItem,
      moveStock,
      resetToSeed,
      clearAll,
      importData,
      exportData,
      toasts,
      notify,
      dismissToast,
    }),
    [
      hydrated,
      items,
      log,
      addItem,
      updateItem,
      deleteItem,
      moveStock,
      resetToSeed,
      clearAll,
      importData,
      exportData,
      toasts,
      notify,
      dismissToast,
    ],
  );

  return <InventoryContext.Provider value={value}>{children}</InventoryContext.Provider>;
}

function defaultReason(type: "in" | "out" | "adjust") {
  if (type === "in") return "Stock received";
  if (type === "out") return "Consumed in kitchen";
  return "Manual stock count correction";
}
