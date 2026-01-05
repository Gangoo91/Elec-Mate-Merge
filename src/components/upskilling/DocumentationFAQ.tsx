import { HelpCircle, ChevronDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useState } from 'react';

const faqData = [
  {
    question: "What happens if I can't obtain the original electrical installation certificate?",
    answer: "If the original certificate is unavailable, you should: 1) Check with building control/local authority, 2) Contact the installing contractor if known, 3) Create detailed as-built drawings during inspection, 4) Document the limitation clearly in your report, 5) Recommend a full electrical installation condition report (EICR) to establish baseline documentation."
  },
  {
    question: "How detailed should circuit schedules be for inspection purposes?",
    answer: "Circuit schedules must include: Circuit designation/number, Description of circuit use, Protective device type and rating, Cable type and CSA, Circuit length, Method of installation, and Reference to any design calculations. This level of detail is essential for proper verification during inspection."
  },
  {
    question: "Can I accept hand-drawn schematic diagrams?",
    answer: "Yes, hand-drawn diagrams are acceptable provided they are: Clear and legible, Technically accurate, Show all relevant circuit information, Signed and dated by a competent person, and Drawn to a reasonable standard. However, computer-generated diagrams are preferred for clarity and durability."
  },
  {
    question: "What should I do if building plans don't match the actual installation?",
    answer: "When plans don't match reality: 1) Document all discrepancies clearly, 2) Create updated as-built drawings if possible, 3) Note this as a significant limitation, 4) Consider whether inspection can proceed safely, 5) Recommend updating documentation before any future work."
  },
  {
    question: "Are previous test certificates mandatory for visual inspection?",
    answer: "Previous test certificates are not mandatory for visual inspection but are highly recommended as they: Provide baseline readings for comparison, Show installation history and any recurring issues, Help identify trends in performance, and Can reveal previous limitations or remedial work."
  },
  {
    question: "How long should I spend creating as-built drawings during inspection?",
    answer: "Time spent on as-built drawings should be proportionate to the installation complexity and safety requirements. For simple domestic installations: 30-60 minutes may suffice. For complex commercial/industrial: Several hours may be needed. Always agree time and cost implications with the client beforehand."
  },
  {
    question: "What documentation is needed for additions and alterations?",
    answer: "For additions and alterations, you need: Original installation certificate, Minor works certificates for small changes, Electrical installation certificates for major work, Building regulation compliance certificates, and Any design calculations or specifications for the new work."
  }
];

export const DocumentationFAQ = () => {
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