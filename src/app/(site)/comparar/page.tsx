import type { Metadata } from "next";
import { OpenCompareOnMount } from "./OpenCompareOnMount";

export const metadata: Metadata = {
  title: "Comparar maquininhas",
  description: "Compare preços, taxas e recursos de maquininhas lado a lado.",
};

export default function CompararPage() {
  return (
    <main className="mx-auto max-w-[1280px] px-6 py-16 text-center">
      <p className="font-inter text-[15px] text-muted">Abrindo comparação…</p>
      <OpenCompareOnMount />
    </main>
  );
}
