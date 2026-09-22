"use client";

import type { ReactNode } from "react";
import type { Machine } from "@/types/machine";
import { goHref } from "@/lib/provider-slug";
import { trackAffiliateClick } from "@/features/tracking/events";

export type CtaPlacement = "hero" | "machine_card" | "details" | "quiz" | "comparison" | "recommendation" | "footer";

/**
 * Renders the buy CTA as a real link when the backend says an affiliate
 * link is configured, or a disabled, explained button otherwise — never a
 * link that 404s when clicked (spec: never a broken CTA).
 */
export function BuyLink({
  machine,
  placement,
  className = "",
  children,
}: {
  machine: Machine;
  placement: CtaPlacement;
  className?: string;
  children: ReactNode;
}) {
  if (!machine.ctaAvailable) {
    return (
      <button
        type="button"
        disabled
        title="Link de compra ainda não configurado para este modelo."
        className={`${className} cursor-not-allowed opacity-50`}
      >
        {children}
      </button>
    );
  }

  return (
    <a
      href={goHref(machine)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackAffiliateClick(machine.provider, machine.slug, placement)}
      className={className}
    >
      {children}
    </a>
  );
}
