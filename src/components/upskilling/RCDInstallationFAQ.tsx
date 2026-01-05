import { HelpCircle, ChevronDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useState } from 'react';

const faqData = [
  {
    question: "When is RCD protection mandatory under BS 7671?",
    answer: "RCD protection is mandatory for socket outlets up to 20A, all circuits in bathrooms, mobile equipment used outdoors, circuits in locations with increased shock risk, and specific installations like swimming pools and caravan sites."
  },
  {
    question: "What's the difference between RCBO and RCD installation?",
    answer: "RCBOs provide combined overcurrent and residual current protection for individual circuits, eliminating discrimination issues. Traditional RCDs protect multiple circuits but require careful neutral management and discrimination timing."
  },
  {
    question: "How do I prevent unwanted RCD tripping?",
    answer: "Ensure proper neutral conductor separation, balanced three-phase loads, appropriate RCD type selection, correct earthing arrangements, and adequate discrimination between RCDs using S-type devices where required."
  },
  {
    question: "What RCD type should I use for electronic equipment?",
    answer: "Type A RCDs are required for circuits supplying electronic equipment that may produce pulsating DC fault currents. Type B RCDs are needed for variable speed drives and equipment producing smooth DC fault currents."
  },
  {
    question: "Can I mix RCD-protected and non-protected circuits?",
    answer: "Yes, but neutral conductors must be kept completely separate. Mixing neutrals will cause unwanted tripping and compromise protection. Use separate neutral bars or ensure proper neutral integrity throughout."
  },
  {
    question: "What discrimination timing is required between RCDs?",
    answer: "Minimum 65ms discrimination time is required between upstream and downstream RCDs. Use S-type (time-delayed) RCDs upstream with standard types downstream, or consider RCBO solutions for better discrimination."
  },
  {
    question: "How do I handle three-phase RCD installations?",
    answer: "Ensure balanced loading across all three phases to prevent nuisance tripping from natural load imbalance. Monitor neutral current and consider separate single-phase protection where load balancing is difficult."
  },
  {
    question: "What testing is required after RCD installation?",
    answer: "Perform insulation resistance testing, RCD operation tests at ½×, 1×, and 5×IΔn, earth fault loop impedance verification, functional test button operation, and complete all required documentation and certificates."
  },
  {
    question: "Can environmental factors affect RCD installation?",
    answer: "Yes. Consider ambient temperature effects on operation, humidity and moisture ingress protection, electromagnetic interference from nearby equipment, and mechanical stress from vibration or shock."
  },
  {
    question: "What labelling is required for RCD installations?",
    answer: "RCDs must be clearly labelled with their rating, protected circuits, and test requirements. Provide user instructions for monthly test button operation and emergency contact information for faults."
  }
];

const RCDInstallationFAQ = () => {
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
              <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${
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

export default RCDInstallationFAQ;