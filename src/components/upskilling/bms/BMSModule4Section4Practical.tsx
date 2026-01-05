import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wrench, AlertTriangle, CheckCircle2 } from 'lucide-react';

export const BMSModule4Section4Practical = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Wrench className="h-5 w-5 text-elec-yellow" />
          Practical Guidance
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-6">
        
        {/* Installing Motorised Blinds and Louvers */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-elec-yellow">Installing Motorised Blinds and Louvers</h3>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-gray-800 rounded-lg">
                <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold mb-1">Power Supply Verification</h4>
                  <p className="text-sm text-gray-300">Confirm motors are rated for correct voltage and current. Use dedicated relays or contactors for high-power installations.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-3 bg-gray-800 rounded-lg">
                <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold mb-1">Cable Segregation</h4>
                  <p className="text-sm text-gray-300">Keep motor cabling separate from control cabling to avoid electromagnetic interference.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-3 bg-gray-800 rounded-lg">
                <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold mb-1">End-Stop Protection</h4>
                  <p className="text-sm text-gray-300">Ensure motors stop automatically when blinds reach full open/close positions to prevent damage.</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-gray-800 rounded-lg">
                <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold mb-1">Circuit Documentation</h4>
                  <p className="text-sm text-gray-300">Label each blind or façade zone clearly for commissioning and maintenance access.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-3 bg-gray-800 rounded-lg">
                <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold mb-1">Load Calculations</h4>
                  <p className="text-sm text-gray-300">Account for wind loading and motor inrush current when sizing protection devices.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sensor and Control Integration */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-elec-yellow">Sensor and Control Integration</h3>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-600 text-sm">
              <thead>
                <tr className="bg-gray-800">
                  <th className="border border-gray-600 px-4 py-3 text-left font-semibold">Installation Task</th>
                  <th className="border border-gray-600 px-4 py-3 text-left font-semibold">Specification</th>
                  <th className="border border-gray-600 px-4 py-3 text-left font-semibold">Best Practice</th>
                  <th className="border border-gray-600 px-4 py-3 text-left font-semibold">Common Issues</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-600 px-4 py-2"><strong>Solar Sensor Positioning</strong></td>
                  <td className="border border-gray-600 px-4 py-2">Average daylight conditions</td>
                  <td className="border border-gray-600 px-4 py-2">Avoid reflections and shadows</td>
                  <td className="border border-gray-600 px-4 py-2">False readings from adjacent surfaces</td>
                </tr>
                <tr className="bg-gray-800/50">
                  <td className="border border-gray-600 px-4 py-2"><strong>Control Wiring</strong></td>
                  <td className="border border-gray-600 px-4 py-2">0-10V analog inputs to BMS</td>
                  <td className="border border-gray-600 px-4 py-2">Use screened cable</td>
                  <td className="border border-gray-600 px-4 py-2">Signal interference from power cables</td>
                </tr>
                <tr>
                  <td className="border border-gray-600 px-4 py-2"><strong>Movement Programming</strong></td>
                  <td className="border border-gray-600 px-4 py-2">Gradual blind adjustment</td>
                  <td className="border border-gray-600 px-4 py-2">Slow, smooth operation</td>
                  <td className="border border-gray-600 px-4 py-2">Jerky movement disturbs occupants</td>
                </tr>
                <tr className="bg-gray-800/50">
                  <td className="border border-gray-600 px-4 py-2"><strong>Lighting Coordination</strong></td>
                  <td className="border border-gray-600 px-4 py-2">Daylight harvesting integration</td>
                  <td className="border border-gray-600 px-4 py-2">Test all operating modes</td>
                  <td className="border border-gray-600 px-4 py-2">Conflicting control strategies</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Motor and Control Specifications */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-elec-yellow">Motor and Control Specifications</h3>
          
          <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <div className="bg-gray-800 rounded-lg p-4">
              <h5 className="font-semibold mb-3 text-foreground">Tubular Motors (Blinds)</h5>
              <div className="space-y-2 text-sm text-gray-300">
                <p><strong>Power:</strong> 24V DC, 0.5-2A</p>
                <p><strong>Control:</strong> Up/Down/Stop signals</p>
                <p><strong>Feedback:</strong> Position monitoring available</p>
                <p><strong>Installation:</strong> Built into blind tube</p>
                <p><strong>Protection:</strong> Thermal overload, end-stops</p>
                <p><strong>Lifespan:</strong> 10,000+ cycles typical</p>
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-4">
              <h5 className="font-semibold mb-3 text-foreground">Louver Motors (External)</h5>
              <div className="space-y-2 text-sm text-gray-300">
                <p><strong>Power:</strong> 230V AC, 1-5A</p>
                <p><strong>Control:</strong> Variable speed drives</p>
                <p><strong>Weather Rating:</strong> IP65 minimum</p>
                <p><strong>Wind Loading:</strong> Designed for external forces</p>
                <p><strong>Emergency:</strong> Manual override capability</p>
                <p><strong>Maintenance:</strong> Annual lubrication required</p>
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-4">
              <h5 className="font-semibold mb-3 text-foreground">Smart Glass Controllers</h5>
              <div className="space-y-2 text-sm text-gray-300">
                <p><strong>Power:</strong> 0-5V DC control</p>
                <p><strong>Response:</strong> 5-20 minute transitions</p>
                <p><strong>Control:</strong> Gradual transparency change</p>
                <p><strong>Power Consumption:</strong> Minimal when stable</p>
                <p><strong>Backup:</strong> Manual clear state on failure</p>
                <p><strong>Longevity:</strong> 15+ year design life</p>
              </div>
            </div>
          </div>
        </div>

        {/* Safety and Maintenance */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-elec-yellow">Safety and Maintenance Requirements</h3>
          
          <div className="grid md:grid-cols-1 gap-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-4 bg-green-900/30 rounded-lg border border-green-600/40">
                <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold mb-2 text-green-400">Local Override Systems</h4>
                  <p className="text-sm text-gray-300">Provide local override switches for occupants, but integrate with BMS to prevent permanent overrides that compromise energy strategies.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-4 bg-red-900/30 rounded-lg border border-red-600/40">
                <AlertTriangle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold mb-2 text-red-400">Fire Safety Integration</h4>
                  <p className="text-sm text-gray-300">Blinds and louvers must integrate with fire alarms. Shading systems should move to safe positions for evacuation or smoke extraction when required.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-4 bg-blue-900/30 rounded-lg border border-blue-600/40">
                <CheckCircle2 className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold mb-2 text-blue-400">Maintenance Access</h4>
                  <p className="text-sm text-gray-300">Keep access panels and control points clear for maintenance teams. Provide service documentation and spare part specifications.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-4 bg-yellow-900/30 rounded-lg border border-yellow-600/40">
                <AlertTriangle className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold mb-2 text-yellow-400">Weather Protection</h4>
                  <p className="text-sm text-gray-300">Install wind sensors and rain detection. Automatic storm positioning prevents damage to external shading systems during severe weather.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};