import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HelpCircle } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export const PolarityPurposeFAQ = () => {
  const faqData = [
    {
      id: "faq-1",
      question: "What exactly does 'polarity' mean in electrical terms?",
      answer: "In electrical installations, polarity refers to ensuring that the line (live) and neutral conductors are connected to their correct designated terminals throughout the circuit. This means switches, protective devices, and equipment terminals must be wired so that the line conductor is properly controlled and the neutral remains at earth potential."
    },
    {
      id: "faq-2", 
      question: "Why can't I just test polarity with a simple voltage tester?",
      answer: "While voltage testers can confirm which conductor is live on an energised circuit, polarity testing must be performed before energisation as per BS 7671. We use continuity testing on dead circuits to verify correct connections before switching on power for the first time. This prevents dangerous situations from occurring."
    },
    {
      id: "faq-3",
      question: "What's the difference between 'live' and 'line' conductors?",
      answer: "In modern terminology, 'line' is the preferred term for what was traditionally called 'live'. Both refer to the conductor that carries current to the load and should be at supply voltage relative to earth. 'Live' is still commonly used in everyday conversation, but 'line' is the correct BS 7671 terminology."
    },
    {
      id: "faq-4",
      question: "Can incorrect polarity damage electrical equipment?",
      answer: "Most standard electrical equipment will function with reversed polarity, but safety is severely compromised. However, some electronic equipment, LED drivers, and equipment with built-in switches may malfunction or be damaged. The primary concern is always safety - shock risks from reversed polarity can be fatal."
    },
    {
      id: "faq-5",
      question: "Why is polarity testing particularly important for lighting circuits?",
      answer: "Lighting circuits often have switches controlling the line conductor and lampholders where the central contact must be connected to line. If polarity is incorrect, changing a bulb could result in electric shock, and switches may not provide proper isolation, leaving circuits live when they appear to be switched off."
    },
    {
      id: "faq-6",
      question: "Do I need to test polarity on every outlet and switch?",
      answer: "Yes, BS 7671 requires polarity verification at every outlet, switch position, and luminaire. Each point must be individually tested because wiring errors can occur at any location during installation, even if the distribution board connections are correct."
    },
    {
      id: "faq-7",
      question: "What happens if I find incorrect polarity during testing?",
      answer: "If polarity is incorrect, you must not energise the circuit. Identify and correct the wiring error - this usually involves swapping line and neutral connections at the point where the error occurs. Retest to confirm correction before proceeding with energisation."
    },
    {
      id: "faq-8",
      question: "Is polarity testing required for DC circuits?",
      answer: "Yes, DC circuits also require polarity testing to ensure positive and negative conductors are correctly connected. This is particularly important for equipment that may be damaged by reverse polarity, such as electronic devices, LED strips, and battery systems."
    },
    {
      id: "faq-9",
      question: "How does polarity testing relate to other electrical tests?",
      answer: "Polarity testing is one of the prescribed tests in BS 7671 Section 6, performed after continuity testing but before insulation resistance testing. It's part of the logical sequence that ensures the installation is safe before energisation. Each test builds on the previous ones to provide comprehensive verification."
    },
    {
      id: "faq-10",
      question: "Can I use the same equipment for polarity testing as other tests?",
      answer: "Yes, most multifunction testers (MFTs) include a continuity function suitable for polarity testing. You can also use dedicated continuity testers or even a simple ohmmeter. The key is using equipment that can reliably indicate continuity through the circuit paths you're testing."
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