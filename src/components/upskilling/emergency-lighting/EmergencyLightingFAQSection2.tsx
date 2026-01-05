import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useState } from 'react';

export const EmergencyLightingFAQSection2 = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const faqs = [
    {
      id: 1,
      question: "Are toilets always required to have emergency lighting?",
      answer: "Only toilets exceeding 8m² floor area require emergency lighting under BS5266. Smaller toilets in domestic premises are generally exempt unless part of a complex escape route."
    },
    {
      id: 2,
      question: "Do I need emergency lighting in every corridor?",
      answer: "Emergency lighting is required in corridors that form part of an escape route or serve areas requiring emergency lighting. Not all corridors need emergency lighting - only those critical for safe evacuation."
    },
    {
      id: 3,
      question: "How do I determine if an area has 'high fire risk'?",
      answer: "High fire risk areas typically contain flammable materials, chemicals, or processes that could rapidly develop fire. Examples include paint stores, workshops with flammable substances, and areas with significant combustible storage."
    },
    {
      id: 4,
      question: "What about emergency lighting in lift cars?",
      answer: "All lift cars must have emergency lighting to ensure passenger safety if trapped during a power failure. This is mandatory under BS5266 and Building Regulations."
    },
    {
      id: 5,
      question: "Are plant rooms always required to have emergency lighting?",
      answer: "Plant rooms require emergency lighting if they contain essential services, fire safety equipment, or if safe shutdown procedures are needed during emergencies. Motor rooms, switch rooms, and battery rooms typically require emergency lighting."
    },
    {
      id: 6,
      question: "Do open-plan offices need emergency lighting throughout?",
      answer: "Open-plan offices exceeding 60m² require emergency lighting to ensure safe movement to escape routes. Smaller offices may not need emergency lighting unless they have no natural light or form part of escape routes."
    }
  ];

  const toggleFAQ = (id: number) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  return (
    <Card className="bg-elec-gray border-gray-600 shadow-lg">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <HelpCircle className="h-5 w-5 text-green-400" />
          Frequently Asked Questions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {faqs.map((faq) => (
          <div key={faq.id} className="border border-gray-600 rounded-lg overflow-hidden">
            <button
              onClick={() => toggleFAQ(faq.id)}
              className="w-full p-4 text-left bg-gray-800/50 hover:bg-gray-700/50 transition-colors flex items-center justify-between"
            >
              <span className="text-foreground font-medium">{faq.question}</span>
              {openFAQ === faq.id ? (
                <ChevronUp className="h-4 w-4 text-gray-400" />
              ) : (
                <ChevronDown className="h-4 w-4 text-gray-400" />
              )}
            </button>
            {openFAQ === faq.id && (
              <div className="p-4 bg-gray-900/30">
                <p className="text-gray-300 text-sm leading-relaxed">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};