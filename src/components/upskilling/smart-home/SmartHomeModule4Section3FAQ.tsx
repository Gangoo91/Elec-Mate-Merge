import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

export const SmartHomeModule4Section3FAQ = () => {
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);

  const faqs = [
    {
      question: "Do smart homes need environmental sensors?",
      answer: "Not essential, but increasingly common for comfort, health, and energy efficiency. They're particularly valuable in homes with vulnerable occupants, poor natural ventilation, or air quality concerns.",
      category: "necessity"
    },
    {
      question: "Can one sensor measure humidity, CO₂, and particulates?",
      answer: "Yes — many modern devices are multi-sensors (e.g., Awair, Airthings). These provide comprehensive air quality monitoring in a single unit, though individual sensors may offer higher accuracy for specific measurements.",
      category: "technology"
    },
    {
      question: "Are environmental sensors expensive?",
      answer: "Basic humidity sensors are affordable (£20-50); advanced IAQ multi-sensors cost more (£100-300) but provide detailed data. Consider the cost against potential health and energy benefits.",
      category: "cost"
    },
    {
      question: "How often do environmental sensors need calibration?",
      answer: "Typically annually for CO₂ sensors, every 2-3 years for humidity sensors. Some sensors are self-calibrating, whilst others require professional calibration. Check manufacturer recommendations for specific models.",
      category: "maintenance"
    },
    {
      question: "Can environmental sensors work with existing HVAC systems?",
      answer: "Yes, most sensors can integrate with existing systems through BMS interfaces, relay controls, or wireless controllers. Older systems may need additional control modules for automatic response.",
      category: "compatibility"
    },
    {
      question: "Where should environmental sensors be placed for best results?",
      answer: "Position sensors in representative locations away from direct airflow, heat sources, and windows. In homes, common locations include living areas and bedrooms. In offices, place near occupant zones but away from doors and vents.",
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