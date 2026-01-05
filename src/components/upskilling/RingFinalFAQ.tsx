import { HelpCircle, ChevronDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useState } from 'react';

const faqData = [
  {
    question: "Why is ring final circuit testing more complex than radial circuit testing?",
    answer: "Ring circuits require verification that both legs of the ring are complete, correctly connected, and have no interconnections. The cross-connection test is essential to verify that line, neutral, and CPC conductors are properly connected at each outlet and that no spurs are incorrectly wired into the ring."
  },
  {
    question: "What's the difference between end-to-end testing and cross-connection testing?",
    answer: "End-to-end testing verifies that each conductor forms a complete loop from the consumer unit and back. Cross-connection testing checks that conductors are correctly wired at each socket outlet and identifies any interconnections or faults within the ring circuit."
  },
  {
    question: "Can I test a ring circuit that has been converted to radials?",
    answer: "If a ring has been converted to radials, it should be tested as radial circuits, not as a ring. However, you must verify that the conversion was done correctly - ensure proper termination at the consumer unit, appropriate circuit protection for the new circuit length, and that no socket outlets are left without proper connection."
  },
  {
    question: "What should I do if I find an interconnection between ring circuits?",
    answer: "Interconnections are dangerous and must be rectified immediately. They can cause: overloading of conductors, incorrect protective device operation, and potential safety hazards. Identify the interconnection point, separate the circuits, and ensure each ring operates independently before proceeding with testing."
  },
  {
    question: "How do I handle a ring circuit with multiple spurs?",
    answer: "Spurs must be tested separately from the ring. First, test the ring circuit proper using the cross-connection method. Then test each spur as a radial circuit from its connection point. Ensure spurs comply with BS 7671 requirements (one single or one double socket per spur, appropriate cable size, etc.)."
  },
  {
    question: "Why might cross-connection readings vary between socket outlets?",
    answer: "Readings vary due to different cable lengths from the consumer unit to each socket. Sockets closer to the consumer unit show lower readings, while those further away show higher readings. However, all readings should be within expected ranges and show no anomalous values that might indicate faults."
  },
  {
    question: "What's the maximum acceptable difference between ring legs?",
    answer: "While BS 7671 doesn't specify exact tolerances, readings between ring legs should be reasonably close (typically within 10-20% of each other). Large differences may indicate damaged conductors, poor connections, or incorrect cable sizes. Any significant discrepancy requires investigation before proceeding."
  }
];

export const RingFinalFAQ = () => {
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