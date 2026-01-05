import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

const EICRFAQ = () => {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (itemId: string) => {
    setOpenItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const faqData = [
    {
      id: "eicr-purpose",
      question: "What is the main purpose of an Electrical Installation Condition Report (EICR)?",
      answer: "An EICR provides a comprehensive assessment of the safety and condition of an existing electrical installation. It identifies defects, damage, deterioration, and non-compliance with current standards that may give rise to danger. The report includes observations with appropriate classification codes and recommendations for remedial action to ensure continued safe operation of the installation."
    },
    {
      id: "frequency-requirements",
      question: "How often should an EICR be carried out and who determines this frequency?",
      answer: "EICR frequency depends on installation type and use. Domestic properties typically require inspection every 10 years (or 5 years for rental properties under regulations). Commercial and industrial installations usually need inspection every 5 years, while special locations may require more frequent inspection. The frequency should be determined by a competent person considering installation type, environment, usage patterns, and previous inspection results."
    },
    {
      id: "competency-requirements",
      question: "What competency and qualifications are required to carry out EICRs?",
      answer: "EICR inspection must be performed by persons competent in both inspection and testing, with appropriate qualifications typically including City & Guilds 2391-52 or equivalent. Competency includes thorough knowledge of BS 7671, inspection techniques, testing procedures, safety requirements, and ability to classify defects appropriately. Professional indemnity insurance and registration with appropriate schemes is essential for commercial work."
    },
    {
      id: "classification-codes",
      question: "What do the different EICR classification codes (C1, C2, C3, FI) actually mean in practice?",
      answer: "C1 indicates 'Danger Present' requiring immediate action to make the installation safe - examples include live parts accessible to touch or missing protective conductors. C2 means 'Potentially Dangerous' requiring urgent remedial work - such as inadequate earthing or missing RCD protection. C3 suggests 'Improvement Recommended' for enhanced safety - typically older installations not meeting current standards. FI means 'Further Investigation Required' when limitations prevent complete inspection or testing."
    },
    {
      id: "limitations-extent",
      question: "What are typical limitations of inspection and how should these be recorded?",
      answer: "Common limitations include areas not accessible without causing damage, installations concealed within building fabric, circuits that cannot be isolated for testing, and equipment that must remain operational. All limitations must be clearly recorded on the EICR with specific details of what could not be inspected or tested. Where limitations significantly affect the inspection, 'FI' codes should be used with recommendations for further investigation."
    },
    {
      id: "remedial-recommendations",
      question: "How should remedial work recommendations be prioritised and implemented?",
      answer: "C1 defects require immediate action before continued use - installation may need to be isolated until made safe. C2 defects should be rectified urgently, typically within weeks rather than months. C3 improvements can be scheduled during planned maintenance or upgrades. All remedial work should be performed by competent persons and appropriately certified. A further EICR may be required after extensive remedial work to verify overall installation safety."
    },
    {
      id: "testing-without-damage",
      question: "What testing can be omitted if it would cause damage, and how should this be recorded?",
      answer: "Testing should not cause damage to the installation or connected equipment. Insulation resistance testing may be omitted for electronic equipment that could be damaged, and alternative methods like protective conductor testing used instead. Earth fault loop impedance testing might be limited where RCDs cannot be bypassed. All omissions must be recorded as limitations with clear explanations, and alternative verification methods used where possible."
    },
    {
      id: "rcd-testing-requirements",
      question: "What specific RCD testing is required during an EICR and what are the acceptance criteria?",
      answer: "All RCDs must be tested for correct operation at rated residual current (typically 30mA) and at 5 times rated current. General purpose RCDs should trip within 300ms at rated current and 40ms at 5× rated current. Time-delayed (S-type) RCDs have different criteria. Test button operation must also be verified. Non-operation or incorrect timing indicates C1 or C2 defects requiring urgent attention. Document all RCD types, ratings, and test results clearly."
    },
    {
      id: "sampling-circuits",
      question: "When is sampling of circuits acceptable during EICR, and what percentage should be tested?",
      answer: "Sampling may be appropriate for large installations with many similar circuits, but must be clearly agreed with the client and recorded as a limitation. Typically 10% minimum sampling is recommended, but this increases where defects are found. All different circuit types must be represented in sampling. However, safety-critical circuits, fire alarm systems, emergency lighting, and circuits in special locations should normally be 100% tested. Any sampling strategy must be technically justified and documented."
    },
    {
      id: "certification-responsibility",
      question: "Who takes responsibility for EICR accuracy and what are the legal implications?",
      answer: "The person signing the EICR takes full professional responsibility for its accuracy, including all observations, test results, and classifications. This includes liability for any consequences of missed defects or incorrect classifications. Professional indemnity insurance is essential. The EICR forms part of the installation record and may be required for insurance, legal proceedings, or regulatory compliance. Accuracy and thoroughness are therefore crucial for both safety and legal protection."
    },
    {
      id: "next-inspection",
      question: "How should the next inspection date be determined and what factors influence this decision?",
      answer: "Next inspection interval should consider installation condition, environment, usage, maintenance quality, and defects found. Poor installation condition or harsh environments may require shorter intervals. High-risk installations or those with significant defects should be inspected more frequently. The maximum periods in BS 7671 should be treated as absolute maximums - shorter periods may be appropriate. Record the recommended interval clearly with justification for the decision made."
    },
    {
      id: "schedule-of-inspections",
      question: "What should be included in the Schedule of Inspections and how detailed should it be?",
      answer: "The Schedule of Inspections should comprehensively list all items inspected, with clear indication of satisfactory/unsatisfactory conditions and any limitations. Include consumer units, distribution boards, protective devices, cables, terminations, earthing and bonding, isolation facilities, and safety notices. Be specific about defects found - don't just mark as unsatisfactory without details. This schedule provides crucial evidence of inspection thoroughness and supports any classification codes assigned."
    }
  ];

  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <HelpCircle className="h-5 w-5 text-elec-yellow" />
          EICR Frequently Asked Questions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {faqData.map((faq) => (
          <Collapsible 
            key={faq.id} 
            open={openItems.includes(faq.id)}
            onOpenChange={() => toggleItem(faq.id)}
          >
            <div className="border border-gray-600 rounded-lg overflow-hidden">
              <CollapsibleTrigger className="w-full p-4 text-left bg-[#323232] hover:bg-[#3a3a3a] transition-colors duration-200 flex items-center justify-between group">
                <h3 className="text-foreground font-medium text-sm sm:text-base pr-4 leading-snug">
                  {faq.question}
                </h3>
                <ChevronDown 
                  className={`h-5 w-5 text-elec-yellow transition-transform duration-200 flex-shrink-0 ${
                    openItems.includes(faq.id) ? 'rotate-180' : ''
                  }`} 
                />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="p-4 bg-[#2a2a2a] border-t border-gray-600">
                  <p className="text-foreground text-sm leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </CollapsibleContent>
            </div>
          </Collapsible>
        ))}
        
        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 mt-6">
          <div className="flex items-start gap-3">
            <HelpCircle className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-foreground mb-2">Professional Guidance</h4>
              <p className="text-foreground text-sm leading-relaxed">
                These FAQs provide general guidance on EICR procedures and requirements. Always refer to the 
                current edition of BS 7671 and relevant guidance documents for definitive requirements. 
                Seek professional advice for complex situations or where interpretation of standards is required.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EICRFAQ;