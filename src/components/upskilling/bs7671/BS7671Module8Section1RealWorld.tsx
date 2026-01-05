import { Wrench, Home, Building2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const BS7671Module8Section1RealWorld = () => {
  return (
    <Card className="bg-gradient-to-r from-purple-900/20 to-elec-gray border-purple-600/30">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Wrench className="h-6 w-6 text-elec-yellow" />
          Real-World Applications and Case Studies
        </CardTitle>
        <Badge variant="secondary" className="w-fit bg-purple-600 text-foreground">Practical Implementation</Badge>
      </CardHeader>
      <CardContent className="text-foreground space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="bg-elec-dark border-gray-600">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center gap-2">
                <Home className="h-5 w-5 text-elec-yellow" />
                Domestic Installation Case Study
              </CardTitle>
            </CardHeader>
            <CardContent className="text-foreground space-y-4">
              <div className="bg-gray-800 p-3 rounded">
                <h6 className="text-elec-yellow font-semibold mb-2">Project: Complete House Rewire</h6>
                <ul className="text-sm space-y-1">
                  <li>• 4-bedroom detached house, 180m²</li>
                  <li>• 100A main switch, 12-way consumer unit</li>
                  <li>• Mixed lighting: LED downlights and traditional fittings</li>
                  <li>• Kitchen with induction hob and electric oven</li>
                  <li>• Future EV charging provision required</li>
                </ul>
              </div>
              
              <div className="bg-gray-800 p-3 rounded">
                <h6 className="text-elec-yellow font-semibold mb-2">Design Challenges:</h6>
                <ul className="text-sm space-y-1">
                  <li>• Long cable runs to detached garage (45m)</li>
                  <li>• Thermal insulation throughout (300mm loft)</li>
                  <li>• Multiple circuits grouped in ceiling void</li>
                  <li>• Ze measured at 0.35Ω (PME supply)</li>
                </ul>
              </div>
              
              <div className="bg-gray-800 p-3 rounded">
                <h6 className="text-elec-yellow font-semibold mb-2">Solutions Applied:</h6>
                <ul className="text-sm space-y-1">
                  <li>• Kitchen ring: 2.5mm² with 4mm² radial backup</li>
                  <li>• Garage supply: 6mm² SWA, RCD protection</li>
                  <li>• LED circuits: 1.5mm² with careful voltage drop calc</li>
                  <li>• EV provision: 40A Type B MCB with 6mm² cable</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-elec-dark border-gray-600">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center gap-2">
                <Building2 className="h-5 w-5 text-elec-yellow" />
                Commercial Installation Case Study
              </CardTitle>
            </CardHeader>
            <CardContent className="text-foreground space-y-4">
              <div className="bg-gray-800 p-3 rounded">
                <h6 className="text-elec-yellow font-semibold mb-2">Project: Office Refurbishment</h6>
                <ul className="text-sm space-y-1">
                  <li>• 5-storey office building, each floor 400m²</li>
                  <li>• Rising main upgrade to 400A</li>
                  <li>• LED lighting with daylight sensors</li>
                  <li>• Data centre with UPS requirements</li>
                  <li>• Heat pump installation for HVAC</li>
                </ul>
              </div>
              
              <div className="bg-gray-800 p-3 rounded">
                <h6 className="text-elec-yellow font-semibold mb-2">Design Challenges:</h6>
                <ul className="text-sm space-y-1">
                  <li>• High ambient temperature in plant room (45°C)</li>
                  <li>• 50+ circuits per floor distribution</li>
                  <li>• Harmonic distortion from IT equipment</li>
                  <li>• Fire alarm integration with lighting circuits</li>
                </ul>
              </div>
              
              <div className="bg-gray-800 p-3 rounded">
                <h6 className="text-elec-yellow font-semibold mb-2">Solutions Applied:</h6>
                <ul className="text-sm space-y-1">
                  <li>• Ventilated cable routes in plant areas</li>
                  <li>• Neutral sizing for harmonic currents</li>
                  <li>• Sub-distribution every 30m to minimize VD</li>
                  <li>• Type B RCBOs for all final circuits</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
          <h5 className="text-elec-yellow font-semibold mb-3">Common Design Mistakes and How to Avoid Them:</h5>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h6 className="text-red-400 font-medium mb-2">Frequent Errors:</h6>
              <ul className="text-sm space-y-2">
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Ignoring grouping factors when multiple circuits share trunking</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Underestimating thermal insulation effects in modern buildings</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Not accounting for voltage drop in long circuit runs</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Incorrect Zs calculations leading to non-compliance</span>
                </li>
              </ul>
            </div>
            <div>
              <h6 className="text-green-400 font-medium mb-2">Best Practice Solutions:</h6>
              <ul className="text-sm space-y-2">
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Always survey installation routes before calculating</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Use conservative correction factors for future reliability</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Verify all calculations with multiple appendix references</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Test and measure to confirm design calculations</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
          <h5 className="text-elec-yellow font-semibold mb-3">Troubleshooting Guide:</h5>
          <div className="space-y-3">
            <div className="bg-gray-800 p-3 rounded border-l-4 border-yellow-400">
              <h6 className="font-bold text-yellow-400 mb-1">High Zs Reading</h6>
              <p className="text-sm mb-2"><strong>Symptoms:</strong> Test fails, protective devices won't coordinate</p>
              <p className="text-sm"><strong>Solutions:</strong> Check joint quality, verify earth continuity, consider parallel paths, upgrade protective conductors</p>
            </div>
            
            <div className="bg-gray-800 p-3 rounded border-l-4 border-orange-400">
              <h6 className="font-bold text-orange-400 mb-1">Excessive Voltage Drop</h6>
              <p className="text-sm mb-2"><strong>Symptoms:</strong> Poor equipment performance, flickering lights, motor issues</p>
              <p className="text-sm"><strong>Solutions:</strong> Increase cable size, install sub-distribution, reduce circuit length, check connections</p>
            </div>
            
            <div className="bg-gray-800 p-3 rounded border-l-4 border-red-400">
              <h6 className="font-bold text-red-400 mb-1">Cable Overheating</h6>
              <p className="text-sm mb-2"><strong>Symptoms:</strong> Warm cable sheath, insulation deterioration, protective device nuisance tripping</p>
              <p className="text-sm"><strong>Solutions:</strong> Re-check correction factors, improve ventilation, reduce loading, upgrade cable size</p>
            </div>
          </div>
        </div>

        <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
          <h5 className="text-elec-yellow font-semibold mb-3">Modern Installation Trends:</h5>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-gray-800 p-3 rounded">
              <h6 className="font-bold text-blue-400 mb-2">Smart Homes</h6>
              <ul className="text-xs space-y-1">
                <li>• Data cable integration</li>
                <li>• Smart meter compatibility</li>
                <li>• Home automation systems</li>
                <li>• Energy monitoring requirements</li>
              </ul>
            </div>
            <div className="bg-gray-800 p-3 rounded">
              <h6 className="font-bold text-green-400 mb-2">Sustainability</h6>
              <ul className="text-xs space-y-1">
                <li>• Solar PV integration</li>
                <li>• Battery storage systems</li>
                <li>• Heat pump electrical supplies</li>
                <li>• EV charging provisions</li>
              </ul>
            </div>
            <div className="bg-gray-800 p-3 rounded">
              <h6 className="font-bold text-purple-400 mb-2">Future Proofing</h6>
              <ul className="text-xs space-y-1">
                <li>• Spare capacity planning</li>
                <li>• Flexible routing systems</li>
                <li>• Upgradeable infrastructure</li>
                <li>• Digital integration readiness</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BS7671Module8Section1RealWorld;