"use client";

import { useMemo, useState } from "react";
import { useInventory } from "./InventoryProvider";
import { InventoryHeader } from "./InventoryHeader";
import { StatsCards } from "./StatsCards";
import { Toolbar, type Filters } from "./Toolbar";
import { ItemTable, type ItemActions } from "./ItemTable";
import { LowStockPanel } from "./LowStockPanel";
import { ActivityLog } from "./ActivityLog";
import { ItemFormModal } from "./ItemFormModal";
import { StockModal } from "./StockModal";
import { HistoryModal } from "./HistoryModal";
import { ConfirmDialog } from "./ConfirmDialog";
import { itemValue, stockStatus, type InventoryItem } from "@/lib/inventory/types";

type StockMode = "in" | "out" | "adjust";

export function InventoryDashboard() {
  const { hydrated, items, deleteItem } = useInventory();

  const [filters, setFilters] = useState<Filters>({
    search: "",
    category: "all",
    status: "all",
    sort: "name",
  });

  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<InventoryItem | null>(null);
  const [stock, setStock] = useState<{ item: InventoryItem; mode: StockMode } | null>(null);
  const [deleting, setDeleting] = useState<InventoryItem | null>(null);
  const [history, setHistory] = useState<{ open: boolean; item: InventoryItem | null }>({
    open: false,
    item: null,
  });

  const filtered = useMemo(() => {
    const q = filters.search.trim().toLowerCase();
    const list = items.filter((it) => {
      if (filters.category !== "all" && it.category !== filters.category) return false;
      if (filters.status !== "all" && stockStatus(it) !== filters.status) return false;
      if (q && !`${it.name} ${it.supplier}`.toLowerCase().includes(q)) return false;
      return true;
    });
    list.sort((a, b) => {
      switch (filters.sort) {
        case "quantity":
          return a.quantity - b.quantity;
        case "value":
          return itemValue(b) - itemValue(a);
        case "category":
          return a.category.localeCompare(b.category) || a.name.localeCompare(b.name);
        default:
          return a.name.localeCompare(b.name);
      }
    });
    return list;
  }, [items, filters]);

  const openAdd = () => {
    setEditing(null);
    setFormOpen(true);
  };
  const openEdit = (it: InventoryItem) => {
    setEditing(it);
    setFormOpen(true);
  };

  const actions: ItemActions = {
    onStockIn: (it) => setStock({ item: it, mode: "in" }),
    onStockOut: (it) => setStock({ item: it, mode: "out" }),
    onAdjust: (it) => setStock({ item: it, mode: "adjust" }),
    onEdit: openEdit,
    onDelete: (it) => setDeleting(it),
  };

  return (
    <div className="min-h-screen bg-[#f4f2ec]">
      <InventoryHeader />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
        <div>
          <h2
            className="text-xl sm:text-2xl font-bold text-dark"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Inventory Overview
          </h2>
          <p className="text-sm text-dark/50 mt-1">
            Track stock levels, record movements, and review history.
          </p>
        </div>

        {!hydrated ? (
          <LoadingState />
        ) : (
          <>
            <StatsCards />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <section className="lg:col-span-2 bg-white rounded-2xl shadow-sm ring-1 ring-black/5 p-5 sm:p-6 space-y-5">
                <div className="flex items-center justify-between gap-3">
                  <h3
                    className="text-base font-semibold text-dark"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    Stock Items
                  </h3>
                </div>
                <Toolbar
                  filters={filters}
                  setFilters={setFilters}
                  onAdd={openAdd}
                  resultCount={filtered.length}
                />
                <ItemTable items={filtered} actions={actions} />
              </section>

              <aside className="space-y-6">
                <LowStockPanel onRestock={(it) => setStock({ item: it, mode: "in" })} />
                <ActivityLog onViewAll={() => setHistory({ open: true, item: null })} />
              </aside>
            </div>
          </>
        )}
      </main>

      <ItemFormModal open={formOpen} editing={editing} onClose={() => setFormOpen(false)} />
      <StockModal
        item={stock?.item ?? null}
        mode={stock?.mode ?? "in"}
        onClose={() => setStock(null)}
      />
      <HistoryModal
        open={history.open}
        item={history.item}
        onClose={() => setHistory((h) => ({ ...h, open: false }))}
      />
      <ConfirmDialog
        open={!!deleting}
        title="Delete item?"
        message={`“${deleting?.name}” will be permanently removed from the inventory.`}
        confirmLabel="Delete"
        danger
        onConfirm={() => deleting && deleteItem(deleting.id)}
        onClose={() => setDeleting(null)}
      />
    </div>
  );
}

function LoadingState() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-28 bg-white/60 rounded-2xl" />
        ))}
      </div>
      <div className="h-96 bg-white/60 rounded-2xl" />
    </div>
  );
}
