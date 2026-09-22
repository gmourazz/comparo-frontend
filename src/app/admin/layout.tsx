import type { Metadata } from "next";
import { SessionProviderWrapper } from "./SessionProviderWrapper";

export const metadata: Metadata = { title: "Admin", robots: { index: false, follow: false } };

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProviderWrapper>
      <div className="min-h-screen bg-bg font-inter text-text">{children}</div>
    </SessionProviderWrapper>
  );
}
