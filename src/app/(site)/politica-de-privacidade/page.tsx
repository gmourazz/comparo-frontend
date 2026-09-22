import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = { title: "Política de Privacidade" };

export default function PrivacyPolicyPage() {
  return (
    <Container className="py-16">
      <h1 className="font-manrope text-3xl font-bold">Política de Privacidade</h1>
      <p className="mt-6 max-w-[640px] font-inter text-[15px] leading-relaxed text-muted">
        Conteúdo pendente de revisão jurídica antes do lançamento. Este site coleta apenas dados
        de navegação anônimos (quando você consente com cookies de análise) e eventos de clique em
        CTAs de indicação — nunca CPF, telefone, e-mail ou dados de cartão.
      </p>
    </Container>
  );
}
