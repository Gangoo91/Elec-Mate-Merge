import { Card, CardContent } from '@/components/ui/card';
import EcosystemSymptomsQuickCheck from '@/components/upskilling/smart-home/EcosystemSymptomsQuickCheck';

const SmartHomeModule6Section5Symptoms = () => {
  return (
    <section className="space-y-6">
      <Card className="bg-elec-gray border-transparent">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold text-foreground mb-6">2. Symptoms of Ecosystem Conflicts</h2>
          
          <div className="space-y-6">
            <p className="text-foreground text-lg">
              Recognising these symptoms early helps electricians diagnose ecosystem conflicts before they escalate:
            </p>

            <div className="grid gap-6">
              {/* Device Responsiveness Issues */}
              <div className="bg-elec-dark/50 border border-red-500/30 rounded-lg p-5">
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Device Responsiveness Problems</h3>
                  <p className="text-foreground mb-3">Devices fail to respond consistently to commands from apps or voice assistants.</p>
                  <div className="space-y-3">
                    <div className="bg-red-500/10 border border-red-500/30 rounded p-3">
                      <h4 className="text-red-300 font-semibold mb-2">Common Response Issues</h4>
                      <div className="grid md:grid-cols-2 gap-2 text-sm text-foreground">
                        <div>• Devices show as "offline" intermittently</div>
                        <div>• Commands work sometimes, fail other times</div>
                        <div>• Long delays between command and action</div>
                        <div>• Voice commands not recognised consistently</div>
                      </div>
                    </div>
                    
                    <div className="bg-red-500/10 border border-red-500/30 rounded p-3">
                      <h4 className="text-red-300 font-semibold mb-2">What This Indicates</h4>
                      <p className="text-foreground text-sm">
                        Usually points to communication protocol conflicts, network issues, or competing hub control
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Automation Failures */}
              <div className="bg-elec-dark/50 border border-blue-500/30 rounded-lg p-5">
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Partial Automation Failures</h3>
                  <p className="text-foreground mb-3">Routines and scenes work inconsistently, with some devices responding while others don't.</p>
                  <div className="space-y-3">
                    <div className="bg-blue-500/10 border border-blue-500/30 rounded p-3">
                      <h4 className="text-blue-300 font-semibold mb-2">Routine Problems</h4>
                      <div className="space-y-1 text-sm text-foreground">
                        <div>• "Good morning" routine only turns on some lights</div>
                        <div>• Security routines fail to arm all sensors</div>
                        <div>• Evening scenes don't adjust all devices</div>
                        <div>• Time-based automations trigger inconsistently</div>
                      </div>
                    </div>
                    
                    <div className="bg-blue-500/10 border border-blue-500/30 rounded p-3">
                      <h4 className="text-blue-300 font-semibold mb-2">Underlying Causes</h4>
                      <p className="text-foreground text-sm">
                        Different devices use different hubs or protocols, preventing unified control in complex routines
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Performance Issues */}
              <div className="bg-elec-dark/50 border border-purple-500/30 rounded-lg p-5">
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">System Performance Degradation</h3>
                  <p className="text-foreground mb-3">Overall system becomes sluggish with noticeable delays in device response times.</p>
                  <div className="space-y-3">
                    <div className="bg-purple-500/10 border border-purple-500/30 rounded p-3">
                      <h4 className="text-purple-300 font-semibold mb-2">Performance Symptoms</h4>
                      <div className="grid md:grid-cols-2 gap-2 text-sm text-foreground">
                        <div>• 5-10 second delays in device response</div>
                        <div>• Apps take longer to load device status</div>
                        <div>• Voice commands timeout frequently</div>
                        <div>• Scene changes happen in slow sequence</div>
                      </div>
                    </div>
                    
                    <div className="bg-purple-500/10 border border-purple-500/30 rounded p-3">
                      <h4 className="text-purple-300 font-semibold mb-2">Network Impact</h4>
                      <p className="text-foreground text-sm">
                        Multiple hubs competing for bandwidth, cloud dependencies causing bottlenecks
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* App Duplication Issues */}
              <div className="bg-elec-dark/50 border border-green-500/30 rounded-lg p-5">
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">App Duplication and Confusion</h3>
                  <p className="text-foreground mb-3">Devices appear multiple times across different apps, creating user confusion.</p>
                  <div className="space-y-3">
                    <div className="bg-green-500/10 border border-green-500/30 rounded p-3">
                      <h4 className="text-green-300 font-semibold mb-2">Duplication Problems</h4>
                      <div className="space-y-1 text-sm text-foreground">
                        <div>• Same light appears in 3 different apps</div>
                        <div>• Device names inconsistent across platforms</div>
                        <div>• Conflicting status reports (on/off disagreement)</div>
                        <div>• Multiple notification sources for same event</div>
                      </div>
                    </div>
                    
                    <div className="bg-green-500/10 border border-green-500/30 rounded p-3">
                      <h4 className="text-green-300 font-semibold mb-2">Client Impact</h4>
                      <p className="text-foreground text-sm">
                        Users don't know which app to use for control, leading to frustration and system abandonment
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <h4 className="text-lg font-semibold text-blue-400 mb-2">Diagnostic Tip</h4>
              <p className="text-foreground text-sm leading-relaxed">
                When clients report "the system is unreliable," ask specific questions about which devices fail, 
                when failures occur, and which app they're using. This helps pinpoint whether it's a protocol, 
                hub, or integration conflict.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <EcosystemSymptomsQuickCheck />
    </section>
  );
};

export default SmartHomeModule6Section5Symptoms;