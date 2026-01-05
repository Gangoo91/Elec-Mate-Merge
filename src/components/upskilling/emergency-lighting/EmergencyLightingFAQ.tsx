import { HelpCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export const EmergencyLightingFAQ = () => {
  const faqs = [
    {
      question: "Who is the 'responsible person' under the RRO?",
      answer: "The responsible person is typically the employer (for workplaces), building owner, or person with control of the premises. They have legal duties for fire safety including emergency lighting provision."
    },
    {
      question: "Do I need emergency lighting in a small single-storey office?",
      answer: "It depends on the size, layout, and risk assessment. Buildings over 200m² typically require emergency lighting, but smaller premises may need it based on factors like occupancy, escape route complexity, and vulnerability of occupants."
    },
    {
      question: "What happens if I don't comply with emergency lighting requirements?",
      answer: "Non-compliance can result in enforcement action, prohibition notices, unlimited fines, and criminal prosecution. If someone is harmed due to inadequate emergency lighting, the responsible person may face imprisonment."
    },
    {
      question: "How often must emergency lighting be tested?",
      answer: "Daily visual checks, monthly functional tests (brief operation), and annual full-duration tests are required under BS 5266-1. All tests must be recorded in a logbook."
    },
    {
      question: "Can I use existing lighting as emergency lighting?",
      answer: "Only if it meets the requirements of BS 5266-1, including automatic operation on mains failure, minimum illumination levels, and 3-hour duration. Purpose-designed emergency lighting is usually necessary."
    }
  ];

  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <HelpCircle className="h-5 w-5 text-elec-yellow" />
          Frequently Asked Questions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="space-y-2">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border-gray-700">
              <AccordionTrigger className="text-foreground hover:text-elec-yellow transition-colors text-left">
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