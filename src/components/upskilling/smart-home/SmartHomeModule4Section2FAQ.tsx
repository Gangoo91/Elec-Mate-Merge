import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

export const SmartHomeModule4Section2FAQ = () => {
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);

  const faqs = [
    {
      question: "Can I use smart TRVs without a central smart thermostat?",
      answer: "Yes, but they work best when linked to a central hub or thermostat for coordination. Standalone TRVs can still provide room-level control, but integration allows for better scheduling and system optimisation.",
      category: "installation"
    },
    {
      question: "Do all smart thermostats work with heat pumps?",
      answer: "No — only certain models are designed for heat pump integration. Heat pumps require specific control strategies and low-temperature operation that not all smart thermostats support.",
      category: "compatibility"
    },
    {
      question: "What's the benefit of OpenTherm?",
      answer: "It allows modulating control (adjusting boiler output) rather than just on/off switching, improving efficiency. OpenTherm can reduce gas consumption by 6-8% compared to simple relay control.",
      category: "protocol"
    },
    {
      question: "How long do smart TRV batteries typically last?",
      answer: "Most smart TRVs use AA batteries that last 1-2 years depending on usage. Some models have low battery alerts via the app, and lithium batteries generally last longer than alkaline ones.",
      category: "maintenance"
    },
    {
      question: "Can smart heating controls work during power cuts?",
      answer: "Battery-powered smart TRVs continue working during power cuts, but wireless hubs and boilers won't operate. Some systems have backup modes, but heating functionality is limited without mains power.",
      category: "reliability"
    },
    {
      question: "What's the difference between wired and wireless smart heating systems?",
      answer: "Wired systems offer more reliability and don't need battery changes, but are harder to retrofit. Wireless systems are easier to install but depend on signal strength and battery power. Wired is often preferred for new builds.",
      category: "installation"
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
              className="w-full p-3 sm:p-4 text-left hover:bg-[#323232] justify-between min-h-0"
            >
              <span className="text-foreground font-medium text-sm sm:text-base">{faq.question}</span>
              {openQuestion === index ? (
                <ChevronUp className="h-4 w-4 text-gray-400 flex-shrink-0" />
              ) : (
                <ChevronDown className="h-4 w-4 text-gray-400 flex-shrink-0" />
              )}
            </Button>
            
            {openQuestion === index && (
              <div className="px-3 sm:px-4 pb-3 sm:pb-4 border-t border-gray-600 bg-[#1a1a1a]">
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