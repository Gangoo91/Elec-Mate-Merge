import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HelpCircle } from 'lucide-react';

const EVChargingModule2Section3FAQ: React.FC = () => {
  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <HelpCircle className="h-5 w-5 text-elec-yellow" />
          Frequently Asked Questions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full space-y-2">
          <AccordionItem value="item-1" className="border border-gray-600 rounded-lg px-4">
            <AccordionTrigger className="text-foreground hover:text-elec-yellow">
              What's the difference between Wi-Fi and cellular connectivity for smart chargers?
            </AccordionTrigger>
            <AccordionContent className="text-gray-300">
              Wi-Fi offers higher bandwidth (up to 1.3Gbps) and is ideal for locations with reliable internet infrastructure, 
              but has limited range (30-100m). Cellular (4G/5G) provides extensive coverage and 99.9% network availability, 
              making it perfect for remote locations, but involves ongoing data charges and SIM management.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2" className="border border-gray-600 rounded-lg px-4">
            <AccordionTrigger className="text-foreground hover:text-elec-yellow">
              Why is OCPP important for EV charging infrastructure?
            </AccordionTrigger>
            <AccordionContent className="text-gray-300">
              OCPP (Open Charge Point Protocol) ensures interoperability between charging stations and management systems 
              from different manufacturers. This prevents vendor lock-in, reduces costs, and allows operators to mix and 
              match equipment from various suppliers while maintaining unified management.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3" className="border border-gray-600 rounded-lg px-4">
            <AccordionTrigger className="text-foreground hover:text-elec-yellow">
              How does dynamic load management work in practice?
            </AccordionTrigger>
            <AccordionContent className="text-gray-300">
              Dynamic load management monitors real-time power consumption and automatically adjusts charging rates 
              to stay within available capacity. For example, if your site has 100kW available and three cars are charging, 
              the system might allocate 33kW to each vehicle, automatically adjusting as vehicles start or stop charging.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4" className="border border-gray-600 rounded-lg px-4">
            <AccordionTrigger className="text-foreground hover:text-elec-yellow">
              What mobile app features are most important for users?
            </AccordionTrigger>
            <AccordionContent className="text-gray-300">
              Essential features include remote start/stop, real-time monitoring of charging progress, scheduling for 
              off-peak rates, and energy cost tracking. Advanced users also value load balancing controls, solar 
              integration optimisation, and comprehensive diagnostics with maintenance alerts.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5" className="border border-gray-600 rounded-lg px-4">
            <AccordionTrigger className="text-foreground hover:text-elec-yellow">
              When should I choose OCPP over PLC instead of Wi-Fi or cellular?
            </AccordionTrigger>
            <AccordionContent className="text-gray-300">
              OCPP over PLC (Power Line Communication) is ideal for retrofit installations where running new communication 
              cables isn't feasible. It uses existing power cables and can work up to 300m on low voltage networks. 
              However, it's susceptible to electrical noise and offers variable performance compared to dedicated communication methods.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-6" className="border border-gray-600 rounded-lg px-4">
            <AccordionTrigger className="text-foreground hover:text-elec-yellow">
              How do API integrations benefit fleet operators?
            </AccordionTrigger>
            <AccordionContent className="text-gray-300">
              API integrations allow fleet operators to incorporate charging data into their existing fleet management 
              systems. This enables automated billing, route optimisation based on charging availability, predictive 
              maintenance scheduling, and comprehensive energy cost analysis across their entire vehicle fleet.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default EVChargingModule2Section3FAQ;