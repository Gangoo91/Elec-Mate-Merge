import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HelpCircle } from 'lucide-react';

export const EmergencyLightingModule5Section4FAQ = () => {
  const faqs = [
    {
      question: "Can labels be handwritten?",
      answer: "No — labels must be durable, permanent, and legible under fire conditions. Handwritten labels fade, peel, and are unacceptable to fire inspectors. Use engraved or industrial label printers (Brady, Dymo XTL, Brother) to produce professional, long-lasting labels that comply with BS 5266-1 requirements."
    },
    {
      question: "Is a paper logbook enough?",
      answer: "Yes, but electronic systems are recommended for large sites to reduce errors. A bound paper logbook is legally acceptable and remains the most common method for small to medium installations. However, for sites with 100+ luminaires, digital maintenance software offers automated reminders, fault alerts, cloud backup, and instant compliance reporting. Regardless of format, records must be retained for the lifetime of the installation."
    },
    {
      question: "Who is responsible for keeping records up to date?",
      answer: "The building's Responsible Person under the Fire Safety Order, often supported by contractors. The Responsible Person (usually the building owner, employer, or facilities manager) has legal accountability for maintaining life-safety systems and ensuring records are complete and accurate. While routine testing can be delegated to competent staff or contractors, the Responsible Person retains ultimate legal responsibility and must ensure systems are in place to maintain compliance."
    }
  ];

  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <HelpCircle className="h-5 w-5 text-elec-yellow" />
          Frequently Asked Questions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-gray-800 p-4 rounded-md border-l-4 border-elec-yellow">
            <h4 className="font-semibold text-foreground mb-2 text-sm sm:text-base">
              Q{index + 1}: {faq.question}
            </h4>
            <p className="text-foreground text-sm sm:text-base leading-relaxed">
              {faq.answer}
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
