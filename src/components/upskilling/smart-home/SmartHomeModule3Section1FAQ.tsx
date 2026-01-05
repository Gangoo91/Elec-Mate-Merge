import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

export const SmartHomeModule3Section1FAQ = () => {
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);

  const faqs = [
    {
      question: "Do smart bulbs work with normal light switches?",
      answer: "Yes, but the switch must stay 'on' — otherwise the bulb loses power and connectivity. Smart bulbs need constant power to maintain their wireless connection and respond to app commands.",
      category: "technical"
    },
    {
      question: "Which is cheaper, smart bulbs or smart switches?",
      answer: "For one room, smart bulbs may be cheaper (£50-100 vs £80-150 for a smart switch). For a whole house, smart switches are usually more cost-effective since one switch controls multiple bulbs.",
      category: "cost"
    },
    {
      question: "Can I mix smart bulbs and switches?",
      answer: "Yes, but be careful — turning off a switch cuts power to smart bulbs, unless switches are designed for integration. Use smart switches that maintain standby power or ensure family members understand the setup.",
      category: "compatibility"
    }
  ];

  const toggleQuestion = (index: number) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'technical': return 'text-blue-400';
      case 'cost': return 'text-yellow-400';
      case 'compatibility': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <HelpCircle className="h-5 w-5 text-elec-yellow" />
          Frequently Asked Questions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-foreground mb-6">
          Common questions about smart lighting systems and their practical implementation:
        </p>
        
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-gray-600 rounded-lg overflow-hidden">
              <Button
                variant="ghost"
                onClick={() => toggleQuestion(index)}
                className="w-full p-3 sm:p-4 text-left hover:bg-[#323232] justify-between min-h-0"
              >
                <div className="flex flex-col sm:flex-row items-start gap-2 sm:gap-3 flex-1">
                  <span className={`text-xs font-bold px-2 py-1 rounded ${getCategoryColor(faq.category)} bg-current/20 flex-shrink-0`}>
                    {faq.category.toUpperCase()}
                  </span>
                  <span className="text-foreground font-medium text-sm sm:text-base">{faq.question}</span>
                </div>
                {openQuestion === index ? (
                  <ChevronUp className="h-4 w-4 text-gray-400 flex-shrink-0 mt-1 sm:mt-0" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-gray-400 flex-shrink-0 mt-1 sm:mt-0" />
                )}
              </Button>
              
              {openQuestion === index && (
                <div className="px-3 sm:px-4 pb-3 sm:pb-4 border-t border-gray-600 bg-[#1a1a1a]">
                  <p className="text-foreground text-sm leading-relaxed pt-3">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* FAQ Categories Legend */}
        <div className="mt-6 p-3 sm:p-4 bg-[#1a1a1a] border border-gray-600 rounded-lg">
          <h4 className="font-semibold text-foreground mb-3">Question Categories</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-400/20 rounded border border-blue-400 flex-shrink-0"></div>
              <span className="text-blue-400">Technical</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-400/20 rounded border border-yellow-400 flex-shrink-0"></div>
              <span className="text-yellow-400">Cost</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-400/20 rounded border border-green-400 flex-shrink-0"></div>
              <span className="text-green-400">Compatibility</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};