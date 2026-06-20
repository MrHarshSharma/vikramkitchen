// Domain model for the restaurant inventory system.
// All data lives client-side (localStorage) — see ./storage.ts.

export const UNITS = [
  "kg",
  "g",
  "L",
  "ml",
  "pcs",
  "packet",
  "dozen",
  "bag",
  "bottle",
] as const;
export type Unit = (typeof UNITS)[number];

export const CATEGORIES = [
  "Vegetables",
  "Fruits",
  "Grains & Flour",
  "Pulses & Lentils",
  "Dairy",
  "Spices & Masala",
  "Oils & Ghee",
  "Beverages",
  "Snacks",
  "Packaging",
  "Cleaning",
  "Other",
] as const;
export type Category = (typeof CATEGORIES)[number];

export interface InventoryItem {
  id: string;
  name: string;
  category: Category;
  unit: Unit;
  quantity: number;
  reorderLevel: number; // low-stock threshold
  costPerUnit: number; // ₹ per unit
  supplier: string;
  supplierPhone: string; // for WhatsApp reorder (digits, ideally with country code)
  notes: string;
  createdAt: string; // ISO
  updatedAt: string; // ISO
}

// Movement / audit log entries.
export type TxnType = "in" | "out" | "adjust" | "create" | "edit" | "delete";

export interface Transaction {
  id: string;
  itemId: string;
  itemName: string;
  type: TxnType;
  delta: number; // signed change in quantity (0 for create/edit/delete bookkeeping)
  resultingQty: number;
  reason: string;
  at: string; // ISO
}

export const TXN_LABELS: Record<TxnType, string> = {
  in: "Stock In",
  out: "Stock Out",
  adjust: "Adjustment",
  create: "Item Created",
  edit: "Item Edited",
  delete: "Item Deleted",
};

export function formatDateTime(iso: string): string {
  return new Date(iso).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

export function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const min = Math.floor(diff / 60000);
  if (min < 1) return "just now";
  if (min < 60) return `${min}m ago`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr}h ago`;
  const day = Math.floor(hr / 24);
  if (day < 7) return `${day}d ago`;
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short" });
}

export type StockStatus = "out" | "low" | "ok";

export function stockStatus(item: InventoryItem): StockStatus {
  if (item.quantity <= 0) return "out";
  if (item.quantity <= item.reorderLevel) return "low";
  return "ok";
}

export const itemValue = (i: InventoryItem) => i.quantity * i.costPerUnit;

export const formatINR = (n: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number.isFinite(n) ? n : 0);

// Trim trailing zeros for tidy quantity display (e.g. 2.50 -> "2.5", 3.00 -> "3").
export const formatQty = (n: number) =>
  Number.isFinite(n) ? parseFloat(n.toFixed(3)).toString() : "0";
