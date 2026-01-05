import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HelpCircle, ChevronDown } from 'lucide-react';
import { useState } from 'react';

export const EmergencyLightingFAQSection2_2 = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const faqs = [
    {
      question: "Do small rooms under 60 m² need anti-panic lighting?",
      answer: "Not usually, unless they form part of an escape route."
    },
    {
      question: "How long must anti-panic lighting operate?",
      answer: "At least 1 hour, though 3 hours is standard for most commercial buildings."
    },
    {
      question: "Can I use standard LED panels as anti-panic lighting?",
      answer: "Only if they are tested, certified, and fitted with the correct emergency modules."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <Card className="bg-elec-gray/30 border-elec-yellow/20">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <HelpCircle className="h-5 w-5 text-elec-yellow" />
          Frequently Asked Questions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border border-gray-600 rounded-lg overflow-hidden">
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full p-4 text-left bg-elec-dark/30 hover:bg-elec-dark/50 transition-colors flex justify-between items-center"
            >
              <span className="text-foreground font-medium">{faq.question}</span>
              <ChevronDown className={`h-4 w-4 text-elec-yellow transition-transform ${
                openFAQ === index ? 'transform rotate-180' : ''
              }`} />
            </button>
            {openFAQ === index && (
              <div className="p-4 bg-elec-dark/20">
                <p className="text-foreground text-sm leading-relaxed">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};