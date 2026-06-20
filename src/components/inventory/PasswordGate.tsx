"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AUTH_KEY } from "@/lib/inventory/storage";

// Shared staff password. NOTE: because this app is fully client-side (localStorage,
// no backend), this gate is a convenience lock, not real security — the password
// ships in the bundle. Set NEXT_PUBLIC_INVENTORY_PASSWORD to override the default.
const PASSWORD = process.env.NEXT_PUBLIC_INVENTORY_PASSWORD || "vikram2026";

export function PasswordGate({ children }: { children: React.ReactNode }) {
  const [unlocked, setUnlocked] = useState(false);
  const [checked, setChecked] = useState(false);
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    // Read the session flag after mount to stay SSR-safe.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setUnlocked(sessionStorage.getItem(AUTH_KEY) === "1");
    setChecked(true);
  }, []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value === PASSWORD) {
      sessionStorage.setItem(AUTH_KEY, "1");
      setUnlocked(true);
      setError(false);
    } else {
      setError(true);
      setValue("");
    }
  };

  // Avoid a flash of the login form before sessionStorage is read.
  if (!checked) {
    return <div className="min-h-screen bg-cream" />;
  }

  if (unlocked) return <>{children}</>;

  return (
    <div className="min-h-screen grid place-items-center bg-cream pattern-bg px-4">
      <motion.form
        onSubmit={submit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm bg-white rounded-2xl shadow-xl p-8 text-center"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo.jpg"
          alt="The Vikram's Kitchen"
          className="w-16 h-16 rounded-full object-cover mx-auto mb-4"
        />
        <h1
          className="text-2xl font-bold text-dark"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Inventory Login
        </h1>
        <p className="text-sm text-dark/55 mt-1 mb-6">
          The Vikram&apos;s Kitchen · Staff access only
        </p>

        <input
          type="password"
          autoFocus
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setError(false);
          }}
          placeholder="Enter staff password"
          className={`w-full rounded-lg border px-4 py-3 text-center text-sm outline-none transition-colors focus:ring-2 ${
            error
              ? "border-red-300 focus:ring-red-200"
              : "border-black/10 focus:border-primary focus:ring-primary/20"
          }`}
        />
        {error && (
          <p className="text-xs text-red-600 mt-2">Incorrect password. Try again.</p>
        )}

        <button
          type="submit"
          className="mt-5 w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3 rounded-lg transition-colors shadow-lg shadow-primary/25"
        >
          Unlock Dashboard
        </button>
      </motion.form>
    </div>
  );
}
