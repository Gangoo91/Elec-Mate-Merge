import { HelpCircle, ChevronDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useState } from 'react';

const faqData = [
  {
    question: "What's the difference between observation codes C2 and C3?",
    answer: "C2 indicates potentially dangerous conditions requiring urgent attention - these could become immediately dangerous under certain circumstances. C3 indicates improvements recommended for enhanced safety but not immediately dangerous. C2 typically requires action within days/weeks, while C3 can be planned for future maintenance."
  },
  {
    question: "How detailed should my defect descriptions be?",
    answer: "Descriptions should be specific enough that another competent person could understand exactly what was found and where. Include: Precise location, Nature of the defect, Relevant regulation references, Potential consequences, and any immediate actions taken. Avoid vague terms like 'poor condition' - be specific about what makes it poor."
  },
  {
    question: "When should I use observation code FI instead of C1, C2, or C3?",
    answer: "Use FI when you suspect a problem but cannot fully investigate due to access limitations, lack of specialised equipment, or safety concerns. For example: suspected cable damage behind inaccessible walls, intermittent faults requiring monitoring, or specialised equipment needing manufacturer assessment."
  },
  {
    question: "How should I handle disputes about observation codes with clients?",
    answer: "Stand firm on technical assessments while explaining the reasoning clearly. Reference relevant regulations and standards. Document any client disagreements in the report limitations section. Remember that observation codes are technical judgements based on safety standards, not negotiable items based on cost or convenience."
  },
  {
    question: "What information must be included when recording limitations?",
    answer: "Include: Specific areas/equipment not accessed, Reasons for lack of access (locked, dangerous, inaccessible), Impact on inspection scope, Recommendations for future access, Any safety implications. Be precise - 'some areas not accessible' is inadequate; 'basement distribution board locked, key not available' is specific and useful."
  },
  {
    question: "How long are electrical inspection certificates legally valid?",
    answer: "Certificates don't expire, but they represent the installation condition at the time of inspection. For ongoing compliance, domestic properties typically need inspection every 10 years, commercial every 5 years, and some industrial installations annually. The certificate remains valid legal evidence of the installation state when issued."
  },
  {
    question: "Should I include recommendations for improvements even if not strictly required?",
    answer: "Yes, but use appropriate observation codes. C3 is for recommended improvements that enhance safety. Include cost-effective upgrades that would improve installation safety or performance. However, avoid overwhelming clients with unnecessary suggestions - focus on meaningful safety and compliance improvements."
  }
];

export const RecordingFAQ = () => {
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
            <CollapsibleTrigger className="flex items-center justify-between w-full p-3 sm:p-4 bg-[#323232] rounded-lg hover:bg-[#3a3a3a] transition-colors group min-h-[44px]">
              <span className="text-left text-foreground font-medium group-hover:text-elec-yellow">
                {faq.question}
              </span>
              <ChevronDown className={`h-4 w-4 text-foreground transition-transform ${
                openItems.includes(index.toString()) ? 'rotate-180' : ''
              }`} />
            </CollapsibleTrigger>
            <CollapsibleContent className="px-3 sm:px-4 py-3 bg-[#2a2a2a] rounded-b-lg">
              <p className="text-sm sm:text-base text-foreground leading-relaxed">
                {faq.answer}
              </p>
            </CollapsibleContent>
          </Collapsible>
        ))}
      </CardContent>
    </Card>
  );
};