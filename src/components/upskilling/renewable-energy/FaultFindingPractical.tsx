import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, CheckCircle, FileText, Search, Zap, Wrench } from 'lucide-react';

const FaultFindingPractical = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-elec-yellow flex items-center gap-2">
          <Wrench className="h-5 w-5" />
          Practical Fault-Finding Resources
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Systematic Fault-Finding Flowchart */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Search className="h-5 w-5" />
            Systematic Fault-Finding Flowchart
          </h3>
          <div className="bg-elec-dark p-4 rounded-lg border border-gray-600">
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-blue-900/30 rounded border-l-4 border-blue-500">
                <Badge variant="outline" className="bg-blue-500 text-foreground">1</Badge>
                <span className="text-foreground">Check monitoring system data and error codes</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-green-900/30 rounded border-l-4 border-green-500">
                <Badge variant="outline" className="bg-green-500 text-foreground">2</Badge>
                <span className="text-foreground">Verify system isolation and safety</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-yellow-900/30 rounded border-l-4 border-yellow-500">
                <Badge variant="outline" className="bg-yellow-500 text-black">3</Badge>
                <span className="text-foreground">Measure voltages and currents at key points</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-purple-900/30 rounded border-l-4 border-purple-500">
                <Badge variant="outline" className="bg-purple-500 text-foreground">4</Badge>
                <span className="text-foreground">Compare readings with expected values</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-red-900/30 rounded border-l-4 border-red-500">
                <Badge variant="outline" className="bg-red-500 text-foreground">5</Badge>
                <span className="text-foreground">Isolate fault to specific component or circuit</span>
              </div>
            </div>
          </div>
        </div>

        {/* Common Fault Symptoms Matrix */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Symptom-to-Cause Quick Reference
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-elec-dark p-4 rounded-lg border border-gray-600">
              <h4 className="font-semibold text-elec-yellow mb-3">Zero Generation</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>• Check DC isolator position</li>
                <li>• Verify inverter AC isolator</li>
                <li>• Test string voltages</li>
                <li>• Check inverter display/LEDs</li>
                <li>• Verify grid connection</li>
              </ul>
            </div>
            <div className="bg-elec-dark p-4 rounded-lg border border-gray-600">
              <h4 className="font-semibold text-elec-yellow mb-3">Low Generation</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>• Check for shading issues</li>
                <li>• Inspect for soiling/debris</li>
                <li>• Test string currents</li>
                <li>• Check for failed panels</li>
                <li>• Verify inverter settings</li>
              </ul>
            </div>
            <div className="bg-elec-dark p-4 rounded-lg border border-gray-600">
              <h4 className="font-semibold text-elec-yellow mb-3">Ground Fault</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>• Isolate all DC circuits</li>
                <li>• Test insulation resistance</li>
                <li>• Check cable integrity</li>
                <li>• Inspect connector seals</li>
                <li>• Test individual strings</li>
              </ul>
            </div>
            <div className="bg-elec-dark p-4 rounded-lg border border-gray-600">
              <h4 className="font-semibold text-elec-yellow mb-3">Arc Fault Detection</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>• Check all DC connections</li>
                <li>• Inspect MC4 connectors</li>
                <li>• Test cable continuity</li>
                <li>• Look for damaged cables</li>
                <li>• Verify proper torque values</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Diagnostic Decision Trees */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Zap className="h-5 w-5" />
            String Fault Diagnostic Tree
          </h3>
          <div className="bg-elec-dark p-4 rounded-lg border border-gray-600">
            <div className="space-y-3">
              <div className="p-3 bg-blue-900/20 rounded border border-blue-600">
                <p className="text-foreground font-medium">String Voltage = Normal, Current = Zero</p>
                <p className="text-sm text-blue-300 mt-1">→ Open circuit fault (broken cable, loose connector)</p>
              </div>
              <div className="p-3 bg-red-900/20 rounded border border-red-600">
                <p className="text-foreground font-medium">String Voltage = Zero, Current = Zero</p>
                <p className="text-sm text-red-300 mt-1">→ Complete string failure or isolator open</p>
              </div>
              <div className="p-3 bg-yellow-900/20 rounded border border-yellow-600">
                <p className="text-foreground font-medium">String Voltage = Low, Current = Normal</p>
                <p className="text-sm text-yellow-300 mt-1">→ Failed panel(s) or partial shading</p>
              </div>
              <div className="p-3 bg-green-900/20 rounded border border-green-600">
                <p className="text-foreground font-medium">String Voltage = High, Current = Low</p>
                <p className="text-sm text-green-300 mt-1">→ High resistance connection or bypass diode failure</p>
              </div>
            </div>
          </div>
        </div>

        {/* Testing Templates */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Fault Investigation Templates
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-elec-dark p-4 rounded-lg border border-gray-600">
              <h4 className="font-semibold text-elec-yellow mb-3">String Testing Record</h4>
              <div className="space-y-2 text-sm text-gray-300">
                <div className="flex justify-between">
                  <span>String ID:</span>
                  <span className="text-elec-yellow">______</span>
                </div>
                <div className="flex justify-between">
                  <span>Voc (V):</span>
                  <span className="text-elec-yellow">______</span>
                </div>
                <div className="flex justify-between">
                  <span>Isc (A):</span>
                  <span className="text-elec-yellow">______</span>
                </div>
                <div className="flex justify-between">
                  <span>Insulation (MΩ):</span>
                  <span className="text-elec-yellow">______</span>
                </div>
                <div className="flex justify-between">
                  <span>Polarity:</span>
                  <span className="text-elec-yellow">✓ / ✗</span>
                </div>
              </div>
            </div>
            <div className="bg-elec-dark p-4 rounded-lg border border-gray-600">
              <h4 className="font-semibold text-elec-yellow mb-3">Inverter Status Check</h4>
              <div className="space-y-2 text-sm text-gray-300">
                <div className="flex justify-between">
                  <span>Status Display:</span>
                  <span className="text-elec-yellow">______</span>
                </div>
                <div className="flex justify-between">
                  <span>Error Codes:</span>
                  <span className="text-elec-yellow">______</span>
                </div>
                <div className="flex justify-between">
                  <span>DC Voltage (V):</span>
                  <span className="text-elec-yellow">______</span>
                </div>
                <div className="flex justify-between">
                  <span>DC Current (A):</span>
                  <span className="text-elec-yellow">______</span>
                </div>
                <div className="flex justify-between">
                  <span>AC Output (kW):</span>
                  <span className="text-elec-yellow">______</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Safety Procedures */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            Safe Fault-Finding Procedures
          </h3>
          <div className="bg-elec-dark p-4 rounded-lg border border-gray-600">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-elec-yellow mb-2">Before Starting</h4>
                <ul className="space-y-1 text-sm text-gray-300">
                  <li>✓ Assess weather conditions</li>
                  <li>✓ Ensure proper PPE available</li>
                  <li>✓ Check test equipment calibration</li>
                  <li>✓ Review system documentation</li>
                  <li>✓ Inform relevant parties</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-elec-yellow mb-2">During Testing</h4>
                <ul className="space-y-1 text-sm text-gray-300">
                  <li>✓ Use appropriate isolation procedures</li>
                  <li>✓ Verify dead before touching</li>
                  <li>✓ Use approved test equipment only</li>
                  <li>✓ Document all findings</li>
                  <li>✓ Never work alone on HV systems</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FaultFindingPractical;