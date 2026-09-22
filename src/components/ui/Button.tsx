import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "dark" | "ghost";
type Size = "sm" | "md" | "lg";

const VARIANT_CLASSES: Record<Variant, string> = {
  primary:
    "bg-primary border border-primary text-white shadow-[0_1px_2px_rgba(16,24,40,0.05)] hover:bg-primary-dark hover:border-primary-dark",
  secondary:
    "bg-white border border-border text-text hover:border-border-hover hover:bg-bg",
  dark: "bg-text border border-text text-white hover:bg-[#2b3040]",
  ghost: "bg-transparent border-none text-muted hover:text-text",
};

const SIZE_CLASSES: Record<Size, string> = {
  sm: "h-[38px] px-3.5 text-sm rounded-full",
  md: "h-11 px-4.5 text-[15px] rounded-xl",
  lg: "h-[52px] px-6 text-base rounded-xl",
};

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`inline-flex cursor-pointer items-center justify-center gap-2 font-semibold font-inter transition-colors ${VARIANT_CLASSES[variant]} ${SIZE_CLASSES[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
