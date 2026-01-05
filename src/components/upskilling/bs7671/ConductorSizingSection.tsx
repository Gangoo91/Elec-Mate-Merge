import { Zap, Thermometer } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const ConductorSizingSection = () => {
  return (
    <Card className="bg-gradient-to-r from-green-900/20 to-elec-gray border-green-600/30">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Zap className="h-6 w-6 text-elec-yellow" />
          Conductor Sizing and Current-Carrying Capacity
        </CardTitle>
        <Badge variant="secondary" className="w-fit bg-green-600 text-foreground">Design Fundamentals</Badge>
      </CardHeader>
      <CardContent className="text-foreground space-y-6">
        <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
          <h5 className="text-elec-yellow font-semibold mb-3">Systematic Conductor Selection Process:</h5>
          <div className="grid gap-4">
            <div className="bg-gray-800 p-3 rounded border-l-4 border-blue-400">
              <h6 className="font-bold text-blue-400 mb-2">Step 1: Design Current (Ib)</h6>
              <p className="text-sm mb-2">Determine the design current based on the load to be served, including diversity factors where applicable.</p>
              <div className="text-xs bg-gray-900 p-2 rounded font-mono">
                Ib = Load current × Diversity factor
              </div>
            </div>
            
            <div className="bg-gray-800 p-3 rounded border-l-4 border-green-400">
              <h6 className="font-bold text-green-400 mb-2">Step 2: Protective Device Rating (In)</h6>
              <p className="text-sm mb-2">Select protective device such that In ≥ Ib and coordinate with circuit requirements.</p>
              <div className="text-xs bg-gray-900 p-2 rounded font-mono">
                In ≥ Ib (and In ≤ Iz when applicable)
              </div>
            </div>
            
            <div className="bg-gray-800 p-3 rounded border-l-4 border-yellow-400">
              <h6 className="font-bold text-yellow-400 mb-2">Step 3: Installation Method</h6>
              <p className="text-sm mb-2">Identify installation method from Table 4A2 based on cable route and support systems.</p>
              <ul className="text-xs space-y-1">
                <li>• Method A1/A2: Enclosed in conduit in thermally insulated wall</li>
                <li>• Method B1/B2: Enclosed in conduit on wall or in trunking</li>
                <li>• Method C: Direct in ground or in ducts</li>
                <li>• Method E: In free air</li>
              </ul>
            </div>
            
            <div className="bg-gray-800 p-3 rounded border-l-4 border-purple-400">
              <h6 className="font-bold text-purple-400 mb-2">Step 4: Correction Factors</h6>
              <p className="text-sm mb-2">Apply relevant correction factors for installation conditions.</p>
              <div className="text-xs bg-gray-900 p-2 rounded font-mono">
                It = In / (Ca × Cg × Ci × Cr × Cf)
              </div>
            </div>
          </div>
        </div>

        <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
          <h5 className="text-elec-yellow font-semibold mb-3">Detailed Correction Factors:</h5>
          
          <div className="grid gap-4 md:hidden">
            <div className="bg-gray-800 p-3 rounded border-l-4 border-red-400">
              <div className="flex justify-between items-center mb-2">
                <h6 className="font-bold text-red-400">Ca - Ambient Temperature</h6>
                <Thermometer className="h-4 w-4 text-red-400" />
              </div>
              <div className="text-sm space-y-1">
                <p><strong>20°C:</strong> 1.15 (cooler conditions)</p>
                <p><strong>30°C:</strong> 1.00 (standard reference)</p>
                <p><strong>40°C:</strong> 0.87 (warmer conditions)</p>
                <p><strong>50°C:</strong> 0.71 (hot environments)</p>
              </div>
            </div>
            
            <div className="bg-gray-800 p-3 rounded border-l-4 border-blue-400">
              <div className="flex justify-between items-center mb-2">
                <h6 className="font-bold text-blue-400">Cg - Grouping Factor</h6>
                <Zap className="h-4 w-4 text-blue-400" />
              </div>
              <div className="text-sm space-y-1">
                <p><strong>2 circuits:</strong> 0.80</p>
                <p><strong>3 circuits:</strong> 0.70</p>
                <p><strong>4-5 circuits:</strong> 0.65</p>
                <p><strong>6-8 circuits:</strong> 0.60</p>
                <p><strong>9+ circuits:</strong> 0.50</p>
              </div>
            </div>
            
            <div className="bg-gray-800 p-3 rounded border-l-4 border-orange-400">
              <div className="flex justify-between items-center mb-2">
                <h6 className="font-bold text-orange-400">Ci - Thermal Insulation</h6>
                <Thermometer className="h-4 w-4 text-orange-400" />
              </div>
              <div className="text-sm space-y-1">
                <p><strong>100mm insulation:</strong> 0.88</p>
                <p><strong>200mm insulation:</strong> 0.78</p>
                <p><strong>300mm insulation:</strong> 0.70</p>
                <p><strong>400mm+ insulation:</strong> 0.63</p>
              </div>
            </div>
          </div>
          
          <div className="hidden md:block overflow-x-auto mt-4">
            <table className="w-full text-sm border border-gray-600">
              <thead>
                <tr className="border-b border-gray-600 bg-gray-800">
                  <th className="text-left py-3 px-4 text-elec-yellow">Factor</th>
                  <th className="text-left py-3 px-4 text-elec-yellow">Condition</th>
                  <th className="text-left py-3 px-4 text-elec-yellow">Value Range</th>
                  <th className="text-left py-3 px-4 text-elec-yellow">Reference Table</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-700">
                  <td className="py-3 px-4">Ca (Ambient)</td>
                  <td className="py-3 px-4">Air temperature around cable</td>
                  <td className="py-3 px-4">0.71 - 1.15</td>
                  <td className="py-3 px-4">4B1 to 4B4</td>
                </tr>
                <tr className="border-b border-gray-700">
                  <td className="py-3 px-4">Cg (Grouping)</td>
                  <td className="py-3 px-4">Number of circuits grouped</td>
                  <td className="py-3 px-4">0.50 - 1.00</td>
                  <td className="py-3 px-4">4C1 to 4C6</td>
                </tr>
                <tr className="border-b border-gray-700">
                  <td className="py-3 px-4">Ci (Insulation)</td>
                  <td className="py-3 px-4">Thermal insulation thickness</td>
                  <td className="py-3 px-4">0.50 - 0.88</td>
                  <td className="py-3 px-4">4D1A to 4D5</td>
                </tr>
                <tr>
                  <td className="py-3 px-4">Cr (Semi-enclosed)</td>
                  <td className="py-3 px-4">Semi-enclosed fuse protection</td>
                  <td className="py-3 px-4">0.725</td>
                  <td className="py-3 px-4">Note in tables</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
          <h5 className="text-elec-yellow font-semibold mb-3">Practical Design Examples:</h5>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h6 className="text-yellow-400 font-medium mb-2">Example 1: Kitchen Ring Circuit</h6>
              <div className="bg-gray-800 p-3 rounded text-sm">
                <p><strong>Load:</strong> 32A ring final circuit</p>
                <p><strong>Protection:</strong> 32A Type B MCB</p>
                <p><strong>Installation:</strong> Method B1 (clipped direct)</p>
                <p><strong>Conditions:</strong> 35°C ambient, 2 circuits grouped</p>
                <p className="mt-2 text-elec-yellow">Calculation:</p>
                <p>It = 32 / (0.94 × 0.80) = 42.6A</p>
                <p><strong>Selected:</strong> 6mm² cable (46A capacity)</p>
              </div>
            </div>
            <div>
              <h6 className="text-yellow-400 font-medium mb-2">Example 2: Lighting Circuit</h6>
              <div className="bg-gray-800 p-3 rounded text-sm">
                <p><strong>Load:</strong> 8A lighting circuit</p>
                <p><strong>Protection:</strong> 10A Type B MCB</p>
                <p><strong>Installation:</strong> Method A1 (in conduit in wall)</p>
                <p><strong>Conditions:</strong> 30°C, 4 circuits, 200mm insulation</p>
                <p className="mt-2 text-elec-yellow">Calculation:</p>
                <p>It = 10 / (1.00 × 0.65 × 0.78) = 19.7A</p>
                <p><strong>Selected:</strong> 2.5mm² cable (23A capacity)</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
          <h5 className="text-elec-yellow font-semibold mb-3">Special Considerations:</h5>
          <div className="space-y-3">
            <div className="bg-gray-800 p-3 rounded border-l-4 border-purple-400">
              <h6 className="font-bold text-purple-400 mb-1">Harmonic Effects</h6>
              <p className="text-sm">For circuits feeding non-linear loads, consider harmonic currents and neutral conductor sizing requirements per Regulation 523.6.3.</p>
            </div>
            <div className="bg-gray-800 p-3 rounded border-l-4 border-green-400">
              <h6 className="font-bold text-green-400 mb-1">Motor Circuits</h6>
              <p className="text-sm">Account for starting currents, coordinate with motor protection, and consider variable frequency drive applications.</p>
            </div>
            <div className="bg-gray-800 p-3 rounded border-l-4 border-blue-400">
              <h6 className="font-bold text-blue-400 mb-1">Future Expansion</h6>
              <p className="text-sm">Consider spare capacity for future loads, especially in domestic installations for EV charging and heat pump additions.</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConductorSizingSection;