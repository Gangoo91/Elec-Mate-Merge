import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HelpCircle } from 'lucide-react';

const SmartHomeModule7Section3FAQ = () => {
  const faqs = [
    {
      question: "What's the difference between Wi-Fi signal strength readings on different devices?",
      answer: "Different devices and apps may show slight variations in dBm readings due to antenna differences and calibration. Focus on relative strength patterns rather than absolute values."
    },
    {
      question: "How do I convince clients to invest in mesh networking when they have budget constraints?",
      answer: "Explain that poor connectivity leads to unreliable systems and support calls. A mesh network is less expensive than multiple call-backs and ensures system reliability from day one."
    },
    {
      question: "Can I use powerline adapters instead of mesh networks for smart home installations?",
      answer: "Powerline adapters work well for stable backbone connections but don't extend Wi-Fi coverage. They're good for wired connections to hubs, but mesh networks better serve wireless device coverage."
    },
    {
      question: "How often should I check for firmware updates during installation?",
      answer: "Always check for firmware updates on hubs and devices before starting commissioning. Many updates improve wireless performance, stability, and compatibility."
    },
    {
      question: "What do I do if the property has thick walls that block signals everywhere?",
      answer: "Consider multiple mesh nodes, strategic hub placement, external antennas where possible, or wired backbone solutions. Some challenging properties may need professional network design consultation."
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

export default SmartHomeModule7Section3FAQ;