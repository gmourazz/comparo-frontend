"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function SyncNowButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function onClick() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/sync", { method: "POST" });
      if (!res.ok) throw new Error("Falha ao sincronizar.");
      router.refresh();
    } catch {
      setError("Falha ao sincronizar. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={onClick}
        disabled={loading}
        className="h-11 cursor-pointer rounded-xl border-none bg-primary px-5 font-inter text-[15px] font-semibold text-white hover:bg-primary-dark disabled:opacity-60"
      >
        {loading ? "Sincronizando..." : "Sincronizar agora"}
      </button>
      {error && <span className="font-inter text-sm text-red-600">{error}</span>}
    </div>
  );
}
