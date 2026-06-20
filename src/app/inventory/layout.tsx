import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inventory Manager | The Vikram's Kitchen",
  description: "Internal stock management dashboard for The Vikram's Kitchen.",
  robots: { index: false, follow: false },
};

export default function InventoryLayout({ children }: { children: React.ReactNode }) {
  return children;
}
