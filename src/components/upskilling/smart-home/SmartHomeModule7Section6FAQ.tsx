import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HelpCircle } from 'lucide-react';

const SmartHomeModule7Section6FAQ = () => {
  const faqs = [
    {
      question: "How long should I keep client installation records?",
      answer: "Maintain electrical certificates for minimum 6 years as legally required. For smart home installations, consider keeping complete records longer (10+ years) for ongoing support and system expansion opportunities."
    },
    {
      question: "What's the difference between manufacturer and installer warranties?",
      answer: "Manufacturer warranties cover device defects and hardware failures (typically 1-3 years). Installer warranties cover workmanship, wiring, and configuration issues (typically 12 months). Both are important and serve different purposes."
    },
    {
      question: "Should I offer maintenance contracts to all clients?",
      answer: "Yes, but tailor the offering to system complexity and client needs. Simple installations might need basic annual checks, while complex systems benefit from comprehensive maintenance packages."
    },
    {
      question: "How do I handle warranty claims when I didn't supply the device?",
      answer: "Provide installation documentation to support the claim and assist the client with manufacturer contact. Your role is to prove proper installation and help differentiate between installation and device issues."
    },
    {
      question: "What should I include in digital handover packages?",
      answer: "Include all certificates, device inventories, test results, warranty information, quick guides, and contact details. Use PDF format for compatibility and add QR codes linking to online resources or video tutorials."
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

export default SmartHomeModule7Section6FAQ;