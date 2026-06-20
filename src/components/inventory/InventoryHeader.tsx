"use client";

import { useRef } from "react";
import * as XLSX from "xlsx-js-style";
import { useInventory } from "./InventoryProvider";
import { AUTH_KEY } from "@/lib/inventory/storage";
import {
  formatDateTime,
  itemValue,
  stockStatus,
  TXN_LABELS,
} from "@/lib/inventory/types";

const STATUS_LABEL = { ok: "In stock", low: "Low stock", out: "Out of stock" } as const;
// Row fill colors (hex, no #) matching the on-screen status palette.
const STATUS_FILL = { ok: "E8F0E3", low: "FDF1D6", out: "FAE0E0" } as const;
const HEADER_FILL = "EFEDE7";

// Apply a solid fill + bold header to every cell in a worksheet.
// fillForRow receives the row offset (0 = header) and returns a hex color or null.
function styleSheet(
  sheet: XLSX.WorkSheet,
  fillForRow: (rowOffset: number) => string | null,
) {
  const range = XLSX.utils.decode_range(sheet["!ref"] as string);
  for (let r = range.s.r; r <= range.e.r; r++) {
    const offset = r - range.s.r;
    const isHeader = offset === 0;
    const fill = isHeader ? HEADER_FILL : fillForRow(offset);
    for (let c = range.s.c; c <= range.e.c; c++) {
      const cell = sheet[XLSX.utils.encode_cell({ r, c })];
      if (!cell) continue;
      cell.s = {
        font: { bold: isHeader },
        ...(fill ? { fill: { patternType: "solid", fgColor: { rgb: fill } } } : {}),
      };
    }
  }
}

export function InventoryHeader() {
  const { items, log, importData } = useInventory();
  const fileRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    const wb = XLSX.utils.book_new();

    const itemRows = items.map((it) => ({
      Item: it.name,
      Category: it.category,
      Unit: it.unit,
      Quantity: it.quantity,
      "Reorder Level": it.reorderLevel,
      "Cost / Unit (INR)": it.costPerUnit,
      "Stock Value (INR)": itemValue(it),
      Status: STATUS_LABEL[stockStatus(it)],
      Supplier: it.supplier,
      Notes: it.notes,
      "Last Updated": formatDateTime(it.updatedAt),
    }));
    const itemsSheet = XLSX.utils.json_to_sheet(itemRows);
    itemsSheet["!cols"] = [
      { wch: 22 }, { wch: 18 }, { wch: 8 }, { wch: 10 }, { wch: 13 },
      { wch: 16 }, { wch: 16 }, { wch: 12 }, { wch: 20 }, { wch: 24 }, { wch: 22 },
    ];
    styleSheet(itemsSheet, (rowIndex) =>
      rowIndex === 0 ? null : STATUS_FILL[stockStatus(items[rowIndex - 1])],
    );
    XLSX.utils.book_append_sheet(wb, itemsSheet, "Inventory");

    const logRows = log.map((t) => ({
      "Date & Time": formatDateTime(t.at),
      Item: t.itemName,
      Action: TXN_LABELS[t.type],
      Change: t.delta,
      "Resulting Stock": t.resultingQty,
      Reason: t.reason,
    }));
    const logSheet = XLSX.utils.json_to_sheet(
      logRows.length ? logRows : [{ "Date & Time": "", Item: "", Action: "", Change: "", "Resulting Stock": "", Reason: "" }],
    );
    logSheet["!cols"] = [{ wch: 22 }, { wch: 22 }, { wch: 14 }, { wch: 10 }, { wch: 15 }, { wch: 28 }];
    styleSheet(logSheet, () => null);
    XLSX.utils.book_append_sheet(wb, logSheet, "Activity Log");

    XLSX.writeFile(wb, `vikram-inventory-${new Date().toISOString().slice(0, 10)}.xlsx`);
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => importData(String(reader.result));
    reader.readAsText(file);
    e.target.value = "";
  };

  const lock = () => {
    sessionStorage.removeItem(AUTH_KEY);
    window.location.reload();
  };

  const action =
    "px-3 py-1.5 rounded-lg text-sm font-medium text-dark/70 hover:bg-black/5 transition-colors whitespace-nowrap";

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-black/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.jpg" alt="" className="w-9 h-9 rounded-full object-cover shrink-0" />
          <div className="min-w-0">
            <h1
              className="text-base sm:text-lg font-bold text-dark leading-tight truncate"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Inventory Manager
            </h1>
            <p className="text-xs text-dark/45 leading-tight">The Vikram&apos;s Kitchen</p>
          </div>
        </div>

        <div className="flex items-center gap-0.5">
          <input
            ref={fileRef}
            type="file"
            accept="application/json,.json"
            className="hidden"
            onChange={handleImportFile}
          />
          <button onClick={handleExport} className={`${action} hidden sm:block`}>
            ⬆ Export
          </button>
          <button onClick={() => fileRef.current?.click()} className={`${action} hidden sm:block`}>
            ⬇ Import
          </button>
          <button
            onClick={lock}
            className="ml-1 px-3 py-1.5 rounded-lg text-sm font-semibold text-white bg-dark hover:bg-black transition-colors"
          >
            Lock
          </button>
        </div>
      </div>
    </header>
  );
}
