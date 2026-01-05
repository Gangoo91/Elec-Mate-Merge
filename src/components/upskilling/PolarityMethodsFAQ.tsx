import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HelpCircle } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export const PolarityMethodsFAQ = () => {
  const faqData = [
    {
      id: "faq-1",
      question: "Why must polarity testing be done on dead circuits?",
      answer: "BS 7671 requires polarity testing before energisation for safety. Testing on dead circuits using continuity methods prevents the risk of electric shock and ensures we identify problems before they become dangerous. Live testing would also require the circuit to be energised first, defeating the safety purpose."
    },
    {
      id: "faq-2",
      question: "What's the standard test current for polarity testing?",
      answer: "Polarity testing uses the same low-current continuity test as other dead tests - typically between 4mA and 200mA depending on your test instrument. This is sufficient to verify connections without damaging sensitive electronic components that might be connected."
    },
    {
      id: "faq-3",
      question: "How do I test polarity when there are multiple switches controlling one light?",
      answer: "For two-way and intermediate switching, test from the line terminal at the distribution board to the line terminal of the lampholder, with all switches in various positions. The test should show continuity when switches provide a path, and open circuit when they don't. Each switch leg must be verified individually."
    },
    {
      id: "faq-4",
      question: "What reading should I expect during a polarity test?",
      answer: "You should get a low resistance reading (typically <0.5Ω) when testing between the line terminal at the DB and the line terminal at the final circuit point. The exact value isn't critical - you're confirming continuity exists through the correct conductors, not measuring impedance."
    },
    {
      id: "faq-5",
      question: "Can I test polarity and continuity at the same time?",
      answer: "While both use continuity testing, they serve different purposes. Continuity tests verify conductor integrity, while polarity tests verify correct connections. It's best practice to complete continuity testing first, then perform dedicated polarity tests to ensure you're methodically checking each requirement."
    },
    {
      id: "faq-6",
      question: "What if I get unexpected readings during polarity testing?",
      answer: "Unexpected readings usually indicate wiring errors - line and neutral may be swapped somewhere in the circuit. Trace the circuit systematically, checking connections at switches, junction boxes, and outlets. Use the resistance values to help locate where the cross-connection occurs."
    },
    {
      id: "faq-7",
      question: "Do I need special test leads for polarity testing?",
      answer: "Standard test leads are suitable, but long leads can be helpful for testing between distant points. Ensure leads are in good condition with low resistance. Some testers include crocodile clips or probe adaptors that can speed up testing in distribution boards."
    },
    {
      id: "faq-8",
      question: "How do I test polarity on circuits with electronic components?",
      answer: "Most modern MFTs use safe test currents that won't damage electronic components. However, if you're concerned about sensitive equipment, you can disconnect electronic devices during testing, or use a multimeter on its lowest resistance range which typically uses very low test currents."
    },
    {
      id: "faq-9",
      question: "What's the best sequence for testing multiple circuits?",
      answer: "Work systematically through your circuits - complete all tests (continuity, polarity, insulation resistance) on one circuit before moving to the next. This prevents confusion and ensures nothing is missed. Keep detailed records as you progress through each circuit."
    },
    {
      id: "faq-10",
      question: "Should I test polarity on the neutral conductor too?",
      answer: "While the primary concern is ensuring line conductors are correctly connected, it's good practice to verify neutral connections as well. Test from the neutral bar in the DB to neutral terminals at outlets. This confirms both conductors are correctly identified throughout the installation."
    }
  ];

  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-3">
          <HelpCircle className="h-6 w-6 text-elec-yellow" />
          Frequently Asked Questions
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground">
        <Accordion type="single" collapsible className="w-full">
          {faqData.map((faq) => (
            <AccordionItem key={faq.id} value={faq.id} className="border-white/20">
              <AccordionTrigger className="text-left text-foreground hover:text-elec-yellow transition-colors">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-foreground text-sm leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
};