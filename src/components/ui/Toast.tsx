"use client";

import { useToast } from "./ToastProvider";

export function Toast() {
  const { message } = useToast();
  if (!message) return null;

  return (
    <div className="fixed bottom-28 left-1/2 z-120 flex max-w-[calc(100%-32px)] -translate-x-1/2 items-center gap-3 rounded-xl bg-text px-4.5 py-3.5 text-white shadow-toast">
      <span className="flex h-5 w-5 flex-none items-center justify-center rounded-full bg-success font-inter text-[11px] font-bold text-white">
        ↗
      </span>
      <span className="font-inter text-sm font-medium leading-tight">{message}</span>
    </div>
  );
}
