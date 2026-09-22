import Link from "next/link";
import type { Machine } from "@/types/machine";

export function Breadcrumb({ machine }: { machine: Machine }) {
  return (
    <nav className="flex items-center gap-2 font-inter text-sm text-muted-2">
      <Link href="/" className="text-muted hover:text-text">
        Início
      </Link>
      <span>/</span>
      <Link href="/#catalogo" className="text-muted hover:text-text">
        Maquininhas
      </Link>
      <span>/</span>
      <span className="text-muted-2">{machine.brand}</span>
      <span>/</span>
      <span className="text-text">{machine.name}</span>
    </nav>
  );
}
