import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ToggleLeft } from 'lucide-react';

export const SmartSwitchSystemsSection = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <ToggleLeft className="h-5 w-5 text-elec-yellow" />
          Smart Switch Systems
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-6">
        <div className="bg-elec-dark p-4 rounded-lg">
          <p className="text-lg leading-relaxed mb-4">
            Smart switches replace traditional wall switches with intelligent alternatives that control entire lighting circuits. This approach maximises cost efficiency while maintaining familiar operation patterns.
          </p>
          <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-3">
            <p className="text-elec-yellow font-medium text-sm">
              ⚡ Electrical Knowledge Required: Smart switch installation involves live wiring and must comply with Part P Building Regulations in England & Wales.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-semibold text-elec-yellow">Technical Requirements Analysis</h4>
          
          <div className="grid gap-4">
            <div className="p-4 bg-blue-600/10 border-l-4 border-blue-500 rounded-lg">
              <h5 className="font-semibold text-blue-200 mb-3">Wiring Compatibility Check</h5>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-blue-100 font-medium mb-2">Standard Requirements:</p>
                  <ul className="text-blue-100 space-y-1">
                    <li>• <strong>Line (L):</strong> Always present - switched live</li>
                    <li>• <strong>Neutral (N):</strong> Required for most smart switches</li>
                    <li>• <strong>Earth (E):</strong> Required for safety</li>
                    <li>• <strong>Switched Line (SL):</strong> To light fitting</li>
                  </ul>
                </div>
                <div>
                  <p className="text-blue-100 font-medium mb-2">Common Issues:</p>
                  <ul className="text-blue-100 space-y-1">
                    <li>• Older homes may lack neutral at switch</li>
                    <li>• 2-way switching complicates wiring</li>
                    <li>• Metal switch boxes need earthing</li>
                    <li>• Dimmer compatibility with LED loads</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-4 bg-purple-600/10 border-l-4 border-purple-500 rounded-lg">
              <h5 className="font-semibold text-purple-200 mb-3">Load Compatibility Matrix</h5>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-600">
                      <th className="text-left p-2">Load Type</th>
                      <th className="text-left p-2">Min Load</th>
                      <th className="text-left p-2">Max Load</th>
                      <th className="text-left p-2">Dimmer Compatible</th>
                      <th className="text-left p-2">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-700">
                      <td className="p-2">LED Bulbs</td>
                      <td className="p-2">3W</td>
                      <td className="p-2">300W</td>
                      <td className="p-2 text-yellow-400">Check specs</td>
                      <td className="p-2">Must be dimmable LEDs</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="p-2">CFL Bulbs</td>
                      <td className="p-2">5W</td>
                      <td className="p-2">200W</td>
                      <td className="p-2 text-red-400">Rarely</td>
                      <td className="p-2">Phase out recommended</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="p-2">Halogen</td>
                      <td className="p-2">10W</td>
                      <td className="p-2">400W</td>
                      <td className="p-2 text-green-400">Yes</td>
                      <td className="p-2">High power consumption</td>
                    </tr>
                    <tr>
                      <td className="p-2">LED Strip</td>
                      <td className="p-2">1W</td>
                      <td className="p-2">100W</td>
                      <td className="p-2 text-green-400">With driver</td>
                      <td className="p-2">Requires compatible driver</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <h4 className="font-semibold text-elec-yellow">Installation Process & Compliance</h4>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-green-600/10 border-l-4 border-green-500 rounded-lg">
              <h5 className="font-semibold text-green-200 mb-3">Step-by-Step Installation</h5>
              <ol className="text-sm text-green-100 space-y-2 list-decimal list-inside">
                <li><strong>Safety first:</strong> Isolate circuit at consumer unit</li>
                <li><strong>Test dead:</strong> Use proper voltage indicator</li>
                <li><strong>Remove old switch:</strong> Note wire positions</li>
                <li><strong>Check wiring:</strong> Confirm neutral availability</li>
                <li><strong>Install new switch:</strong> Follow manufacturer wiring</li>
                <li><strong>Test functionality:</strong> Local and app control</li>
                <li><strong>Commission system:</strong> Add to network/scenes</li>
              </ol>
            </div>
            <div className="p-4 bg-red-600/10 border-l-4 border-red-500 rounded-lg">
              <h5 className="font-semibold text-red-200 mb-3">Regulatory Compliance</h5>
              <div className="text-sm text-red-100 space-y-2">
                <p><strong>Part P (Building Regs):</strong> Notifiable if new circuits; minor works for switch replacement</p>
                <p><strong>BS7671 (18th Edition):</strong> Must comply with current wiring regulations</p>
                <p><strong>Competent Person:</strong> Work should be carried out by qualified electrician</p>
                <p><strong>Testing:</strong> Insulation resistance and earth continuity tests required</p>
              </div>
            </div>
          </div>

          <div className="bg-orange-600/10 border border-orange-600/20 rounded-lg p-4">
            <h5 className="text-orange-200 font-medium mb-3">🏠 Real-World Cost Comparison</h5>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-orange-100 font-medium mb-2">Lounge (6 bulbs):</p>
                <p className="text-orange-100">Smart bulbs: £270-540</p>
                <p className="text-orange-200"><strong>Smart switch: £60-80</strong></p>
                <p className="text-green-400 text-xs">85% cost saving</p>
              </div>
              <div>
                <p className="text-orange-100 font-medium mb-2">Kitchen (8 bulbs):</p>
                <p className="text-orange-100">Smart bulbs: £360-720</p>
                <p className="text-orange-200"><strong>Smart switch: £70-90</strong></p>
                <p className="text-green-400 text-xs">88% cost saving</p>
              </div>
              <div>
                <p className="text-orange-100 font-medium mb-2">Whole house (25 bulbs):</p>
                <p className="text-orange-100">Smart bulbs: £1,125-2,250</p>
                <p className="text-orange-200"><strong>Smart switches: £400-600</strong></p>
                <p className="text-green-400 text-xs">75% cost saving</p>
              </div>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="p-4 bg-green-600/10 border border-green-600/20 rounded-lg">
              <h5 className="font-semibold text-green-200 mb-2">✓ Optimal Use Cases</h5>
              <ul className="text-sm text-green-100 space-y-1">
                <li>• <strong>Multiple bulbs per circuit:</strong> 3+ bulbs make switches cost-effective</li>
                <li>• <strong>Standard LED fittings:</strong> No need for individual bulb intelligence</li>
                <li>• <strong>Permanent installation:</strong> Own property with long-term plans</li>
                <li>• <strong>Familiar operation:</strong> Wall switches work normally for guests</li>
                <li>• <strong>Whole-room scenes:</strong> All lights dimmed/coloured together</li>
              </ul>
            </div>
            <div className="p-4 bg-red-600/10 border border-red-600/20 rounded-lg">
              <h5 className="font-semibold text-red-200 mb-2">✗ Limitations to Consider</h5>
              <ul className="text-sm text-red-100 space-y-1">
                <li>• <strong>Individual control:</strong> Cannot address bulbs separately</li>
                <li>• <strong>Colour mixing:</strong> All bulbs show same colour</li>
                <li>• <strong>Installation complexity:</strong> Requires electrical skills</li>
                <li>• <strong>Wiring constraints:</strong> Limited by existing switch positions</li>
                <li>• <strong>Tenant restrictions:</strong> Cannot install in rental properties</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};