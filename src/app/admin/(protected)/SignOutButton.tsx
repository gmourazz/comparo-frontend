"use client";

import { signOut } from "next-auth/react";

export function SignOutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/admin/login" })}
      className="h-9 cursor-pointer rounded-lg border border-border bg-white px-3 font-inter text-sm font-medium text-muted hover:text-text"
    >
      Sair
    </button>
  );
}
