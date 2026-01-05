import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HelpCircle } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const EmergencyLightingFAQSection6_3 = () => {
  const faqs = [
    {
      question: "Who is responsible for carrying out the fire risk assessment?",
      answer: "The building's Responsible Person must ensure it's completed by a competent person — often a certified fire risk assessor. This may be an employee with suitable training or an external consultant."
    },
    {
      question: "How often must the assessment be reviewed?",
      answer: "At least annually or whenever building use, structure, or occupancy changes. More frequent reviews may be required for high-risk premises or following incidents."
    },
    {
      question: "What if the lighting design and risk assessment conflict?",
      answer: "Always default to the higher safety requirement and document your decision for audit purposes. Consult with the fire risk assessor and the Responsible Person to resolve conflicts before proceeding."
    },
    {
      question: "Can I use a 1-hour system if the client wants to save money?",
      answer: "No — if the risk assessment specifies 3-hour duration, you must comply. Installing inadequate systems makes both you and the client liable for prosecution. Always quote to the correct standard."
    },
    {
      question: "What happens if there's no risk assessment in place?",
      answer: "This is a legal breach under the Fire Safety Order. You should not proceed with design or installation until a proper risk assessment has been completed and approved."
    },
    {
      question: "Do I need to keep a copy of the risk assessment?",
      answer: "Yes — keep it with the emergency lighting logbook and commissioning documents. Fire inspectors will request it during audits to verify that the design matches the assessed risks."
    }
  ];

  return (
    <Card className="bg-gradient-to-br from-purple-900/20 to-purple-800/10 border border-purple-600/40 shadow-lg">
      <CardHeader>
        <CardTitle className="text-purple-300 flex items-center gap-2">
          <HelpCircle className="h-6 w-6 text-purple-400 drop-shadow-md" />
          Frequently Asked Questions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border-purple-600/30">
              <AccordionTrigger className="text-foreground hover:text-purple-300">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-300">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
};
