import { Card, CardContent } from '@/components/ui/card';
import PreventionStrategiesQuickCheck from '@/components/upskilling/smart-home/PreventionStrategiesQuickCheck';

const SmartHomeModule6Section5Prevention = () => {
  return (
    <section className="space-y-6">
      <Card className="bg-elec-gray border-transparent">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold text-foreground mb-6">4. Preventing Future Conflicts</h2>
          
          <div className="space-y-6">
            <p className="text-foreground text-lg">
              Prevention is more effective than troubleshooting. These strategies help electricians design conflict-free systems from the start:
            </p>

            <div className="grid gap-6">
              {/* Ecosystem Strategy */}
              <div className="bg-elec-dark/50 border border-green-500/30 rounded-lg p-5">
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Choose One Primary Ecosystem</h3>
                  <p className="text-foreground mb-3">Focus on a single platform as the main control hub to ensure consistent integration.</p>
                  <div className="space-y-3">
                    <div className="bg-green-500/10 border border-green-500/30 rounded p-3">
                      <h4 className="text-green-300 font-semibold mb-2">Recommended Primary Ecosystems</h4>
                      <div className="grid md:grid-cols-2 gap-3 text-sm text-foreground">
                        <div>
                          <strong className="text-green-400">SmartThings + Alexa:</strong>
                          <div className="text-xs mt-1">Wide device compatibility, strong voice control, mature platform</div>
                        </div>
                        <div>
                          <strong className="text-blue-400">Hubitat + Google:</strong>
                          <div className="text-xs mt-1">Local processing, privacy-focused, advanced automation</div>
                        </div>
                        <div>
                          <strong className="text-purple-400">Apple HomeKit:</strong>
                          <div className="text-xs mt-1">Premium devices, excellent security, iOS integration</div>
                        </div>
                        <div>
                          <strong className="text-amber-400">Home Assistant:</strong>
                          <div className="text-xs mt-1">Maximum flexibility, open source, technical users</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-green-500/10 border border-green-500/30 rounded p-3">
                      <h4 className="text-green-300 font-semibold mb-2">Implementation Strategy</h4>
                      <p className="text-foreground text-sm">
                        Use the primary ecosystem for 80-90% of devices, with secondary systems only for specific needs 
                        that the primary cannot address effectively.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hub Management */}
              <div className="bg-elec-dark/50 border border-blue-500/30 rounded-lg p-5">
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Minimise Hub Proliferation</h3>
                  <p className="text-foreground mb-3">Limit the number of control hubs to reduce complexity and potential conflicts.</p>
                  <div className="space-y-3">
                    <div className="bg-blue-500/10 border border-blue-500/30 rounded p-3">
                      <h4 className="text-blue-300 font-semibold mb-2">Hub Hierarchy Guidelines</h4>
                      <div className="space-y-2 text-sm text-foreground">
                        <div><strong className="text-blue-400">Tier 1 - Primary Hub:</strong> Main control for lights, switches, sensors</div>
                        <div><strong className="text-green-400">Tier 2 - Specialist Hubs:</strong> Security system, HVAC control (if required)</div>
                        <div><strong className="text-red-400">Avoid:</strong> Multiple general-purpose hubs competing for the same devices</div>
                      </div>
                    </div>
                    
                    <div className="bg-blue-500/10 border border-blue-500/30 rounded p-3">
                      <h4 className="text-blue-300 font-semibold mb-2">Client Education Point</h4>
                      <p className="text-foreground text-sm">
                        Explain to clients that fewer hubs mean more reliable operation and simpler daily use, 
                        even if it means some devices aren't available from their preferred manufacturer.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Device Selection */}
              <div className="bg-elec-dark/50 border border-purple-500/30 rounded-lg p-5">
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Prioritise Certified Compatibility</h3>
                  <p className="text-foreground mb-3">Choose devices with official certification for the primary ecosystem.</p>
                  <div className="space-y-3">
                    <div className="bg-purple-500/10 border border-purple-500/30 rounded p-3">
                      <h4 className="text-purple-300 font-semibold mb-2">Certification Programs to Look For</h4>
                      <div className="grid md:grid-cols-2 gap-2 text-sm text-foreground">
                        <div>• "Works with SmartThings" certification</div>
                        <div>• "Works with Alexa" built-in support</div>
                        <div>• "Works with Google Assistant" integration</div>
                        <div>• "Works with Apple HomeKit" compatibility</div>
                        <div>• Zigbee 3.0 or Z-Wave Plus standards</div>
                        <div>• Matter/Thread future-ready devices</div>
                      </div>
                    </div>
                    
                    <div className="bg-purple-500/10 border border-purple-500/30 rounded p-3">
                      <h4 className="text-purple-300 font-semibold mb-2">When to Make Exceptions</h4>
                      <p className="text-foreground text-sm">
                        Only choose non-certified devices when they provide critical functionality unavailable 
                        from certified alternatives, and when the client accepts the integration risks.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Documentation Strategy */}
              <div className="bg-elec-dark/50 border border-amber-500/30 rounded-lg p-5">
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Document System Architecture</h3>
                  <p className="text-foreground mb-3">Provide clear documentation so clients understand their system and avoid conflicts.</p>
                  <div className="space-y-3">
                    <div className="bg-amber-500/10 border border-amber-500/30 rounded p-3">
                      <h4 className="text-amber-300 font-semibold mb-2">Essential Documentation</h4>
                      <div className="grid md:grid-cols-2 gap-2 text-sm text-foreground">
                        <div>• Device inventory with control methods</div>
                        <div>• Primary app for each device type</div>
                        <div>• Network architecture diagram</div>
                        <div>• Hub location and coverage areas</div>
                        <div>• Automation rules and triggers</div>
                        <div>• Troubleshooting contact information</div>
                      </div>
                    </div>
                    
                    <div className="bg-amber-500/10 border border-amber-500/30 rounded p-3">
                      <h4 className="text-amber-300 font-semibold mb-2">Client Training Elements</h4>
                      <p className="text-foreground text-sm">
                        Show clients which app to use for daily control, how to identify device conflicts, 
                        and when to call for professional support rather than experimenting with settings.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <h4 className="text-lg font-semibold text-blue-400 mb-2">Long-term Strategy</h4>
              <p className="text-foreground text-sm leading-relaxed">
                Design systems for growth. Choose platforms and protocols that can accommodate future devices 
                without requiring major architectural changes. This prevents conflicts as systems expand over time.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <PreventionStrategiesQuickCheck />
    </section>
  );
};

export default SmartHomeModule6Section5Prevention;