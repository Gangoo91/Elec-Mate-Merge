import { Battery, Zap, Lightbulb, Timer, Settings2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const EmergencyLightingContent3 = () => {
  return (
    <div className="space-y-6">
      {/* System Power Supply Types */}
      <Card className="bg-elec-gray border-gray-600 shadow-lg">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Battery className="h-5 w-5 text-green-400 drop-shadow-md" />
            System Power Supply Types
          </CardTitle>
        </CardHeader>
        <CardContent className="text-gray-300 space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="text-green-300 font-semibold">Central Battery Systems</h4>
              <p className="text-sm">
                Centralised power supply serving multiple luminaires throughout the building. Batteries are housed in a dedicated plant room or service area.
              </p>
              <div className="bg-green-500/10 p-3 rounded border-l-2 border-green-500">
                <p className="text-green-300 font-medium text-sm">Advantages:</p>
                <ul className="text-sm mt-1 space-y-1">
                  <li>• Centralised maintenance and monitoring</li>
                  <li>• Longer battery life (typically 10-25 years)</li>
                  <li>• Better for large installations</li>
                  <li>• Reduced fire load in occupied areas</li>
                </ul>
              </div>
            </div>
            <div className="space-y-3">
              <h4 className="text-blue-300 font-semibold">Self-Contained Systems</h4>
              <p className="text-sm">
                Each luminaire contains its own battery, charger, and control gear. No central power supply required.
              </p>
              <div className="bg-blue-500/10 p-3 rounded border-l-2 border-blue-500">
                <p className="text-blue-300 font-medium text-sm">Advantages:</p>
                <ul className="text-sm mt-1 space-y-1">
                  <li>• Simple installation and commissioning</li>
                  <li>• Lower initial capital cost</li>
                  <li>• Suitable for smaller installations</li>
                  <li>• Individual luminaire control</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Operating Modes */}
      <Card className="bg-elec-gray border-gray-600 shadow-lg">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Zap className="h-5 w-5 text-amber-400 drop-shadow-md" />
            Operating Modes
          </CardTitle>
        </CardHeader>
        <CardContent className="text-gray-300 space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 bg-gradient-to-br from-amber-600/20 to-orange-800/10 border border-amber-500/40 rounded-lg">
              <h4 className="text-amber-300 font-semibold mb-2">Non-Maintained</h4>
              <p className="text-sm mb-2">
                Luminaires operate only during mains failure. Most common type for general applications.
              </p>
              <div className="text-xs text-amber-200">
                <p>• Activates on mains failure</p>
                <p>• Lower energy consumption</p>
                <p>• Suitable for most escape routes</p>
              </div>
            </div>
            <div className="p-4 bg-gradient-to-br from-green-600/20 to-green-800/10 border border-green-500/40 rounded-lg">
              <h4 className="text-green-300 font-semibold mb-2">Maintained</h4>
              <p className="text-sm mb-2">
                Luminaires operate continuously, switching to emergency supply during mains failure.
              </p>
              <div className="text-xs text-green-200">
                <p>• Continuous operation</p>
                <p>• Required in cinemas, theatres</p>
                <p>• Higher energy consumption</p>
              </div>
            </div>
            <div className="p-4 bg-gradient-to-br from-purple-600/20 to-purple-800/10 border border-purple-500/40 rounded-lg">
              <h4 className="text-purple-300 font-semibold mb-2">Sustained</h4>
              <p className="text-sm mb-2">
                Combination system operating in maintained mode but capable of emergency operation.
              </p>
              <div className="text-xs text-purple-200">
                <p>• Dual functionality</p>
                <p>• Complex control systems</p>
                <p>• Specialised applications</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Luminaire Types */}
      <Card className="bg-elec-gray border-gray-600 shadow-lg">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-blue-400 drop-shadow-md" />
            Luminaire Types and Applications
          </CardTitle>
        </CardHeader>
        <CardContent className="text-gray-300 space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="text-blue-300 font-semibold">Escape Route Lighting</h4>
              <div className="space-y-2 text-sm">
                <p><strong>Bulkhead Luminaires:</strong> Robust, vandal-resistant units for corridors and stairwells</p>
                <p><strong>Recessed Luminaires:</strong> Ceiling-mounted units providing uniform light distribution</p>
                <p><strong>Emergency Downlights:</strong> Integrated LED units with emergency battery backup</p>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="text-purple-300 font-semibold">Exit and Safety Signs</h4>
              <div className="space-y-2 text-sm">
                <p><strong>Exit Signs:</strong> Internally illuminated directional indicators</p>
                <p><strong>Pictogram Signs:</strong> Universal symbols for fire exits and safety equipment</p>
                <p><strong>Combination Units:</strong> Combined lighting and signage in single unit</p>
              </div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <div className="space-y-4">
              <h4 className="text-green-300 font-semibold">Open Area Lighting</h4>
              <div className="space-y-2 text-sm">
                <p><strong>High Bay Units:</strong> For warehouses and large open spaces</p>
                <p><strong>Floodlights:</strong> Wide-area coverage for assembly points</p>
                <p><strong>Linear Luminaires:</strong> Continuous lighting strips for large areas</p>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="text-amber-300 font-semibold">High-Risk Task Lighting</h4>
              <div className="space-y-2 text-sm">
                <p><strong>Task-Specific Units:</strong> Focused lighting for critical operations</p>
                <p><strong>Hazardous Area Luminaires:</strong> ATEX-rated units for explosive atmospheres</p>
                <p><strong>Emergency Spotlights:</strong> Directional lighting for equipment shutdown</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Battery Technologies */}
      <Card className="bg-elec-gray border-gray-600 shadow-lg">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Timer className="h-5 w-5 text-teal-400 drop-shadow-md" />
            Battery Technologies and Duration
          </CardTitle>
        </CardHeader>
        <CardContent className="text-gray-300 space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 bg-gradient-to-br from-teal-600/20 to-teal-800/10 border border-teal-500/40 rounded-lg">
              <h4 className="text-teal-300 font-semibold mb-2">Nickel Cadmium (NiCd)</h4>
              <div className="text-sm space-y-1">
                <p>• Life: 10-15 years</p>
                <p>• Temperature range: -20°C to +60°C</p>
                <p>• High discharge rates</p>
                <p>• Reliable but toxic materials</p>
              </div>
            </div>
            <div className="p-4 bg-gradient-to-br from-blue-600/20 to-blue-800/10 border border-blue-500/40 rounded-lg">
              <h4 className="text-blue-300 font-semibold mb-2">Lithium Iron Phosphate</h4>
              <div className="text-sm space-y-1">
                <p>• Life: 10-20 years</p>
                <p>• Lightweight and compact</p>
                <p>• Fast charging capability</p>
                <p>• Environmentally friendly</p>
              </div>
            </div>
            <div className="p-4 bg-gradient-to-br from-purple-600/20 to-purple-800/10 border border-purple-500/40 rounded-lg">
              <h4 className="text-purple-300 font-semibold mb-2">Lead Acid (VRLA)</h4>
              <div className="text-sm space-y-1">
                <p>• Life: 3-5 years</p>
                <p>• Low initial cost</p>
                <p>• Proven technology</p>
                <p>• Requires regular maintenance</p>
              </div>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-gradient-to-r from-amber-600/20 to-orange-600/20 border border-amber-500/40 rounded-lg">
            <h4 className="text-amber-300 font-semibold mb-2">Duration Requirements</h4>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-medium text-amber-200 mb-1">Standard Duration:</p>
                <p>• 1 hour minimum for most applications</p>
                <p>• 3 hours for places of entertainment</p>
                <p>• 2 hours for sleeping accommodation</p>
              </div>
              <div>
                <p className="font-medium text-amber-200 mb-1">Extended Duration:</p>
                <p>• High-risk processes may require longer</p>
                <p>• Consider evacuation time requirements</p>
                <p>• Account for delayed fire service response</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* System Selection Guide */}
      <Card className="bg-elec-gray border-gray-600 shadow-lg">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Settings2 className="h-5 w-5 text-indigo-400 drop-shadow-md" />
            System Selection Guide
          </CardTitle>
        </CardHeader>
        <CardContent className="text-gray-300 space-y-4">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-600">
                  <th className="text-left p-3 text-indigo-300">Building Type</th>
                  <th className="text-left p-3 text-indigo-300">Recommended System</th>
                  <th className="text-left p-3 text-indigo-300">Typical Mode</th>
                  <th className="text-left p-3 text-indigo-300">Key Considerations</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-600">
                <tr>
                  <td className="p-3">Small Offices (&lt;500m²)</td>
                  <td className="p-3">Self-contained</td>
                  <td className="p-3">Non-maintained</td>
                  <td className="p-3">Cost-effective, simple maintenance</td>
                </tr>
                <tr>
                  <td className="p-3">Large Commercial</td>
                  <td className="p-3">Central battery</td>
                  <td className="p-3">Non-maintained</td>
                  <td className="p-3">Centralised monitoring, easier testing</td>
                </tr>
                <tr>
                  <td className="p-3">Healthcare Facilities</td>
                  <td className="p-3">Central battery</td>
                  <td className="p-3">Maintained/Non-maintained</td>
                  <td className="p-3">High reliability, extended duration</td>
                </tr>
                <tr>
                  <td className="p-3">Entertainment Venues</td>
                  <td className="p-3">Mixed systems</td>
                  <td className="p-3">Maintained</td>
                  <td className="p-3">Complex lighting control, 3-hour duration</td>
                </tr>
                <tr>
                  <td className="p-3">Industrial/Hazardous</td>
                  <td className="p-3">Specialised systems</td>
                  <td className="p-3">Task-specific</td>
                  <td className="p-3">ATEX compliance, process shutdown lighting</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};