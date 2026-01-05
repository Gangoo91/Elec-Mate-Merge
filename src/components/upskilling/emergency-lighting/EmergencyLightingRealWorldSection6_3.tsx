import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, AlertTriangle } from 'lucide-react';

export const EmergencyLightingRealWorldSection6_3 = () => {
  return (
    <Card className="bg-gradient-to-br from-elec-gray to-[#1a1a1a] border border-elec-yellow/30 shadow-lg">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <MapPin className="h-6 w-6 text-elec-yellow drop-shadow-md" />
          Real-World Example
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-4">
        <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
          <div className="flex items-start gap-3 mb-3">
            <AlertTriangle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-red-300 mb-2">Case Study: Derby Warehouse</h4>
              <p className="text-foreground mb-3">
                A warehouse in Derby installed a standard 1-hour system based on cost savings, ignoring 
                the fire risk assessment which classified the building as high-risk due to hazardous 
                materials and long evacuation routes.
              </p>
              
              <p className="text-foreground mb-3">
                During a safety inspection, the fire authority found the system non-compliant and required 
                a full redesign to 3-hour duration with enhanced fire-resistant cabling.
              </p>

              <p className="text-foreground mb-3">
                This cost <span className="font-semibold text-red-300">double the original installation price</span> — 
                proving that ignoring risk assessments always leads to greater expense and liability.
              </p>
              
              <div className="bg-yellow-900/30 border border-yellow-500/30 rounded-lg p-3 mt-4">
                <p className="text-yellow-200 font-medium">
                  <span className="font-bold">Key Learning:</span> The cheapest option upfront is rarely 
                  the most cost-effective. Always design to the risk assessment from day one — retrofitting 
                  compliance is expensive, disruptive, and damages professional reputation.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
          <h4 className="font-semibold text-green-300 mb-2">What Should Have Been Done?</h4>
          <ul className="space-y-2 text-foreground">
            <li className="flex items-start gap-2">
              <span className="text-green-400">✓</span>
              <span>Review the fire risk assessment before quoting</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-400">✓</span>
              <span>Design to 3-hour duration from the outset</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-400">✓</span>
              <span>Specify enhanced fire-resistant cable (FP200, etc.)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-400">✓</span>
              <span>Document all decisions with reference to risk findings</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-400">✓</span>
              <span>Inform the client of the legal requirements and costs upfront</span>
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};
