import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = { title: "Termos de uso" };

export default function TermsPage() {
  return (
    <Container className="py-16">
      <h1 className="font-manrope text-3xl font-bold">Termos de uso</h1>
      <p className="mt-6 max-w-[640px] font-inter text-[15px] leading-relaxed text-muted">
        Conteúdo pendente de revisão jurídica antes do lançamento. Este site é um comparador
        independente: não processa pagamentos, não realiza checkout e não é afiliado, representante
        ou parceiro oficial da Mercado Pago ou da Ton. A contratação de qualquer produto é feita
        diretamente no site oficial da empresa escolhida.
      </p>
    </Container>
  );
}
