import { HelpCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const SmartHomeSection2FAQ = () => {
  const faqs = [
    {
      question: "Do smart lights always need a hub?",
      answer: "Not always. Wi-Fi enabled smart bulbs can connect directly to your home network and be controlled via smartphone apps. However, Zigbee and Z-Wave smart lights typically require a compatible hub for communication."
    },
    {
      question: "Can smart HVAC systems really save money on energy bills?",
      answer: "Yes, when properly configured and used. Smart thermostats can reduce heating and cooling costs by 10-23% through learning algorithms, scheduling, and occupancy detection."
    },
    {
      question: "Are smart security systems reliable without internet connectivity?",
      answer: "Most smart security systems have hybrid functionality. Local components like door/window sensors, motion detectors, and alarms can continue operating during internet outages using local hubs or cellular backup."
    },
    {
      question: "How do smart homes support people with disabilities?",
      answer: "Smart homes offer numerous accessibility benefits including voice control for users with mobility limitations, automated lighting and doors for wheelchair users, and emergency alert integration."
    },
    {
      question: "Can smart lighting affect sleep quality?",
      answer: "Yes, positively when properly configured. Smart lighting can support natural circadian rhythms by automatically adjusting colour temperature throughout the day."
    }
  ];

  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <HelpCircle className="h-6 w-6 text-blue-500" />
          Frequently Asked Questions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border border-gray-600 rounded-lg p-4 bg-elec-gray">
            <h4 className="font-semibold text-foreground mb-2">{faq.question}</h4>
            <p className="text-gray-300 text-sm leading-relaxed">{faq.answer}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};