import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

export const SmartHomeModule2Section5FAQ = () => {
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);

  const faqs = [
    {
      question: "Do all smart homes need a hub?",
      answer: "No — small systems often work fine without a hub, but larger systems (10+ devices) benefit significantly from hub-based coordination. The decision depends on scale, reliability requirements, and future expansion plans.",
      category: "general"
    },
    {
      question: "Are hubs becoming obsolete because of Matter?",
      answer: "Not yet — hubs remain valuable for local control, bridging non-Matter devices, and providing mesh networking. Matter may reduce hub dependency over time, but the transition will be gradual.",
      category: "future"
    },
    {
      question: "Can one hub support multiple protocols?",
      answer: "Yes, many modern hubs support Zigbee, Z-Wave, Thread, and integrate with Wi-Fi/cloud services. This multi-protocol capability is one of the key advantages of hub-based systems.",
      category: "technical"
    }
  ];

  const toggleQuestion = (index: number) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <HelpCircle className="h-5 w-5 text-elec-yellow" />
          Frequently Asked Questions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {faqs.map((faq, index) => (
          <div key={index} className="border border-gray-600 rounded-lg overflow-hidden">
            <Button
              variant="ghost"
              onClick={() => toggleQuestion(index)}
              className="w-full p-3 sm:p-4 text-left hover:bg-[#323232] justify-between min-h-0"
            >
              <span className="text-foreground font-medium text-sm sm:text-base">{faq.question}</span>
              {openQuestion === index ? (
                <ChevronUp className="h-4 w-4 text-gray-400 flex-shrink-0" />
              ) : (
                <ChevronDown className="h-4 w-4 text-gray-400 flex-shrink-0" />
              )}
            </Button>
            
            {openQuestion === index && (
              <div className="px-3 sm:px-4 pb-3 sm:pb-4 border-t border-gray-600 bg-[#1a1a1a]">
                <p className="text-gray-300 text-sm leading-relaxed pt-3">
                  {faq.answer}
                </p>
              </div>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};