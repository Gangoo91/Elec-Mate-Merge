import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

export const SmartHomeModule5Section1FAQ = () => {
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);

  const faqs = [
    {
      question: "What happens if the smart lock batteries die?",
      answer: "Most smart locks give low-battery warnings weeks in advance and retain a physical key override. Many also have emergency power options via 9V battery terminals.",
      category: "technical"
    },
    {
      question: "Can smart locks be hacked?",
      answer: "Yes, but risks are reduced with encryption, strong passwords, and firmware updates. Choose locks from reputable manufacturers with proven security track records.",
      category: "security"
    },
    {
      question: "Are smart locks insurance-approved?",
      answer: "Some are, but insurers may still require a British Standard mechanical lock as backup. Check with your insurance provider and consider locks that meet BS 3621 standards.",
      category: "compliance"
    },
    {
      question: "Do smart locks work without internet?",
      answer: "Many smart locks can operate offline for basic functions like PIN entry, but remote access and notifications require internet connectivity.",
      category: "technical"
    },
    {
      question: "How long do smart lock batteries last?",
      answer: "Typical battery life ranges from 6-12 months depending on usage frequency and connectivity type. Bluetooth locks generally last longer than Wi-Fi connected ones.",
      category: "maintenance"
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