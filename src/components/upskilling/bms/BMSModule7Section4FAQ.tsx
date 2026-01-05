import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { HelpCircle } from 'lucide-react';

export const BMSModule7Section4FAQ = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <HelpCircle className="h-5 w-5 text-elec-yellow" />
          Frequently Asked Questions
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1" className="border-gray-600">
            <AccordionTrigger className="text-foreground hover:text-elec-yellow">
              What is the purpose of software upload in a BMS?
            </AccordionTrigger>
            <AccordionContent className="text-foreground">
              Software upload loads the control logic, device mappings, setpoints, and operational parameters into BMS controllers, 
              enabling them to operate connected equipment according to the designed control sequences.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2" className="border-gray-600">
            <AccordionTrigger className="text-foreground hover:text-elec-yellow">
              Why must controllers be powered and stable before upload?
            </AccordionTrigger>
            <AccordionContent className="text-foreground">
              Controllers need stable power to maintain memory during upload, process incoming software packages, and validate 
              program integrity. Unstable power can corrupt uploads, damage controller memory, or cause programming failures.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3" className="border-gray-600">
            <AccordionTrigger className="text-foreground hover:text-elec-yellow">
              Why is time synchronisation important across BMS controllers?
            </AccordionTrigger>
            <AccordionContent className="text-foreground">
              Time synchronisation ensures accurate data logging, coordinated equipment scheduling, proper alarm sequencing, 
              and reliable energy monitoring. Without it, trend data becomes unreliable and troubleshooting becomes difficult.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4" className="border-gray-600">
            <AccordionTrigger className="text-foreground hover:text-elec-yellow">
              What should be tested after software upload?
            </AccordionTrigger>
            <AccordionContent className="text-foreground">
              Test all I/O point responses, verify safety function operation, check network communication, confirm parameter 
              settings, and validate that physical equipment responds correctly to BMS commands.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
};