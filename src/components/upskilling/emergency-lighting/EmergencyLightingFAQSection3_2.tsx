import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HelpCircle, ChevronDown, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export const EmergencyLightingFAQSection3_2 = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const faqs = [
    {
      question: "Do all stairways need emergency lighting?",
      answer: "Yes, every flight of stairs and landing must be illuminated, as they are critical escape routes and present significant hazards during evacuation."
    },
    {
      question: "Is a corridor wider than 2 metres just treated as an escape route?",
      answer: "No, it must also be treated as an open area requiring anti-panic lighting. Wide corridors need both escape route lighting for guidance and general illumination to prevent panic."
    },
    {
      question: "Can exit signage alone be considered sufficient lighting?",
      answer: "No, exit signs provide direction, but luminaires are required for safe movement along the route. Signs show where to go, but lighting ensures you can see to get there safely."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <Card className="bg-slate-200/20 border-slate-600">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <HelpCircle className="h-5 w-5 text-elec-yellow" />
          Frequently Asked Questions
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border border-gray-600 rounded-lg overflow-hidden">
            <Button
              variant="ghost"
              className="w-full justify-between p-4 h-auto text-left hover:bg-elec-gray/50"
              onClick={() => toggleFAQ(index)}
            >
              <span className="font-medium">{faq.question}</span>
              {openFAQ === index ? (
                <ChevronDown className="h-4 w-4 text-elec-yellow" />
              ) : (
                <ChevronRight className="h-4 w-4 text-elec-yellow" />
              )}
            </Button>
            {openFAQ === index && (
              <div className="px-4 pb-4 pt-0">
                <div className="bg-elec-gray/30 p-3 rounded border-l-4 border-elec-yellow">
                  <p className="text-gray-300">{faq.answer}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};