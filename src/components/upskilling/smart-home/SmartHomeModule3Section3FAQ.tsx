import { HelpCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export const SmartHomeModule3Section3FAQ = () => {
  const faqs = [
    {
      question: "Can any LED bulb be dimmed?",
      answer: "No — only bulbs marked 'dimmable' should be used with dimmers. Non-dimmable LEDs may flicker, produce humming sounds, or have shortened lifespans when used with dimming circuits."
    },
    {
      question: "What's the difference between RGB and RGBW?",
      answer: "RGB mixes red, green, and blue to create colours but struggles with natural whites. RGBW adds a dedicated white LED for better accuracy and brightness in white light applications."
    },
    {
      question: "Why do people use cool white in kitchens?",
      answer: "Higher Kelvin light (5000-6500K) improves visibility and alertness — ideal for food preparation, cooking tasks, and general kitchen work where good colour rendering is important."
    },
    {
      question: "Do smart bulbs work with existing dimmer switches?",
      answer: "Most smart bulbs should be used with standard on/off switches, not dimmers. The bulb handles dimming digitally. Using traditional dimmers with smart bulbs can cause interference and damage."
    },
    {
      question: "How much energy do dimmed lights save?",
      answer: "LED dimming can provide significant energy savings. At 50% brightness, LEDs typically use about 40-50% of full power. However, savings aren't always linear due to driver efficiency curves."
    },
    {
      question: "What is circadian rhythm lighting?",
      answer: "Lighting that automatically adjusts colour temperature throughout the day to match natural sunlight patterns, helping regulate sleep-wake cycles and potentially improving wellbeing."
    },
    {
      question: "Can RGBW lights replace all other lighting?",
      answer: "While versatile, RGBW bulbs are typically more expensive and may not always match the efficiency or colour quality of dedicated white-light LEDs for general illumination tasks."
    },
    {
      question: "Why do some LED dimmers cause buzzing?",
      answer: "Incompatible dimmer types (leading-edge vs trailing-edge) or mismatched load requirements can cause audible buzzing. Trailing-edge dimmers are generally better for LEDs."
    }
  ];

  return (
    <Card className="bg-gradient-to-br from-cyan-50/10 to-blue-50/10 border-cyan-200/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-cyan-300">
          <HelpCircle className="h-6 w-6" />
          Frequently Asked Questions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full space-y-2">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="border border-cyan-600/20 rounded-lg px-4 bg-cyan-900/10"
            >
              <AccordionTrigger className="text-cyan-300 hover:text-cyan-200 text-left">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-300 leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
};