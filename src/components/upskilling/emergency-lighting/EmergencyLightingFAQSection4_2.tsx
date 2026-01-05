import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HelpCircle } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export const EmergencyLightingFAQSection4_2 = () => {
  const faqs = [
    {
      question: "Can self-contained and central systems be mixed?",
      answer: "Yes, many sites use a hybrid approach depending on area risks. For example, a hospital might use central battery systems for critical areas like operating theatres and intensive care units, whilst using self-contained systems for administrative offices and storage areas. This balances cost, reliability, and maintenance efficiency based on risk assessment."
    },
    {
      question: "Which system has a longer battery lifespan?",
      answer: "Central battery systems typically have significantly longer battery life — typically 10–25 years compared to 3–5 years for self-contained systems. This extended lifespan reduces the frequency of battery replacements and associated labour costs, making central systems more cost-effective for large installations over their lifetime."
    },
    {
      question: "Do both systems comply with BS 5266?",
      answer: "Yes, both self-contained and central battery systems are compliant with BS 5266-1 when correctly designed, installed, and maintained. The standard doesn't mandate one system over the other — compliance depends on proper implementation, regular testing per BS 5266-8, and ensuring adequate illumination levels and duration."
    },
    {
      question: "What happens if a central battery system fails?",
      answer: "A failure in a central battery system can affect multiple luminaires, which is why BS 5266-1 requires careful circuit design with segregation and redundancy where appropriate. Many installations include backup battery banks, automatic monitoring systems, and fire-resistant cabling to maintain integrity. Critical areas may have dual circuits or supplementary self-contained units as backup."
    },
    {
      question: "Are self-contained systems suitable for high-temperature environments?",
      answer: "Self-contained battery performance can be significantly affected by high temperatures (above 25°C), which reduces battery life and capacity. In plant rooms, boiler rooms, or other high-temperature areas, central battery systems with batteries housed in temperature-controlled rooms, or specialist high-temperature batteries, are recommended to maintain reliability."
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
      <CardContent>
        <Accordion type="single" collapsible className="space-y-2">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`faq-${index}`}
              className="bg-elec-dark/50 border border-gray-700 rounded-lg px-4"
            >
              <AccordionTrigger className="text-foreground hover:text-elec-yellow text-left py-4">
                Q{index + 1}: {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-foreground pb-4 leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
};
