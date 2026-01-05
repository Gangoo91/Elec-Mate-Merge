import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HelpCircle } from 'lucide-react';

const SmartHomeModule7Section4FAQ = () => {
  const faqs = [
    {
      question: "Can I use the smart device's app to turn off power for installation?",
      answer: "No. Software controls and apps cannot provide safe isolation. Always isolate at the consumer unit using mechanical lock-off devices and verify with proving units."
    },
    {
      question: "Do low-voltage smart devices like door sensors need RCD protection?",
      answer: "The sensors themselves don't need RCD protection, but any mains circuits that power hubs or controllers typically do under BS 7671. Check the specific installation requirements."
    },
    {
      question: "What's the minimum insulation resistance reading for smart home circuits?",
      answer: "BS 7671 requires minimum 1 MΩ for new installations. However, some sensitive electronic devices may require disconnection during testing to avoid damage."
    },
    {
      question: "Can I run smart device cables in the same trunking as mains cables?",
      answer: "Only if using segregated trunking with physical barriers between mains and low-voltage circuits, or if using appropriate cable types (e.g., SWA for data)."
    },
    {
      question: "How often should I test RCD protection in smart home installations?",
      answer: "Test during initial installation and commissioning. Recommend quarterly testing to clients using the test button, with annual professional testing for critical systems."
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
      <CardContent className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="p-4 bg-[#1a1a1a] rounded-lg">
            <h3 className="font-semibold text-foreground mb-2">{faq.question}</h3>
            <p className="text-gray-300 text-sm">{faq.answer}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default SmartHomeModule7Section4FAQ;