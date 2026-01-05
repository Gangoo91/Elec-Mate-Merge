import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HelpCircle, ChevronDown } from 'lucide-react';
import { useState } from 'react';

export const EmergencyLightingFAQSection2_1 = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const faqs = [
    {
      question: "What happens if an escape route luminaire fails?",
      answer: "Each escape route should have overlapping coverage from adjacent luminaires. Additionally, regular testing and maintenance schedules help identify failures before they become critical. In critical areas, consider redundant lighting provision."
    },
    {
      question: "Can escape lighting be dimmed during normal operation?",
      answer: "Maintained emergency luminaires can be dimmed during normal operation, but they must immediately provide full emergency output upon mains failure. Non-maintained luminaires remain off during normal operation."
    },
    {
      question: "How often must escape lighting be tested?",
      answer: "Monthly function tests (brief test), annual duration tests (full battery discharge), and three-yearly battery replacement are typically required, though specific requirements depend on the system type and local regulations."
    },
    {
      question: "What's the difference between escape route and exit lighting?",
      answer: "Escape route lighting illuminates the path to safety, while exit lighting specifically identifies exits and final exits. Both are essential components of emergency escape lighting systems."
    },
    {
      question: "Are self-contained or central battery systems better?",
      answer: "Both have advantages: self-contained units are easier to install and maintain individually, while central battery systems offer better monitoring, coordinated testing, and potentially lower long-term costs for larger installations."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <Card className="bg-elec-gray border-elec-gray">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <HelpCircle className="h-5 w-5 text-elec-yellow" />
          Frequently Asked Questions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border border-elec-gray rounded-lg overflow-hidden">
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full p-4 text-left bg-slate-200/10 hover:bg-slate-200/20 transition-colors flex justify-between items-center"
            >
              <span className="text-foreground font-medium">{faq.question}</span>
              <ChevronDown className={`h-4 w-4 text-elec-yellow transition-transform ${
                openFAQ === index ? 'transform rotate-180' : ''
              }`} />
            </button>
            {openFAQ === index && (
              <div className="p-4 bg-elec-gray/20">
                <p className="text-elec-light text-sm leading-relaxed">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};