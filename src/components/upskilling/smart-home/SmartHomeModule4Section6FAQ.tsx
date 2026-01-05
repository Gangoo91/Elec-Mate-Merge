import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { useState } from 'react';

export const SmartHomeModule4Section6FAQ = () => {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (value: string) => {
    setOpenItems(prev => 
      prev.includes(value) 
        ? prev.filter(item => item !== value)
        : [...prev, value]
    );
  };

  const faqs = [
    {
      id: "residential",
      question: "Can BMS be used in houses?",
      answer: "Not usually — BMS is overkill for domestic installs due to complexity and cost. However, high-end 'smart mansions' may use scaled-down systems like KNX or sophisticated smart home hubs that provide BMS-like capabilities for smaller residential applications."
    },
    {
      id: "protocols",
      question: "Do all BMS systems use the same protocol?",
      answer: "No — BACnet and Modbus are common in HVAC systems, while DALI and KNX dominate lighting control. Many buildings use multiple protocols, requiring gateways or protocol converters to enable communication between different subsystems."
    },
    {
      id: "management",
      question: "Who typically manages a BMS?",
      answer: "Facilities managers or building services engineers in large sites typically manage BMS systems. They require training on the specific BMS software and an understanding of building systems to optimise performance and troubleshoot issues."
    },
    {
      id: "retrofit",
      question: "Is it difficult to retrofit BMS in existing buildings?",
      answer: "Yes, retrofits can be challenging and expensive. Existing buildings may lack the necessary cabling infrastructure, and installation often requires significant disruption. However, modern wireless sensors and smart gateways can reduce some retrofit complexities."
    },
    {
      id: "maintenance",
      question: "How much maintenance does a BMS require?",
      answer: "BMS systems require regular software updates, sensor calibration, and system health checks. Most commercial installations benefit from annual service contracts with BMS specialists to ensure optimal performance and system reliability."
    }
  ];

  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <HelpCircle className="h-5 w-5 text-elec-yellow" />
          Frequently Asked Questions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {faqs.map((faq) => (
          <Collapsible key={faq.id}>
            <CollapsibleTrigger
              onClick={() => toggleItem(faq.id)}
              className="flex items-center justify-between w-full p-3 text-left bg-[#1a1a1a] rounded-lg hover:bg-[#252525] transition-colors"
            >
              <span className="font-medium text-foreground">{faq.question}</span>
              <ChevronDown 
                className={`h-4 w-4 text-gray-400 transition-transform ${
                  openItems.includes(faq.id) ? 'transform rotate-180' : ''
                }`}
              />
            </CollapsibleTrigger>
            <CollapsibleContent className="px-3 py-2">
              <p className="text-gray-300 text-sm leading-relaxed">
                {faq.answer}
              </p>
            </CollapsibleContent>
          </Collapsible>
        ))}
      </CardContent>
    </Card>
  );
};