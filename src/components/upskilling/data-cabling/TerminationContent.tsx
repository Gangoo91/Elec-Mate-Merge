import { Wrench, Zap, Settings, Eye } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const TerminationContent = () => {
  return (
    <>
      {/* Professional Crimping Tools */}
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Wrench className="h-5 w-5 text-elec-yellow" />
            Professional Crimping Tools
          </CardTitle>
        </CardHeader>
        <CardContent className="text-gray-300 space-y-6">
          
          <div className="bg-[#323232] p-4 rounded-lg">
            <h4 className="font-semibold text-elec-yellow mb-2">Ratcheting Crimping Tools</h4>
            <p className="text-sm text-gray-300 mb-3">
              High-quality ratcheting tools provide consistent pressure application and reliable terminations.
            </p>
            <div className="bg-green-900/20 p-3 rounded border border-green-800/30">
              <p className="text-sm text-green-300">
                <strong>Professional Standard:</strong> Always use tools with calibrated ratcheting mechanisms for consistent results.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#323232] p-4 rounded-lg">
              <h4 className="font-semibold text-elec-yellow mb-2 flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Key Features
              </h4>
              <ul className="text-xs text-gray-400 space-y-1">
                <li>• Precision-machined dies for proper contact formation</li>
                <li>• Adjustable compression force settings</li>
                <li>• Ratcheting mechanism prevents incomplete crimps</li>
                <li>• Interchangeable die sets for different connectors</li>
                <li>• Ergonomic design for extended use</li>
                <li>• Professional-grade construction for longevity</li>
              </ul>
            </div>

            <div className="bg-[#323232] p-4 rounded-lg">
              <h4 className="font-semibold text-elec-yellow mb-2">Quality Indicators</h4>
              <ul className="text-xs text-gray-400 space-y-1">
                <li>• Consistent insertion force (40N for RJ45)</li>
                <li>• Proper contact geometry and alignment</li>
                <li>• Gas-tight connection with low resistance</li>
                <li>• No visible damage to conductor or connector</li>
                <li>• Secure mechanical retention</li>
                <li>• Consistent crimp depth across all contacts</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Compression Tools */}
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Zap className="h-5 w-5 text-elec-yellow" />
            Compression Termination Tools
          </CardTitle>
        </CardHeader>
        <CardContent className="text-gray-300 space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#323232] p-4 rounded-lg">
              <h4 className="font-semibold text-elec-yellow mb-2">High-Force Applications</h4>
              <p className="text-sm text-gray-300 mb-2">For Cat 6A and high-performance installations</p>
              <ul className="text-xs text-gray-400 space-y-1">
                <li>• Force capability up to 1500N</li>
                <li>• Creates hermetic, gas-tight seals</li>
                <li>• Enhanced mechanical stability</li>
                <li>• Superior vibration resistance</li>
              </ul>
            </div>

            <div className="bg-[#323232] p-4 rounded-lg">
              <h4 className="font-semibold text-elec-yellow mb-2">Performance Benefits</h4>
              <p className="text-sm text-gray-300 mb-2">Advantages over standard crimping</p>
              <ul className="text-xs text-gray-400 space-y-1">
                <li>• Contact resistance typically &lt;10mΩ</li>
                <li>• Consistent compression geometry</li>
                <li>• Suitable for harsh environments</li>
                <li>• Extended service life</li>
              </ul>
            </div>

            <div className="bg-[#323232] p-4 rounded-lg">
              <h4 className="font-semibold text-elec-yellow mb-2">Tool Selection</h4>
              <p className="text-sm text-gray-300 mb-2">Choosing the right compression tool</p>
              <ul className="text-xs text-gray-400 space-y-1">
                <li>• Match tool to connector manufacturer</li>
                <li>• Verify force rating for cable category</li>
                <li>• Check die compatibility</li>
                <li>• Consider portability vs. performance</li>
              </ul>
            </div>

            <div className="bg-[#323232] p-4 rounded-lg">
              <h4 className="font-semibold text-elec-yellow mb-2 flex items-center gap-2">
                <Eye className="h-4 w-4" />
                Quality Verification
              </h4>
              <p className="text-sm text-gray-300 mb-2">Testing compression terminations</p>
              <ul className="text-xs text-gray-400 space-y-1">
                <li>• Pull-test verification (minimum 40N)</li>
                <li>• Contact resistance measurement</li>
                <li>• Visual inspection for damage</li>
                <li>• Impedance continuity testing</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};