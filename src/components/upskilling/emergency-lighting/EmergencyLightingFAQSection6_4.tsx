import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HelpCircle } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export const EmergencyLightingFAQSection6_4 = () => {
  const faqs = [
    {
      question: "How long must emergency lighting records be kept?",
      answer: "At least six years, though ideally for the life of the installation. This ensures a complete system history is available for inspections and demonstrates ongoing compliance over time."
    },
    {
      question: "Can digital records replace paper ones?",
      answer: "Yes, if they're securely stored, easily accessible, and printable during an inspection. However, you must be able to produce them immediately when requested by Fire Authorities, so both digital backups and readily available paper copies are recommended."
    },
    {
      question: "Who is responsible for maintaining documentation?",
      answer: "The building's Responsible Person under the Regulatory Reform (Fire Safety) Order 2005, often supported by maintenance contractors. The Responsible Person has ultimate legal accountability for ensuring all records are complete, accurate, and accessible."
    }
  ];

  return (
    <Card className="bg-slate-800/50 border-slate-600">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <HelpCircle className="h-5 w-5 text-elec-yellow" />
          Frequently Asked Questions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border-slate-600">
              <AccordionTrigger className="text-foreground hover:text-elec-yellow">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-foreground leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
};
