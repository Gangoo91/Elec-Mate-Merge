import { HelpCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export const EVChargingModule3Section1FAQ = () => {
  const faqs = [
    {
      question: "What is the difference between connected load and maximum demand?",
      answer: "Connected load is the sum of all individual loads that could potentially operate simultaneously, whilst maximum demand is the actual maximum load that will be drawn in practice after applying diversity factors. Maximum demand is almost always lower than connected load due to the statistical reality that not all loads operate at full capacity simultaneously."
    },
    {
      question: "How do I determine the appropriate diversity factor for my installation?",
      answer: "Diversity factors depend on the type of installation and usage patterns. For domestic installations: single charger = 100%, 2-5 chargers = 80-90%. For workplace charging: 6-10 chargers = 70-80%, 11+ chargers = 60-70%. Consider local usage patterns, charging speeds, and time-of-use data when available."
    },
    {
      question: "Why is a safety factor necessary in load calculations?",
      answer: "Safety factors (typically 10-20%) account for future load growth, measurement uncertainties, operational variations, and ensure safe operation under all conditions. They provide a buffer to prevent overloading and maintain compliance with BS 7671 requirements."
    },
    {
      question: "What should I do if my calculated demand exceeds the existing supply capacity?",
      answer: "If the maximum demand exceeds existing supply capacity, you'll need to: 1) Consider load management systems to limit simultaneous charging, 2) Apply higher diversity factors if justified by usage patterns, 3) Contact the Distribution Network Operator (DNO) for supply upgrade, or 4) Implement smart charging to spread load over time."
    },
    {
      question: "How do load management systems affect diversity calculations?",
      answer: "Load management systems actively control when chargers operate, allowing higher diversity factors as they prevent simultaneous operation. With proper load management, you might apply 50-60% diversity factors even for larger installations, but this must be engineered and commissioned correctly."
    },
    {
      question: "Do rapid chargers require different diversity considerations?",
      answer: "Yes, rapid chargers (22kW+) typically have different usage patterns - shorter connection times but higher power draws. They often require lower diversity factors (50-70%) due to the concentrated nature of their use, especially in commercial or public charging scenarios."
    },
    {
      question: "How does BS 7671 apply to EV charging load calculations?",
      answer: "BS 7671 requires that installations are designed for their intended load and includes specific requirements for EV charging (Section 722). While it doesn't specify exact diversity factors, it requires that calculations consider actual usage patterns and maintain adequate safety margins."
    },
    {
      question: "What documentation is required for load calculations in EV installations?",
      answer: "Document all assumptions, diversity factors used, safety margins applied, existing load assessments, and calculation methodology. Include manufacturer specifications, usage pattern analysis, and compliance statements. This documentation is essential for Building Control and DNO applications."
    },
    {
      question: "How do time-of-use tariffs affect load calculations?",
      answer: "Time-of-use tariffs can significantly affect charging patterns, potentially concentrating loads during off-peak periods. This might justify different diversity factors for different times of day, but requires careful analysis of actual usage patterns and possibly load monitoring."
    },
    {
      question: "Can I retrofit EV charging to an existing electrical installation?",
      answer: "Often yes, but it requires careful assessment of existing loads, available capacity, and cable ratings. Many domestic installations can accommodate one 7kW charger, but multiple chargers or commercial installations frequently require supply upgrades or load management systems."
    }
  ];

  return (
    <Card className="bg-elec-gray border-elec-yellow/20 shadow-lg">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <HelpCircle className="h-6 w-6 text-elec-yellow" />
          Frequently Asked Questions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="border-elec-yellow/20"
            >
              <AccordionTrigger className="text-foreground hover:text-elec-yellow text-left">
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