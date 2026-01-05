import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Factory } from 'lucide-react';

export const ProsumerInstallationSection = () => {
  return (
    <Card className="bg-gradient-to-r from-green-900/20 to-elec-gray border-green-600/30">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Factory className="h-5 w-5 text-elec-yellow" />
          Prosumer Electrical Installation (PEI) Definition
        </CardTitle>
        <Badge variant="secondary" className="w-fit bg-green-600 text-foreground">BS 7671 Part 8</Badge>
      </CardHeader>
      <CardContent className="text-foreground space-y-4">
        <div className="bg-elec-dark p-4 rounded-md border border-gray-600 mb-4">
          <h5 className="text-elec-yellow font-semibold mb-2">Code Reference: BS 7671:2018+A2:2022 Part 8</h5>
          <p className="text-sm mb-3">
            Revolutionary new part covering prosumer electrical installations - installations that 
            consume and generate energy, fundamentally changing how we approach electrical design.
          </p>
          <div className="bg-gray-800 p-3 rounded border border-gray-600">
            <h6 className="text-yellow-400 font-medium mb-2">Official Definition:</h6>
            <p className="text-sm italic">
              "An electrical installation containing one or more prosumer installations and 
              comprising generating plant and associated equipment for the generation, 
              transformation, rectification, inversion and storage of electrical energy."
            </p>
          </div>
        </div>
        
        <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
          <h5 className="text-elec-yellow font-semibold mb-3">PEI System Components & Integration:</h5>
          
          {/* Mobile-friendly component cards */}
          <div className="grid gap-4 md:hidden">
            <div className="bg-gray-800 p-3 rounded border-l-4 border-blue-400">
              <div className="flex justify-between items-center mb-2">
                <h6 className="font-bold text-blue-400">Solar PV Arrays</h6>
                <span className="text-xs bg-blue-600 text-foreground px-2 py-1 rounded">1kW - 50kW</span>
              </div>
              <p className="text-sm mb-1"><strong>Function:</strong> DC generation from photovoltaic cells</p>
              <p className="text-sm mb-1"><strong>Requirements:</strong> DC isolation, MPP tracking, module-level monitoring</p>
              <p className="text-xs text-gray-400">Typical efficiency: 18-22% for monocrystalline panels</p>
            </div>
            
            <div className="bg-gray-800 p-3 rounded border-l-4 border-green-400">
              <div className="flex justify-between items-center mb-2">
                <h6 className="font-bold text-green-400">Wind Generation</h6>
                <span className="text-xs bg-green-600 text-foreground px-2 py-1 rounded">1kW - 15kW</span>
              </div>
              <p className="text-sm mb-1"><strong>Function:</strong> AC generation from wind energy</p>
              <p className="text-sm mb-1"><strong>Requirements:</strong> Grid synchronisation, dynamic braking systems</p>
              <p className="text-xs text-gray-400">Cut-in wind speed: typically 3-4 m/s</p>
            </div>
            
            <div className="bg-gray-800 p-3 rounded border-l-4 border-orange-400">
              <div className="flex justify-between items-center mb-2">
                <h6 className="font-bold text-orange-400">Battery Storage (BESS)</h6>
                <span className="text-xs bg-orange-600 text-foreground px-2 py-1 rounded">2kWh - 100kWh</span>
              </div>
              <p className="text-sm mb-1"><strong>Function:</strong> Energy storage and grid services</p>
              <p className="text-sm mb-1"><strong>Requirements:</strong> BMS, thermal management, fire suppression</p>
              <p className="text-xs text-gray-400">Lithium-ion: 95%+ round-trip efficiency</p>
            </div>
            
            <div className="bg-gray-800 p-3 rounded border-l-4 border-purple-400">
              <div className="flex justify-between items-center mb-2">
                <h6 className="font-bold text-purple-400">EV Charging & V2G</h6>
                <span className="text-xs bg-purple-600 text-foreground px-2 py-1 rounded">3kW - 22kW</span>
              </div>
              <p className="text-sm mb-1"><strong>Function:</strong> Vehicle charging and vehicle-to-grid services</p>
              <p className="text-sm mb-1"><strong>Requirements:</strong> Bi-directional capability, OCPP compliance</p>
              <p className="text-xs text-gray-400">CHAdeMO or CCS for DC bi-directional</p>
            </div>

            <div className="bg-gray-800 p-3 rounded border-l-4 border-red-400">
              <div className="flex justify-between items-center mb-2">
                <h6 className="font-bold text-red-400">Heat Pumps & Thermal</h6>
                <span className="text-xs bg-red-600 text-foreground px-2 py-1 rounded">3kW - 12kW</span>
              </div>
              <p className="text-sm mb-1"><strong>Function:</strong> Controllable thermal loads with storage</p>
              <p className="text-sm mb-1"><strong>Requirements:</strong> Smart controls, demand response capability</p>
              <p className="text-xs text-gray-400">COP: 3-5 depending on technology and conditions</p>
            </div>
          </div>
          
          {/* Desktop table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-600">
                  <th className="text-left py-2 text-elec-yellow">Component</th>
                  <th className="text-left py-2 text-elec-yellow">Function</th>
                  <th className="text-left py-2 text-elec-yellow">Power Range</th>
                  <th className="text-left py-2 text-elec-yellow">Key Requirements</th>
                  <th className="text-left py-2 text-elec-yellow">Efficiency</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-700">
                  <td className="py-2">Solar PV Arrays</td>
                  <td className="py-2">DC generation</td>
                  <td className="py-2">1kW - 50kW</td>
                  <td className="py-2">DC isolation, MPP tracking</td>
                  <td className="py-2">18-22%</td>
                </tr>
                <tr className="border-b border-gray-700">
                  <td className="py-2">Wind Generation</td>
                  <td className="py-2">AC generation</td>
                  <td className="py-2">1kW - 15kW</td>
                  <td className="py-2">Grid sync, braking</td>
                  <td className="py-2">35-45%</td>
                </tr>
                <tr className="border-b border-gray-700">
                  <td className="py-2">Battery Storage</td>
                  <td className="py-2">Energy storage</td>
                  <td className="py-2">2kWh - 100kWh</td>
                  <td className="py-2">BMS, thermal mgmt</td>
                  <td className="py-2">95%+</td>
                </tr>
                <tr className="border-b border-gray-700">
                  <td className="py-2">EV Charging/V2G</td>
                  <td className="py-2">Load/supply</td>
                  <td className="py-2">3kW - 22kW</td>
                  <td className="py-2">Bi-directional, OCPP</td>
                  <td className="py-2">90-95%</td>
                </tr>
                <tr>
                  <td className="py-2">Heat Pumps</td>
                  <td className="py-2">Thermal load</td>
                  <td className="py-2">3kW - 12kW</td>
                  <td className="py-2">Smart control, DR</td>
                  <td className="py-2">COP 3-5</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
          <h5 className="text-elec-yellow font-semibold mb-3">Installation Classifications & Scope:</h5>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-gray-800 p-3 rounded">
              <h6 className="text-blue-400 font-medium mb-2">Domestic PEI</h6>
              <ul className="text-xs space-y-1">
                <li>• Single-phase up to 16A per phase</li>
                <li>• Solar PV: up to 4kWp per phase</li>
                <li>• Battery storage: up to 13.8kWh</li>
                <li>• Simplified G98 connection</li>
                <li>• EPC impact considerations</li>
              </ul>
            </div>
            <div className="bg-gray-800 p-3 rounded">
              <h6 className="text-green-400 font-medium mb-2">Commercial PEI</h6>
              <ul className="text-xs space-y-1">
                <li>• Three-phase systems</li>
                <li>• Generation: 16A - 50kW</li>
                <li>• Complex energy management</li>
                <li>• G99 fast-track procedures</li>
                <li>• Business rate implications</li>
              </ul>
            </div>
            <div className="bg-gray-800 p-3 rounded">
              <h6 className="text-purple-400 font-medium mb-2">Industrial PEI</h6>
              <ul className="text-xs space-y-1">
                <li>• High voltage connections</li>
                <li>• Generation: &gt;50kW</li>
                <li>• Microgrid capabilities</li>
                <li>• Full G99 application process</li>
                <li>• Grid service provision</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};