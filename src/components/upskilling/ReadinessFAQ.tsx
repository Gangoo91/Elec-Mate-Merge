import { HelpCircle, ChevronDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useState } from 'react';

const faqData = [
  {
    question: "What should I do if the client insists on starting testing before the visual inspection is complete?",
    answer: "You must refuse to proceed. Explain that BS 7671 requires visual inspection to be completed before testing begins. The visual inspection identifies safety hazards that could make testing dangerous. Document their request and your refusal for professional protection."
  },
  {
    question: "How do I handle situations where proper isolation cannot be achieved?",
    answer: "Never compromise on isolation safety. If proper isolation cannot be achieved: 1) Stop work immediately, 2) Document the limitation clearly, 3) Explain to the client why testing cannot proceed, 4) Recommend remedial work to enable safe isolation, 5) Consider if alternative testing methods might be appropriate."
  },
  {
    question: "What if my test instruments fail their proving unit check?",
    answer: "Do not use faulty instruments under any circumstances. If instruments fail proving unit checks: 1) Remove from service immediately, 2) Use backup instruments if available, 3) If no backup available, postpone testing, 4) Arrange calibration/repair before proceeding, 5) Document the issue and any delays caused."
  },
  {
    question: "How long should I allow between disconnecting loads and starting insulation testing?",
    answer: "Allow sufficient time for any stored energy to dissipate - typically 5-10 minutes for most circuits. For circuits with large capacitors or electronic equipment, longer may be needed. Always verify the circuit is de-energised before proceeding with insulation testing."
  },
  {
    question: "What constitutes adequate documentation for starting testing?",
    answer: "Minimum requirements include: Circuit schedules showing all protective devices, Cable routing information, Previous test results (if available), Earthing arrangement details, Any special installation features or limitations. Without these, testing scope will be severely limited."
  },
  {
    question: "Can I test circuits with permanent loads that cannot be disconnected?",
    answer: "Some circuits with essential loads (fire alarms, emergency lighting) may need special consideration. Options include: Testing at reduced voltage where appropriate, Using specialised test equipment designed for loaded circuits, Testing during planned maintenance shutdowns, or clearly documenting limitations if testing cannot be performed."
  },
  {
    question: "What should I do if I discover unexpected parallel paths during testing?",
    answer: "Stop the current test and reassess the installation. Parallel paths can give false readings and indicate documentation errors or undocumented modifications. Investigate the parallel path, update your understanding of the circuit, and restart appropriate testing procedures."
  }
];

export const ReadinessFAQ = () => {
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