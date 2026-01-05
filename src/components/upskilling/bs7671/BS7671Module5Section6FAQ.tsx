import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { useState } from 'react';

const BS7671Module5Section6FAQ = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const faqs = [
    {
      question: "What's the difference between IP65 and IP66 ratings?",
      answer: "IP65 provides protection against water jets from any direction, while IP66 protects against powerful water jets and heavy seas. IP66 offers higher water protection and is typically required in marine or very harsh environments."
    },
    {
      question: "Do I need to consider corrosion protection for standard domestic installations?",
      answer: "Generally not for internal domestic work, but consider it for external installations, coastal areas with salt air, or locations with chemical exposure. Always assess the specific environmental conditions per BS7671 Chapter 51."
    },
    {
      question: "How do I determine the correct environmental condition codes for a site?",
      answer: "Conduct a thorough site survey considering all environmental factors: water exposure, dust levels, temperature ranges, mechanical stress, vibration, and chemical exposure. Document your findings using the appropriate BS7671 codes (AD, AE, AF, AG, AH, etc.)."
    },
    {
      question: "What fire resistance requirements apply to cables in escape routes?",
      answer: "BS7671 Chapter 52 requires fire-resistant cables in escape routes and fire-fighting systems. These must maintain circuit integrity for specified periods (typically 30, 60, or 120 minutes) and comply with relevant British Standards for fire performance."
    },
    {
      question: "Can I install standard PVC cables in high-temperature environments?",
      answer: "Standard PVC cables are typically rated to 70°C conductor temperature. For higher ambient temperatures, you must either derate the cable or use cables with higher temperature ratings (e.g., XLPE or EPR insulation). Always check BS7671 Appendix 4 for derating factors."
    },
    {
      question: "What additional protection is required for cables in corrosive environments?",
      answer: "Use cables with appropriate sheath materials (e.g., PVC, LSZH, or specialised compounds), provide additional mechanical protection where necessary, and ensure all metalwork is appropriately protected against corrosion. Consider the use of cable trays or conduits with suitable coatings."
    },
    {
      question: "How do building regulations relate to BS7671 fire requirements?",
      answer: "Building regulations set the framework for fire safety, while BS7671 provides the detailed electrical requirements. Both must be satisfied. Key areas include escape route lighting, fire alarm systems, and maintaining circuit integrity during fire conditions."
    },
    {
      question: "What documentation is required for environmental protection measures?",
      answer: "Document all environmental assessments, protection measures implemented, and equipment specifications. Include environmental condition codes, IP ratings selected, and justification for choices. This forms part of the installation documentation required by BS7671."
    }
  ];

  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <HelpCircle className="h-5 w-5 text-elec-yellow" />
          Frequently Asked Questions
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-4">
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <Collapsible key={index} open={openItems.includes(index)} onOpenChange={() => toggleItem(index)}>
              <CollapsibleTrigger className="flex items-center justify-between w-full p-4 bg-elec-dark rounded-lg border border-gray-600 hover:bg-gray-700 transition-colors">
                <span className="font-medium text-left">{faq.question}</span>
                <ChevronDown className={`h-4 w-4 text-elec-yellow transition-transform ${openItems.includes(index) ? 'rotate-180' : ''}`} />
              </CollapsibleTrigger>
              <CollapsibleContent className="p-4 bg-elec-dark/50 rounded-b-lg border border-gray-600 border-t-0">
                <p className="text-gray-300">{faq.answer}</p>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default BS7671Module5Section6FAQ;