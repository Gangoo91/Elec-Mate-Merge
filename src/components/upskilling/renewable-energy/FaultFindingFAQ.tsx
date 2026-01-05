import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HelpCircle, Search, AlertTriangle, Wrench } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FaultFindingFAQ = () => {
  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <HelpCircle className="h-6 w-6 text-elec-yellow" />
          Fault-Finding FAQ
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full space-y-2">
          <AccordionItem value="item-1" className="border-gray-600">
            <AccordionTrigger className="text-foreground hover:text-elec-yellow">
              <div className="flex items-center gap-2">
                <Search className="h-4 w-4 text-blue-400" />
                What's the systematic approach to fault-finding?
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-gray-300">
              <p className="mb-3">Follow the fault tree methodology for efficient diagnosis:</p>
              <div className="space-y-3 text-sm">
                <div className="bg-blue-900/20 p-3 rounded border border-blue-500/30">
                  <h5 className="text-blue-400 font-medium mb-2">Step-by-Step Process:</h5>
                  <ol className="list-decimal list-inside space-y-1">
                    <li><strong>Document symptoms:</strong> Record error codes, performance data, visual observations</li>
                    <li><strong>Gather information:</strong> Review recent changes, weather events, maintenance history</li>
                    <li><strong>Develop hypothesis:</strong> List probable causes based on symptoms</li>
                    <li><strong>Test systematically:</strong> Start with most likely causes, use elimination method</li>
                    <li><strong>Isolate the fault:</strong> Test components individually to pinpoint issue</li>
                    <li><strong>Implement solution:</strong> Repair or replace faulty component</li>
                    <li><strong>Verify fix:</strong> Test system operation and document resolution</li>
                  </ol>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2" className="border-gray-600">
            <AccordionTrigger className="text-foreground hover:text-elec-yellow">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-red-400" />
                How do I identify arc faults quickly?
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-gray-300">
              <p className="mb-3">Arc faults require immediate attention due to fire risk:</p>
              <div className="space-y-3 text-sm">
                <div className="bg-red-900/20 p-3 rounded border border-red-500/30">
                  <h5 className="text-red-400 font-medium mb-2">Warning Signs:</h5>
                  <ul className="list-disc list-inside space-y-1">
                    <li>AFCI device trips repeatedly</li>
                    <li>Burning smell or visible scorch marks</li>
                    <li>Crackling or buzzing sounds from connections</li>
                    <li>Intermittent system shutdowns</li>
                    <li>High-frequency noise in monitoring data</li>
                  </ul>
                </div>
                <div className="bg-orange-900/20 p-3 rounded border border-orange-500/30">
                  <h5 className="text-orange-400 font-medium mb-2">Investigation Steps:</h5>
                  <ol className="list-decimal list-inside space-y-1">
                    <li>Immediately shut down system for safety</li>
                    <li>Visual inspection of all connections</li>
                    <li>Thermal imaging of suspected areas</li>
                    <li>Check connection tightness with torque wrench</li>
                    <li>Replace any damaged connectors or cables</li>
                    <li>Test system before re-energisation</li>
                  </ol>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3" className="border-gray-600">
            <AccordionTrigger className="text-foreground hover:text-elec-yellow">
              <div className="flex items-center gap-2">
                <Wrench className="h-4 w-4 text-green-400" />
                What tools are essential for effective fault-finding?
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-gray-300">
              <p className="mb-3">Professional diagnostic tools enable accurate fault identification:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="bg-green-900/20 p-3 rounded border border-green-500/30">
                  <h5 className="text-green-400 font-medium mb-2">Essential Equipment:</h5>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Digital multimeter (True RMS, CAT III)</li>
                    <li>DC current clamp meter</li>
                    <li>Insulation resistance tester</li>
                    <li>Thermal imaging camera</li>
                    <li>PV analyser with I-V curve capability</li>
                    <li>Irradiance meter (calibrated)</li>
                  </ul>
                </div>
                <div className="bg-blue-900/20 p-3 rounded border border-blue-500/30">
                  <h5 className="text-blue-400 font-medium mb-2">Advanced Diagnostics:</h5>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Ground fault locator</li>
                    <li>Cable fault locator</li>
                    <li>Power quality analyser</li>
                    <li>Oscilloscope for waveform analysis</li>
                    <li>Ultrasonic detector for arcing</li>
                    <li>Endoscope for internal inspection</li>
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

export default FaultFindingFAQ;