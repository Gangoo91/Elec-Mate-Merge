import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

interface FAQ {
  question: string;
  answer: string;
}

interface SEOFAQAccordionProps {
  faqs: FAQ[];
  heading?: string;
}

export function SEOFAQAccordion({
  faqs,
  heading = 'Frequently Asked Questions',
}: SEOFAQAccordionProps) {
  return (
    <div itemScope itemType="https://schema.org/FAQPage">
      <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">{heading}</h2>
      <Accordion type="single" collapsible className="space-y-3">
        {faqs.map((faq, index) => (
          <div key={index} itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
            <AccordionItem
              value={`faq-${index}`}
              className="rounded-2xl bg-white/[0.04] border border-white/10 px-5 overflow-hidden"
            >
              <AccordionTrigger
                className="text-white font-semibold text-left py-5 hover:no-underline touch-manipulation min-h-[44px] [&>svg]:text-yellow-400"
                itemProp="name"
              >
                {faq.question}
              </AccordionTrigger>
              <AccordionContent
                className="text-white text-sm leading-relaxed pb-5"
                itemScope
                itemProp="acceptedAnswer"
                itemType="https://schema.org/Answer"
              >
                <div itemProp="text">{faq.answer}</div>
              </AccordionContent>
            </AccordionItem>
          </div>
        ))}
      </Accordion>
    </div>
  );
}
