import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

export const SmartHomeModule4Section4FAQ = () => {
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);

  const faqs = [
    {
      question: "Can I use both schedules and AI at the same time?",
      answer: "Yes — many systems allow hybrid control: fixed schedules with AI optimisations. This provides a base level of predictability while allowing smart adjustments for efficiency."
    },
    {
      question: "Do AI thermostats need internet?",
      answer: "Most do for full functionality (weather data, app integration), but basic heating still works offline. The thermostat will revert to simple temperature control if connectivity is lost."
    },
    {
      question: "How long does it take for an AI system to 'learn'?",
      answer: "Typically 1–2 weeks of usage to build a pattern. However, basic operation starts immediately, with optimisation improving over time as the system gathers more data."
    },
    {
      question: "Which control method is more reliable?",
      answer: "Scheduled control is more predictable, but AI systems are generally reliable after the learning period. Most modern AI thermostats have backup modes if smart features fail."
    },
    {
      question: "Can AI systems be overridden manually?",
      answer: "Yes, all AI learning thermostats allow manual temperature adjustments and schedule overrides. The system will learn from these interventions to improve future performance."
    },
    {
      question: "What happens if my routine changes permanently?",
      answer: "AI systems adapt automatically to new patterns within 1-2 weeks. Scheduled systems require manual reprogramming, which many users forget to do, leading to continued energy waste."
    }
  ];

  const toggleQuestion = (index: number) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <HelpCircle className="h-5 w-5 text-elec-yellow" />
          Frequently Asked Questions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {faqs.map((faq, index) => (
          <div key={index} className="border border-gray-600 rounded-lg overflow-hidden">
            <Button
              variant="ghost"
              onClick={() => toggleQuestion(index)}
              className="w-full text-left hover:bg-[#323232] justify-between p-4"
            >
              <span className="text-foreground font-medium">{faq.question}</span>
              {openQuestion === index ? (
                <ChevronUp className="h-4 w-4 text-gray-400" />
              ) : (
                <ChevronDown className="h-4 w-4 text-gray-400" />
              )}
            </Button>
            
            {openQuestion === index && (
              <div className="px-4 pb-4 border-t border-gray-600 bg-[#1a1a1a]">
                <p className="text-gray-300 text-sm leading-relaxed pt-3">
                  {faq.answer}
                </p>
              </div>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};