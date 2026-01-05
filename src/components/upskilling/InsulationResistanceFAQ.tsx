import { HelpCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export const InsulationResistanceFAQ = () => {
  const faqs = [
    {
      id: "why-important",
      question: "Why is insulation resistance testing so critical?",
      answer: "Insulation resistance testing is essential because it identifies potential breakdown in the insulation between conductors and between conductors and earth. Poor insulation can lead to dangerous leakage currents, electric shock hazards, equipment damage, and fire risks. It's a proactive safety measure that prevents incidents before they occur."
    },
    {
      id: "when-perform",
      question: "When should insulation resistance tests be performed?",
      answer: "Tests must be carried out: during initial verification of new installations, during periodic inspections, after any major alterations or additions, following fault repairs, when switching between different supply systems, and whenever there's suspicion of insulation deterioration due to environmental factors or age."
    },
    {
      id: "minimum-values",
      question: "What are the minimum acceptable insulation resistance values?",
      answer: "For circuits up to 500V: minimum 1MΩ. For circuits 500V-1000V: minimum 1MΩ. For circuits exceeding 1000V: minimum 1MΩ. However, values should typically be much higher in practice - readings below 2MΩ warrant investigation even if they meet minimum requirements."
    },
    {
      id: "test-voltage",
      question: "What test voltage should I use for different circuit voltages?",
      answer: "For SELV/PELV circuits (up to 50V): 250V DC test voltage. For circuits up to 500V: 500V DC test voltage. For circuits 500V-1000V: 1000V DC test voltage. Always ensure the test voltage doesn't exceed twice the circuit's rated voltage."
    },
    {
      id: "poor-readings",
      question: "What causes poor insulation resistance readings?",
      answer: "Common causes include: moisture ingress in cables or accessories, damaged cable insulation, contamination on insulators, incorrect installation of cables, overheating damage, UV degradation of cable sheaths, rodent damage, and age-related deterioration of insulation materials."
    },
    {
      id: "test-duration",
      question: "How long should I maintain the test voltage?",
      answer: "The test voltage should be maintained for a minimum of 1 minute for accurate readings. For critical circuits or when investigating borderline results, extend the test duration to identify polarisation effects and ensure stable readings. Some insulators may show improving readings over time."
    },
    {
      id: "safety-precautions",
      question: "What safety precautions are essential during testing?",
      answer: "Always ensure circuits are dead and isolated, remove or disconnect all equipment that could be damaged by the test voltage, warn other personnel of testing in progress, verify the insulation tester is functioning correctly, discharge circuits after testing, and never touch conductors during or immediately after testing."
    },
    {
      id: "environmental-factors",
      question: "How do environmental conditions affect test results?",
      answer: "High humidity can significantly reduce readings due to moisture on insulator surfaces. Temperature affects insulation materials - higher temperatures generally reduce resistance. Contamination from dust, salt, or pollutants creates conductive paths. Always consider environmental conditions when interpreting results."
    },
    {
      id: "equipment-damage",
      question: "How can I prevent equipment damage during testing?",
      answer: "Before testing: disconnect all electronic equipment, remove sensitive devices like LED lamps and electronic starters, check for equipment that may be connected across phases, isolate surge protective devices, and verify that control circuits are disconnected. Use appropriate test voltages for the circuit being tested."
    },
    {
      id: "documentation",
      question: "What documentation is required for insulation resistance tests?",
      answer: "Record: test voltage used, insulation resistance values measured, environmental conditions during testing, any equipment disconnected, details of circuits tested, date and time of tests, name of person conducting tests, and any remedial actions required. Keep records for future reference and regulatory compliance."
    }
  ];

  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <HelpCircle className="h-5 w-5 text-elec-yellow" />
          Frequently Asked Questions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full space-y-2">
          {faqs.map((faq) => (
            <AccordionItem key={faq.id} value={faq.id} className="border border-gray-600 rounded-lg px-4">
              <AccordionTrigger className="text-foreground hover:text-elec-yellow transition-colors">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-foreground leading-relaxed pt-2">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
};