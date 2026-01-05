import { HelpCircle, ChevronDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useState } from 'react';

const faqData = [
  {
    question: "When is an EIC required instead of a Minor Works Certificate?",
    answer: "An EIC is required for new installations, complete rewires, new consumer units, addition of new circuits, and major alterations. Minor Works Certificates are only for small additions like extra socket outlets or lighting points on existing circuits."
  },
  {
    question: "Who can sign the different sections of an EIC?",
    answer: "The designer, installer, and inspector/tester must each sign their respective sections. These can be the same person if they performed all roles. Each signature accepts full responsibility for that aspect of the work."
  },
  {
    question: "What tests are mandatory for EIC completion?",
    answer: "All tests specified in BS 7671 Part 6 are required: continuity of protective conductors, continuity of ring circuits, insulation resistance, protection by automatic disconnection, additional protection (RCD), polarity, and phase sequence for three-phase installations."
  },
  {
    question: "How should design calculations be documented?",
    answer: "Design calculations must show maximum demand assessment, cable selection criteria, volt drop calculations, fault current calculations, and protective device coordination. All assumptions and diversity factors must be clearly stated."
  },
  {
    question: "What information is required in the circuit schedule?",
    answer: "The schedule must include circuit reference, description, type of wiring, reference method, conductor cross-sectional area, overcurrent protective device type and rating, and any special requirements or limitations."
  }
];

const EICFAQ = () => {
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

export default EICFAQ;