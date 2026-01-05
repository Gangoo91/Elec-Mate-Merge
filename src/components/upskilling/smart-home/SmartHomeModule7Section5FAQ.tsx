import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HelpCircle } from 'lucide-react';

const SmartHomeModule7Section5FAQ = () => {
  const faqs = [
    {
      question: "How much time should I allocate for a proper customer handover?",
      answer: "Plan 60-90 minutes for comprehensive training, depending on system complexity. This investment prevents future support calls and builds client confidence."
    },
    {
      question: "What if the client is not very tech-savvy?",
      answer: "Focus on basic functions they'll use daily, use simple language, and provide written guides. Consider offering follow-up support calls after they've used the system for a week."
    },
    {
      question: "Should I demonstrate every feature in the app during handover?",
      answer: "No, focus on features they'll actually use. Advanced features can be covered in documentation or follow-up training if requested."
    },
    {
      question: "How do I handle clients who seem overwhelmed during training?",
      answer: "Slow down, focus on one feature at a time, and reassure them that learning takes time. Offer to return for additional training if needed."
    },
    {
      question: "What's the best way to provide login details securely?",
      answer: "Use sealed envelopes, secure digital formats, or password managers. Never email passwords in plain text or leave them written openly."
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

export default SmartHomeModule7Section5FAQ;