import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { HelpCircle } from 'lucide-react';

export const BMSModule7Section3FAQ = () => {
  const faqs = [
    {
      question: "What happens if I accidentally assign the same address to two devices?",
      answer: "Communication conflicts will occur, and the BMS will either see data from only one device or receive corrupted data. Both devices must be reconfigured with unique addresses."
    },
    {
      question: "How do I know which addressing method to use?",
      answer: "The addressing method depends on the communication protocol: BACnet uses Device IDs, Modbus uses numeric addresses (1-247), and KNX uses physical addresses in Line.Device format."
    },
    {
      question: "Why is device mapping separate from addressing?",
      answer: "Addressing identifies the device on the network, while mapping connects the physical I/O points to their software representation. Both are needed for proper BMS operation."
    },
    {
      question: "Can I change device addresses after installation?",
      answer: "Yes, but it requires reconfiguring both the device and updating any BMS software references. It's much easier to set correct addresses during initial installation."
    },
    {
      question: "What's the difference between physical and logical addresses in KNX?",
      answer: "Physical addresses (Line.Device format) identify where the device is physically located on the network. Logical group addresses link devices together for control functions."
    },
    {
      question: "How should I label devices with their addresses?",
      answer: "Use permanent labels (stickers or engraved tags) showing the device address, and maintain an addressing register in the O&M documentation for reference."
    }
  ];

  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <HelpCircle className="h-5 w-5 text-elec-yellow" />
          Frequently Asked Questions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border-gray-600">
              <AccordionTrigger className="text-foreground hover:text-elec-yellow text-left">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
};