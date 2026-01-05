import { HelpCircle, ChevronDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useState } from 'react';

const faqData = [
  {
    question: "What should I do if a consumer unit is installed too low or too high?",
    answer: "If a consumer unit doesn't meet the 1.35m minimum height requirement in domestic premises, this should be recorded as a non-compliance. For units too high (over 2m), accessibility for operation becomes an issue. In both cases, note this as a code C3 (improvement recommended) unless it creates significant safety concerns."
  },
  {
    question: "How do I handle missing or illegible circuit labels?",
    answer: "Missing or illegible labels must be addressed: 1) Use circuit identification equipment to trace circuits, 2) Create temporary labels during inspection, 3) Recommend permanent labelling as priority remedial work, 4) Code as C2 if it creates danger, C3 if it's just poor practice, 5) Never make assumptions about circuit purposes."
  },
  {
    question: "What clearances are required around electrical equipment?",
    answer: "Minimum clearances depend on equipment type: Consumer units need 700mm in front, 500mm sides; Industrial switchgear may need 1m+ working space; Emergency equipment must always be accessible; Cable routes need sufficient space for maintenance. Check BS 7671 Section 513 for specific requirements."
  },
  {
    question: "Can I inspect if some equipment is locked away?",
    answer: "You can proceed with limitations if equipment is locked, but you must: 1) Clearly document what couldn't be accessed, 2) Request keys/access for future inspections, 3) Note this limits the inspection scope, 4) Consider if the inaccessible equipment affects overall safety assessment."
  },
  {
    question: "What notices are required for different types of installations?",
    answer: "Required notices include: RCD test notices (monthly/quarterly testing), Emergency lighting test records, Fire alarm system information, Voltage/phase labels on industrial equipment, Warning signs for special locations, and Earthing and bonding labels where required by BS 7671."
  },
  {
    question: "How should cable identification be marked in industrial installations?",
    answer: "Industrial cable identification should include: Cable schedule reference numbers, Voltage level markings, Circuit destination labels, Phase identification (L1, L2, L3), Neutral and earth identification, and Any special characteristics (fire resistant, SWA, etc.). Use durable labels suitable for the environment."
  },
  {
    question: "What do I do if access equipment like ladders would be needed?",
    answer: "When access equipment is needed: 1) Assess if it's safe and appropriate to provide this, 2) Ensure you're competent to work at height, 3) Consider if this is the client's responsibility, 4) Document any limitations if access isn't possible, 5) Never take unnecessary risks - safety first."
  }
];

export const AccessibilityFAQ = () => {
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
              <span className="text-left text-foreground font-medium group-hover:text-elec-yellow text-sm sm:text-base">
                {faq.question}
              </span>
              <ChevronDown className={`h-5 w-5 text-foreground transition-transform ${
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