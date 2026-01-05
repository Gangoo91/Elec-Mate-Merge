import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HelpCircle, Activity, Settings, Shield } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const TestEquipmentFAQ = () => {
  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <HelpCircle className="h-6 w-6 text-elec-yellow" />
          Test Equipment & Diagnostics FAQ
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full space-y-2">
          <AccordionItem value="item-1" className="border-gray-600">
            <AccordionTrigger className="text-foreground hover:text-elec-yellow">
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-blue-400" />
                How do I choose the right test equipment?
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-gray-300">
              <p className="mb-3">Equipment selection depends on application, safety requirements, and accuracy needs:</p>
              <div className="space-y-3 text-sm">
                <div className="bg-blue-900/20 p-3 rounded border border-blue-500/30">
                  <h5 className="text-blue-400 font-medium mb-2">Safety Requirements:</h5>
                  <ul className="list-disc list-inside space-y-1">
                    <li><strong>CAT rating:</strong> Must be CAT III 1000V minimum for PV systems</li>
                    <li><strong>DC capability:</strong> Essential for current measurements</li>
                    <li><strong>True RMS:</strong> Accurate readings with non-sinusoidal waveforms</li>
                    <li><strong>Input protection:</strong> Overload and transient protection</li>
                  </ul>
                </div>
                <div className="bg-green-900/20 p-3 rounded border border-green-500/30">
                  <h5 className="text-green-400 font-medium mb-2">Application Matching:</h5>
                  <ul className="list-disc list-inside space-y-1">
                    <li><strong>String current:</strong> DC clamp meter (0.1A resolution)</li>
                    <li><strong>Voltage measurements:</strong> High-impedance DMM</li>
                    <li><strong>Thermal analysis:</strong> 160×120 pixel minimum camera</li>
                    <li><strong>I-V curves:</strong> Dedicated PV analyser</li>
                  </ul>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2" className="border-gray-600">
            <AccordionTrigger className="text-foreground hover:text-elec-yellow">
              <div className="flex items-center gap-2">
                <Settings className="h-4 w-4 text-purple-400" />
                What calibration requirements apply?
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-gray-300">
              <p className="mb-3">Regular calibration ensures measurement accuracy and regulatory compliance:</p>
              <div className="space-y-3 text-sm">
                <div className="bg-purple-900/20 p-3 rounded border border-purple-500/30">
                  <h5 className="text-purple-400 font-medium mb-2">Calibration Schedule:</h5>
                  <ul className="list-disc list-inside space-y-1">
                    <li><strong>Annual:</strong> DMMs, clamp meters, insulation testers</li>
                    <li><strong>Bi-annual:</strong> Irradiance meters, thermal cameras</li>
                    <li><strong>Monthly:</strong> Reference cells and pyranometers</li>
                    <li><strong>After damage:</strong> Any dropped or mishandled equipment</li>
                  </ul>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3" className="border-gray-600">
            <AccordionTrigger className="text-foreground hover:text-elec-yellow">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-red-400" />
                What safety precautions are critical?
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-gray-300">
              <p className="mb-3">Equipment safety protects both personnel and instrumentation:</p>
              <div className="space-y-3 text-sm">
                <div className="bg-red-900/20 p-3 rounded border border-red-500/30">
                  <h5 className="text-red-400 font-medium mb-2">Pre-Use Checks:</h5>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Verify CAT rating matches system voltage</li>
                    <li>Inspect test leads for damage or wear</li>
                    <li>Check battery levels and operation</li>
                    <li>Confirm calibration certificate validity</li>
                    <li>Test on known voltage source first</li>
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

export default TestEquipmentFAQ;