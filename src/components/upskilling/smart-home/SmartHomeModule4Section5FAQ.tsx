import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

export const SmartHomeModule4Section5FAQ = () => {
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);

  const faqs = [
    {
      question: "Can interlocks be added to existing systems?",
      answer: "Yes — via smart hubs, relays, or software rules, though some retrofits require careful wiring. Modern smart thermostats often provide basic interlock functionality that can be added to existing HVAC systems without major modifications."
    },
    {
      question: "Do interlocks always need specialist equipment?",
      answer: "Not always — even simple smart thermostats can prevent conflicts. Many modern thermostats include basic heating/cooling interlocks as standard features. However, complex scenarios may require dedicated controllers or BMS systems."
    },
    {
      question: "Is a BMS required in residential installs?",
      answer: "No — hubs or hybrid smart systems often provide adequate control. Building Management Systems are typically used in commercial buildings. For residential applications, smart hubs like Home Assistant or dedicated HVAC controllers are usually sufficient."
    },
    {
      question: "What happens if an interlock fails?",
      answer: "Well-designed systems have backup modes and manual overrides. Safety interlocks should fail to a safe state, while efficiency interlocks may revert to basic operation. Regular testing and maintenance are essential to ensure reliable operation."
    },
    {
      question: "How much energy can interlocks save?",
      answer: "Typically 10-30% depending on the building and existing inefficiencies. Buildings with poor coordination between heating and cooling systems see the largest savings. Proper interlocks can also extend equipment life and reduce maintenance costs."
    },
    {
      question: "Are interlocks required by building regulations?",
      answer: "Some safety interlocks are mandatory under building codes and BS7671, while efficiency interlocks are often recommended best practice. Always check local regulations and standards for specific requirements in your area."
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