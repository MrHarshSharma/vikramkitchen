"use client";

import { Modal } from "./ui";

export function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = "Confirm",
  danger = false,
  onConfirm,
  onClose,
}: {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  danger?: boolean;
  onConfirm: () => void;
  onClose: () => void;
}) {
  return (
    <Modal open={open} onClose={onClose} title={title} maxWidth="max-w-sm">
      <p className="text-sm text-dark/70 leading-relaxed">{message}</p>
      <div className="flex gap-3 pt-5">
        <button
          onClick={onClose}
          className="flex-1 py-2.5 rounded-lg border border-black/10 text-dark/70 font-semibold hover:bg-black/5 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={() => {
            onConfirm();
            onClose();
          }}
          className={`flex-1 py-2.5 rounded-lg text-white font-semibold transition-colors shadow-lg ${
            danger
              ? "bg-red-600 hover:bg-red-700 shadow-red-600/25"
              : "bg-primary hover:bg-primary-dark shadow-primary/25"
          }`}
        >
          {confirmLabel}
        </button>
      </div>
    </Modal>
  );
}
