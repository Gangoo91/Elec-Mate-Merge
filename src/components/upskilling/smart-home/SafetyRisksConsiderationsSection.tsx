import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, Zap } from 'lucide-react';
import MixedCircuitRisksQuickCheck from '@/components/upskilling/smart-home/MixedCircuitRisksQuickCheck';

const SafetyRisksConsiderationsSection = () => {
  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <AlertTriangle className="h-6 w-6 text-elec-yellow" />
          3. Risks and Considerations
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-foreground">
          Smart home installations present unique safety challenges that electricians must anticipate and mitigate. 
          Understanding these risks is essential for safe and compliant installations.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="p-4 bg-red-900/20 border border-red-600/30 rounded-lg">
              <h4 className="font-semibold text-red-200 mb-3 flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Mixed Voltage Risks
              </h4>
              <p className="text-red-100 text-sm mb-3">
                Some smart devices use both mains and low voltage — incorrect wiring can cause damage or danger.
              </p>
              <ul className="space-y-2 text-red-100 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">•</span>
                  Cross-contamination between mains and data circuits
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">•</span>
                  Overvoltage damage to sensitive electronics
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">•</span>
                  Fire risk from improper cable selection
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">•</span>
                  Shock hazard from exposed conductors
                </li>
              </ul>
            </div>

            <div className="p-4 bg-amber-900/20 border border-amber-600/30 rounded-lg">
              <h4 className="font-semibold text-amber-200 mb-3">Inadequate Isolation Risks</h4>
              <p className="text-amber-100 text-sm mb-3">
                Inadequate isolation may result in live parts remaining energised during work.
              </p>
              <ul className="space-y-2 text-amber-100 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 mt-1">•</span>
                  Electric shock during installation or maintenance
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 mt-1">•</span>
                  Arc flash from accidental short circuits
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 mt-1">•</span>
                  Equipment damage from unexpected energisation
                </li>
              </ul>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-purple-900/20 border border-purple-600/30 rounded-lg">
              <h4 className="font-semibold text-purple-200 mb-3">Earth Continuity Issues</h4>
              <p className="text-purple-100 text-sm mb-3">
                Poor earth continuity in metal containment can increase shock risk.
              </p>
              <ul className="space-y-2 text-purple-100 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-purple-400 mt-1">•</span>
                  Metal enclosures becoming live during faults
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400 mt-1">•</span>
                  RCD protection may not operate correctly
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400 mt-1">•</span>
                  Increased touch voltage on exposed metalwork
                </li>
              </ul>
            </div>

            <div className="p-4 bg-blue-900/20 border border-blue-600/30 rounded-lg">
              <h4 className="font-semibold text-blue-200 mb-3">Environmental Considerations</h4>
              <ul className="space-y-2 text-blue-100 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1">•</span>
                  <strong>Moisture ingress:</strong> IP ratings insufficient for location
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1">•</span>
                  <strong>Temperature extremes:</strong> Component failure in attics/outdoors
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1">•</span>
                  <strong>Mechanical damage:</strong> Cables in vulnerable locations
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1">•</span>
                  <strong>EMC interference:</strong> Smart devices affecting other systems
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4">
          <h4 className="font-semibold text-elec-yellow mb-3">Risk Mitigation Strategies</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h5 className="font-medium text-foreground mb-2">Planning Phase</h5>
              <ul className="space-y-1 text-gray-300 text-sm">
                <li>• Review manufacturer installation requirements</li>
                <li>• Plan cable routes to avoid conflicts</li>
                <li>• Identify environmental challenges early</li>
                <li>• Specify appropriate cable types and ratings</li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium text-foreground mb-2">Installation Phase</h5>
              <ul className="space-y-1 text-gray-300 text-sm">
                <li>• Follow safe isolation procedures religiously</li>
                <li>• Use segregated containment for mixed circuits</li>
                <li>• Test earth continuity before energising</li>
                <li>• Verify all connections before closing enclosures</li>
              </ul>
            </div>
          </div>
        </div>

        <MixedCircuitRisksQuickCheck />
      </CardContent>
    </Card>
  );
};

export default SafetyRisksConsiderationsSection;