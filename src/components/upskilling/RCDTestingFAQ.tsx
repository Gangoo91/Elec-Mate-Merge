import { HelpCircle, ChevronDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useState } from 'react';

const faqData = [
  {
    question: "What test currents should I use for RCD testing?",
    answer: "Standard test sequence includes: ½×IΔn (should not trip), 1×IΔn (should trip within 300ms for general type, 40ms for S-type), and 5×IΔn (should trip within 40ms). Where IΔn is the rated residual operating current."
  },
  {
    question: "How often should RCDs be tested?",
    answer: "RCDs should be tested during initial verification, after any alterations, during periodic inspections (typically every 5-10 years), and as part of routine maintenance. The test button should be operated monthly by the user."
  },
  {
    question: "What should I do if an RCD fails the test?",
    answer: "If an RCD fails to operate within specified limits, it should be replaced immediately. Check for: correct wiring, appropriate RCD type for the application, and any connected equipment that might affect operation. Do not attempt repairs."
  },
  {
    question: "Can I test RCDs with equipment connected?",
    answer: "Generally yes, but some sensitive electronic equipment may be affected by test currents. Consider disconnecting computers, medical equipment, and other sensitive devices before testing. Always check manufacturer recommendations."
  },
  {
    question: "What's the difference between Type AC, A, and B RCDs?",
    answer: "Type AC detects AC fault currents only. Type A detects AC and pulsating DC fault currents. Type B detects AC, pulsating DC, and smooth DC fault currents. Choose the appropriate type based on the connected equipment."
  },
  {
    question: "Why might an RCD have a longer trip time than expected?",
    answer: "Factors affecting trip time include: ambient temperature, age of RCD, supply voltage variations, and test current accuracy. If consistently outside limits, the RCD should be replaced."
  },
  {
    question: "Should I test RCDs at different test positions?",
    answer: "Yes, testing from different positions on the circuit helps verify that the RCD will operate correctly regardless of where a fault occurs. Test from outlets at various distances from the RCD."
  },
  {
    question: "What documentation is required for RCD testing?",
    answer: "Record: RCD type and rating, test currents used, trip times measured, test positions, date and time of test, tester identification, and any observations or remedial actions taken."
  }
];

const RCDTestingFAQ = () => {
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
            <CollapsibleTrigger className="flex items-center justify-between w-full min-h-[44px] p-4 bg-[#323232] rounded-lg hover:bg-[#3a3a3a] transition-colors group">
              <span className="text-left text-foreground font-medium text-sm sm:text-base group-hover:text-elec-yellow">
                {faq.question}
              </span>
              <ChevronDown className={`h-4 w-4 text-foreground transition-transform ${
                openItems.includes(index.toString()) ? 'rotate-180' : ''
              }`} />
            </CollapsibleTrigger>
            <CollapsibleContent className="px-4 py-3 bg-[#2a2a2a] rounded-b-lg">
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

export default RCDTestingFAQ;