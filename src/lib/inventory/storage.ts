// localStorage-backed persistence + first-run seed data.
// Everything here is browser-only; callers must guard with a hydration flag.

import type { Category, InventoryItem, Transaction, Unit } from "./types";
import { CATEGORIES, UNITS } from "./types";

const ITEMS_KEY = "vk_inventory_items_v1";
const LOG_KEY = "vk_inventory_log_v1";
export const AUTH_KEY = "vk_inventory_auth";

const isBrowser = () => typeof window !== "undefined";

export function newId(): string {
  if (isBrowser() && "randomUUID" in crypto) return crypto.randomUUID();
  return `id_${Math.random().toString(36).slice(2)}${Date.now().toString(36)}`;
}

// ---- Items ----

function isValidItem(x: unknown): x is InventoryItem {
  if (!x || typeof x !== "object") return false;
  const i = x as Record<string, unknown>;
  return (
    typeof i.id === "string" &&
    typeof i.name === "string" &&
    CATEGORIES.includes(i.category as Category) &&
    UNITS.includes(i.unit as Unit) &&
    typeof i.quantity === "number" &&
    typeof i.reorderLevel === "number" &&
    typeof i.costPerUnit === "number"
  );
}

export function loadItems(): InventoryItem[] {
  if (!isBrowser()) return [];
  const raw = window.localStorage.getItem(ITEMS_KEY);
  if (raw === null) {
    const seed = seedItems();
    saveItems(seed);
    return seed;
  }
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    // Backfill fields added in later versions so older saved data stays valid.
    return parsed.filter(isValidItem).map((it) => ({ ...it, supplierPhone: it.supplierPhone ?? "" }));
  } catch {
    return [];
  }
}

export function saveItems(items: InventoryItem[]): void {
  if (!isBrowser()) return;
  window.localStorage.setItem(ITEMS_KEY, JSON.stringify(items));
}

// ---- Activity log ----

export function loadLog(): Transaction[] {
  if (!isBrowser()) return [];
  const raw = window.localStorage.getItem(LOG_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveLog(log: Transaction[]): void {
  if (!isBrowser()) return;
  window.localStorage.setItem(LOG_KEY, JSON.stringify(log));
}

// ---- Seed ----

// Realistic starter stock for a pure-veg multi-cuisine kitchen.
export function seedItems(): InventoryItem[] {
  const now = new Date().toISOString();
  const make = (
    name: string,
    category: Category,
    unit: Unit,
    quantity: number,
    reorderLevel: number,
    costPerUnit: number,
    supplier: string,
    supplierPhone: string,
  ): InventoryItem => ({
    id: newId(),
    name,
    category,
    unit,
    quantity,
    reorderLevel,
    costPerUnit,
    supplier,
    supplierPhone,
    notes: "",
    createdAt: now,
    updatedAt: now,
  });

  // Supplier phone numbers below are sample placeholders — edit each item with
  // the real WhatsApp number (include the country code, e.g. 91 for India).
  return [
    make("Basmati Rice", "Grains & Flour", "kg", 45, 15, 95, "Shree Agro Traders", "919000000011"),
    make("Wheat Flour (Atta)", "Grains & Flour", "kg", 8, 20, 42, "Shree Agro Traders", "919000000011"),
    make("Toor Dal", "Pulses & Lentils", "kg", 22, 10, 130, "Mahalaxmi Provision", "919000000022"),
    make("Urad Dal", "Pulses & Lentils", "kg", 6, 8, 145, "Mahalaxmi Provision", "919000000022"),
    make("Paneer", "Dairy", "kg", 4, 6, 320, "Gokul Dairy", "919000000033"),
    make("Milk", "Dairy", "L", 30, 20, 56, "Gokul Dairy", "919000000033"),
    make("Curd", "Dairy", "kg", 12, 8, 80, "Gokul Dairy", "919000000033"),
    make("Tomato", "Vegetables", "kg", 18, 12, 38, "Kalamna Mandi", "919000000044"),
    make("Onion", "Vegetables", "kg", 35, 20, 32, "Kalamna Mandi", "919000000044"),
    make("Potato", "Vegetables", "kg", 40, 20, 28, "Kalamna Mandi", "919000000044"),
    make("Green Chilli", "Vegetables", "kg", 2, 3, 60, "Kalamna Mandi", "919000000044"),
    make("Refined Oil", "Oils & Ghee", "L", 25, 15, 140, "Mahalaxmi Provision", "919000000022"),
    make("Pure Ghee", "Oils & Ghee", "kg", 3, 5, 620, "Gokul Dairy", "919000000033"),
    make("Garam Masala", "Spices & Masala", "kg", 1.5, 2, 480, "Everest Distributor", "919000000055"),
    make("Turmeric Powder", "Spices & Masala", "kg", 4, 2, 220, "Everest Distributor", "919000000055"),
    make("Soft Drink (300ml)", "Beverages", "bottle", 60, 48, 18, "Local Beverages Co.", "919000000066"),
    make("Paper Napkins", "Packaging", "packet", 14, 10, 35, "City Packaging", "919000000077"),
    make("Parcel Boxes", "Packaging", "pcs", 120, 100, 6, "City Packaging", "919000000077"),
    make("Dishwash Liquid", "Cleaning", "L", 5, 4, 95, "City Packaging", "919000000077"),
  ];
}
