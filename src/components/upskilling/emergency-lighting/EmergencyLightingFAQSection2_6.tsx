import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HelpCircle } from 'lucide-react';

export const EmergencyLightingFAQSection2_6 = () => {
  const faqs = [
    {
      question: "Is a logbook legally required?",
      answer: "Yes, BS 5266 requires all tests to be documented in a logbook kept on-site."
    },
    {
      question: "Can testing be done during working hours?",
      answer: "Yes, but annual full-duration tests should be scheduled to avoid leaving the building unprotected."
    },
    {
      question: "Do small premises need the same testing?",
      answer: "Yes, testing applies to all premises, regardless of size."
    }
  ];

  return (
    <Card className="bg-slate-200/20 border-elec-yellow/20">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <HelpCircle className="h-6 w-6 text-elec-yellow" />
          FAQs
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b border-gray-600 pb-4 last:border-b-0">
            <h4 className="font-semibold text-elec-yellow mb-2">Q{index + 1}: {faq.question}</h4>
            <p className="text-foreground">{faq.answer}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};