"use client";

import type { ButtonHTMLAttributes } from "react";

export function Chip({
  active = false,
  pill = true,
  className = "",
  children,
  ...props
}: {
  active?: boolean;
  pill?: boolean;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      data-focus="1"
      className={`h-[34px] cursor-pointer border px-3.5 text-sm font-medium font-inter transition-colors ${
        pill ? "rounded-full" : "rounded-lg"
      } ${
        active
          ? "border-[#C7C1F5] bg-primary-soft text-primary-dark"
          : "border-border bg-white text-text-strong hover:border-border-hover"
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
