import { HelpCircle, ChevronDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useState } from 'react';

const faqData = [
  {
    question: "Why is continuity testing considered fundamental to electrical safety?",
    answer: "Continuity testing is fundamental because it verifies that safety-critical conductors (CPCs, bonding conductors) provide complete paths for fault current. Without this, protective devices may not operate during faults, leaving metalwork dangerously live and creating potentially fatal shock risks."
  },
  {
    question: "What's the difference between continuity testing and insulation resistance testing?",
    answer: "Continuity testing checks that conductors are complete and connected (low resistance), while insulation resistance testing checks that conductors are properly separated (high resistance). Both are essential - continuity ensures fault current can flow to trip protective devices, while insulation prevents current flowing where it shouldn't."
  },
  {
    question: "Can I use a basic multimeter for continuity testing instead of a proper tester?",
    answer: "No. Basic multimeters typically use very low test currents (often <1mA) which may not detect high-resistance joints that could fail under fault conditions. BS 7671 requires test currents between 200mA and 1A to properly stress connections and identify potential failures."
  },
  {
    question: "How do I test continuity in circuits with electronic equipment?",
    answer: "Electronic equipment must be disconnected before continuity testing as it can: 1) Be damaged by test currents, 2) Provide false parallel paths affecting readings, 3) Interfere with test results. Always isolate and disconnect loads before testing."
  },
  {
    question: "What should I do if I get inconsistent continuity readings?",
    answer: "Inconsistent readings suggest poor connections or loose joints. Investigation steps: 1) Re-zero test leads, 2) Clean contact points, 3) Check connections are tight, 4) Test multiple times to confirm readings, 5) If still inconsistent, investigate and rectify the connection before proceeding."
  },
  {
    question: "Is it acceptable to test continuity on energised circuits?",
    answer: "Absolutely not. Continuity testing must only be performed on isolated circuits because: 1) Test equipment can be damaged by supply voltage, 2) Accurate readings cannot be obtained, 3) Safety risks to the tester, 4) BS 7671 specifically requires de-energised testing."
  },
  {
    question: "How often should continuity testing be performed?",
    answer: "Continuity testing is required: During initial verification of new installations, During periodic inspection and testing (domestic: 10 years, commercial: 5 years, industrial: annual or as specified), After any alterations or additions, Following any suspected damage to protective conductors."
  }
];

export const ContinuityFAQ = () => {
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
            <CollapsibleTrigger className="flex items-center justify-between w-full p-4 sm:p-5 bg-[#323232] rounded-lg hover:bg-[#3a3a3a] transition-colors group min-h-[44px]">
              <span className="text-left text-foreground font-medium group-hover:text-elec-yellow text-sm sm:text-base pr-2">
                {faq.question}
              </span>
              <ChevronDown className={`h-4 w-4 text-foreground transition-transform flex-shrink-0 ${
                openItems.includes(index.toString()) ? 'rotate-180' : ''
              }`} />
            </CollapsibleTrigger>
            <CollapsibleContent className="px-4 sm:px-5 py-3 sm:py-4 bg-[#2a2a2a] rounded-b-lg">
              <p className="text-foreground text-sm sm:text-base leading-relaxed">
                {faq.answer}
              </p>
            </CollapsibleContent>
          </Collapsible>
        ))}
      </CardContent>
    </Card>
  );
};