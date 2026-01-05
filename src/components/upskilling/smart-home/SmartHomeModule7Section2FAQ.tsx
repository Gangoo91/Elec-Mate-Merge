import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HelpCircle } from 'lucide-react';

const SmartHomeModule7Section2FAQ = () => {
  const faqs = [
    {
      question: "How long should commissioning take for a typical smart home installation?",
      answer: "Allow 2-4 hours for commissioning a basic system with 10-15 devices. Complex systems with extensive automation may require a full day. Factor this time into your quotes."
    },
    {
      question: "What should I do if a device won't pair despite following instructions?",
      answer: "Check power supply, verify signal strength, ensure device is in pairing mode, update hub firmware, try factory reset, and contact manufacturer support if issues persist."
    },
    {
      question: "Do I need different apps for different smart home brands?",
      answer: "Often yes. Each manufacturer typically has their own app, though some hub systems can integrate multiple brands. Download and test all required apps before arriving on site."
    },
    {
      question: "How do I handle clients who want to change device names after commissioning?",
      answer: "Show them how to rename devices in the app during training. Most apps allow easy renaming, and this empowers clients to manage their own system customisation."
    },
    {
      question: "What documentation should I leave with the client?",
      answer: "Provide device IDs, login credentials, app download links, basic troubleshooting steps, your contact details, and warranty information for all components."
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

export default SmartHomeModule7Section2FAQ;