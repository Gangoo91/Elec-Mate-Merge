import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

export const EmergencyLightingFAQSection2_5 = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const faqs = [
    {
      question: "Do all buildings need illuminated exit signs?",
      answer: "Yes, unless the escape route and final exit are immediately obvious and visible at all times. Most buildings require illuminated exit signs to ensure safe evacuation during emergencies."
    },
    {
      question: "Can text-only exit signs still be used?",
      answer: "No, signs must comply with ISO 7010, which uses the running man pictogram and directional arrow. Text-only 'EXIT' signs are no longer acceptable for new installations."
    },
    {
      question: "Do exit signs need to be connected to the emergency lighting supply?",
      answer: "Yes, they must remain visible in the event of mains failure. This can be achieved through connection to the emergency lighting circuit or by using self-contained emergency exit signs."
    },
    {
      question: "What's the difference between maintained and non-maintained exit signs?",
      answer: "Maintained exit signs are permanently illuminated when mains power is available, while non-maintained signs only illuminate during mains failure. Maintained signs are required in public buildings where they need to be visible at all times."
    },
    {
      question: "Can LED exit signs be used instead of traditional fluorescent ones?",
      answer: "Yes, LED exit signs are increasingly popular and acceptable. They offer longer life, lower power consumption, and better reliability. However, they must still meet all BS 5266 and ISO 7010 requirements."
    },
    {
      question: "How high should exit signs be mounted?",
      answer: "Exit signs should be mounted high enough to be visible above people's heads and potential obstructions, but low enough to remain visible below smoke levels. Typically 2-2.5 metres is appropriate, but this depends on the specific location."
    },
    {
      question: "Do emergency exit signs need regular testing like other emergency lighting?",
      answer: "Yes, exit signs require monthly functional testing and annual full-duration testing as part of the emergency lighting system. This includes checking illumination levels and ensuring signs remain legible."
    },
    {
      question: "What should be done if building layout changes after exit sign installation?",
      answer: "Any changes to building layout require reassessment of exit signage. New escape routes may need additional signs, existing arrows may need correction, and some signs may become redundant. A comprehensive review should be conducted."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <Card className="bg-slate-200/20 border-elec-yellow/20">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <HelpCircle className="h-6 w-6 text-elec-yellow" />
          Frequently Asked Questions
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border border-white/10 rounded-lg overflow-hidden">
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full text-left p-4 bg-white/5 hover:bg-white/10 transition-colors flex items-center justify-between"
            >
              <span className="font-medium text-foreground">{faq.question}</span>
              {openFAQ === index ? (
                <ChevronUp className="h-4 w-4 text-elec-yellow flex-shrink-0" />
              ) : (
                <ChevronDown className="h-4 w-4 text-elec-yellow flex-shrink-0" />
              )}
            </button>
            {openFAQ === index && (
              <div className="p-4 bg-white/5 border-t border-white/10">
                <p className="text-foreground leading-relaxed">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};