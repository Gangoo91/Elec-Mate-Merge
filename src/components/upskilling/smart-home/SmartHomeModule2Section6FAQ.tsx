import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

export const SmartHomeModule2Section6FAQ = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const faqs = [
    {
      question: "Do I always need a bridge for Zigbee/Z-Wave devices?",
      answer: "Not always — some hubs (like SmartThings) already include Zigbee/Z-Wave radios built-in. These hubs act as bridges themselves, eliminating the need for separate bridge devices. However, if you're using voice assistants or platforms without built-in protocol support, you'll need a dedicated bridge."
    },
    {
      question: "Are bridges going away with Matter?",
      answer: "Over time yes, but for now, many legacy devices still require them. Matter aims to create universal compatibility, but the transition will be gradual. Existing Zigbee and Z-Wave devices will continue to need bridges for several years until Matter becomes the dominant standard."
    },
    {
      question: "Can I use multiple bridges in one home?",
      answer: "Yes, but it can complicate setup and management. Some systems allow multi-bridge integration (e.g., multiple Hue Bridges + Home Assistant). However, this increases complexity and potential failure points. It's generally better to use a single, comprehensive hub when possible."
    },
    {
      question: "What happens if my bridge fails?",
      answer: "If the bridge fails, all devices connected through it become uncontrollable via smart home apps and voice commands. Physical switches typically still work. To mitigate this risk, consider using UPS backup power, keeping spare bridges, or choosing systems with redundancy options."
    },
    {
      question: "Do bridges slow down my network?",
      answer: "Bridges themselves don't significantly impact network speed, but they can add latency to device responses (typically 100-200ms additional delay). The bridge processes and translates commands between protocols, which takes time. For most applications, this delay is barely noticeable."
    },
    {
      question: "Can I use third-party bridges instead of manufacturer ones?",
      answer: "Yes, platforms like Home Assistant, Hubitat, and SmartThings can act as universal bridges supporting multiple protocols. These often offer more flexibility but may require more technical knowledge to set up and maintain compared to manufacturer-specific bridges."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
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
          <div
            key={index}
            className="border border-gray-600/30 rounded-lg bg-gray-800/30 overflow-hidden"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full p-4 text-left flex items-center justify-between hover:bg-gray-700/30 transition-colors"
            >
              <span className="text-foreground font-medium text-sm pr-4">{faq.question}</span>
              {openFAQ === index ? (
                <ChevronUp className="h-4 w-4 text-elec-yellow flex-shrink-0" />
              ) : (
                <ChevronDown className="h-4 w-4 text-elec-yellow flex-shrink-0" />
              )}
            </button>
            
            {openFAQ === index && (
              <div className="px-4 pb-4">
                <div className="pt-2 border-t border-gray-600/20">
                  <p className="text-foreground text-sm leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};