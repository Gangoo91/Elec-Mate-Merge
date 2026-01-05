import { Card, CardContent } from '@/components/ui/card';
import { AlertTriangle, Wifi, Settings, TrendingDown } from 'lucide-react';
import BridgingChallengesQuickCheck from '@/components/upskilling/smart-home/BridgingChallengesQuickCheck';

const SmartHomeModule6Section4Challenges = () => {
  return (
    <section className="space-y-6">
      <Card className="bg-elec-gray border-transparent">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold text-foreground mb-6">4. Challenges and Limitations</h2>
          
          <div className="space-y-6">
            <p className="text-foreground text-lg">
              While bridging offers benefits, electricians must understand the potential drawbacks:
            </p>

            <div className="grid gap-6">
              {/* Compatibility Issues */}
              <div className="bg-elec-dark/50 border border-red-500/30 rounded-lg p-5">
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Not All Systems Are Compatible</h3>
                    <p className="text-foreground mb-4">Sometimes replacement is cheaper and more reliable than bridging.</p>
                    
                    <div className="space-y-3">
                      <div className="bg-red-500/10 border border-red-500/30 rounded p-3">
                        <h4 className="text-red-300 font-semibold mb-2">When Replacement is Better</h4>
                        <div className="space-y-1 text-sm text-foreground">
                          <div>• Very old systems (pre-2000) with no digital interface</div>
                          <div>• Proprietary protocols with no available bridges</div>
                          <div>• Systems requiring constant maintenance</div>
                          <div>• When bridging costs exceed replacement costs</div>
                        </div>
                      </div>
                      
                      <div className="bg-red-500/10 border border-red-500/30 rounded p-3">
                        <h4 className="text-red-300 font-semibold mb-2">Cost Considerations</h4>
                        <p className="text-foreground text-sm">
                          Factor in bridge hardware, installation time, ongoing maintenance, and potential reliability issues
                        </p>
                      </div>
                  </div>
                </div>

              {/* Additional Points of Failure */}
              <div className="bg-elec-dark/50 border border-amber-500/30 rounded-lg p-5">
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Extra Points of Failure</h3>
                    <p className="text-foreground mb-4">Bridging adds complexity that can reduce system reliability.</p>
                    
                    <div className="grid md:grid-cols-2 gap-3">
                      <div className="bg-amber-500/10 border border-amber-500/30 rounded p-3">
                        <h4 className="text-amber-300 font-semibold text-sm mb-1">Potential Issues</h4>
                        <div className="text-foreground text-xs space-y-1">
                          <div>• Bridge device goes offline</div>
                          <div>• Network connectivity problems</div>
                          <div>• Firmware update failures</div>
                          <div>• Power supply issues</div>
                        </div>
                      </div>
                      <div className="bg-amber-500/10 border border-amber-500/30 rounded p-3">
                        <h4 className="text-amber-300 font-semibold text-sm mb-1">Impact</h4>
                        <p className="text-foreground text-xs">
                          If bridge fails, entire connected system becomes unavailable until repair
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

              {/* Reduced Functionality */}
              <div className="bg-elec-dark/50 border border-blue-500/30 rounded-lg p-5">
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Limited Functionality</h3>
                    <p className="text-foreground mb-4">Bridged devices may only support basic features compared to native smart devices.</p>
                    
                    <div className="space-y-3">
                      <div className="bg-blue-500/10 border border-blue-500/30 rounded p-3">
                        <h4 className="text-blue-300 font-semibold mb-2">Common Limitations</h4>
                        <div className="grid md:grid-cols-2 gap-2 text-sm text-foreground">
                          <div>• Basic on/off control only</div>
                          <div>• No dimming or colour control</div>
                          <div>• Limited status reporting</div>
                          <div>• Slower response times</div>
                        </div>
                      </div>
                      
                      <div className="bg-blue-500/10 border border-blue-500/30 rounded p-3">
                        <h4 className="text-blue-300 font-semibold mb-2">Examples</h4>
                        <p className="text-foreground text-sm">
                          Old alarm system may only report "armed/disarmed" rather than individual sensor status
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

              {/* Complexity and Maintenance */}
              <div className="bg-elec-dark/50 border border-purple-500/30 rounded-lg p-5">
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Increased Complexity</h3>
                    <p className="text-foreground mb-4">Multiple systems require more technical knowledge to maintain and troubleshoot.</p>
                    
                    <div className="space-y-3">
                      <div className="bg-purple-500/10 border border-purple-500/30 rounded p-3">
                        <h4 className="text-purple-300 font-semibold mb-2">Maintenance Challenges</h4>
                        <div className="space-y-1 text-sm text-foreground">
                          <div>• Multiple apps and interfaces to manage</div>
                          <div>• Different update schedules and procedures</div>
                          <div>• Troubleshooting requires knowledge of both systems</div>
                          <div>• Client training becomes more complex</div>
                        </div>
                      </div>
                      
                      <div className="bg-purple-500/10 border border-purple-500/30 rounded p-3">
                        <h4 className="text-purple-300 font-semibold mb-2">Support Issues</h4>
                        <p className="text-foreground text-sm">
                          Problems may require troubleshooting across multiple vendors and technologies
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <BridgingChallengesQuickCheck />
    </section>
  );
};

export default SmartHomeModule6Section4Challenges;