"use client";

import { useState } from "react";
import { faqData } from "@/config/content/faq";

export function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="mx-auto max-w-[1280px] px-6 pt-20">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-10">
        <div>
          <h2 className="m-0 text-section-title font-manrope leading-tight font-bold tracking-[-0.02em]">
            Perguntas frequentes
          </h2>
          <p className="mt-3 max-w-90 font-inter text-base text-muted">
            Se ficar alguma dúvida, o quiz também ajuda a estreitar as opções.
          </p>
        </div>
        <div className="col-span-2 min-w-0 overflow-hidden rounded-[20px] border border-border bg-white">
          {faqData.map((faq, i) => {
            const open = openIndex === i;
            return (
              <div key={faq.q} className="border-b border-[#F2F4F8] last:border-b-0">
                <button
                  data-focus="1"
                  onClick={() => setOpenIndex(open ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-4.5 text-left font-inter text-base font-semibold text-text hover:bg-bg"
                >
                  {faq.q}
                  <span className="flex h-6 w-6 flex-none items-center justify-center rounded-lg bg-[#F2F4F8] font-inter text-sm font-bold text-muted">
                    {open ? "−" : "+"}
                  </span>
                </button>
                {open && (
                  <p className="m-0 max-w-180 px-6 pb-5 font-inter text-[15px] leading-relaxed text-muted text-pretty">
                    {faq.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
