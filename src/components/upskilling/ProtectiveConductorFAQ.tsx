import { HelpCircle, ChevronDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useState } from 'react';

const faqData = [
  {
    question: "What's the difference between CPC continuity and bonding conductor continuity?",
    answer: "CPC continuity ensures fault current can return to the source to operate protective devices. Bonding conductor continuity ensures all exposed and extraneous conductive parts are at the same potential, preventing dangerous voltage differences. Both are essential but serve different protective functions."
  },
  {
    question: "Why do main bonding conductors have such strict resistance limits?",
    answer: "Main bonding conductors must have resistance ≤0.05Ω because they carry fault currents and must ensure rapid protective device operation. Higher resistance could delay fault clearance, allowing dangerous touch voltages to persist longer and potentially causing equipment damage or fire."
  },
  {
    question: "How do I test CPC continuity in circuits with multiple CPCs?",
    answer: "Test each CPC individually from the consumer unit to each outlet/accessory. For circuits with multiple CPCs (like ring circuits), test continuity of each ring leg separately, then perform the R1+R2 test to verify the complete circuit including both line and CPC continuity."
  },
  {
    question: "What should I do if the CPC reading is higher than expected?",
    answer: "High CPC resistance indicates potential problems: 1) Check connections at both ends, 2) Verify cable integrity along the route, 3) Look for corrosion or damage, 4) Ensure proper cable terminations, 5) Compare with calculated values for the cable type and length, 6) Rectify any issues before proceeding."
  },
  {
    question: "Can I use the building structure as a CPC?",
    answer: "Generally no. BS 7671 has strict requirements for structural metalwork used as CPCs: it must be permanent, suitable for fault current, properly connected, and meet specific regulations. In most cases, separate CPCs are required. Structural steelwork may be suitable in some industrial installations with proper design."
  },
  {
    question: "How do I handle CPC testing in IT equipment installations?",
    answer: "IT installations require special care: 1) Use proper test sequence to avoid equipment damage, 2) Disconnect sensitive equipment before testing, 3) Consider separate protective earthing (functional earth) requirements, 4) Be aware of electromagnetic compatibility issues, 5) Follow manufacturer guidelines for specific equipment."
  },
  {
    question: "What's the significance of the R1+R2 test result?",
    answer: "R1+R2 represents the total impedance of the line and CPC conductors. This value is crucial for: 1) Verifying protective device operation times, 2) Calculating earth fault loop impedance, 3) Ensuring adequate fault current for disconnection, 4) Comparing with design calculations to verify installation compliance."
  }
];

export const ProtectiveConductorFAQ = () => {
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