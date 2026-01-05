import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HelpCircle } from 'lucide-react';

export const SmartHomeModule3Section5FAQ = () => {
  const faqs = [
    {
      question: "Can grouped lights still be controlled individually?",
      answer: "Yes, grouping provides an additional layer of control — individual control is still possible. You can control lights individually through the app, or set up sub-groups within larger groups."
    },
    {
      question: "Do motion sensors work in daylight?",
      answer: "They can, but smart logic usually disables them when ambient light is sufficient. Most modern systems include light sensors to prevent unnecessary activation during bright daylight hours."
    },
    {
      question: "What happens if two rules conflict?",
      answer: "The most recent command usually takes priority, but good system design prevents conflicts by establishing clear hierarchies and priority rules. Manual overrides typically have the highest priority."
    },
    {
      question: "How do I stop motion sensors triggering when pets walk past?",
      answer: "Adjust sensor sensitivity, mount sensors higher, or use pet-immune sensors designed to ignore small animals. Proper positioning and sensitivity settings can eliminate most pet-related false triggers."
    },
    {
      question: "Can automation work without internet connectivity?",
      answer: "Yes, local hubs and controllers can run automation rules even without internet. However, remote app control and cloud-based features will be unavailable during outages."
    },
    {
      question: "How do I set up different lighting for different times of day?",
      answer: "Use conditional rules that check the time and adjust brightness/colour temperature accordingly. Most smart lighting systems allow time-based scenes and automatic scheduling."
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