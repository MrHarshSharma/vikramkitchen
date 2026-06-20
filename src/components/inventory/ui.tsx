"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useInventory } from "./InventoryProvider";

// Centered modal dialog with backdrop, escape-to-close and scroll lock.
export function Modal({
  open,
  onClose,
  title,
  children,
  maxWidth = "max-w-lg",
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  maxWidth?: string;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="absolute inset-0 bg-dark/50 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={title}
            className={`relative w-full ${maxWidth} bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl max-h-[92vh] overflow-y-auto`}
            initial={{ y: 40, scale: 0.98, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 40, scale: 0.98, opacity: 0 }}
            transition={{ type: "spring", stiffness: 320, damping: 30 }}
          >
            <div className="sticky top-0 flex items-center justify-between gap-4 px-5 py-4 border-b border-black/5 bg-white/95 backdrop-blur z-10">
              <h2
                className="text-lg font-bold text-dark"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {title}
              </h2>
              <button
                onClick={onClose}
                aria-label="Close"
                className="grid place-items-center w-8 h-8 rounded-full text-dark/60 hover:bg-black/5 hover:text-dark transition-colors"
              >
                ✕
              </button>
            </div>
            <div className="p-5">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Global toast stack, fed by the provider's notify().
export function ToastViewport() {
  const { toasts, dismissToast } = useInventory();
  const tone = {
    success: "border-primary/30 bg-white text-dark",
    error: "border-red-300 bg-white text-red-700",
    info: "border-gold/40 bg-white text-dark",
  } as const;
  const dot = { success: "bg-primary", error: "bg-red-500", info: "bg-gold" } as const;

  return (
    <div className="fixed bottom-4 right-4 z-[200] flex flex-col gap-2 w-[calc(100vw-2rem)] sm:w-80">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.button
            key={t.id}
            layout
            onClick={() => dismissToast(t.id)}
            initial={{ opacity: 0, x: 60, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 60, scale: 0.9 }}
            className={`flex items-center gap-3 text-left px-4 py-3 rounded-xl border shadow-lg ${tone[t.tone]}`}
          >
            <span className={`w-2 h-2 rounded-full shrink-0 ${dot[t.tone]}`} />
            <span className="text-sm font-medium">{t.message}</span>
          </motion.button>
        ))}
      </AnimatePresence>
    </div>
  );
}

// Shared form field label wrapper.
export function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block text-[13px] font-semibold text-dark/75 mb-1.5">{label}</span>
      {children}
      {hint && <span className="block mt-1 text-xs text-dark/45">{hint}</span>}
    </label>
  );
}

export const inputClass =
  "w-full rounded-lg border border-black/10 bg-cream/40 px-3 py-2.5 text-sm text-dark outline-none transition-colors focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20";
