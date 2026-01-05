import { HelpCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export const InsulationTestMethodsFAQ = () => {
  const faqs = [
    {
      id: "test-combinations",
      question: "Which conductor combinations should I test during IR testing?",
      answer: "For single-phase circuits: Test L-N, L-E, and N-E separately. For three-phase circuits: Test all phase-to-phase combinations (L1-L2, L1-L3, L2-L3), all phase-to-neutral combinations (L1-N, L2-N, L3-N), and all phase-to-earth combinations (L1-E, L2-E, L3-E). This comprehensive approach identifies exactly which conductor has insulation problems."
    },
    {
      id: "equipment-disconnection",
      question: "What equipment must be disconnected before IR testing?",
      answer: "Disconnect: Electronic equipment, LED lamps, electronic ballasts, control gear, computer equipment, electronic starters, surge protective devices (SPDs), capacitors, and any equipment with electronic components. Leave: Incandescent lamps, basic contactors, simple switches, and traditional electromagnetic equipment that can withstand the test voltage."
    },
    {
      id: "test-voltage-selection",
      question: "How do I select the correct test voltage for different installations?",
      answer: "SELV/PELV (≤50V): Use 250V DC test voltage. Low voltage (50V-500V): Use 500V DC test voltage. Medium voltage (500V-1000V): Use 1000V DC test voltage. High voltage (>1000V): Use 1000V DC minimum or as specified by equipment manufacturer. Never exceed twice the circuit's rated voltage."
    },
    {
      id: "alternative-methods",
      question: "When can I use L+N to E testing instead of individual conductor testing?",
      answer: "Use L+N to E testing only when: Individual testing is physically impossible due to permanent connections, equipment cannot be safely disconnected, or time constraints exist in live environments. Always document this as a limitation in your report, explain why individual testing wasn't possible, and note that fault location may be more difficult."
    },
    {
      id: "stabilisation-time",
      question: "How long should I wait for readings to stabilise?",
      answer: "Maintain test voltage for minimum 1 minute for basic compliance. For critical circuits or investigation of borderline results, extend to 2-5 minutes. Watch for polarisation effects where readings may initially rise then stabilise. In very long cable runs or high-capacitance circuits, longer stabilisation times may be needed."
    },
    {
      id: "three-phase-testing",
      question: "What's the best approach for testing three-phase installations?",
      answer: "Test systematically: Start with all phase-to-earth tests (L1-E, L2-E, L3-E), then phase-to-neutral tests (L1-N, L2-N, L3-N), finally phase-to-phase tests (L1-L2, L1-L3, L2-L3). This sequence helps identify whether problems are related to individual phases or phase combinations, making fault diagnosis more efficient."
    },
    {
      id: "motor-circuits",
      question: "How should I test motor circuits and control equipment?",
      answer: "For motor circuits: Disconnect the motor at the local isolator, test the supply cables separately from motor terminals, test motor windings using manufacturer's procedures. For control circuits: Disconnect control equipment, test control cables separately, use appropriate test voltages for control voltage levels (often 250V DC for 24V/48V control systems)."
    },
    {
      id: "cable-length-effects",
      question: "Do cable lengths affect IR testing methods?",
      answer: "Yes. Long cable runs have higher capacitance requiring longer stabilisation times. Very long runs may need reduced test voltage to prevent capacitive damage. Underground or overhead cables may require special considerations for moisture and environmental effects. Document cable lengths and any special testing conditions used."
    },
    {
      id: "spd-handling",
      question: "How should I handle surge protective devices during testing?",
      answer: "Always disconnect or isolate SPDs before IR testing. SPDs are designed to conduct at relatively low voltages and will give false low readings. If SPDs cannot be disconnected, note this limitation in your report. Some SPDs have test/disconnect positions - use these if available. Test SPD integrity separately according to manufacturer's instructions."
    },
    {
      id: "results-interpretation",
      question: "How do I interpret different results from different test methods?",
      answer: "Different test methods may give different results due to: parallel paths in L+N testing masking individual conductor problems, capacitive effects varying between test configurations, and equipment connections affecting specific conductor pairs. Always record all test methods used, explain any significant variations, and use the most conservative (lowest) acceptable reading for safety assessment."
    }
  ];

  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <HelpCircle className="h-5 w-5 text-elec-yellow" />
          Test Methods FAQ
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