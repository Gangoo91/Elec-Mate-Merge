import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { HelpCircle } from 'lucide-react';

const ControlStrategiesFAQ = () => {
  return (
    <Card className="bg-elec-gray border-gray-600">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <HelpCircle className="h-5 w-5 text-elec-yellow" />
          Control Strategies FAQ
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1" className="border-gray-600">
            <AccordionTrigger className="text-foreground hover:text-elec-yellow">
              When should I choose manual switching over automatic transfer switching?
            </AccordionTrigger>
            <AccordionContent className="text-gray-300">
              Manual switching is suitable for non-critical applications where brief interruptions are acceptable, budgets are tight, and users are always present. Choose automatic for critical loads, unmanned sites, or where switching speed is crucial. Manual systems cost 60-80% less but require user intervention.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2" className="border-gray-600">
            <AccordionTrigger className="text-foreground hover:text-elec-yellow">
              What's the difference between closed-transition and open-transition ATS?
            </AccordionTrigger>
            <AccordionContent className="text-gray-300">
              Open-transition ATS briefly disconnects both sources during switching (50-100ms interruption), suitable for most loads. Closed-transition ATS momentarily parallels sources for seamless transfer, essential for sensitive equipment but requires synchronisation controls and costs 2-3x more.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3" className="border-gray-600">
            <AccordionTrigger className="text-foreground hover:text-elec-yellow">
              How do I size an automatic transfer switch properly?
            </AccordionTrigger>
            <AccordionContent className="text-gray-300">
              Size ATS for 125% of continuous load current. Consider motor starting currents (multiply by 6-8x for induction motors), future expansion (add 20-25%), and ambient temperature derating. A 100A continuous load typically needs a 125A ATS, but verify with starting surge calculations.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4" className="border-gray-600">
            <AccordionTrigger className="text-foreground hover:text-elec-yellow">
              What monitoring and control features should I look for in an ATS?
            </AccordionTrigger>
            <AccordionContent className="text-gray-300">
              Essential features: voltage/frequency monitoring on both sources, adjustable time delays, manual override, status indicators, and remote monitoring capability. Advanced features: load shedding, generator exercising, data logging, and network connectivity for remote management.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5" className="border-gray-600">
            <AccordionTrigger className="text-foreground hover:text-elec-yellow">
              How should I configure the switching time delays?
            </AccordionTrigger>
            <AccordionContent className="text-gray-300">
              Typical settings: Transfer to backup: 3-10 seconds (allows for brief grid interruptions). Return to normal: 5-30 minutes (prevents rapid cycling). Generator start delay: 10-30 seconds. Adjust based on load criticality and generator warm-up requirements.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-6" className="border-gray-600">
            <AccordionTrigger className="text-foreground hover:text-elec-yellow">
              What safety considerations are critical for ATS installation?
            </AccordionTrigger>
            <AccordionContent className="text-gray-300">
              Key safety features: mechanical and electrical interlocking to prevent paralleling incompatible sources, proper earthing of neutral conductors, isolation switches for maintenance, overcurrent protection, and clear labelling. Never bypass safety interlocks - this can cause equipment damage or injury.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-7" className="border-gray-600">
            <AccordionTrigger className="text-foreground hover:text-elec-yellow">
              How do I troubleshoot ATS switching problems?
            </AccordionTrigger>
            <AccordionContent className="text-gray-300">
              Common issues: Incorrect voltage/frequency settings, faulty control power supply, mechanical binding, worn contacts, or control circuit faults. Check control voltage first (usually 24V or 120V), verify settings match actual supply parameters, and inspect for loose connections or corrosion.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-8" className="border-gray-600">
            <AccordionTrigger className="text-foreground hover:text-elec-yellow">
              Can I retrofit automatic switching to an existing manual system?
            </AccordionTrigger>
            <AccordionContent className="text-gray-300">
              Usually yes, but requires assessment of existing infrastructure. Check if current manual switch can accommodate ATS controller, verify adequate control power supply, and ensure proper cable sizing. May need panel modifications and additional control wiring. Typically 30-50% of new ATS cost.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default ControlStrategiesFAQ;