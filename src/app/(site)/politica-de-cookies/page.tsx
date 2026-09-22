import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = { title: "Política de Cookies" };

export default function CookiePolicyPage() {
  return (
    <Container className="py-16">
      <h1 className="font-manrope text-3xl font-bold">Política de Cookies</h1>
      <p className="mt-6 max-w-[640px] font-inter text-[15px] leading-relaxed text-muted">
        Conteúdo pendente de revisão jurídica antes do lançamento. Usamos três categorias de
        cookies: <strong>Necessários</strong> (funcionamento básico do site, sempre ativos),{" "}
        <strong>Analytics</strong> (entender uso agregado do site, opcional) e{" "}
        <strong>Marketing</strong> (medir a eficácia de indicações, opcional). Analytics e
        Marketing só são carregados depois que você escolhe aceitá-los no banner de cookies.
      </p>
    </Container>
  );
}
