import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { HelpCircle } from 'lucide-react';

export const BMSModule7Section1FAQ = () => {
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
              What information should be included in an IO list entry?
            </AccordionTrigger>
            <AccordionContent className="text-foreground">
              Each IO list entry should include: tag number (unique identifier), device/equipment name, signal type 
              (digital/analog, input/output), engineering units (°C, ppm, bar), location reference, alarm/status 
              information if relevant, and any special installation notes such as cable types or power requirements.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2" className="border-gray-600">
            <AccordionTrigger className="text-foreground hover:text-elec-yellow">
              What is the purpose of a schematic diagram in BMS design?
            </AccordionTrigger>
            <AccordionContent className="text-foreground">
              Schematics show the physical and logical connections between devices, control sequences, wiring methods, 
              and spatial relationships. They provide the roadmap for installation, commissioning, and maintenance, 
              linking the IO list to actual physical implementation.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3" className="border-gray-600">
            <AccordionTrigger className="text-foreground hover:text-elec-yellow">
              Which topology is common for Modbus or BACnet MSTP networks?
            </AccordionTrigger>
            <AccordionContent className="text-foreground">
              Bus topology is common for both Modbus RTU and BACnet MSTP networks. These protocols typically use 
              RS-485 physical layer with devices connected in series along a shared communication medium. This requires 
              termination resistors (120Ω) at both ends of the bus.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4" className="border-gray-600">
            <AccordionTrigger className="text-foreground hover:text-elec-yellow">
              What is the maximum cable length for an RS-485 segment?
            </AccordionTrigger>
            <AccordionContent className="text-foreground">
              The maximum cable length for an RS-485 segment is typically 1200 metres. This applies to both Modbus RTU 
              and BACnet MSTP networks. Beyond this distance, signal integrity may be compromised, requiring repeaters 
              or alternative solutions such as fibre optic converters.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5" className="border-gray-600">
            <AccordionTrigger className="text-foreground hover:text-elec-yellow">
              Why is it important to share IO lists with commissioning engineers early?
            </AccordionTrigger>
            <AccordionContent className="text-foreground">
              Early sharing of IO lists allows commissioning engineers to pre-plan testing procedures, prepare 
              commissioning documentation, identify potential issues before installation, and ensure all required 
              points are included in the system design. This prevents costly delays and variations during commissioning.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
};