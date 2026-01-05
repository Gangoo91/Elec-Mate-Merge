import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { HelpCircle } from 'lucide-react';

const GridTiedSizingFAQ = () => {
  return (
    <Card className="bg-elec-gray border-gray-600">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <HelpCircle className="h-5 w-5 text-elec-yellow" />
          Grid-Tied Sizing & Export FAQ
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1" className="border-gray-600">
            <AccordionTrigger className="text-foreground hover:text-elec-yellow">
              What's the maximum system size I can install without DNO approval?
            </AccordionTrigger>
            <AccordionContent className="text-gray-300">
              In the UK, you can install up to 3.68kW (16A per phase) without prior DNO approval under G98. For systems between 3.68kW and 11.04kW (50A), you need G99 Fast Track approval. Above 11.04kW requires full G99 application with detailed studies.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2" className="border-gray-600">
            <AccordionTrigger className="text-foreground hover:text-elec-yellow">
              How do I determine my maximum export limit?
            </AccordionTrigger>
            <AccordionContent className="text-gray-300">
              Check your electricity meter fuse rating (typically 60A or 80A for domestic). Export limit is usually 16A per phase (3.68kW single phase). Contact your DNO for higher limits - they'll assess local network capacity. Some areas have zero export limits due to network constraints.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3" className="border-gray-600">
            <AccordionTrigger className="text-foreground hover:text-elec-yellow">
              Should I size my system to match my annual consumption?
            </AccordionTrigger>
            <AccordionContent className="text-gray-300">
              Not necessarily. Consider your usage pattern - if you use most electricity in evenings, a smaller system with battery storage might be better than a large export-heavy system. Aim for 70-80% self-consumption for optimal economics unless export rates are very attractive.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4" className="border-gray-600">
            <AccordionTrigger className="text-foreground hover:text-elec-yellow">
              What's the difference between export limiting and export management?
            </AccordionTrigger>
            <AccordionContent className="text-gray-300">
              Export limiting physically prevents power export above set limits using devices like Solax Power Manager. Export management optimises when to export vs store/use power. Limiting is for DNO compliance; management is for economic optimisation.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5" className="border-gray-600">
            <AccordionTrigger className="text-foreground hover:text-elec-yellow">
              How do CT clamps work for export monitoring?
            </AccordionTrigger>
            <AccordionContent className="text-gray-300">
              CT (Current Transformer) clamps measure current flow direction on your supply cable. When current flows toward the grid, it indicates export. They're installed on the meter tails and connected to your inverter for real-time export control. Must be correctly oriented - arrow points toward grid.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-6" className="border-gray-600">
            <AccordionTrigger className="text-foreground hover:text-elec-yellow">
              What happens if my system exports more than approved limits?
            </AccordionTrigger>
            <AccordionContent className="text-gray-300">
              DNOs can issue enforcement notices, demand system modification, or disconnect your system. Modern inverters should prevent over-export, but malfunctioning CT clamps or incorrect settings can cause breaches. Regular monitoring and proper commissioning are essential.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-7" className="border-gray-600">
            <AccordionTrigger className="text-foreground hover:text-elec-yellow">
              How long does DNO approval take and what information do they need?
            </AccordionTrigger>
            <AccordionContent className="text-gray-300">
              G99 Fast Track: 20 working days. Full G99: up to 65 working days. You'll need: site location, system capacity, inverter specs, single line diagram, and installer MCS certificate. Some DNOs have online portals; others require posted applications. Start early - delays are common.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-8" className="border-gray-600">
            <AccordionTrigger className="text-foreground hover:text-elec-yellow">
              Can I upgrade my system size later without new approvals?
            </AccordionTrigger>
            <AccordionContent className="text-gray-300">
              Any increase in capacity requires new DNO approval, even if staying within the same approval category. However, you can sometimes add battery storage without re-approval if it doesn't increase export capacity. Always check with your DNO before modifications.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default GridTiedSizingFAQ;