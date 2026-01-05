import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

export const SmartHomeModule2Section2FAQ = () => {
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);

  const faqs = [
    {
      question: "Can Zigbee and Z-Wave devices talk directly to each other?",
      answer: "No, they require a hub/bridge to translate between protocols. However, many modern hubs like SmartThings and Hubitat support both protocols, allowing unified control from a single interface."
    },
    {
      question: "Is Z-Wave always better because of range?",
      answer: "Not always — Zigbee is often better when you need to connect many devices. Z-Wave excels in range and penetration but is limited to 232 devices per network, while Zigbee can handle thousands."
    },
    {
      question: "Do Zigbee/Z-Wave devices need internet to work?",
      answer: "No — they only need a hub for local operation. Internet connectivity is only required for remote control via smartphone apps or cloud features. The mesh networks function independently of internet access."
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
          <div key={index} className="border border-gray-600 rounded-lg">
            <Button
              variant="ghost"
              onClick={() => toggleQuestion(index)}
              className="w-full text-left p-4 hover:bg-[#323232] rounded-lg"
            >
              <div className="flex justify-between items-center">
                <span className="font-medium text-foreground">{faq.question}</span>
                {openQuestion === index ? (
                  <ChevronUp className="h-4 w-4 text-elec-yellow flex-shrink-0" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-elec-yellow flex-shrink-0" />
                )}
              </div>
            </Button>
            
            {openQuestion === index && (
              <div className="px-4 pb-4">
                <div className="pt-2 border-t border-gray-600">
                  <p className="text-foreground text-sm leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};