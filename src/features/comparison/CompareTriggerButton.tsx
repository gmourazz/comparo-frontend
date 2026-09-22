"use client";

import type { ReactNode } from "react";
import { useCompare } from "./CompareProvider";

export function CompareTriggerButton({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  const compare = useCompare();
  return (
    <button data-focus="1" onClick={compare.open} className={className}>
      {children}
    </button>
  );
}
