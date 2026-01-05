import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { HelpCircle } from 'lucide-react';

const LoadPriorityFAQ = () => {
  return (
    <Card className="bg-elec-gray border-gray-600">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <HelpCircle className="h-5 w-5 text-elec-yellow" />
          Load Priority & Energy Routing FAQ
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1" className="border-gray-600">
            <AccordionTrigger className="text-foreground hover:text-elec-yellow">
              How do I determine which loads should be classified as critical?
            </AccordionTrigger>
            <AccordionContent className="text-gray-300">
              Critical loads are essential for safety, security, or business continuity. Examples: security systems, medical equipment, refrigeration, communications, emergency lighting, and heating controls. Consider: life safety impact, financial cost of interruption, and restoration time if power is lost.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2" className="border-gray-600">
            <AccordionTrigger className="text-foreground hover:text-elec-yellow">
              What's the difference between a critical loads panel and a whole-house backup?
            </AccordionTrigger>
            <AccordionContent className="text-gray-300">
              Critical loads panel: Dedicated sub-panel with selected essential circuits, typically 20-50% of total load. More efficient battery usage, lower system cost. 
              Whole-house backup: Powers entire property during outages. Requires larger battery capacity (2-3x more), higher cost, but maximum convenience.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3" className="border-gray-600">
            <AccordionTrigger className="text-foreground hover:text-elec-yellow">
              How does automatic load shedding work in practice?
            </AccordionTrigger>
            <AccordionContent className="text-gray-300">
              Load shedding progressively disconnects non-essential loads as battery capacity decreases. Typical sequence: At 50% SOC shed heating/cooling, at 30% shed entertainment systems, at 20% shed all non-critical loads. Loads automatically reconnect when power/capacity is restored.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4" className="border-gray-600">
            <AccordionTrigger className="text-foreground hover:text-elec-yellow">
              Can I add time-of-use optimisation to my energy routing system?
            </AccordionTrigger>
            <AccordionContent className="text-gray-300">
              Yes, modern energy management systems can optimise based on tariff rates. For example: charge batteries during cheap night rates, use stored energy during peak rate periods, export during highest price times. Requires smart inverter with tariff programming capability.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5" className="border-gray-600">
            <AccordionTrigger className="text-foreground hover:text-elec-yellow">
              How do I size a critical loads panel correctly?
            </AccordionTrigger>
            <AccordionContent className="text-gray-300">
              Sum the maximum simultaneous demand of critical loads, add 25% safety margin. Typical residential critical loads: 5-15kW. Consider load diversity - not all loads run simultaneously. Factor in starting currents for motors. Size panel breaker capacity to match inverter output capability.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-6" className="border-gray-600">
            <AccordionTrigger className="text-foreground hover:text-elec-yellow">
              What are the benefits of AC-coupled vs DC-coupled load management?
            </AccordionTrigger>
            <AccordionContent className="text-gray-300">
              AC-coupled: Easier to retrofit, works with existing solar systems, simpler electrical design. 
              DC-coupled: Higher efficiency (5-10% better), more integrated control, better for new installations. 
              Choice depends on existing infrastructure and performance priorities.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-7" className="border-gray-600">
            <AccordionTrigger className="text-foreground hover:text-elec-yellow">
              How do smart switches and relays integrate with energy management systems?
            </AccordionTrigger>
            <AccordionContent className="text-gray-300">
              Smart switches provide remote control and monitoring of individual circuits. Connected via WiFi, Zigbee, or hardwired signals to central controller. Enable automated load shedding, scheduling, and priority management. Essential for sophisticated energy routing strategies.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-8" className="border-gray-600">
            <AccordionTrigger className="text-foreground hover:text-elec-yellow">
              What safety considerations apply to load priority systems?
            </AccordionTrigger>
            <AccordionContent className="text-gray-300">
              Ensure critical safety systems (smoke alarms, security, emergency lighting) are always powered and never subject to load shedding. Install manual override switches for emergency situations. Provide clear labelling of critical vs non-critical circuits. Test systems regularly under different scenarios.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default LoadPriorityFAQ;