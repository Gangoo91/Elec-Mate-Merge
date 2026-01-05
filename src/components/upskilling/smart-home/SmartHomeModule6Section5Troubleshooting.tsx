import { Card, CardContent } from '@/components/ui/card';
import TroubleshootingApproachQuickCheck from '@/components/upskilling/smart-home/TroubleshootingApproachQuickCheck';

const SmartHomeModule6Section5Troubleshooting = () => {
  return (
    <section className="space-y-6">
      <Card className="bg-elec-gray border-transparent">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold text-foreground mb-6">3. Systematic Troubleshooting Approach</h2>
          
          <div className="space-y-6">
            <p className="text-foreground text-lg">
              Follow this structured five-step approach to efficiently diagnose and resolve ecosystem conflicts:
            </p>

            <div className="grid gap-5">
              {/* Step 1: Compatibility Check */}
              <div className="bg-elec-dark/50 border border-elec-yellow/20 rounded-lg p-5">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="bg-elec-yellow text-elec-dark font-bold text-lg w-8 h-8 rounded-full flex items-center justify-center">1</span>
                    <h3 className="text-lg font-semibold text-foreground">Check Device Compatibility</h3>
                  </div>
                  <p className="text-foreground mb-3">Verify that all devices are officially supported by the chosen hub or voice assistant.</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-foreground">
                      <span className="w-2 h-2 bg-elec-yellow rounded-full flex-shrink-0"></span>
                      <span><strong>Check manufacturer compatibility lists:</strong> Official device support databases</span>
                    </div>
                    <div className="flex items-center gap-2 text-foreground">
                      <span className="w-2 h-2 bg-elec-yellow rounded-full flex-shrink-0"></span>
                      <span><strong>Verify protocol support:</strong> Zigbee 3.0, Z-Wave Plus, Wi-Fi standards</span>
                    </div>
                    <div className="flex items-center gap-2 text-foreground">
                      <span className="w-2 h-2 bg-elec-yellow rounded-full flex-shrink-0"></span>
                      <span><strong>Review firmware requirements:</strong> Minimum versions for integration</span>
                    </div>
                    <div className="flex items-center gap-2 text-foreground">
                      <span className="w-2 h-2 bg-elec-yellow rounded-full flex-shrink-0"></span>
                      <span><strong>Test individual device function:</strong> Before attempting integration</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 2: Connectivity Testing */}
              <div className="bg-elec-dark/50 border border-elec-yellow/20 rounded-lg p-5">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="bg-elec-yellow text-elec-dark font-bold text-lg w-8 h-8 rounded-full flex items-center justify-center">2</span>
                    <h3 className="text-lg font-semibold text-foreground">Test Network Connectivity</h3>
                  </div>
                  <p className="text-foreground mb-3">Ensure robust network infrastructure supports all connected devices.</p>
                  <div className="grid md:grid-cols-2 gap-3">
                    <div className="bg-blue-500/10 border border-blue-500/30 rounded p-3">
                      <h4 className="text-blue-300 font-semibold text-sm mb-1">Wi-Fi Assessment</h4>
                      <div className="text-foreground text-xs space-y-1">
                        <div>• Signal strength at each device location</div>
                        <div>• 2.4GHz vs 5GHz band performance</div>
                        <div>• Network congestion during peak usage</div>
                        <div>• Router placement and coverage gaps</div>
                      </div>
                    </div>
                    <div className="bg-green-500/10 border border-green-500/30 rounded p-3">
                      <h4 className="text-green-300 font-semibold text-sm mb-1">Hub Positioning</h4>
                      <div className="text-foreground text-xs space-y-1">
                        <div>• Central location for mesh networks</div>
                        <div>• Distance from Wi-Fi router interference</div>
                        <div>• Line of sight to key devices</div>
                        <div>• Power supply stability and quality</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 3: Simplify Setup */}
              <div className="bg-elec-dark/50 border border-elec-yellow/20 rounded-lg p-5">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="bg-elec-yellow text-elec-dark font-bold text-lg w-8 h-8 rounded-full flex items-center justify-center">3</span>
                    <h3 className="text-lg font-semibold text-foreground">Simplify and Consolidate</h3>
                  </div>
                  <p className="text-foreground mb-3">Remove duplicate hubs, redundant integrations, and conflicting automation rules.</p>
                  <div className="space-y-3">
                    <div className="bg-amber-500/10 border border-amber-500/30 rounded p-3">
                      <h4 className="text-amber-300 font-semibold text-sm mb-2">Hub Consolidation Strategy</h4>
                      <div className="text-foreground text-xs space-y-1">
                        <div>• Choose one primary hub for device control</div>
                        <div>• Remove devices from secondary hubs</div>
                        <div>• Disable conflicting voice assistant integrations</div>
                        <div>• Consolidate automation rules in single platform</div>
                      </div>
                    </div>
                    
                    <div className="bg-purple-500/10 border border-purple-500/30 rounded p-3">
                      <h4 className="text-purple-300 font-semibold text-sm mb-2">App Management</h4>
                      <p className="text-foreground text-xs">
                        Guide clients to use one primary app for daily control, keeping others for device-specific settings only
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 4: Reset and Re-pair */}
              <div className="bg-elec-dark/50 border border-elec-yellow/20 rounded-lg p-5">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="bg-elec-yellow text-elec-dark font-bold text-lg w-8 h-8 rounded-full flex items-center justify-center">4</span>
                    <h3 className="text-lg font-semibold text-foreground">Reset and Re-establish Connections</h3>
                  </div>
                  <p className="text-foreground mb-3">Factory reset problematic devices and establish clean pairings with the chosen hub.</p>
                  <div className="space-y-2 text-sm text-foreground">
                    <div><strong className="text-red-400">Step 1:</strong> Document current device settings and automations</div>
                    <div><strong className="text-blue-400">Step 2:</strong> Factory reset devices showing connection issues</div>
                    <div><strong className="text-green-400">Step 3:</strong> Re-pair devices to primary hub only</div>
                    <div><strong className="text-purple-400">Step 4:</strong> Test individual device control before adding to routines</div>
                    <div><strong className="text-amber-400">Step 5:</strong> Gradually rebuild automation rules and test each addition</div>
                  </div>
                </div>
              </div>

              {/* Step 5: Update Everything */}
              <div className="bg-elec-dark/50 border border-elec-yellow/20 rounded-lg p-5">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="bg-elec-yellow text-elec-dark font-bold text-lg w-8 h-8 rounded-full flex items-center justify-center">5</span>
                    <h3 className="text-lg font-semibold text-foreground">Update Firmware and Software</h3>
                  </div>
                  <p className="text-foreground mb-3">Ensure all components run the latest compatible versions to resolve known conflicts.</p>
                  <div className="grid md:grid-cols-3 gap-3">
                    <div className="bg-blue-500/10 border border-blue-500/30 rounded p-3">
                      <h5 className="text-blue-300 font-semibold text-sm mb-1">Device Firmware</h5>
                      <p className="text-foreground text-xs">Update individual device firmware through manufacturer apps</p>
                    </div>
                    <div className="bg-green-500/10 border border-green-500/30 rounded p-3">
                      <h5 className="text-green-300 font-semibold text-sm mb-1">Hub Software</h5>
                      <p className="text-foreground text-xs">Install latest hub firmware for improved compatibility</p>
                    </div>
                    <div className="bg-purple-500/10 border border-purple-500/30 rounded p-3">
                      <h5 className="text-purple-300 font-semibold text-sm mb-1">Mobile Apps</h5>
                      <p className="text-foreground text-xs">Update all control apps to latest versions</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
              <h4 className="text-lg font-semibold text-green-400 mb-2">Best Practice</h4>
              <p className="text-foreground text-sm leading-relaxed">
                Work through these steps systematically rather than jumping around. Often, connectivity issues (Step 2) 
                are mistaken for compatibility problems (Step 1), leading to unnecessary device replacements.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <TroubleshootingApproachQuickCheck />
    </section>
  );
};

export default SmartHomeModule6Section5Troubleshooting;