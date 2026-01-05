import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { HelpCircle } from 'lucide-react';

export const BMSModule7Section5FAQ = () => {
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
              What happens if pre-functional testing is skipped?
            </AccordionTrigger>
            <AccordionContent className="text-foreground">
              Skipping pre-functional testing leads to wasted time during functional commissioning when basic wiring 
              and power issues are discovered. It can also damage equipment if fundamental electrical problems exist.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2" className="border-gray-600">
            <AccordionTrigger className="text-foreground hover:text-elec-yellow">
              How long does commissioning typically take?
            </AccordionTrigger>
            <AccordionContent className="text-foreground">
              Pre-functional commissioning usually takes 1-3 days per major system, while functional commissioning 
              can take 1-2 weeks depending on system complexity and the number of sequences to test.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3" className="border-gray-600">
            <AccordionTrigger className="text-foreground hover:text-elec-yellow">
              What should be done if functional testing reveals wiring errors?
            </AccordionTrigger>
            <AccordionContent className="text-foreground">
              Stop testing immediately, isolate power safely, correct the wiring error, verify the fix with 
              multimeter testing, update documentation, and restart functional testing from the beginning of 
              that sequence.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4" className="border-gray-600">
            <AccordionTrigger className="text-foreground hover:text-elec-yellow">
              Why is documentation so important during commissioning?
            </AccordionTrigger>
            <AccordionContent className="text-foreground">
              Documentation provides proof that systems work correctly, creates troubleshooting references for 
              future maintenance, satisfies warranty requirements, and ensures building operators understand 
              system operation.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5" className="border-gray-600">
            <AccordionTrigger className="text-foreground hover:text-elec-yellow">
              Can commissioning be done remotely?
            </AccordionTrigger>
            <AccordionContent className="text-foreground">
              Some functional testing can be done remotely through network connections, but pre-functional 
              commissioning and safety testing must be done on-site with physical verification of wiring 
              and equipment operation.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
};