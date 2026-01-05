import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { HelpCircle } from 'lucide-react';

const OffGridDesignFAQ = () => {
  return (
    <Card className="bg-elec-gray border-gray-600">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <HelpCircle className="h-5 w-5 text-elec-yellow" />
          Off-Grid Design FAQ
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1" className="border-gray-600">
            <AccordionTrigger className="text-foreground hover:text-elec-yellow">
              How do I calculate the required battery capacity for autonomy?
            </AccordionTrigger>
            <AccordionContent className="text-gray-300">
              Formula: Daily load (kWh) × Autonomy days × Safety factor (1.2) ÷ Depth of discharge (0.8 for lithium, 0.5 for lead-acid). 
              For 3 days autonomy with 10kWh daily load: 10 × 3 × 1.2 ÷ 0.8 = 45kWh usable capacity required.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2" className="border-gray-600">
            <AccordionTrigger className="text-foreground hover:text-elec-yellow">
              What size generator do I need for backup power?
            </AccordionTrigger>
            <AccordionContent className="text-gray-300">
              Generator should handle critical loads plus battery charging. For a 10kW inverter system, typically need 12-15kW generator to run essential loads (8kW) plus charge batteries (4-6kW). Factor in starting surges for motors - multiply motor loads by 3-5x.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3" className="border-gray-600">
            <AccordionTrigger className="text-foreground hover:text-elec-yellow">
              How many days of autonomy should I design for?
            </AccordionTrigger>
            <AccordionContent className="text-gray-300">
              UK standard is 3-5 days. Consider: Local weather patterns (coastal areas may need more), generator reliability, critical vs non-critical loads, and budget. 3 days covers 95% of weather events, 5 days provides 99% confidence but increases battery costs significantly.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4" className="border-gray-600">
            <AccordionTrigger className="text-foreground hover:text-elec-yellow">
              Should I oversize my solar array for off-grid systems?
            </AccordionTrigger>
            <AccordionContent className="text-gray-300">
              Yes, typically by 20-30%. This compensates for winter production drops, panel degradation, and ensures faster battery charging after extended cloudy periods. Also allows for future load growth without system redesign.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5" className="border-gray-600">
            <AccordionTrigger className="text-foreground hover:text-elec-yellow">
              What's the difference between PWM and MPPT charge controllers?
            </AccordionTrigger>
            <AccordionContent className="text-gray-300">
              MPPT controllers are 20-30% more efficient, especially with high-voltage panels. They track maximum power point and convert excess voltage to current. PWM simply switches on/off and wastes power. For off-grid systems, MPPT is essential for maximising harvest from limited panel space.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-6" className="border-gray-600">
            <AccordionTrigger className="text-foreground hover:text-elec-yellow">
              How do I handle generator auto-start in off-grid systems?
            </AccordionTrigger>
            <AccordionContent className="text-gray-300">
              Auto-start typically triggers at 20-30% battery SOC or after preset time periods. Configure multiple start attempts (3-5), warm-up periods (2-3 minutes), and stop conditions (battery reaches 80-90% SOC). Include manual override and maintenance scheduling to prevent auto-start during servicing.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-7" className="border-gray-600">
            <AccordionTrigger className="text-foreground hover:text-elec-yellow">
              What maintenance schedule should I follow for off-grid systems?
            </AccordionTrigger>
            <AccordionContent className="text-gray-300">
              Monthly: Check battery voltage, generator oil/fuel, system monitoring logs. 
              Quarterly: Clean panels, check connections, test generator under load.
              Annually: Professional battery health check, inverter service, generator full service, cable torque checks. 
              Lead-acid batteries need weekly specific gravity checks if flooded type.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default OffGridDesignFAQ;