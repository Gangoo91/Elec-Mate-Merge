import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HelpCircle, TestTube, CheckCircle, AlertTriangle, Settings } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const CommissioningChecksFAQ = () => {
  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <HelpCircle className="h-6 w-6 text-elec-yellow" />
          Commissioning Checks FAQ
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full space-y-2">
          <AccordionItem value="item-1" className="border-gray-600">
            <AccordionTrigger className="text-foreground hover:text-elec-yellow">
              <div className="flex items-center gap-2">
                <TestTube className="h-4 w-4 text-blue-400" />
                What's the correct sequence for commissioning tests?
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-gray-300">
              <p className="mb-3">Follow this systematic sequence to ensure safety and accuracy:</p>
              <div className="space-y-3 text-sm">
                <div className="bg-elec-dark p-3 rounded border border-gray-600">
                  <h5 className="text-blue-400 font-medium mb-2">Phase 1 - Pre-energisation Tests:</h5>
                  <ol className="list-decimal list-inside space-y-1">
                    <li>Visual inspection of all connections</li>
                    <li>Insulation resistance testing (≥1MΩ)</li>
                    <li>Earth continuity verification</li>
                    <li>Polarity checks on all circuits</li>
                    <li>String open-circuit voltage measurement</li>
                  </ol>
                </div>
                <div className="bg-elec-dark p-3 rounded border border-gray-600">
                  <h5 className="text-green-400 font-medium mb-2">Phase 2 - Energisation Tests:</h5>
                  <ol className="list-decimal list-inside space-y-1">
                    <li>String short-circuit current measurement</li>
                    <li>Inverter startup and operation verification</li>
                    <li>Power output measurement under load</li>
                    <li>Grid synchronisation and power quality checks</li>
                    <li>Protection device operation testing</li>
                  </ol>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2" className="border-gray-600">
            <AccordionTrigger className="text-foreground hover:text-elec-yellow">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-orange-400" />
                What are acceptable tolerance ranges for Voc and Isc measurements?
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-gray-300">
              <p className="mb-3">Measurements should fall within these acceptable ranges when corrected to Standard Test Conditions (STC):</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="bg-blue-900/20 p-3 rounded border border-blue-500/30">
                  <h5 className="text-blue-400 font-medium mb-2">Open Circuit Voltage (Voc):</h5>
                  <ul className="list-disc list-inside space-y-1">
                    <li><strong>Acceptable range:</strong> ±5% of STC rating</li>
                    <li><strong>Temperature correction:</strong> -0.35%/°C typical</li>
                    <li><strong>String voltage:</strong> Sum of individual module Voc</li>
                    <li><strong>Investigation required:</strong> {">"} ±10% deviation</li>
                  </ul>
                </div>
                <div className="bg-green-900/20 p-3 rounded border border-green-500/30">
                  <h5 className="text-green-400 font-medium mb-2">Short Circuit Current (Isc):</h5>
                  <ul className="list-disc list-inside space-y-1">
                    <li><strong>Acceptable range:</strong> ±10% when irradiance corrected</li>
                    <li><strong>Minimum irradiance:</strong> 200W/m² for meaningful results</li>
                    <li><strong>String matching:</strong> Within 5% between strings</li>
                    <li><strong>Temperature effect:</strong> Minimal (+0.05%/°C)</li>
                  </ul>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3" className="border-gray-600">
            <AccordionTrigger className="text-foreground hover:text-elec-yellow">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                How do I verify insulation resistance is adequate?
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-gray-300">
              <p className="mb-3">Insulation resistance testing ensures electrical safety before energisation:</p>
              <div className="space-y-3 text-sm">
                <div className="bg-orange-900/20 p-3 rounded border border-orange-500/30">
                  <h5 className="text-orange-400 font-medium mb-2">Test Requirements:</h5>
                  <ul className="list-disc list-inside space-y-1">
                    <li><strong>Test voltage:</strong> 500V DC minimum for LV circuits</li>
                    <li><strong>Test duration:</strong> Apply for 60 seconds minimum</li>
                    <li><strong>Minimum values:</strong> ≥1MΩ for DC circuits, ≥0.5MΩ for ELV</li>
                    <li><strong>Environmental conditions:</strong> Dry conditions preferred</li>
                  </ul>
                </div>
                <div className="bg-purple-900/20 p-3 rounded border border-purple-500/30">
                  <h5 className="text-purple-400 font-medium mb-2">Test Points:</h5>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Positive conductor to earth</li>
                    <li>Negative conductor to earth</li>
                    <li>Between DC strings (if applicable)</li>
                    <li>AC circuits to earth</li>
                    <li>Cable screens and armour to earth</li>
                  </ul>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4" className="border-gray-600">
            <AccordionTrigger className="text-foreground hover:text-elec-yellow">
              <div className="flex items-center gap-2">
                <Settings className="h-4 w-4 text-purple-400" />
                What documentation is required for commissioning?
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-gray-300">
              <p className="mb-3">Comprehensive documentation ensures compliance and facilitates future maintenance:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="bg-elec-dark p-3 rounded border border-gray-600">
                  <h5 className="text-foreground font-medium mb-2">Test Certificates Required:</h5>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Electrical Installation Certificate (EIC)</li>
                    <li>Initial Inspection and Test Report</li>
                    <li>Schedule of Test Results</li>
                    <li>Commissioning Record</li>
                    <li>Performance Data Sheet</li>
                  </ul>
                </div>
                <div className="bg-elec-dark p-3 rounded border border-gray-600">
                  <h5 className="text-foreground font-medium mb-2">Technical Information:</h5>
                  <ul className="list-disc list-inside space-y-1">
                    <li>System schematic diagrams</li>
                    <li>Equipment specifications and datasheets</li>
                    <li>Test instrument calibration certificates</li>
                    <li>Environmental conditions during testing</li>
                    <li>Any deviations or non-conformities noted</li>
                  </ul>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5" className="border-gray-600">
            <AccordionTrigger className="text-foreground hover:text-elec-yellow">
              How do I identify and resolve polarity faults?
            </AccordionTrigger>
            <AccordionContent className="text-gray-300">
              <p className="mb-3">Polarity faults can prevent system operation and damage equipment:</p>
              <div className="space-y-3 text-sm">
                <div className="bg-red-900/20 p-3 rounded border border-red-500/30">
                  <h5 className="text-red-400 font-medium mb-2">Common Symptoms:</h5>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Inverter displays negative power readings</li>
                    <li>System fails to start or immediately shuts down</li>
                    <li>Protection devices activate unexpectedly</li>
                    <li>Unusual voltage readings between strings</li>
                  </ul>
                </div>
                <div className="bg-green-900/20 p-3 rounded border border-green-500/30">
                  <h5 className="text-green-400 font-medium mb-2">Resolution Steps:</h5>
                  <ol className="list-decimal list-inside space-y-1">
                    <li>Isolate system completely before investigation</li>
                    <li>Check MC4 connector orientation on each string</li>
                    <li>Verify combiner box wiring polarity</li>
                    <li>Trace cable routes for crossed connections</li>
                    <li>Re-test after corrections are made</li>
                  </ol>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-6" className="border-gray-600">
            <AccordionTrigger className="text-foreground hover:text-elec-yellow">
              What should I do if test results are outside acceptable limits?
            </AccordionTrigger>
            <AccordionContent className="text-gray-300">
              <p className="mb-3">Non-conforming test results require systematic investigation and resolution:</p>
              <div className="space-y-3 text-sm">
                <div className="bg-yellow-900/20 p-3 rounded border border-yellow-500/30">
                  <h5 className="text-yellow-400 font-medium mb-2">Investigation Process:</h5>
                  <ol className="list-decimal list-inside space-y-1">
                    <li><strong>Verify test conditions:</strong> Check equipment calibration and environmental factors</li>
                    <li><strong>Repeat measurements:</strong> Confirm results with multiple readings</li>
                    <li><strong>Isolate the fault:</strong> Test individual components or sections</li>
                    <li><strong>Identify root cause:</strong> Determine if issue is installation or equipment fault</li>
                    <li><strong>Implement corrections:</strong> Repair or replace as necessary</li>
                    <li><strong>Re-test and document:</strong> Verify resolution and update records</li>
                  </ol>
                </div>
                <div className="bg-blue-900/20 p-3 rounded border border-blue-500/30">
                  <h5 className="text-blue-400 font-medium mb-2">Documentation Requirements:</h5>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Record original non-conforming readings</li>
                    <li>Document investigation steps taken</li>
                    <li>Note corrective actions implemented</li>
                    <li>Include final test results showing compliance</li>
                    <li>Obtain customer acknowledgment if delays occur</li>
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

export default CommissioningChecksFAQ;