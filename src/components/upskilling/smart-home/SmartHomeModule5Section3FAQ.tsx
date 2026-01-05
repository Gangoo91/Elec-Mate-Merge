import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

export const SmartHomeModule5Section3FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "Can PIR sensors detect through glass?",
      answer: "No — PIR sensors rely on infrared radiation, which glass blocks. PIR sensors detect heat changes in the room they're mounted in, but cannot see through windows or glass doors."
    },
    {
      question: "Do pets trigger PIR sensors?",
      answer: "Yes, unless using pet-immune PIR sensors designed to ignore small animals. Standard PIRs detect any heat-generating movement. Pet-immune models use dual sensors or mounting height to distinguish between pets and humans."
    },
    {
      question: "Do contact sensors need Wi-Fi?",
      answer: "Not always — many contact sensors use Zigbee, Z-Wave, or proprietary radio frequencies with a hub. While some use Wi-Fi directly, others communicate through mesh networks or dedicated protocols that can be more reliable than Wi-Fi."
    },
    {
      question: "How long do sensor batteries last?",
      answer: "Typically 1-3 years depending on usage frequency, environmental conditions, and sensor type. Most smart sensors provide low battery notifications well before failure. Cold temperatures can reduce battery life."
    },
    {
      question: "Can sensors work during power outages?",
      answer: "Contact sensors and PIRs are usually battery-powered and continue working during outages. However, the hub and internet connection may be affected, potentially limiting remote notifications and cloud features."
    },
    {
      question: "What's the detection range for PIR sensors?",
      answer: "Most PIR sensors detect movement within 8-12 metres, with coverage patterns varying by model. Detection is best for cross-movement rather than movement directly towards or away from the sensor."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
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
              className="w-full justify-between p-4 h-auto text-left hover:bg-[#323232]"
              onClick={() => toggleFAQ(index)}
            >
              <span className="text-foreground font-medium">{faq.question}</span>
              {openIndex === index ? (
                <ChevronUp className="h-4 w-4 text-elec-yellow flex-shrink-0" />
              ) : (
                <ChevronDown className="h-4 w-4 text-elec-yellow flex-shrink-0" />
              )}
            </Button>
            {openIndex === index && (
              <div className="px-4 pb-4">
                <p className="text-foreground text-sm leading-relaxed">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};