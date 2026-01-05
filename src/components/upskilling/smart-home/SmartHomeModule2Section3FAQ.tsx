import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

export const SmartHomeModule2Section3FAQ = () => {
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);

  const faqs = [
    {
      question: "Is Matter a replacement for Wi-Fi or Zigbee?",
      answer: "No — Matter works on top of existing protocols to ensure devices interoperate. It uses Wi-Fi, Thread, and Ethernet as its underlying transport protocols, so your existing infrastructure remains valuable."
    },
    {
      question: "Do I need special routers for Thread?",
      answer: "Yes, you need a Thread border router, but this functionality is increasingly built into devices like Apple HomePod, Google Nest Hub, and Amazon Echo devices. Many users already have compatible devices without realising it."
    },
    {
      question: "Will Wi-Fi devices eventually become obsolete?",
      answer: "Not likely — Wi-Fi will remain essential for high-bandwidth devices like cameras, smart speakers, and displays. Thread and other protocols complement Wi-Fi rather than replace it."
    },
    {
      question: "Can I mix different protocols in one smart home system?",
      answer: "Absolutely! Modern smart homes typically use multiple protocols. Wi-Fi for cameras, Thread for sensors, Bluetooth for locks, and Matter to tie them together. This multi-protocol approach optimises each device type."
    },
    {
      question: "How do I know if a device supports Matter?",
      answer: "Look for the Matter certification logo on packaging or product descriptions. Matter-certified devices will work across Apple HomeKit, Google Home, Amazon Alexa, and other compatible platforms."
    },
    {
      question: "What happens to my existing non-Matter devices?",
      answer: "Your existing devices continue to work! You can use protocol bridges or hubs to integrate them into Matter ecosystems. Many manufacturers also provide firmware updates to add Matter support to existing devices."
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