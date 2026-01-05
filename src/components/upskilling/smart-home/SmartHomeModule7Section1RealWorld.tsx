import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, CheckCircle, Lightbulb } from 'lucide-react';

const SmartHomeModule7Section1RealWorld = () => {
  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Lightbulb className="h-6 w-6 text-elec-yellow" />
          Real World Example
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h4 className="font-semibold text-foreground">Case Study: Smart Relay Installation Gone Wrong</h4>
          
          <div className="bg-red-900/20 border border-red-600/30 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
              <div>
                <h5 className="font-semibold text-red-200 mb-2">The Problem</h5>
                <p className="text-red-100 text-sm mb-3">
                  An installer wired multiple smart relays into a lighting circuit without providing neutral conductors. 
                  The installation appeared to work initially, but problems soon emerged:
                </p>
                <ul className="space-y-1 text-red-100 text-sm ml-4">
                  <li>• Flickering lights when relays switched</li>
                  <li>• Intermittent relay malfunctions</li>
                  <li>• Eventually complete relay failure</li>
                  <li>• Customer complaints and costly return visits</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-green-900/20 border border-green-600/30 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
              <div>
                <h5 className="font-semibold text-green-200 mb-2">The Solution</h5>
                <p className="text-green-100 text-sm mb-3">
                  After rewiring with the correct neutral connections and ensuring proper containment:
                </p>
                <ul className="space-y-1 text-green-100 text-sm ml-4">
                  <li>• System operated reliably without flickering</li>
                  <li>• Smart relays functioned as designed</li>
                  <li>• Professional appearance with proper cable management</li>
                  <li>• Customer satisfaction restored</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4">
            <h5 className="font-semibold text-elec-yellow mb-2">Key Lessons Learned</h5>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                Always follow manufacturer wiring diagrams exactly
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                Smart devices often have specific wiring requirements different from traditional switches
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                Proper containment protects connections and maintains professional standards
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                BS 7671 compliance is essential for safety and legal standards
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                Taking shortcuts leads to callbacks and damaged reputation
              </li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SmartHomeModule7Section1RealWorld;