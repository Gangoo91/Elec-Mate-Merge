import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { HelpCircle } from 'lucide-react';

const SmartHomeModule7Section1FAQ = () => {
  const faqs = [
    {
      question: "Do all smart switches require a neutral connection?",
      answer: "Not all smart switches require neutral, but most do for optimal functionality. Some can work without neutral but may have limited features or cause LED bulb flickering. Always check manufacturer specifications and consider running neutral during installation for future compatibility."
    },
    {
      question: "How do I know if a power supply is adequately sized?",
      answer: "Check the device's power consumption specifications and ensure the power supply rating exceeds this by at least 20%. Consider peak power requirements, not just steady-state consumption. Also factor in efficiency losses and any derating due to temperature or other environmental factors."
    },
    {
      question: "What's the minimum cable separation distance for power and data?",
      answer: "BS 7671 requires separation of power and telecommunications cables. Generally, maintain at least 50mm separation, or use appropriate screening/segregated containment. In practice, running them in separate conduits or cable trays is often the most practical solution."
    },
    {
      question: "Can I use existing lighting circuits for smart devices?",
      answer: "Often yes, but you must verify the circuit can handle the additional load and that it has the necessary conductors (especially neutral for smart switches). You may need to upgrade circuits or run additional cables to meet smart device requirements."
    },
    {
      question: "What testing is required after smart device installation?",
      answer: "Standard BS 7671 testing applies: continuity of protective conductors, insulation resistance, polarity verification, and RCD functionality testing. Additionally, verify device functionality, network connectivity, and proper integration with any control systems."
    },
    {
      question: "How do I handle IP rating requirements for smart devices?",
      answer: "Check the installation environment and select devices with appropriate IP ratings. Bathroom zones, outdoor installations, and areas subject to moisture require higher IP ratings. Ensure any enclosures or mounting methods maintain the device's IP rating."
    }
  ];

  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <HelpCircle className="h-6 w-6 text-elec-yellow" />
          Frequently Asked Questions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border-gray-600">
              <AccordionTrigger className="text-foreground hover:text-elec-yellow transition-colors">
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

export default SmartHomeModule7Section1FAQ;