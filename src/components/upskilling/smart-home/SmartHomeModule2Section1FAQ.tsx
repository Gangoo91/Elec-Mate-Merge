import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

export const SmartHomeModule2Section1FAQ = () => {
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);

  const faqs = [
    {
      question: "Can I mix different protocols in one smart home?",
      answer: "Yes, but they may need a hub/bridge to communicate effectively. For example, you can have Wi-Fi cameras, Zigbee sensors, and Bluetooth locks, but you'll need a compatible hub (like SmartThings or Hubitat) to control them all from one interface. Matter is designed to solve this by creating a universal standard that works across protocols.",
      category: "compatibility"
    },
    {
      question: "Is Wi-Fi always the best option because it's fastest?",
      answer: "Not always — Wi-Fi drains power quickly, so it's unsuitable for small battery sensors. While Wi-Fi offers high bandwidth perfect for cameras and streaming devices, it would require frequent battery changes in sensors. Zigbee or Z-Wave sensors can run for 1-2 years on a single battery, while Wi-Fi sensors typically last only weeks.",
      category: "performance"
    },
    {
      question: "Are Zigbee and Z-Wave the same?",
      answer: "No, they're similar mesh protocols but operate on different frequencies. Zigbee uses 2.4GHz (same as Wi-Fi) while Z-Wave uses sub-1GHz frequencies (868MHz in Europe, 908MHz in US). This means Z-Wave has less interference from Wi-Fi networks, but Zigbee often has faster data rates and more device options.",
      category: "technical"
    },
    {
      question: "What happens if my internet goes down?",
      answer: "This depends on the protocol and system design. Local protocols like Zigbee and Z-Wave continue working without internet, as do locally-controlled Wi-Fi devices. However, cloud-dependent devices will lose remote access and voice control features. Thread and Matter are designed to prioritise local operation while offering cloud integration when available.",
      category: "reliability"
    },
    {
      question: "Which protocol has the best security?",
      answer: "All modern protocols offer strong encryption, but implementation varies. Z-Wave and Zigbee 3.0 include AES-128 encryption. Wi-Fi security depends on your router's WPA3 settings. Thread/Matter use modern security standards throughout. The key is keeping firmware updated and using strong network passwords regardless of protocol.",
      category: "security"
    },
    {
      question: "How many devices can each protocol handle?",
      answer: "This varies significantly: Wi-Fi routers typically support 50-100 devices before performance degrades. Zigbee networks can theoretically support 65,000+ devices through mesh routing. Z-Wave has a 232 device limit per network but you can have multiple networks. Bluetooth typically supports 7-8 simultaneous connections per hub.",
      category: "scalability"
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