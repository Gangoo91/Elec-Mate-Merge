import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Shield, PoundSterling, Zap } from 'lucide-react';

export const BMSModule5Section5ContentPart3 = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-elec-yellow" />
          Benefits of Gateways
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <p className="text-foreground">
            Understanding gateway benefits helps you explain value to clients and make informed system design decisions:
          </p>
          
          <div className="grid gap-5">
            {/* Integration Benefits */}
            <div className="bg-elec-dark p-5 rounded-lg border border-gray-600">
              <div className="flex items-center gap-3 mb-3">
                <Zap className="h-6 w-6 text-green-400" />
                <h4 className="font-semibold text-green-300 text-lg">System Integration</h4>
              </div>
              <div className="space-y-3">
                <p className="text-foreground text-sm">
                  <strong>Single Interface:</strong> Allows all building data to be visible in one unified interface, 
                  eliminating the need to check multiple separate systems.
                </p>
                <div className="bg-green-900/20 border border-green-600/30 rounded-lg p-4">
                  <p className="text-green-100 text-sm font-medium">Before Gateway:</p>
                  <ul className="text-foreground text-xs mt-2 space-y-1">
                    <li>• Facilities manager checks BACnet workstation for HVAC</li>
                    <li>• Separate Modbus software for energy monitoring</li>
                    <li>• KNX software for lighting control</li>
                    <li>• Different alarm systems for each protocol</li>
                  </ul>
                  
                  <p className="text-green-100 text-sm font-medium mt-3">After Gateway:</p>
                  <ul className="text-foreground text-xs mt-2 space-y-1">
                    <li>• Single BMS screen shows all systems</li>
                    <li>• Unified alarm management</li>
                    <li>• Coordinated system responses</li>
                    <li>• Centralised scheduling and control</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Future-Proofing Benefits */}
            <div className="bg-elec-dark p-5 rounded-lg border border-gray-600">
              <div className="flex items-center gap-3 mb-3">
                <Shield className="h-6 w-6 text-blue-400" />
                <h4 className="font-semibold text-blue-300 text-lg">Future-Proofing</h4>
              </div>
              <div className="space-y-3">
                <p className="text-foreground text-sm">
                  <strong>Vendor Independence:</strong> Mix devices from different manufacturers without being locked 
                  into a single supplier's ecosystem.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-blue-900/20 border border-blue-600/30 rounded-lg p-3">
                    <p className="text-blue-100 text-sm font-medium">Flexibility Examples:</p>
                    <ul className="text-foreground text-xs mt-2 space-y-1">
                      <li>• Best-in-class HVAC controllers (Siemens)</li>
                      <li>• Cost-effective energy meters (Schneider)</li>
                      <li>• Reliable lighting controls (KNX)</li>
                      <li>• Emergency systems (different vendor)</li>
                    </ul>
                  </div>
                  <div className="bg-purple-900/20 border border-purple-600/30 rounded-lg p-3">
                    <p className="text-purple-100 text-sm font-medium">Upgrade Benefits:</p>
                    <ul className="text-foreground text-xs mt-2 space-y-1">
                      <li>• Replace individual systems gradually</li>
                      <li>• Integrate new technologies easily</li>
                      <li>• Maintain existing investments</li>
                      <li>• Choose best solution for each area</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Cost Benefits */}
            <div className="bg-elec-dark p-5 rounded-lg border border-gray-600">
              <div className="flex items-center gap-3 mb-3">
                <PoundSterling className="h-6 w-6 text-yellow-400" />
                <h4 className="font-semibold text-yellow-300 text-lg">Cost Savings</h4>
              </div>
              <div className="space-y-3">
                <p className="text-foreground text-sm">
                  <strong>Economic Benefits:</strong> Avoid expensive system replacements and reduce operational costs 
                  through better system coordination.
                </p>
                <div className="grid md:grid-cols-3 gap-3">
                  <div className="bg-yellow-900/20 border border-yellow-600/30 rounded-lg p-3">
                    <p className="text-yellow-200 font-medium text-xs">Capital Savings</p>
                    <ul className="text-foreground text-xs mt-1 space-y-1">
                      <li>• Keep existing controllers</li>
                      <li>• Avoid proprietary systems</li>
                      <li>• Competitive bidding</li>
                      <li>• Phased upgrades</li>
                    </ul>
                  </div>
                  <div className="bg-orange-900/20 border border-orange-600/30 rounded-lg p-3">
                    <p className="text-orange-200 font-medium text-xs">Operational Savings</p>
                    <ul className="text-foreground text-xs mt-1 space-y-1">
                      <li>• Single training program</li>
                      <li>• Unified maintenance</li>
                      <li>• Integrated diagnostics</li>
                      <li>• Centralised reporting</li>
                    </ul>
                  </div>
                  <div className="bg-green-900/20 border border-green-600/30 rounded-lg p-3">
                    <p className="text-green-200 font-medium text-xs">Energy Savings</p>
                    <ul className="text-foreground text-xs mt-1 space-y-1">
                      <li>• Coordinated HVAC/lighting</li>
                      <li>• Demand response programs</li>
                      <li>• Optimised scheduling</li>
                      <li>• Real-time monitoring</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Scalability Benefits */}
            <div className="bg-elec-dark p-5 rounded-lg border border-gray-600">
              <div className="flex items-center gap-3 mb-3">
                <TrendingUp className="h-6 w-6 text-purple-400" />
                <h4 className="font-semibold text-purple-300 text-lg">Scalability</h4>
              </div>
              <div className="space-y-3">
                <p className="text-foreground text-sm">
                  <strong>Growth Ready:</strong> Simplifies adding new subsystems later without replacing everything, 
                  supporting business expansion and technology evolution.
                </p>
                <div className="bg-purple-900/20 border border-purple-600/30 rounded-lg p-4">
                  <p className="text-purple-100 text-sm font-medium">Expansion Scenarios:</p>
                  <div className="grid md:grid-cols-2 gap-3 mt-3">
                    <div>
                      <p className="text-foreground text-xs font-medium mb-2">Phase 1 Installation:</p>
                      <ul className="text-foreground text-xs space-y-1">
                        <li>• Basic HVAC and lighting</li>
                        <li>• Simple energy monitoring</li>
                        <li>• Core gateway infrastructure</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-foreground text-xs font-medium mb-2">Phase 2 Expansion:</p>
                      <ul className="text-foreground text-xs space-y-1">
                        <li>• Add security system integration</li>
                        <li>• Expand to more energy points</li>
                        <li>• Include water meters</li>
                        <li>• Connect fire safety systems</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-red-900/20 border border-red-600/30 rounded-lg p-4">
          <h4 className="font-semibold text-red-300 mb-2">⚠️ Important Considerations</h4>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-red-200 font-medium text-sm mb-2">Potential Challenges:</p>
              <ul className="text-foreground text-sm space-y-1">
                <li>• Additional device complexity</li>
                <li>• Potential single point of failure</li>
                <li>• Configuration requirements</li>
                <li>• Regular firmware updates needed</li>
              </ul>
            </div>
            <div>
              <p className="text-green-200 font-medium text-sm mb-2">Mitigation Strategies:</p>
              <ul className="text-foreground text-sm space-y-1">
                <li>• Redundant gateway configurations</li>
                <li>• Regular backup procedures</li>
                <li>• Proper documentation standards</li>
                <li>• Planned maintenance schedules</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};