import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, AlertTriangle, CheckCircle, FileText, Zap, Users } from 'lucide-react';

const SafetyIsolationPractical = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-elec-yellow flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Practical Safety & Isolation Resources
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* DC Isolation Procedures */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Step-by-Step DC Isolation Procedures
          </h3>
          <div className="bg-elec-dark p-4 rounded-lg border border-gray-600">
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-red-900/30 rounded border-l-4 border-red-500">
                <Badge variant="outline" className="bg-red-500 text-foreground">1</Badge>
                <span className="text-foreground">Turn off AC isolator at inverter</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-red-900/30 rounded border-l-4 border-red-500">
                <Badge variant="outline" className="bg-red-500 text-foreground">2</Badge>
                <span className="text-foreground">Switch off main AC isolator</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-yellow-900/30 rounded border-l-4 border-yellow-500">
                <Badge variant="outline" className="bg-yellow-500 text-black">3</Badge>
                <span className="text-foreground">Open all DC isolators in sequence</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-yellow-900/30 rounded border-l-4 border-yellow-500">
                <Badge variant="outline" className="bg-yellow-500 text-black">4</Badge>
                <span className="text-foreground">Wait for inverter capacitor discharge (5 mins)</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-blue-900/30 rounded border-l-4 border-blue-500">
                <Badge variant="outline" className="bg-blue-500 text-foreground">5</Badge>
                <span className="text-foreground">Test voltage at work location with approved tester</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-green-900/30 rounded border-l-4 border-green-500">
                <Badge variant="outline" className="bg-green-500 text-foreground">6</Badge>
                <span className="text-foreground">Apply locks and warning notices</span>
              </div>
            </div>
          </div>
        </div>

        {/* PPE Requirements */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Shield className="h-5 w-5" />
            PPE Requirements by Voltage Level
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-elec-dark p-4 rounded-lg border border-gray-600">
              <h4 className="font-semibold text-elec-yellow mb-3">Low Voltage DC (&lt;120V)</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>✓ Safety glasses with side protection</li>
                <li>✓ Insulated gloves (Class 0, 1000V)</li>
                <li>✓ Non-conductive footwear</li>
                <li>✓ Flame-resistant clothing</li>
                <li>✓ Hard hat with chin strap</li>
                <li>✓ Insulated tools (1000V rated)</li>
              </ul>
            </div>
            <div className="bg-elec-dark p-4 rounded-lg border border-gray-600">
              <h4 className="font-semibold text-elec-yellow mb-3">High Voltage DC (&gt;120V)</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>✓ Arc-rated face shield</li>
                <li>✓ Insulated gloves (Class 1, 7500V)</li>
                <li>✓ Leather protector gloves</li>
                <li>✓ Arc-rated suit (8+ cal/cm²)</li>
                <li>✓ Insulated mat or blanket</li>
                <li>✓ Hot stick for HV operations</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Emergency Response Plans */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Emergency Response Procedures
          </h3>
          <div className="space-y-4">
            <div className="bg-elec-dark p-4 rounded-lg border border-gray-600">
              <h4 className="font-semibold text-elec-yellow mb-3">Electrical Shock Response</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-foreground font-medium mb-2">Immediate Actions:</p>
                  <ol className="space-y-1 text-sm text-gray-300">
                    <li>1. DO NOT touch the victim</li>
                    <li>2. Switch off power at source</li>
                    <li>3. Use insulated tool to separate</li>
                    <li>4. Call emergency services (999)</li>
                    <li>5. Begin first aid if qualified</li>
                  </ol>
                </div>
                <div>
                  <p className="text-foreground font-medium mb-2">Emergency Contacts:</p>
                  <div className="space-y-1 text-sm text-gray-300">
                    <p>Emergency Services: <span className="text-elec-yellow">999</span></p>
                    <p>Site Safety Officer: <span className="text-elec-yellow">_______</span></p>
                    <p>Local Hospital: <span className="text-elec-yellow">_______</span></p>
                    <p>Client Contact: <span className="text-elec-yellow">_______</span></p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-elec-dark p-4 rounded-lg border border-gray-600">
              <h4 className="font-semibold text-elec-yellow mb-3">Fire Emergency Response</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-foreground font-medium mb-2">DC Fire Suppression:</p>
                  <ul className="space-y-1 text-sm text-gray-300">
                    <li>• Class C (CO₂) extinguisher for DC systems</li>
                    <li>• Never use water on live DC circuits</li>
                    <li>• Isolate at source if safe to do so</li>
                    <li>• Clear 10m exclusion zone</li>
                    <li>• Inform fire service of DC hazard</li>
                  </ul>
                </div>
                <div>
                  <p className="text-foreground font-medium mb-2">Evacuation Procedure:</p>
                  <ul className="space-y-1 text-sm text-gray-300">
                    <li>• Sound alarm/raise alert</li>
                    <li>• Evacuate non-essential personnel</li>
                    <li>• Account for all personnel</li>
                    <li>• Meet at designated assembly point</li>
                    <li>• Brief emergency services on arrival</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Risk Assessment Templates */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Risk Assessment Templates
          </h3>
          <div className="bg-elec-dark p-4 rounded-lg border border-gray-600">
            <h4 className="font-semibold text-elec-yellow mb-3">PV System Risk Assessment Matrix</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-600">
                    <th className="text-left p-2 text-elec-yellow">Hazard</th>
                    <th className="text-left p-2 text-elec-yellow">Risk Level</th>
                    <th className="text-left p-2 text-elec-yellow">Control Measures</th>
                    <th className="text-left p-2 text-elec-yellow">Residual Risk</th>
                  </tr>
                </thead>
                <tbody className="text-gray-300">
                  <tr className="border-b border-gray-700">
                    <td className="p-2">DC Electric Shock</td>
                    <td className="p-2"><Badge className="bg-red-500">High</Badge></td>
                    <td className="p-2">Isolation, PPE, Testing</td>
                    <td className="p-2"><Badge className="bg-yellow-500 text-black">Medium</Badge></td>
                  </tr>
                  <tr className="border-b border-gray-700">
                    <td className="p-2">Arc Flash</td>
                    <td className="p-2"><Badge className="bg-red-500">High</Badge></td>
                    <td className="p-2">Arc-rated PPE, Procedures</td>
                    <td className="p-2"><Badge className="bg-green-500">Low</Badge></td>
                  </tr>
                  <tr className="border-b border-gray-700">
                    <td className="p-2">Working at Height</td>
                    <td className="p-2"><Badge className="bg-red-500">High</Badge></td>
                    <td className="p-2">Harness, Training, Weather</td>
                    <td className="p-2"><Badge className="bg-yellow-500 text-black">Medium</Badge></td>
                  </tr>
                  <tr className="border-b border-gray-700">
                    <td className="p-2">Manual Handling</td>
                    <td className="p-2"><Badge className="bg-yellow-500 text-black">Medium</Badge></td>
                    <td className="p-2">Lifting aids, Team lifting</td>
                    <td className="p-2"><Badge className="bg-green-500">Low</Badge></td>
                  </tr>
                  <tr>
                    <td className="p-2">Weather Exposure</td>
                    <td className="p-2"><Badge className="bg-yellow-500 text-black">Medium</Badge></td>
                    <td className="p-2">Weather monitoring, Shelter</td>
                    <td className="p-2"><Badge className="bg-green-500">Low</Badge></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Safety Checklists */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            Daily Safety Checklists
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-elec-dark p-4 rounded-lg border border-gray-600">
              <h4 className="font-semibold text-elec-yellow mb-3">Pre-Work Safety Check</h4>
              <div className="space-y-2 text-sm text-gray-300">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="text-elec-yellow" />
                  <span>Weather conditions assessed</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="text-elec-yellow" />
                  <span>PPE inspected and available</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="text-elec-yellow" />
                  <span>Test equipment calibrated</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="text-elec-yellow" />
                  <span>Emergency contacts confirmed</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="text-elec-yellow" />
                  <span>Isolation devices identified</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="text-elec-yellow" />
                  <span>Work area hazards assessed</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="text-elec-yellow" />
                  <span>Competent person designated</span>
                </label>
              </div>
            </div>
            <div className="bg-elec-dark p-4 rounded-lg border border-gray-600">
              <h4 className="font-semibold text-elec-yellow mb-3">Post-Work Safety Check</h4>
              <div className="space-y-2 text-sm text-gray-300">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="text-elec-yellow" />
                  <span>All isolators restored</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="text-elec-yellow" />
                  <span>Warning notices removed</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="text-elec-yellow" />
                  <span>Tools and equipment accounted for</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="text-elec-yellow" />
                  <span>Work area cleaned and secured</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="text-elec-yellow" />
                  <span>System functionality verified</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="text-elec-yellow" />
                  <span>Documentation completed</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="text-elec-yellow" />
                  <span>Client/supervisor notified</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Training Requirements */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Users className="h-5 w-5" />
            Competency & Training Requirements
          </h3>
          <div className="bg-elec-dark p-4 rounded-lg border border-gray-600">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <h4 className="font-semibold text-elec-yellow mb-2">Essential Training</h4>
                <ul className="space-y-1 text-sm text-gray-300">
                  <li>• 18th Edition BS 7671</li>
                  <li>• PV system design</li>
                  <li>• MCS installation standards</li>
                  <li>• First aid certification</li>
                  <li>• Working at height</li>
                  <li>• Manual handling</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-elec-yellow mb-2">Annual Refresher</h4>
                <ul className="space-y-1 text-sm text-gray-300">
                  <li>• Safety procedures update</li>
                  <li>• New technology training</li>
                  <li>• Emergency response drill</li>
                  <li>• Equipment updates</li>
                  <li>• Regulation changes</li>
                  <li>• Incident case studies</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-elec-yellow mb-2">Documentation</h4>
                <ul className="space-y-1 text-sm text-gray-300">
                  <li>• Training certificates</li>
                  <li>• Competency assessments</li>
                  <li>• CPD records</li>
                  <li>• Medical fitness</li>
                  <li>• Site inductions</li>
                  <li>• Tool box talks</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SafetyIsolationPractical;