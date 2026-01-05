import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

export const BS7671Module7Section1FAQ = () => {
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);

  const faqs = [
    {
      question: "Can I install a standard light switch 0.5m from a bath edge at 1.8m height?",
      answer: "No, this location would be within Zone 2 (within 0.6m horizontal distance from Zone 1). Light switches are not permitted in Zone 2. The switch must be relocated outside zones or use cord-operated switching from outside the zone.",
      category: "zones"
    },
    {
      question: "What IP rating is required for a bathroom extractor fan in Zone 1?",
      answer: "Equipment in Zone 1 requires a minimum IP rating of IPX4 (protection against water splashing from any direction). However, IPX5 is recommended for enhanced protection, particularly for fans that may be subject to steam and condensation.",
      category: "protection"
    },
    {
      question: "Are LED strip lights permitted above a shower in Zone 1?",
      answer: "Yes, provided they meet Zone 1 requirements: appropriate IP rating (minimum IPX4), suitable for the location, and either SELV ≤25V with transformer outside zones or specifically designed for wet locations with proper certification.",
      category: "equipment"
    },
    {
      question: "Do zones extend through doorways into adjacent rooms?",
      answer: "Yes, zones continue through permanent openings unless there is a wall or partition at least 2.25m high forming a boundary. A standard door opening without a raised threshold allows zone extension into the adjacent room.",
      category: "measurement"
    },
    {
      question: "Can I use a consumer unit with RCD protection instead of individual RCBOs?",
      answer: "While RCD protection is mandatory, individual RCBOs are preferred as they provide both overcurrent and residual current protection for each circuit, offering better discrimination and easier fault finding in wet location installations.",
      category: "protection"
    },
    {
      question: "What's the maximum length for a cord-operated switch above a bath?",
      answer: "The cord must not extend into Zone 0 or Zone 1. The switch mechanism should be positioned outside zones with the cord terminating above the Zone 1 boundary. Typically, this means the switch is mounted at least 2.25m from floor level.",
      category: "accessories"
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
                <p className="text-foreground text-sm leading-relaxed pt-3">
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