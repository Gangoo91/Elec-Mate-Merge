import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Shield, Zap } from 'lucide-react';
import RCDProtectionQuickCheck from '@/components/upskilling/smart-home/RCDProtectionQuickCheck';

const BS7671RequirementsSection = () => {
  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <FileText className="h-6 w-6 text-elec-yellow" />
          2. BS 7671 Requirements for Smart Devices
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-foreground">
          Smart devices connected to mains electricity must comply with UK Wiring Regulations (BS 7671). 
          These requirements ensure safety, performance, and legal compliance for all installations.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground flex items-center gap-2">
              <Shield className="h-5 w-5 text-green-400" />
              Key BS 7671 Requirements
            </h4>
            
            <div className="space-y-3">
              <div className="p-4 bg-[#1a1a1a] rounded-lg border-l-4 border-green-500">
                <h5 className="font-medium text-foreground mb-2">Part 7: Special Installations</h5>
                <p className="text-gray-300 text-sm mb-2">Devices connected to mains must comply with special installation requirements</p>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• Additional protection required in bathroom zones</li>
                  <li>• Specific requirements for outdoor installations</li>
                  <li>• Enhanced safety measures in commercial premises</li>
                </ul>
              </div>
              
              <div className="p-4 bg-[#1a1a1a] rounded-lg border-l-4 border-blue-500">
                <h5 className="font-medium text-foreground mb-2">RCD Protection (Section 411)</h5>
                <p className="text-gray-300 text-sm mb-2">30mA RCD protection required for:</p>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• All new socket circuits</li>
                  <li>• Circuits supplying mobile equipment outdoors</li>
                  <li>• Most circuits in domestic installations</li>
                </ul>
              </div>
              
              <div className="p-4 bg-[#1a1a1a] rounded-lg border-l-4 border-purple-500">
                <h5 className="font-medium text-foreground mb-2">Cable and Circuit Protection</h5>
                <p className="text-gray-300 text-sm mb-2">All circuits must have appropriate:</p>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• Cable sizing for load requirements</li>
                  <li>• Overcurrent protection (MCBs/fuses)</li>
                  <li>• Proper cable containment and routing</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-foreground flex items-center gap-2">
              <Zap className="h-5 w-5 text-yellow-400" />
              Low Voltage Separation
            </h4>
            
            <div className="p-4 bg-amber-900/20 border border-amber-600/30 rounded-lg">
              <p className="text-amber-100 text-sm mb-3">
                <strong>Critical Requirement:</strong> Low-voltage wiring must be kept separate from mains circuits unless using segregated containment.
              </p>
              
              <div className="space-y-2">
                <h6 className="font-medium text-amber-200">Acceptable Methods:</h6>
                <ul className="text-amber-100 text-sm space-y-1">
                  <li>• Separate cable runs with 50mm minimum spacing</li>
                  <li>• Segregated trunking with physical barriers</li>
                  <li>• Different cable types (e.g., SWA for data)</li>
                  <li>• Separate entry points to equipment</li>
                </ul>
              </div>
            </div>

            <div className="p-4 bg-[#1a1a1a] rounded-lg">
              <h5 className="font-medium text-foreground mb-2">Testing Requirements</h5>
              <p className="text-gray-300 text-sm mb-2">Before energising any smart device installation:</p>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>• Continuity of protective conductors</li>
                <li>• Insulation resistance testing</li>
                <li>• Polarity verification</li>
                <li>• RCD operation testing</li>
                <li>• Functional testing of devices</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-blue-600/10 border border-blue-600/30 rounded-lg p-4">
          <h4 className="font-semibold text-blue-200 mb-2">Compliance Documentation</h4>
          <p className="text-blue-100 text-sm mb-2">
            All installations must be documented with appropriate certificates:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
            <div className="p-2 bg-[#1a1a1a] rounded">
              <span className="font-medium text-foreground">EIC (Electrical Installation Certificate):</span>
              <span className="text-gray-300 text-sm ml-2">For new circuits</span>
            </div>
            <div className="p-2 bg-[#1a1a1a] rounded">
              <span className="font-medium text-foreground">MEIWC (Minor Electrical Installation Works Certificate):</span>
              <span className="text-gray-300 text-sm ml-2">For additions to existing circuits</span>
            </div>
          </div>
        </div>

        <RCDProtectionQuickCheck />
      </CardContent>
    </Card>
  );
};

export default BS7671RequirementsSection;