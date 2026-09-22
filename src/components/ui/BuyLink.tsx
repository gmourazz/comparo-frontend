import type { ReactNode } from "react";
import type { Machine } from "@/types/machine";
import { goHref } from "@/lib/provider-slug";

/**
 * Renders the buy CTA as a real link when the backend says an affiliate
 * link is configured, or a disabled, explained button otherwise — never a
 * link that 404s when clicked (spec: never a broken CTA).
 */
export function BuyLink({
  machine,
  className = "",
  children,
}: {
  machine: Machine;
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
    <a href={goHref(machine)} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
    </a>
  );
}
