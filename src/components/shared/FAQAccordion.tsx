"use client";

import type { FaqItem } from "@/content/types";
import { FadeIn } from "@/components/motion/FadeIn";
import { offset } from "@/components/motion/tokens";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type Props = {
  eyebrow: string;
  title: string;
  items: FaqItem[];
};

export function FAQAccordion({ eyebrow, title, items }: Props) {
  return (
    <section className="section" aria-labelledby="faq-title">
      <div className="container grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <FadeIn direction="left" distance={offset.lateral}>
          <p className="eyebrow">{eyebrow}</p>
          <h2 id="faq-title" className="max-w-md text-ink">
            {title}
          </h2>
        </FadeIn>
        <FadeIn direction="right" distance={offset.lateral}>
          <Accordion
            type="single"
            collapsible
            defaultValue="item-0"
            className="border-y border-[var(--borders)]"
          >
            {items.map((item, index) => (
              <AccordionItem
                key={item.question}
                value={`item-${index}`}
                className="border-[var(--borders)]"
              >
                <AccordionTrigger className="py-7 hover:no-underline md:py-8">
                  <span className="type-faq pr-4 text-left text-ink">
                    {item.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="type-body pb-8 text-muted-foreground">
                  <p className="max-w-2xl">{item.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </FadeIn>
      </div>
    </section>
  );
}
