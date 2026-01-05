import { HelpCircle, ChevronDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useState } from 'react';

const faqData = [
  {
    question: "How do I calculate expected resistance values for different cable types?",
    answer: "Use the conductor resistance values from BS 7671 Appendix 4: multiply the resistance per metre (from tables) by the cable length. For example, 2.5mm² copper has approximately 7.3mΩ/m resistance, so a 30m run would be approximately 0.22Ω. Add connection resistances and consider temperature effects for accuracy."
  },
  {
    question: "What tolerance should I accept for resistance readings?",
    answer: "While BS 7671 doesn't specify exact tolerances, industry practice accepts readings within ±20% of calculated values for new installations. For existing installations, comparison with previous test results is important. Any significant increase from previous readings requires investigation regardless of absolute values."
  },
  {
    question: "How does temperature affect continuity test results?",
    answer: "Conductor resistance increases with temperature (approximately 0.4% per °C for copper). Tests should ideally be conducted at similar temperatures to design calculations (usually 20°C). For practical purposes, temperature corrections are rarely needed for continuity testing unless extreme temperature differences exist."
  },
  {
    question: "Can I use a simple multimeter instead of a dedicated continuity tester?",
    answer: "No. Simple multimeters typically use test currents well below the 200mA-1A required by BS 7671. Low test currents may not detect high-resistance joints that could fail under fault conditions. Always use properly calibrated test equipment that meets the standard requirements."
  },
  {
    question: "What should I do if my test equipment gives inconsistent readings?",
    answer: "First check: battery level, lead connections, and calibration status. Verify with a known resistance or short circuit. If equipment is faulty, stop testing immediately and use backup equipment. Never proceed with questionable readings - test equipment reliability is critical for safety."
  },
  {
    question: "How do I test continuity in installations with multiple parallel CPCs?",
    answer: "Test each CPC path individually where possible. For installations with multiple parallel protective conductors (e.g., cable trays, SWA armour), calculate the combined resistance effect and verify each path contributes properly. Document the method used and ensure the combined resistance meets requirements."
  },
  {
    question: "When should I recommend re-termination based on resistance readings?",
    answer: "Recommend re-termination when: readings are significantly higher than expected for the cable type and length, readings vary between similar circuits without explanation, or readings have increased significantly since previous tests. High resistance connections pose serious fire and safety risks."
  }
];

export const TestProceduresFAQ = () => {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (value: string) => {
    setOpenItems(current =>
      current.includes(value)
        ? current.filter(item => item !== value)
        : [...current, value]
    );
  };

  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <HelpCircle className="h-5 w-5 text-elec-yellow" />
          Frequently Asked Questions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {faqData.map((faq, index) => (
          <Collapsible 
            key={index}
            open={openItems.includes(index.toString())}
            onOpenChange={() => toggleItem(index.toString())}
          >
            <CollapsibleTrigger className="flex items-center justify-between w-full p-4 bg-[#323232] rounded-lg hover:bg-[#3a3a3a] transition-colors group">
              <span className="text-left text-foreground font-medium group-hover:text-elec-yellow">
                {faq.question}
              </span>
              <ChevronDown className={`h-4 w-4 text-foreground transition-transform ${
                openItems.includes(index.toString()) ? 'rotate-180' : ''
              }`} />
            </CollapsibleTrigger>
            <CollapsibleContent className="px-4 py-3 bg-[#2a2a2a] rounded-b-lg">
              <p className="text-foreground text-sm leading-relaxed">
                {faq.answer}
              </p>
            </CollapsibleContent>
          </Collapsible>
        ))}
      </CardContent>
    </Card>
  );
};