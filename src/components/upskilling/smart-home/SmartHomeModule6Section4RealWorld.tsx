import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Home, Shield, Smartphone } from 'lucide-react';

const SmartHomeModule6Section4RealWorld = () => {
  return (
    <Card className="bg-elec-gray border-transparent">
      <CardContent className="p-6">
        <h2 className="text-2xl font-bold text-foreground mb-6">Real World Example</h2>
        
        <div className="space-y-6">
          {/* Case Study Header */}
          <div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Manchester Home: Legacy Alarm System Integration</h3>
              <p className="text-foreground">
                A homeowner had a comprehensive wired alarm system installed in the early 2000s that was still functioning well. 
                Rather than replacing the entire system, the electrician found a cost-effective bridging solution that extended 
                its capabilities into the smart home era.
            </p>
          </div>

          {/* Original System */}
          <div className="bg-elec-dark/50 border border-elec-yellow/20 rounded-lg p-5">
            <div className="mb-3">
              <h4 className="text-lg font-semibold text-foreground">Original System (Circa 2003)</h4>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h5 className="text-foreground font-semibold mb-2">System Components</h5>
                <div className="space-y-1 text-sm text-foreground">
                  <div>• Main control panel with LCD keypad</div>
                  <div>• 8 door/window magnetic contacts</div>
                  <div>• 4 PIR motion detectors</div>
                  <div>• External bell box and strobe</div>
                  <div>• Telephone dialler for monitoring company</div>
                </div>
              </div>
              <div>
                <h5 className="text-foreground font-semibold mb-2">Limitations</h5>
                <div className="space-y-1 text-sm text-foreground">
                  <div>• No remote access or control</div>
                  <div>• No mobile notifications</div>
                  <div>• Basic LCD display only</div>
                  <div>• Manual arming/disarming required</div>
                  <div>• No integration with other systems</div>
                </div>
              </div>
            </div>
          </div>

          {/* The Solution */}
          <div className="bg-elec-dark/50 border border-green-500/30 rounded-lg p-5">
            <div className="mb-4">
              <h4 className="text-lg font-semibold text-foreground">Bridging Solution</h4>
            </div>
            
            <div className="space-y-4">
              <div className="bg-green-500/10 border border-green-500/30 rounded p-3">
                <h5 className="text-green-300 font-semibold mb-2">Smart Relay Interface Installation</h5>
                <p className="text-foreground text-sm mb-2">
                  Electrician installed a Konnected Alarm Panel Interface connected to the existing alarm system's control outputs.
                </p>
                <div className="space-y-1 text-xs text-foreground">
                  <div>• Connected to alarm panel's auxiliary outputs</div>
                  <div>• Wired to existing sensor zones for status monitoring</div>
                  <div>• Added Wi-Fi connectivity via interface module</div>
                  <div>• Integrated with Samsung SmartThings hub</div>
                </div>
              </div>
              
              <div className="bg-blue-500/10 border border-blue-500/30 rounded p-3">
                <h5 className="text-blue-300 font-semibold mb-2">New Capabilities Gained</h5>
                <div className="grid md:grid-cols-2 gap-2 text-xs text-foreground">
                  <div>• Remote arming/disarming via smartphone</div>
                  <div>• Instant push notifications for any activation</div>
                  <div>• Integration with smart lighting routines</div>
                  <div>• Voice control via Alexa</div>
                  <div>• Zone status monitoring</div>
                  <div>• Automation trigger capabilities</div>
                </div>
              </div>
            </div>
          </div>

          {/* Implementation Details */}
          <div className="bg-elec-dark/50 border border-blue-500/30 rounded-lg p-5">
            <div className="mb-3">
              <h4 className="text-lg font-semibold text-foreground">Smart Automation Examples</h4>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-blue-500/10 border border-blue-500/30 rounded">
                <span className="text-blue-300 text-sm font-mono bg-blue-500/20 px-2 py-1 rounded">1</span>
                <span className="text-foreground text-sm">When alarm is armed → Turn on "Away" lighting routine</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-green-500/10 border border-green-500/30 rounded">
                <span className="text-green-300 text-sm font-mono bg-green-500/20 px-2 py-1 rounded">2</span>
                <span className="text-foreground text-sm">Motion detected → Send smartphone notification with timestamp</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-purple-500/10 border border-purple-500/30 rounded">
                <span className="text-purple-300 text-sm font-mono bg-purple-500/20 px-2 py-1 rounded">3</span>
                <span className="text-foreground text-sm">Voice command "Alexa, goodnight" → Arms alarm and dims lights</span>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="bg-elec-dark/50 border border-amber-500/30 rounded-lg p-5">
            <div className="mb-3">
              <h4 className="text-lg font-semibold text-foreground">Project Outcomes</h4>
            </div>
            
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="bg-green-500/10 border border-green-500/30 rounded p-3">
                <h5 className="text-green-300 font-semibold mb-1">Cost Savings</h5>
                <p className="text-foreground text-xs">
                  £400 bridge vs. £2,500 new wireless system - saved 84% while gaining smart features
                </p>
              </div>
              <div className="bg-blue-500/10 border border-blue-500/30 rounded p-3">
                <h5 className="text-blue-300 font-semibold mb-1">Reliability</h5>
                <p className="text-foreground text-xs">
                  Existing wired sensors more reliable than wireless - maintained security integrity
                </p>
              </div>
              <div className="bg-purple-500/10 border border-purple-500/30 rounded p-3">
                <h5 className="text-purple-300 font-semibold mb-1">User Satisfaction</h5>
                <p className="text-foreground text-xs">
                  Modern convenience without learning new system or losing familiar operation
                </p>
              </div>
            </div>

            <div className="mt-4 p-3 bg-amber-500/10 border border-amber-500/30 rounded">
              <p className="text-foreground text-sm">
                <strong>Client Feedback:</strong> "We got all the smart features we wanted while keeping our reliable alarm system. 
                The notifications and voice control make it feel completely modern, but we didn't lose any security or spend a fortune."
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SmartHomeModule6Section4RealWorld;