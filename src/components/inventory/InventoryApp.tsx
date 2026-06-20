"use client";

import { InventoryProvider } from "./InventoryProvider";
import { PasswordGate } from "./PasswordGate";
import { InventoryDashboard } from "./InventoryDashboard";
import { ToastViewport } from "./ui";

export default function InventoryApp() {
  return (
    <InventoryProvider>
      <PasswordGate>
        <InventoryDashboard />
        <ToastViewport />
      </PasswordGate>
    </InventoryProvider>
  );
}
