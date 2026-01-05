import { HelpCircle, ChevronDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useState } from 'react';

const faqData = [
  {
    question: "How often should RCDs be tested for compliance with BS 7671?",
    answer: "Test buttons should be operated monthly by users. Professional electrical testing should be conducted annually or as specified in the maintenance schedule. Initial verification and periodic inspection intervals depend on the installation type and environment, typically ranging from 1-10 years."
  },
  {
    question: "What should I do if an RCD fails the monthly test button operation?",
    answer: "If the RCD fails to trip when the test button is pressed, immediately contact a qualified electrician. Do not attempt to reset or repair. Consider the protection compromised and take appropriate safety measures until professional assessment is completed."
  },
  {
    question: "Can environmental conditions affect RCD maintenance requirements?",
    answer: "Yes. Harsh environments (high humidity, temperature extremes, dust, chemicals) require more frequent inspection and testing. Coastal, industrial, and agricultural environments may need quarterly rather than annual professional testing. Document environmental factors in maintenance records."
  },
  {
    question: "What records must be kept for RCD maintenance compliance?",
    answer: "Maintain test logbooks with monthly test button results, annual professional test certificates, maintenance work orders, replacement records, incident reports, and training records. Keep test records for minimum 3 years, installation certificates for the life of the installation."
  },
  {
    question: "When should I consider replacing an aging RCD?",
    answer: "Consider replacement if: trip times consistently exceed limits, frequent nuisance tripping occurs, test button fails, physical deterioration is evident, or the RCD exceeds 15 years old. Replace immediately if complete failure occurs or safety is compromised."
  },
  {
    question: "Who is qualified to perform RCD maintenance and testing?",
    answer: "Monthly test button operation can be performed by trained users. Annual electrical testing must be done by qualified electricians with appropriate test equipment. Installation, replacement, and complex maintenance require certified electrical contractors."
  },
  {
    question: "How do I identify signs of RCD deterioration?",
    answer: "Watch for: increasing trip times, inconsistent test results, physical damage or discoloration, burning smells, loose connections, frequent nuisance tripping, or test button failure. Any of these symptoms requires professional investigation."
  },
  {
    question: "What maintenance is required for different RCD types?",
    answer: "All RCD types require similar basic maintenance (monthly testing, annual inspection), but Type B RCDs in industrial applications may need more frequent testing due to DC fault risk. S-type RCDs require discrimination timing verification. Electronic RCDs may be more sensitive to environmental factors."
  },
  {
    question: "Can I perform RCD maintenance while the installation is live?",
    answer: "Monthly test button operation is designed for live testing. Annual electrical testing may require circuit isolation for safety and accuracy. Always follow safe working procedures and coordinate with building operations to minimize disruption."
  },
  {
    question: "What should be included in RCD maintenance training?",
    answer: "Training should cover: test button operation procedures, recognition of RCD failure symptoms, emergency response procedures, record keeping requirements, when to call professionals, and basic electrical safety. Provide refresher training annually."
  },
  {
    question: "How do I handle RCD maintenance in critical installations?",
    answer: "Critical installations (hospitals, data centres) require: redundant RCD protection where possible, more frequent testing, immediate response procedures, backup systems during maintenance, detailed risk assessments, and coordination with facility management."
  },
  {
    question: "What are the consequences of inadequate RCD maintenance?",
    answer: "Poor maintenance can lead to: protection failure during faults, electrical accidents, regulatory non-compliance, insurance issues, legal liability, equipment damage, and business disruption. Regular maintenance is essential for safety and compliance."
  }
];

const RCDMaintenanceFAQ = () => {
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

export default RCDMaintenanceFAQ;