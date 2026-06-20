"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { useInventory } from "./InventoryProvider";
import { stockStatus } from "@/lib/inventory/types";

type IconProps = { className?: string };

function BoxIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <path d="M3.27 6.96 12 12.01l8.73-5.05" />
      <path d="M12 22.08V12" />
    </svg>
  );
}

function AlertTriangleIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
    </svg>
  );
}

function BanIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <path d="m5.64 5.64 12.72 12.72" />
    </svg>
  );
}

export function StatsCards() {
  const { items } = useInventory();

  const stats = useMemo(() => {
    let low = 0;
    let out = 0;
    for (const it of items) {
      const s = stockStatus(it);
      if (s === "low") low += 1;
      if (s === "out") out += 1;
    }
    return { count: items.length, low, out };
  }, [items]);

  const cards = [
    {
      label: "Total Items",
      value: String(stats.count),
      sub: "tracked in inventory",
      Icon: BoxIcon,
      bar: "bg-primary",
      iconColor: "text-primary",
      accent: "text-dark",
    },
    {
      label: "Low Stock",
      value: String(stats.low),
      sub: "need reordering soon",
      Icon: AlertTriangleIcon,
      bar: "bg-amber-400",
      iconColor: "text-amber-500",
      accent: stats.low ? "text-amber-600" : "text-dark/40",
    },
    {
      label: "Out of Stock",
      value: String(stats.out),
      sub: "fully depleted",
      Icon: BanIcon,
      bar: "bg-red-400",
      iconColor: "text-red-400",
      accent: stats.out ? "text-red-600" : "text-dark/40",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
      {cards.map((c, i) => (
        <motion.div
          key={c.label}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
          className="relative overflow-hidden bg-white rounded-2xl p-4 sm:p-5 shadow-sm ring-1 ring-black/5"
        >
          <span className={`absolute left-0 top-0 h-full w-1 ${c.bar}`} aria-hidden />
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-dark/45">
              {c.label}
            </p>
            <c.Icon className={`w-5 h-5 ${c.iconColor}`} />
          </div>
          <p className={`mt-2.5 text-2xl sm:text-[28px] font-bold leading-none tabular-nums ${c.accent}`}>
            {c.value}
          </p>
          <p className="mt-2 text-xs text-dark/45">{c.sub}</p>
        </motion.div>
      ))}
    </div>
  );
}
