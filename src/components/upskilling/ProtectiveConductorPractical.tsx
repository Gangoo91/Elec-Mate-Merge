import { Wrench, Shield, AlertTriangle, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const ProtectiveConductorPractical = () => {
  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Wrench className="h-5 w-5 text-elec-yellow" />
          Practical Guidance & Testing Procedures
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        
        {/* Best Practice 1 */}
        <div className="bg-[#323232] rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="secondary" className="bg-elec-yellow text-black">Best Practice 1</Badge>
            <h3 className="text-foreground font-semibold">CPC Testing Methodology</h3>
          </div>
          <div className="space-y-4">
            <p className="text-foreground text-sm sm:text-base">
              Systematic approach to testing circuit protective conductors:
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              <div className="space-y-2 sm:space-y-3">
                <h4 className="text-elec-yellow font-medium text-sm sm:text-base">R1+R2 Method (Preferred):</h4>
                <ul className="text-foreground text-xs sm:text-sm space-y-1 sm:space-y-2 leading-relaxed">
                  <li>• Test line and CPC together from origin</li>
                  <li>• Provides end-to-end verification</li>
                  <li>• Results used for Zs calculations</li>
                  <li>• Identifies any cross-connections</li>
                  <li>• Required for compliance verification</li>
                </ul>
              </div>
              <div className="space-y-2 sm:space-y-3">
                <h4 className="text-elec-yellow font-medium text-sm sm:text-base">Direct CPC Method:</h4>
                <ul className="text-foreground text-xs sm:text-sm space-y-1 sm:space-y-2 leading-relaxed">
                  <li>• Test CPC alone from origin to extremity</li>
                  <li>• Useful for fault-finding</li>
                  <li>• Simpler interpretation of results</li>
                  <li>• Good for verification of repairs</li>
                  <li>• Less preferred for initial verification</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Best Practice 2 */}
        <div className="bg-[#323232] rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="secondary" className="bg-elec-yellow text-black">Best Practice 2</Badge>
            <h3 className="text-foreground font-semibold">Bonding Conductor Testing</h3>
          </div>
          <div className="space-y-4">
            <p className="text-foreground text-sm sm:text-base">
              Comprehensive testing procedures for bonding conductors:
            </p>
            <div className="bg-blue-600/10 border border-blue-600/20 rounded-lg p-4 sm:p-5">
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-blue-400 font-medium mb-3 text-sm sm:text-base">Main Bonding Conductor Testing:</h4>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 text-xs sm:text-sm">
                    <div>
                      <h5 className="text-foreground font-medium mb-2 text-sm sm:text-base">Test Points:</h5>
                      <ul className="text-foreground space-y-1 sm:space-y-2 leading-relaxed">
                        <li>• Main earthing terminal to water pipe</li>
                        <li>• Main earthing terminal to gas pipe</li>
                        <li>• Main earthing terminal to structural steel</li>
                        <li>• Main earthing terminal to oil pipes</li>
                        <li>• Between bonded services</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-foreground font-medium mb-2 text-sm sm:text-base">Acceptance Criteria:</h5>
                      <ul className="text-foreground space-y-1 sm:space-y-2 leading-relaxed">
                        <li>• Resistance ≤ 0.05Ω for main bonding</li>
                        <li>• Consistent readings across multiple tests</li>
                        <li>• No open circuits or high resistance joints</li>
                        <li>• Readings comparable to cable specifications</li>
                        <li>• Documentation of all test results</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Best Practice 3 */}
        <div className="bg-[#323232] rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="secondary" className="bg-elec-yellow text-black">Troubleshooting</Badge>
            <h3 className="text-foreground font-semibold">Common Issues & Solutions</h3>
          </div>
          <div className="space-y-4">
            <p className="text-foreground text-sm sm:text-base">
              Identifying and resolving protective conductor problems:
            </p>
            <div className="space-y-3 sm:space-y-4">
              <div className="bg-red-600/10 border border-red-600/20 rounded-lg p-4 sm:p-5">
                <h4 className="text-red-400 font-medium mb-2 sm:mb-3 text-sm sm:text-base">Issue: CPC Open Circuit</h4>
                <div className="text-foreground text-xs sm:text-sm space-y-2 sm:space-y-3 leading-relaxed">
                  <p><strong>Immediate Actions:</strong></p>
                  <ul className="list-disc list-inside space-y-1 sm:space-y-2">
                    <li>Stop all testing immediately</li>
                    <li>Do not energise the circuit</li>
                    <li>Trace the CPC route systematically</li>
                    <li>Check all terminations and joints</li>
                    <li>Rectify fault before any further work</li>
                  </ul>
                </div>
              </div>
              <div className="bg-yellow-600/10 border border-yellow-600/20 rounded-lg p-4 sm:p-5">
                <h4 className="text-yellow-400 font-medium mb-2 sm:mb-3 text-sm sm:text-base">Issue: High Bonding Resistance</h4>
                <div className="text-foreground text-xs sm:text-sm space-y-2 sm:space-y-3 leading-relaxed">
                  <p><strong>Investigation Steps:</strong></p>
                  <ul className="list-disc list-inside space-y-1 sm:space-y-2">
                    <li>Check clamp connections are tight and clean</li>
                    <li>Verify correct bonding clamp type for pipe material</li>
                    <li>Look for corrosion or paint on contact surfaces</li>
                    <li>Ensure adequate conductor size for fault current</li>
                    <li>Consider parallel paths affecting readings</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Best Practice 4 */}
        <div className="bg-[#323232] rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="secondary" className="bg-elec-yellow text-black">Advanced Techniques</Badge>
            <h3 className="text-foreground font-semibold">Specialised Testing Scenarios</h3>
          </div>
          <div className="space-y-4">
            <p className="text-foreground text-sm sm:text-base">
              Advanced techniques for complex installations:
            </p>
            <div className="bg-purple-600/10 border border-purple-600/20 rounded-lg p-4 sm:p-5">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-purple-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-purple-400 font-medium mb-3 text-sm sm:text-base">Special Considerations:</h4>
                  <div className="space-y-3 sm:space-y-4 text-xs sm:text-sm">
                    <div>
                      <h5 className="text-foreground font-medium text-sm sm:text-base">Ring Circuit CPCs:</h5>
                      <p className="text-foreground leading-relaxed">Test each leg of the ring separately, then verify ring integrity. Cross-connection between legs invalidates the ring circuit.</p>
                    </div>
                    <div>
                      <h5 className="text-foreground font-medium text-sm sm:text-base">Steel Wire Armoured (SWA) Cables:</h5>
                      <p className="text-foreground leading-relaxed">Armour can be used as CPC if properly connected and meets fault current requirements. Test armour continuity and connection integrity.</p>
                    </div>
                    <div>
                      <h5 className="text-foreground font-medium text-sm sm:text-base">Data Centre Environments:</h5>
                      <p className="text-foreground leading-relaxed">Consider separate functional earth requirements. Test both protective and functional earth systems independently.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-4 sm:p-5">
          <div className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="text-green-400 font-medium mb-3 text-sm sm:text-base">Key Success Factors</h4>
              <ul className="text-foreground text-xs sm:text-sm space-y-1 sm:space-y-2 leading-relaxed">
                <li>• Protective conductor continuity is non-negotiable for safety</li>
                <li>• Systematic testing prevents dangerous oversights</li>
                <li>• Proper documentation supports compliance and maintenance</li>
                <li>• Regular testing maintains installation safety standards</li>
                <li>• Professional competence ensures reliable results</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};