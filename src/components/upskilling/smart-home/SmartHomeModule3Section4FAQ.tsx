import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HelpCircle } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export const SmartHomeModule3Section4FAQ = () => {
  const faqs = [
    {
      question: "Can all LEDs be dimmed?",
      answer: "No — only LEDs marked as 'dimmable' should be used with dimmers. Non-dimmable LEDs can be damaged by dimming circuits and may cause safety issues."
    },
    {
      question: "What is the difference between leading-edge and trailing-edge dimmers?",
      answer: "Leading-edge dimmers suit resistive/inductive loads and cut power at the start of the AC waveform. Trailing-edge dimmers work better with capacitive LED loads and cut power at the end of the waveform, providing smoother control."
    },
    {
      question: "Why do some smart dimmers need a minimum load?",
      answer: "They require a small amount of current to operate their internal electronics. If the connected load is too small, the dimmer may not function properly or may cause flickering."
    },
    {
      question: "Can I mix halogen and LED lamps on the same dimmer?",
      answer: "This is not recommended. Different lamp types have different electrical characteristics and optimal control methods. It's better to use separate circuits or ensure all lamps are the same type."
    },
    {
      question: "What should I do if LEDs buzz when dimmed?",
      answer: "Buzzing usually indicates incompatible dimmer type or poor-quality LED drivers. Try switching to a trailing-edge or smart dimmer, or choose higher-quality dimmable LEDs."
    },
    {
      question: "How do I know if a dimmer and LED combination will work?",
      answer: "Check manufacturer compatibility charts, test a sample before full installation, and verify that the LED is marked as dimmable and compatible with the chosen dimmer type."
    }
  ];

  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <HelpCircle className="h-6 w-6 text-elec-yellow" />
          Frequently Asked Questions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="border-gray-600"
            >
              <AccordionTrigger className="text-foreground hover:text-elec-yellow transition-colors text-left">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-300">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
};