import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HelpCircle } from 'lucide-react';

const BMSModule7Section6FAQ = () => {
  const faqs = [
    {
      question: "How long should I allow for client handover and training?",
      answer: "Allow minimum 2-4 hours for basic operator training, plus additional time for documentation review. Complex systems may require full-day training sessions. Don't rush this critical phase - inadequate training leads to expensive call-backs."
    },
    {
      question: "What's the best format for providing documentation to clients?",
      answer: "Provide both digital and physical copies. Digital formats (PDF) are easily searchable and shareable, while physical copies serve as emergency backup. Use clear folder structures and consistent naming conventions."
    },
    {
      question: "Should I include controller programming details in handover documentation?",
      answer: "Provide software backups and configuration exports, but focus handover training on operational aspects (alarms, setpoints, reports) rather than programming details. Most building operators don't need programming knowledge."
    },
    {
      question: "How detailed should the IO list be for handover?",
      answer: "Very detailed - include device descriptions, physical locations, addresses, scaling factors, alarm limits, and engineering units. This document becomes critical for future troubleshooting and modifications."
    },
    {
      question: "What happens if the client wants to modify the system after handover?",
      answer: "Accurate as-built documentation enables safe modifications. Without proper documentation, even simple changes become expensive and potentially dangerous. This is why documentation accuracy is so critical."
    },
    {
      question: "How do I handle warranty questions during handover?",
      answer: "Clearly explain what's covered by manufacturer warranties vs. installation warranties. Provide written warranty terms, claim procedures, and support contact details. Be honest about limitations and exclusions."
    },
    {
      question: "Should I provide ongoing support after handover?",
      answer: "Yes, offer structured aftercare - perhaps 30-day phone support and a follow-up visit. This builds client confidence, identifies any issues early, and often leads to additional business opportunities."
    },
    {
      question: "What if the client seems overwhelmed during training?",
      answer: "Simplify the training focus to absolutely essential daily tasks only. Provide written quick-reference guides and offer follow-up training sessions. Don't try to cover everything in one session."
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

export { BMSModule7Section6FAQ };