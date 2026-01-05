import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HelpCircle, Shield, AlertTriangle, Lock } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const SafetyIsolationFAQ = () => {
  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <HelpCircle className="h-6 w-6 text-elec-yellow" />
          Safety & Isolation FAQ
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full space-y-2">
          <AccordionItem value="item-1" className="border-gray-600">
            <AccordionTrigger className="text-foreground hover:text-elec-yellow">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-red-400" />
                What's the correct isolation sequence for PV systems?
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-gray-300">
              <p className="mb-3">Follow this five-step isolation sequence for maximum safety:</p>
              <div className="space-y-3 text-sm">
                <div className="bg-red-900/20 p-3 rounded border border-red-500/30">
                  <h5 className="text-red-400 font-medium mb-2">Critical Isolation Steps:</h5>
                  <ol className="list-decimal list-inside space-y-1">
                    <li><strong>AC isolation:</strong> Main switch → inverter AC isolator</li>
                    <li><strong>DC isolation:</strong> Inverter DC isolator → string fuses/breakers</li>
                    <li><strong>Energy discharge:</strong> Wait 5+ minutes for capacitors</li>
                    <li><strong>Prove dead:</strong> Test all circuits with approved tester</li>
                    <li><strong>Secure isolation:</strong> Lock isolators, apply warning tags</li>
                  </ol>
                </div>
                <div className="bg-orange-900/20 p-3 rounded border border-orange-500/30">
                  <h5 className="text-orange-400 font-medium mb-2">Additional Precautions:</h5>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Cover panels with opaque material if accessible</li>
                    <li>Remove fuses rather than just opening switches</li>
                    <li>Test between all conductors and earth</li>
                    <li>Use barriers to prevent accidental re-energisation</li>
                  </ul>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2" className="border-gray-600">
            <AccordionTrigger className="text-foreground hover:text-elec-yellow">
              <div className="flex items-center gap-2">
                <Lock className="h-4 w-4 text-blue-400" />
                How do I implement effective LOTO procedures?
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-gray-300">
              <p className="mb-3">Lockout/Tagout (LOTO) prevents accidental re-energisation during work:</p>
              <div className="space-y-3 text-sm">
                <div className="bg-blue-900/20 p-3 rounded border border-blue-500/30">
                  <h5 className="text-blue-400 font-medium mb-2">LOTO Implementation:</h5>
                  <ol className="list-decimal list-inside space-y-1">
                    <li><strong>Identify:</strong> All energy sources and isolation points</li>
                    <li><strong>Notify:</strong> All personnel affected by shutdown</li>
                    <li><strong>Shutdown:</strong> Follow proper de-energisation sequence</li>
                    <li><strong>Isolate:</strong> Physically disconnect energy sources</li>
                    <li><strong>Lock:</strong> Apply personal locks to prevent operation</li>
                    <li><strong>Tag:</strong> Attach warning tags with contact details</li>
                    <li><strong>Verify:</strong> Test for zero energy state</li>
                  </ol>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3" className="border-gray-600">
            <AccordionTrigger className="text-foreground hover:text-elec-yellow">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-yellow-400" />
                Why is DC more dangerous than AC?
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-gray-300">
              <p className="mb-3">DC systems present unique hazards requiring special precautions:</p>
              <div className="space-y-3 text-sm">
                <div className="bg-yellow-900/20 p-3 rounded border border-yellow-500/30">
                  <h5 className="text-yellow-400 font-medium mb-2">DC Hazards:</h5>
                  <ul className="list-disc list-inside space-y-1">
                    <li><strong>No zero crossing:</strong> Arcs persist without natural interruption</li>
                    <li><strong>Continuous energy:</strong> Sustained fault current flow</li>
                    <li><strong>Difficult interruption:</strong> Requires specialised switching equipment</li>
                    <li><strong>Fire risk:</strong> Arc temperatures exceed 20,000°C</li>
                    <li><strong>Electrolytic effects:</strong> Chemical burns from DC current</li>
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

export default SafetyIsolationFAQ;