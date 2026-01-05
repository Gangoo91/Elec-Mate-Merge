
import { Cable, AlertCircle, Zap, Shield, FileCheck, Eye } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const InsulationResistanceContent = () => {
  return (
    <div className="space-y-6">
      {/* What Is Insulation Resistance Testing */}
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Cable className="h-5 w-5 text-elec-yellow" />
            What Is Insulation Resistance Testing?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-foreground leading-relaxed">
            This test checks that the insulation surrounding conductors is intact and not breaking down. 
            It prevents leakage currents, shock risk, and damage to connected devices.
          </p>
          
          <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-4">
            <h4 className="text-green-200 font-medium mb-3">Key Function</h4>
            <p className="text-foreground text-sm leading-relaxed">
              The test applies a DC voltage between conductors and measures the resistance of the insulation. 
              High resistance indicates good insulation; low resistance suggests breakdown or damage.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Why It Matters */}
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Shield className="h-5 w-5 text-elec-yellow" />
            Why It Matters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-foreground text-sm">Confirms separation between conductors</span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-foreground text-sm">Detects deterioration due to age, heat, or mechanical damage</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-foreground text-sm">Helps prevent fire, electric shock, and equipment failure</span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-foreground text-sm">Mandatory for all new circuits, alterations, and during periodic inspection</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* When Is It Carried Out */}
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <FileCheck className="h-5 w-5 text-elec-yellow" />
            When Is It Carried Out?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-blue-600/10 border border-blue-600/20 rounded-lg p-4">
            <h4 className="text-blue-200 font-medium mb-3">Test Sequence</h4>
            <ul className="space-y-2 text-foreground text-sm">
              <li>• After continuity testing and before energising</li>
              <li>• Before polarity or loop impedance tests</li>
              <li>• On new installations, modified circuits, and during condition reports</li>
              <li>• Always after verifying the circuit is safe and no sensitive equipment is connected</li>
            </ul>
          </div>
          
          <div className="bg-orange-600/10 border border-orange-600/20 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-orange-400 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="text-orange-200 font-medium mb-2">Important</h4>
                <p className="text-foreground text-sm leading-relaxed">
                  Electronic equipment must be disconnected before testing to prevent damage from the high test voltage.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* What Does It Detect */}
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Eye className="h-5 w-5 text-elec-yellow" />
            What Does It Detect?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              "Damage to insulation",
              "Moisture ingress in cables or enclosures",
              "Carbonisation (from arcing or overcurrent)",
              "Bridging or breakdown between conductors or to earth",
              "Poor workmanship—e.g. bare copper left too close to other terminals"
            ].map((item, index) => (
              <div key={index} className="bg-[#323232] rounded-lg p-3 border-l-4 border-red-500/50">
                <span className="text-foreground text-sm">{item}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Test Voltage Levels */}
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Zap className="h-5 w-5 text-elec-yellow" />
            Test Voltage Levels (per BS7671)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-600">
                  <th className="text-left text-foreground font-medium py-3 px-4">System Voltage</th>
                  <th className="text-left text-foreground font-medium py-3 px-4">Test Voltage</th>
                  <th className="text-left text-foreground font-medium py-3 px-4">Minimum IR Value</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-700">
                  <td className="text-foreground py-3 px-4">≤ 500 V</td>
                  <td className="text-foreground py-3 px-4">500 V DC</td>
                  <td className="text-elec-yellow font-medium py-3 px-4">1 MΩ</td>
                </tr>
                <tr>
                  <td className="text-foreground py-3 px-4">Extra-low voltage (SELV/PELV)</td>
                  <td className="text-foreground py-3 px-4">250 V DC</td>
                  <td className="text-elec-yellow font-medium py-3 px-4">0.5 MΩ</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="bg-yellow-600/10 border border-yellow-600/20 rounded-lg p-4">
            <p className="text-foreground text-sm leading-relaxed">
              <strong>Note:</strong> Where surge protection or sensitive devices are installed, 
              a lower test voltage may be used—but must be justified and recorded.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
