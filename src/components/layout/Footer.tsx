import Link from "next/link";
import { siteConfig } from "@/config/site";

const legalLinks = [
  { label: "Política de Privacidade", href: "/politica-de-privacidade" },
  { label: "Termos de uso", href: "/termos-de-uso" },
  { label: "Política de Cookies", href: "/politica-de-cookies" },
];

export function Footer() {
  return (
    <footer className="mt-6 bg-footer">
      <div className="mx-auto grid max-w-[1280px] grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-10 px-6 py-14">
        <div>
          <span className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-primary font-manrope text-[15px] font-extrabold text-white">
              C
            </span>
            <span className="font-manrope text-xl font-extrabold tracking-[-0.02em] text-white">
              comparô
            </span>
          </span>
          <p className="mt-4 max-w-[260px] font-inter text-sm text-[#98A2B3]">
            {siteConfig.description}
          </p>
        </div>

        <div>
          <span className="font-inter text-[13px] font-semibold tracking-[0.06em] text-white uppercase">
            Plataforma
          </span>
          <div className="mt-4 flex flex-col gap-2.5">
            {siteConfig.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="font-inter text-sm text-[#98A2B3] hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <span className="font-inter text-[13px] font-semibold tracking-[0.06em] text-white uppercase">
            Legal
          </span>
          <div className="mt-4 flex flex-col gap-2.5">
            {legalLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="font-inter text-sm text-[#98A2B3] hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="col-span-2 min-w-0">
          <span className="font-inter text-[13px] font-semibold tracking-[0.06em] text-white uppercase">
            Avisos
          </span>
          <div className="mt-4 flex flex-col gap-2.5">
            <p className="m-0 font-inter text-[13px] leading-relaxed text-[#98A2B3]">
              Este é um site independente de comparação e divulgação.
            </p>
            <p className="m-0 font-inter text-[13px] leading-relaxed text-[#98A2B3]">
              Mercado Pago, Point, Ton e demais marcas pertencem aos seus respectivos titulares.
            </p>
            <p className="m-0 font-inter text-[13px] leading-relaxed text-[#98A2B3]">
              Preços, taxas e condições podem ser alterados pelas empresas responsáveis.
            </p>
          </div>
        </div>
      </div>
      <div className="border-t border-[#2b3040]">
        <div className="mx-auto flex max-w-[1280px] flex-wrap justify-between gap-3 px-6 py-5">
          <span className="font-inter text-[13px] text-muted">
            © 2026 {siteConfig.name}. Todos os direitos reservados.
          </span>
          <span className="font-inter text-[13px] text-muted">
            Dados atualizados em {siteConfig.lastUpdatedLabel}
          </span>
        </div>
      </div>
    </footer>
  );
}
