import { Shield, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const ZsTablesSection = () => {
  return (
    <Card className="bg-gradient-to-r from-red-900/20 to-elec-gray border-red-600/30">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Shield className="h-6 w-6 text-elec-yellow" />
          Earth Fault Loop Impedance (Zs) Tables
        </CardTitle>
        <Badge variant="secondary" className="w-fit bg-red-600 text-foreground">Critical Safety Parameter</Badge>
      </CardHeader>
      <CardContent className="text-foreground space-y-6">
        <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
          <h5 className="text-elec-yellow font-semibold mb-3">Understanding Zs Values and Application:</h5>
          <p className="text-sm mb-4">
            Earth fault loop impedance (Zs) is the total impedance of the earth fault current path, comprising external 
            earth fault loop impedance (Ze) plus circuit protective conductor impedance (R1+R2).
          </p>
          
          <div className="grid gap-4 md:hidden">
            <div className="bg-gray-800 p-3 rounded border-l-4 border-red-400">
              <div className="flex justify-between items-center mb-2">
                <h6 className="font-bold text-red-400">Type B MCB (6A-50A)</h6>
                <AlertTriangle className="h-4 w-4 text-red-400" />
              </div>
              <div className="text-sm space-y-1">
                <p><strong>0.4s disconnection:</strong> 11.5Ω to 0.92Ω</p>
                <p><strong>5s disconnection:</strong> 92Ω to 7.36Ω</p>
                <p><strong>Application:</strong> General purpose circuits</p>
              </div>
            </div>
            
            <div className="bg-gray-800 p-3 rounded border-l-4 border-orange-400">
              <div className="flex justify-between items-center mb-2">
                <h6 className="font-bold text-orange-400">Type C MCB (6A-50A)</h6>
                <AlertTriangle className="h-4 w-4 text-orange-400" />
              </div>
              <div className="text-sm space-y-1">
                <p><strong>0.4s disconnection:</strong> 5.75Ω to 0.46Ω</p>
                <p><strong>5s disconnection:</strong> 46Ω to 3.68Ω</p>
                <p><strong>Application:</strong> Motor circuits, high inrush</p>
              </div>
            </div>
            
            <div className="bg-gray-800 p-3 rounded border-l-4 border-green-400">
              <div className="flex justify-between items-center mb-2">
                <h6 className="font-bold text-green-400">30mA RCD Protection</h6>
                <Shield className="h-4 w-4 text-green-400" />
              </div>
              <div className="text-sm space-y-1">
                <p><strong>Maximum Zs:</strong> 1667Ω</p>
                <p><strong>Trip time:</strong> ≤300ms</p>
                <p><strong>Application:</strong> Additional protection</p>
              </div>
            </div>
          </div>
          
          <div className="hidden md:block overflow-x-auto mt-4">
            <table className="w-full text-sm border border-gray-600">
              <thead>
                <tr className="border-b border-gray-600 bg-gray-800">
                  <th className="text-left py-3 px-4 text-elec-yellow">Device Type</th>
                  <th className="text-left py-3 px-4 text-elec-yellow">Rating (A)</th>
                  <th className="text-left py-3 px-4 text-elec-yellow">0.4s Max Zs (Ω)</th>
                  <th className="text-left py-3 px-4 text-elec-yellow">5s Max Zs (Ω)</th>
                  <th className="text-left py-3 px-4 text-elec-yellow">Typical Application</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-700">
                  <td className="py-3 px-4">Type B MCB</td>
                  <td className="py-3 px-4">6-50</td>
                  <td className="py-3 px-4">11.5-0.92</td>
                  <td className="py-3 px-4">92-7.36</td>
                  <td className="py-3 px-4">General circuits, lighting, sockets</td>
                </tr>
                <tr className="border-b border-gray-700">
                  <td className="py-3 px-4">Type C MCB</td>
                  <td className="py-3 px-4">6-50</td>
                  <td className="py-3 px-4">5.75-0.46</td>
                  <td className="py-3 px-4">46-3.68</td>
                  <td className="py-3 px-4">Motor circuits, high inrush loads</td>
                </tr>
                <tr className="border-b border-gray-700">
                  <td className="py-3 px-4">Type D MCB</td>
                  <td className="py-3 px-4">6-50</td>
                  <td className="py-3 px-4">2.87-0.23</td>
                  <td className="py-3 px-4">23-1.84</td>
                  <td className="py-3 px-4">Welding, large transformers</td>
                </tr>
                <tr>
                  <td className="py-3 px-4">30mA RCD</td>
                  <td className="py-3 px-4">All ratings</td>
                  <td className="py-3 px-4">1667</td>
                  <td className="py-3 px-4">1667</td>
                  <td className="py-3 px-4">Additional protection circuits</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
          <h5 className="text-elec-yellow font-semibold mb-3">Practical Measurement and Verification:</h5>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h6 className="text-yellow-400 font-medium mb-2">Measurement Procedure:</h6>
              <ol className="text-sm space-y-1 list-decimal list-inside">
                <li>Isolate circuit under test</li>
                <li>Connect test instrument between line and earth</li>
                <li>Measure external earth fault loop impedance (Ze)</li>
                <li>Measure circuit protective conductor resistance (R2)</li>
                <li>Calculate Zs = Ze + (R1 + R2)</li>
                <li>Apply temperature correction factor if required</li>
                <li>Compare with tabulated maximum values</li>
              </ol>
            </div>
            <div>
              <h6 className="text-yellow-400 font-medium mb-2">Temperature Corrections:</h6>
              <ul className="text-sm space-y-1">
                <li>• Conductor temperature at fault: 70°C for PVC</li>
                <li>• Temperature coefficient: 1.20 for copper</li>
                <li>• Formula: Zs(corrected) = Zs(measured) × 1.20</li>
                <li>• Alternative: Use 0.8 factor for measured values</li>
                <li>• Consider parallel earth paths</li>
                <li>• Account for protective bonding contributions</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
          <h5 className="text-elec-yellow font-semibold mb-3">Common Issues and Solutions:</h5>
          <div className="space-y-3">
            <div className="bg-gray-800 p-3 rounded border-l-4 border-yellow-400">
              <h6 className="font-bold text-yellow-400 mb-1">High Zs Values</h6>
              <p className="text-sm">Solutions: Increase conductor size, improve earthing arrangements, install RCD for additional protection, check joint connections</p>
            </div>
            <div className="bg-gray-800 p-3 rounded border-l-4 border-blue-400">
              <h6 className="font-bold text-blue-400 mb-1">RCD Interaction</h6>
              <p className="text-sm">Consider: RCD operation may prevent protective device operation, ensure discrimination between devices, test both devices independently</p>
            </div>
            <div className="bg-gray-800 p-3 rounded border-l-4 border-red-400">
              <h6 className="font-bold text-red-400 mb-1">Long Circuit Runs</h6>
              <p className="text-sm">Mitigation: Use larger conductor sizes, consider sub-distribution, implement local earthing improvements, upgrade protective devices</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ZsTablesSection;