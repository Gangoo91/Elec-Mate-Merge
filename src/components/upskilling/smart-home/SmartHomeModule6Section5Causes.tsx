import { Card, CardContent } from '@/components/ui/card';
import EcosystemCausesQuickCheck from '@/components/upskilling/smart-home/EcosystemCausesQuickCheck';

const SmartHomeModule6Section5Causes = () => {
  return (
    <section className="space-y-6">
      <Card className="bg-elec-gray border-transparent">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold text-foreground mb-6">1. Common Causes of Ecosystem Conflicts</h2>
          
          <div className="space-y-6">
            <p className="text-foreground text-lg">
              Understanding the root causes of ecosystem conflicts helps electricians prevent issues before they occur:
            </p>

            <div className="grid gap-6">
              {/* Protocol Differences */}
              <div className="bg-elec-dark/50 border border-red-500/30 rounded-lg p-5">
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Protocol Incompatibility</h3>
                  <p className="text-foreground mb-3">Devices using different communication standards struggle to work together seamlessly.</p>
                  <div className="grid md:grid-cols-2 gap-3">
                    <div className="bg-red-500/10 border border-red-500/30 rounded p-3">
                      <h4 className="text-red-300 font-semibold text-sm mb-1">Common Protocol Conflicts</h4>
                      <div className="text-foreground text-xs space-y-1">
                        <div>• Zigbee devices vs Z-Wave devices</div>
                        <div>• Wi-Fi only devices vs hub-based devices</div>
                        <div>• Bluetooth vs wireless protocols</div>
                        <div>• Proprietary protocols vs open standards</div>
                      </div>
                    </div>
                    <div className="bg-red-500/10 border border-red-500/30 rounded p-3">
                      <h4 className="text-red-300 font-semibold text-sm mb-1">Impact on Performance</h4>
                      <p className="text-foreground text-xs">
                        Devices may not appear in unified apps, causing fragmented control and unreliable automation
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Proprietary Ecosystems */}
              <div className="bg-elec-dark/50 border border-blue-500/30 rounded-lg p-5">
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Proprietary Ecosystems</h3>
                  <p className="text-foreground mb-3">Closed systems that limit integration with third-party devices and platforms.</p>
                  <div className="grid md:grid-cols-2 gap-3">
                    <div className="bg-blue-500/10 border border-blue-500/30 rounded p-3">
                      <h4 className="text-blue-300 font-semibold text-sm mb-1">Examples of Closed Systems</h4>
                      <div className="text-foreground text-xs space-y-1">
                        <div>• Apple HomeKit (limited device support)</div>
                        <div>• Ring ecosystem (works best within Ring)</div>
                        <div>• Nest/Google (limited third-party integration)</div>
                        <div>• Proprietary lighting systems</div>
                      </div>
                    </div>
                    <div className="bg-blue-500/10 border border-blue-500/30 rounded p-3">
                      <h4 className="text-blue-300 font-semibold text-sm mb-1">Integration Challenges</h4>
                      <p className="text-foreground text-xs">
                        Limited API access, restricted device compatibility, forced use of specific apps
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Cloud Dependency */}
              <div className="bg-elec-dark/50 border border-purple-500/30 rounded-lg p-5">
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Cloud Reliance Issues</h3>
                  <p className="text-foreground mb-3">Over-dependence on cloud servers creates vulnerability points in smart home systems.</p>
                  <div className="grid md:grid-cols-2 gap-3">
                    <div className="bg-purple-500/10 border border-purple-500/30 rounded p-3">
                      <h4 className="text-purple-300 font-semibold text-sm mb-1">Server Dependency Problems</h4>
                      <div className="text-foreground text-xs space-y-1">
                        <div>• Internet outages affect device control</div>
                        <div>• Server maintenance causes downtime</div>
                        <div>• Service shutdowns break integrations</div>
                        <div>• API changes disrupt functionality</div>
                      </div>
                    </div>
                    <div className="bg-purple-500/10 border border-purple-500/30 rounded p-3">
                      <h4 className="text-purple-300 font-semibold text-sm mb-1">Real-World Impact</h4>
                      <p className="text-foreground text-xs">
                        When cloud services fail, integrated automations stop working, leaving clients frustrated
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Multiple Hub Conflicts */}
              <div className="bg-elec-dark/50 border border-amber-500/30 rounded-lg p-5">
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Multiple Hub Conflicts</h3>
                  <p className="text-foreground mb-3">Too many control hubs create complexity and device management conflicts.</p>
                  <div className="grid md:grid-cols-2 gap-3">
                    <div className="bg-amber-500/10 border border-amber-500/30 rounded p-3">
                      <h4 className="text-amber-300 font-semibold text-sm mb-1">Common Hub Conflicts</h4>
                      <div className="text-foreground text-xs space-y-1">
                        <div>• Devices paired to multiple hubs</div>
                        <div>• Competing automation rules</div>
                        <div>• Duplicate device entries in apps</div>
                        <div>• Conflicting schedules and routines</div>
                      </div>
                    </div>
                    <div className="bg-amber-500/10 border border-amber-500/30 rounded p-3">
                      <h4 className="text-amber-300 font-semibold text-sm mb-1">User Experience Issues</h4>
                      <p className="text-foreground text-xs">
                        Clients become confused about which app controls what, leading to unreliable operation
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
              <h4 className="text-lg font-semibold text-amber-400 mb-2">Key Insight</h4>
              <p className="text-foreground text-sm leading-relaxed">
                Most ecosystem conflicts stem from trying to integrate too many different technologies without considering 
                compatibility from the design phase. Prevention through careful planning is more effective than troubleshooting after installation.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <EcosystemCausesQuickCheck />
    </section>
  );
};

export default SmartHomeModule6Section5Causes;