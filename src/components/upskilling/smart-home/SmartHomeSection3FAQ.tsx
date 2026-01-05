import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HelpCircle } from 'lucide-react';

export const SmartHomeSection3FAQ = () => {
  const faqs = [
    {
      question: "Can smart devices work without a controller?",
      answer: "Some simple setups (like a motion sensor linked directly to a light) can, but most complex automations require a hub/controller."
    },
    {
      question: "Do actuators need constant power?",
      answer: "High-load actuators (locks, motors) usually need mains power; smaller ones may run on batteries."
    },
    {
      question: "Is it better to use local or cloud controllers?",
      answer: "Local controllers are faster and more secure; cloud controllers offer more features and easier integration."
    }
  ];

  return (
    <Card className="bg-elec-gray border-gray-700">
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
            <p className="text-gray-300">{faq.answer}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};