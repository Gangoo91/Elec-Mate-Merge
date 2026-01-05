import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

export const EmergencyLightingFAQSection2_4 = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const faqs = [
    {
      question: "Does every exit door need illuminated signage?",
      answer: "Yes, every final exit must have an illuminated sign, either internally lit or externally lit by emergency lighting. This ensures that exit doors remain clearly visible even during mains power failure and helps guide evacuees to safety."
    },
    {
      question: "How bright should escape route lighting be?",
      answer: "At least 1 lux along the centre line of the route, with additional brightness at obstacles and equipment. The minimum level anywhere on the escape route should be 0.5 lux, with enhanced illumination at changes of direction and fire equipment locations."
    },
    {
      question: "Can escape route lighting be combined with normal lighting fittings?",
      answer: "Yes, if the luminaires are fitted with the correct emergency backup modules and comply with BS 5266 standards. This approach can be cost-effective but requires careful design to ensure emergency lighting levels meet requirements when mains lighting fails."
    },
    {
      question: "What happens if building layout changes after installation?",
      answer: "Any alterations to building layout require reassessment of escape route lighting. New escape routes may need additional lighting, and existing routes may need modification. A full lighting survey should be conducted after significant building changes."
    },
    {
      question: "How long should escape route lighting operate during power failure?",
      answer: "Typically 3 hours minimum operation time is required for most buildings. However, some high-risk or large buildings may require extended duration based on evacuation time calculations and risk assessment requirements."
    },
    {
      question: "Who is responsible for testing escape route lighting systems?",
      answer: "The building owner or occupier is legally responsible for ensuring regular testing. However, testing should be carried out by competent persons - either trained facility staff or qualified electrical contractors who understand the testing requirements."
    },
    {
      question: "What's the difference between maintained and non-maintained exit signs?",
      answer: "Maintained exit signs are permanently illuminated when mains power is available, while non-maintained signs only illuminate during mains failure. Maintained signs are required in public buildings where they need to be visible at all times."
    },
    {
      question: "Can LED luminaires be used for escape route lighting?",
      answer: "Yes, LED luminaires are increasingly popular for escape route lighting due to their long life and low power consumption. However, they must be specifically designed for emergency lighting applications and meet BS 5266 requirements for duration and light output."
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