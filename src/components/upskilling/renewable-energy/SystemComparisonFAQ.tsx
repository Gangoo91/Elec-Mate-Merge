import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { HelpCircle } from 'lucide-react';

const SystemComparisonFAQ = () => {
  return (
    <Card className="bg-elec-gray border-gray-600">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <HelpCircle className="h-5 w-5 text-elec-yellow" />
          System Comparison FAQ
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1" className="border-gray-600">
            <AccordionTrigger className="text-foreground hover:text-elec-yellow">
              When should I choose a grid-tied system over off-grid?
            </AccordionTrigger>
            <AccordionContent className="text-gray-300">
              Choose grid-tied if you have reliable grid connection, want lower upfront costs, and don't mind grid dependence. Grid-tied systems are 30-40% cheaper initially, offer better ROI through export tariffs, and require less maintenance than battery systems.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2" className="border-gray-600">
            <AccordionTrigger className="text-foreground hover:text-elec-yellow">
              What are the main disadvantages of off-grid systems?
            </AccordionTrigger>
            <AccordionContent className="text-gray-300">
              Higher initial costs (50-100% more), battery replacement every 10-15 years, more complex maintenance, potential for power shortages during extended bad weather, and need for backup generator. However, they provide complete energy independence.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3" className="border-gray-600">
            <AccordionTrigger className="text-foreground hover:text-elec-yellow">
              Why would I choose a hybrid system?
            </AccordionTrigger>
            <AccordionContent className="text-gray-300">
              Hybrid systems offer the best of both worlds: backup power during outages, export capability when connected, and flexibility to operate off-grid if needed. Ideal for areas with unreliable grid supply or for critical loads requiring guaranteed power.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4" className="border-gray-600">
            <AccordionTrigger className="text-foreground hover:text-elec-yellow">
              How do I calculate the payback period for each system type?
            </AccordionTrigger>
            <AccordionContent className="text-gray-300">
              Grid-tied: (System cost) ÷ (Annual electricity savings + export income). Typically 8-12 years.
              Off-grid: (System cost) ÷ (Annual generator fuel savings + avoided grid connection costs). Varies widely.
              Hybrid: More complex, factor in backup value and dual benefits. Usually 10-15 years.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5" className="border-gray-600">
            <AccordionTrigger className="text-foreground hover:text-elec-yellow">
              What maintenance differences should I expect?
            </AccordionTrigger>
            <AccordionContent className="text-gray-300">
              Grid-tied: Minimal - mainly panel cleaning and annual inverter checks.
              Off-grid: Regular battery maintenance, generator servicing, charge controller monitoring.
              Hybrid: Combination of both, plus additional switching/control system checks. Budget 2-3x more maintenance time for battery-based systems.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-6" className="border-gray-600">
            <AccordionTrigger className="text-foreground hover:text-elec-yellow">
              How do planning regulations differ between system types?
            </AccordionTrigger>
            <AccordionContent className="text-gray-300">
              Grid-tied: Requires DNO approval for export, G99/G100 applications, MCS certification needed for tariffs.
              Off-grid: Generally easier planning, but check building regulations for battery storage.
              Hybrid: Most complex - requires both DNO approval and off-grid compliance considerations.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default SystemComparisonFAQ;