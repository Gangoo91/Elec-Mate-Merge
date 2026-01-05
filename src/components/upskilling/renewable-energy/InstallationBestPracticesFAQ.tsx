import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HelpCircle, AlertTriangle, CheckCircle, Wrench } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const InstallationBestPracticesFAQ = () => {
  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <HelpCircle className="h-6 w-6 text-elec-yellow" />
          Installation Best Practices FAQ
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full space-y-2">
          <AccordionItem value="item-1" className="border-gray-600">
            <AccordionTrigger className="text-foreground hover:text-elec-yellow">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-red-400" />
                Why are DC systems considered more dangerous than AC?
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-gray-300">
              <p className="mb-3">DC systems lack the natural zero-crossing point that AC systems have, making arc faults more persistent and dangerous:</p>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li><strong>Arc persistence:</strong> DC arcs do not self-extinguish and can sustain indefinitely</li>
                <li><strong>Higher energy content:</strong> Continuous energy release without natural interruption</li>
                <li><strong>Difficult to interrupt:</strong> Requires specialized DC-rated switching equipment</li>
                <li><strong>Fire risk:</strong> Sustained arcs can reach temperatures over 20,000°C</li>
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2" className="border-gray-600">
            <AccordionTrigger className="text-foreground hover:text-elec-yellow">
              <div className="flex items-center gap-2">
                <Wrench className="h-4 w-4 text-blue-400" />
                What's the correct cable support spacing for PV installations?
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-gray-300">
              <p className="mb-3">Cable support spacing depends on cable type and environmental conditions:</p>
              <div className="space-y-2 text-sm">
                <p><strong>Standard DC cables:</strong> Maximum 400mm spacing horizontally, 300mm vertically</p>
                <p><strong>Flexible cables:</strong> 300mm maximum spacing in all directions</p>
                <p><strong>Conduit runs:</strong> Support every 1.5m for PVC, every 2m for steel conduit</p>
                <p><strong>Special considerations:</strong> Reduce spacing by 50% in high wind areas or where thermal expansion is significant</p>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3" className="border-gray-600">
            <AccordionTrigger className="text-foreground hover:text-elec-yellow">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                How do I ensure proper earthing and bonding?
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-gray-300">
              <p className="mb-3">Proper earthing creates an equipotential zone and ensures fault protection:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-foreground font-medium mb-2">Equipment Bonding:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Bond all metallic structures and enclosures</li>
                    <li>Use 6mm² minimum earth conductor</li>
                    <li>Ensure continuity with testing</li>
                    <li>Apply anti-corrosion compounds</li>
                  </ul>
                </div>
                <div>
                  <p className="text-foreground font-medium mb-2">Earth Electrode System:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Minimum 1.2m deep earth rods</li>
                    <li>Target earth resistance ≤20Ω</li>
                    <li>Multiple rods if required</li>
                    <li>Annual resistance testing</li>
                  </ul>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4" className="border-gray-600">
            <AccordionTrigger className="text-foreground hover:text-elec-yellow">
              What labelling is required for PV installations?
            </AccordionTrigger>
            <AccordionContent className="text-gray-300">
              <p className="mb-3">Comprehensive labelling ensures safety during maintenance and emergencies:</p>
              <div className="space-y-3 text-sm">
                <div className="bg-elec-dark p-3 rounded border border-gray-600">
                  <p className="text-yellow-400 font-medium mb-2">Mandatory Labels:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Dual supply warning at inverter (AC and DC)</li>
                    <li>Maximum DC voltage on all DC circuits</li>
                    <li>Isolation point identification</li>
                    <li>Emergency shutdown procedure</li>
                    <li>Installation date and installer details</li>
                  </ul>
                </div>
                <div className="bg-elec-dark p-3 rounded border border-gray-600">
                  <p className="text-blue-400 font-medium mb-2">Label Specifications:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>UV-resistant laminated vinyl material</li>
                    <li>Permanent outdoor-rated adhesive</li>
                    <li>Minimum 2.5mm text height</li>
                    <li>Yellow background for warnings</li>
                  </ul>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5" className="border-gray-600">
            <AccordionTrigger className="text-foreground hover:text-elec-yellow">
              How do I prevent cable damage from wildlife?
            </AccordionTrigger>
            <AccordionContent className="text-gray-300">
              <p className="mb-3">Wildlife damage is a common cause of cable faults. Prevention strategies include:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-foreground font-medium mb-2">Physical Protection:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Use conduit or cable tray systems</li>
                    <li>Install bird guards on array perimeters</li>
                    <li>Maintain minimum 150mm clearance under panels</li>
                    <li>Seal cable entry points</li>
                  </ul>
                </div>
                <div>
                  <p className="text-foreground font-medium mb-2">Deterrent Methods:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Install sonic bird deterrents</li>
                    <li>Use metallic mesh barriers</li>
                    <li>Apply wildlife-resistant cable jacketing</li>
                    <li>Regular inspection and maintenance</li>
                  </ul>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-6" className="border-gray-600">
            <AccordionTrigger className="text-foreground hover:text-elec-yellow">
              What are the key considerations for roof mounting?
            </AccordionTrigger>
            <AccordionContent className="text-gray-300">
              <p className="mb-3">Roof mounting requires careful consideration of structural and weatherproofing factors:</p>
              <div className="space-y-3 text-sm">
                <div className="bg-orange-900/20 p-3 rounded border border-orange-500/30">
                  <p className="text-orange-400 font-medium mb-2">Structural Assessment:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Calculate total static and dynamic loads</li>
                    <li>Verify rafter spacing and condition</li>
                    <li>Consider wind uplift forces</li>
                    <li>Obtain structural engineer approval if required</li>
                  </ul>
                </div>
                <div className="bg-blue-900/20 p-3 rounded border border-blue-500/30">
                  <p className="text-blue-400 font-medium mb-2">Waterproofing:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Use appropriate flashing systems</li>
                    <li>Maintain roof membrane integrity</li>
                    <li>Install proper drainage channels</li>
                    <li>Allow for thermal expansion movement</li>
                  </ul>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default InstallationBestPracticesFAQ;