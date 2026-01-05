import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

const ObservationCodesFAQ = () => {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const faqData = [
    {
      id: "c1-vs-c2",
      question: "How do I distinguish between C1 and C2 codes when both seem dangerous?",
      answer: "C1 applies when there's immediate risk of injury through normal contact or use - think 'touch test'. If someone could receive a shock or injury just by normal interaction with the installation, it's C1. C2 applies when danger could develop under fault conditions or through foreseeable misuse, but normal operation doesn't present immediate risk. For example, accessible live parts = C1, while inadequate earthing that would only be dangerous during a fault = C2."
    },
    {
      id: "c3-application",
      question: "When should I use C3 codes for older installations that were compliant when installed?",
      answer: "C3 should be used when an improvement would genuinely enhance safety, not simply because the installation doesn't meet current standards. Consider whether the improvement addresses a real risk or provides meaningful protection enhancement. For example, adding RCD protection to old socket circuits provides genuine safety improvement (C3), but changing perfectly safe old socket outlets just because they're not current style wouldn't warrant a C3."
    },
    {
      id: "fi-usage",
      question: "What situations genuinely require an FI code rather than making a judgment call?",
      answer: "FI should be used when you cannot determine the safety status without additional investigation. This includes: circuits that couldn't be tested due to operational requirements, inaccessible installations where you suspect but can't confirm defects, unusual test results requiring specialist analysis, or complex systems requiring expert knowledge. Don't use FI to avoid difficult decisions when sufficient information is available for classification."
    },
    {
      id: "multiple-codes",
      question: "Can I assign multiple observation codes to the same defect?",
      answer: "No, each observation should receive one code that represents the highest level of concern. If a defect has multiple aspects, classify it by the most serious safety implication. For example, if a damaged socket has both exposed live parts (C1) and poor earthing (C2), classify it as C1. You can mention the multiple aspects in your description, but the code should reflect the highest risk level."
    },
    {
      id: "client-disagreement",
      question: "What should I do if a client disagrees with my observation code classification?",
      answer: "Maintain your professional assessment while explaining the rationale clearly. Provide specific references to BS 7671 or other standards supporting your decision. Document the client's concerns but don't change your technical assessment to satisfy commercial pressures. If the client remains concerned, suggest they obtain a second opinion from another qualified person. Your professional judgment and liability require honest, accurate reporting."
    },
    {
      id: "code-documentation",
      question: "How detailed should my observation descriptions be for each code type?",
      answer: "All codes require clear, specific descriptions enabling remedial action. Include: precise location, nature of defect, reference to applicable standards, and specific remedial action required. C1 codes need immediate action details and safety warnings. C2 codes should explain the potential danger and urgency. C3 codes should justify the safety improvement benefit. FI codes must specify what investigation is needed and why."
    },
    {
      id: "rcd-requirements",
      question: "How do I classify missing RCD protection in different scenarios?",
      answer: "This depends on current requirements vs. recommendations. Missing RCD protection for socket outlets in domestic installations installed after 2008 = C2 (required by regulations). Missing RCD protection on older socket circuits = C3 (improvement recommended). Missing RCD protection in bathrooms or outdoor locations = C1 or C2 depending on specific risk assessment. Always consider the genuine risk and current regulatory requirements."
    },
    {
      id: "installation-age",
      question: "Should the age of an installation affect my observation code decisions?",
      answer: "Age itself doesn't determine codes, but it affects context and expectations. Older installations have 'grandfather rights' and shouldn't be penalised for not meeting current standards unless there's genuine safety benefit. However, deterioration due to age (damaged cables, corroded connections) should be classified appropriately regardless of installation age. Focus on actual safety implications rather than compliance with current standards for historical work."
    },
    {
      id: "testing-limitations",
      question: "How do I handle observations when testing was limited by operational requirements?",
      answer: "Use FI codes for areas that couldn't be properly assessed due to limitations. Clearly document what couldn't be tested and why, and specify what investigation is needed. For areas that were tested adequately, apply appropriate codes based on findings. Include a limitations section in your report explaining the extent of inspection and any areas requiring future investigation when circumstances permit."
    },
    {
      id: "emergency-lighting",
      question: "How should I classify defects in emergency lighting or fire alarm systems?",
      answer: "Apply the same code principles but consider the critical safety function. Non-functional emergency lighting in a place of public resort could be C1 or C2 depending on occupancy and alternative safety measures. Missing or inadequate emergency lighting testing = C2. Poor condition but functional emergency lighting = C3. For fire alarm systems, consider life safety implications and current BS standards (BS 5839). Always consider the consequences of failure for these life safety systems."
    },
    {
      id: "competent-person",
      question: "What qualifications and experience do I need to assign observation codes confidently?",
      answer: "You need comprehensive electrical knowledge, practical experience in inspection and testing, understanding of BS 7671 and related standards, and professional judgment developed through training and practice. Ideally, you should be registered with a competent person scheme, have appropriate qualifications (City & Guilds 2391 or equivalent), and maintain continuing professional development. When in doubt about complex situations, seek advice from experienced colleagues or specialist technical support."
    },
    {
      id: "legal-implications",
      question: "What are the legal implications if I assign the wrong observation code?",
      answer: "Incorrect code assignment can have serious consequences: underestimating danger (e.g., C2 instead of C1) could lead to accidents and liability for negligence; overestimating risk unnecessarily could lead to claims for economic loss. You have a duty of care to provide accurate, honest assessments. Professional indemnity insurance is essential, but won't protect against deliberate misrepresentation or gross negligence. Maintain competency, follow systematic decision-making, and document rationale clearly."
    }
  ];

  const toggleItem = (value: string) => {
    setOpenItems(prev => 
      prev.includes(value) 
        ? prev.filter(item => item !== value)
        : [...prev, value]
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
      <CardContent>
        <div className="space-y-4">
          {faqData.map((faq) => (
            <Collapsible
              key={faq.id}
              open={openItems.includes(faq.id)}
              onOpenChange={() => toggleItem(faq.id)}
            >
              <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg bg-[#323232] border border-gray-600 p-4 text-left hover:bg-[#2a2a2a] transition-colors">
                <span className="text-foreground font-medium">{faq.question}</span>
                <ChevronDown 
                  className={`h-4 w-4 text-elec-yellow transition-transform ${
                    openItems.includes(faq.id) ? 'rotate-180' : ''
                  }`} 
                />
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-2">
                <div className="rounded-lg bg-[#2a2a2a] border border-gray-600 p-4">
                  <p className="text-foreground text-sm leading-relaxed">{faq.answer}</p>
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ObservationCodesFAQ;