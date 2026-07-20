"use client";

import { useId, useState } from "react";
import type { FaqItem } from "@/content/types";
import { Reveal } from "./Reveal";

type Props = {
  eyebrow: string;
  title: string;
  items: FaqItem[];
};

export function FAQAccordion({ eyebrow, title, items }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const baseId = useId();
  const titleId = `${baseId}-title`;

  return (
    <section className="section" aria-labelledby={titleId}>
      <div className="container grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <Reveal variant="left">
          <p className="eyebrow">{eyebrow}</p>
          <h2 id={titleId} className="max-w-md text-[clamp(2.1rem,4vw,3.6rem)] text-ink">
            {title}
          </h2>
        </Reveal>
        <Reveal variant="right" delay={100}>
          <div className="divide-y divide-[var(--line)] border-y border-[var(--line)]">
            {items.map((item, index) => {
              const open = openIndex === index;
              const panelId = `${baseId}-panel-${index}`;
              const buttonId = `${baseId}-button-${index}`;
              return (
                <div key={item.question}>
                  <h3>
                    <button
                      id={buttonId}
                      type="button"
                      className="flex w-full items-center justify-between gap-6 py-7 text-left md:py-8"
                      onClick={() => setOpenIndex(open ? null : index)}
                      aria-expanded={open}
                      aria-controls={panelId}
                    >
                      <span className="font-display text-xl text-ink md:text-2xl">
                        {item.question}
                      </span>
                      <span
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[var(--line)] text-lg leading-none transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                          open ? "rotate-45 bg-ink text-white" : "rotate-0 bg-transparent text-ink"
                        }`}
                        aria-hidden="true"
                      >
                        +
                      </span>
                    </button>
                  </h3>
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    aria-hidden={!open}
                    className={`faq-panel ${open ? "is-open" : ""}`}
                    inert={!open ? true : undefined}
                  >
                    <div className="faq-panel-inner">
                      <p className="max-w-2xl pb-8 text-[1.02rem] leading-relaxed text-muted">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
