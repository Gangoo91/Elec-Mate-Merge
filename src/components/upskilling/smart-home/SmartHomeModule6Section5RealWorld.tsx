import { Card, CardContent } from '@/components/ui/card';

const SmartHomeModule6Section5RealWorld = () => {
  return (
    <Card className="bg-elec-gray border-transparent">
      <CardContent className="p-6">
        <h2 className="text-2xl font-bold text-foreground mb-6">Real World Example</h2>
        
        <div className="space-y-6">
          {/* Case Study Header */}
          <div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Glasgow Multi-Brand System Integration</h3>
            <p className="text-foreground">
              A client in Glasgow had accumulated smart home devices over several years: Philips Hue lights, 
              a Ring doorbell, and a Hive heating system — each with its own hub and app. Scenes regularly 
              failed because Alexa commands conflicted with the different hubs, causing frustration and 
              reduced system reliability.
            </p>
          </div>

          {/* Original Problem */}
          <div className="bg-elec-dark/50 border border-red-500/30 rounded-lg p-5">
            <div className="mb-3">
              <h4 className="text-lg font-semibold text-foreground">The Problem Situation</h4>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h5 className="text-foreground font-semibold mb-2">Existing System</h5>
                <div className="space-y-1 text-sm text-foreground">
                  <div>• Philips Hue Bridge controlling 12 lights</div>
                  <div>• Ring Bridge managing doorbell and cameras</div>
                  <div>• Hive Hub controlling heating system</div>
                  <div>• Three separate mobile apps required</div>
                  <div>• Alexa integrated with all three systems</div>
                </div>
              </div>
              <div>
                <h5 className="text-foreground font-semibold mb-2">Conflict Symptoms</h5>
                <div className="space-y-1 text-sm text-foreground">
                  <div>• "Good morning" scene only worked 50% of time</div>
                  <div>• Duplicate device names in Alexa app</div>
                  <div>• Heating commands interfered with lighting</div>
                  <div>• 10-15 second delays in scene activation</div>
                  <div>• Client frustrated with system reliability</div>
                </div>
              </div>
            </div>
          </div>

          {/* Solution Implementation */}
          <div className="bg-elec-dark/50 border border-green-500/30 rounded-lg p-5">
            <div className="mb-4">
              <h4 className="text-lg font-semibold text-foreground">Solution Implementation</h4>
            </div>
            
            <div className="space-y-4">
              <div className="bg-green-500/10 border border-green-500/30 rounded p-3">
                <h5 className="text-green-300 font-semibold mb-2">Step 1: Hub Consolidation</h5>
                <p className="text-foreground text-sm mb-2">
                  Electrician installed a Samsung SmartThings hub as the primary controller and integrated existing devices.
                </p>
                <div className="space-y-1 text-xs text-foreground">
                  <div>• Connected Hue lights directly to SmartThings (Zigbee)</div>
                  <div>• Integrated Ring devices via SmartThings app</div>
                  <div>• Added Hive heating through cloud integration</div>
                  <div>• Created unified device naming convention</div>
                </div>
              </div>
              
              <div className="bg-blue-500/10 border border-blue-500/30 rounded p-3">
                <h5 className="text-blue-300 font-semibold mb-2">Step 2: Firmware Updates</h5>
                <div className="grid md:grid-cols-2 gap-2 text-xs text-foreground">
                  <div>• Updated all Hue bulb firmware</div>
                  <div>• Upgraded Ring doorbell software</div>
                  <div>• Applied SmartThings hub updates</div>
                  <div>• Refreshed Alexa skill integrations</div>
                </div>
              </div>
              
              <div className="bg-purple-500/10 border border-purple-500/30 rounded p-3">
                <h5 className="text-purple-300 font-semibold mb-2">Step 3: Clean Integration</h5>
                <p className="text-foreground text-sm">
                  Removed duplicate Alexa integrations and rebuilt scenes using SmartThings as the single control point, 
                  eliminating competing automation rules and device conflicts.
                </p>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="bg-elec-dark/50 border border-blue-500/30 rounded-lg p-5">
            <div className="mb-3">
              <h4 className="text-lg font-semibold text-foreground">Project Results</h4>
            </div>
            
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="bg-green-500/10 border border-green-500/30 rounded p-3">
                <h5 className="text-green-300 font-semibold mb-1">Reliability Improvement</h5>
                <p className="text-foreground text-xs">
                  Scenes now work 95%+ of the time with consistent 2-3 second response times
                </p>
              </div>
              <div className="bg-blue-500/10 border border-blue-500/30 rounded p-3">
                <h5 className="text-blue-300 font-semibold mb-1">User Experience</h5>
                <p className="text-foreground text-xs">
                  Single SmartThings app for daily control, with original apps only for device-specific settings
                </p>
              </div>
              <div className="bg-purple-500/10 border border-purple-500/30 rounded p-3">
                <h5 className="text-purple-300 font-semibold mb-1">System Performance</h5>
                <p className="text-foreground text-xs">
                  Faster response times, no duplicate notifications, simplified voice commands
                </p>
              </div>
            </div>

            <div className="mt-4 p-3 bg-green-500/10 border border-green-500/30 rounded">
              <p className="text-foreground text-sm">
                <strong>Client Feedback:</strong> "The system finally works the way I expected it to from the beginning. 
                One app controls everything, and my voice commands actually work reliably. The electrician explained 
                why the old setup had problems and showed me how to avoid similar issues in the future."
              </p>
            </div>
          </div>

          {/* Key Lessons */}
          <div className="bg-elec-dark/50 border border-amber-500/30 rounded-lg p-5">
            <div className="mb-3">
              <h4 className="text-lg font-semibold text-foreground">Key Lessons Learned</h4>
            </div>
            
            <div className="space-y-2 text-sm text-foreground">
              <div><strong className="text-amber-400">Consolidation Works:</strong> Single hub control eliminated most conflicts</div>
              <div><strong className="text-blue-400">Firmware Matters:</strong> Updates resolved several compatibility issues</div>
              <div><strong className="text-green-400">Clean Integration:</strong> Removing duplicates improved reliability significantly</div>
              <div><strong className="text-purple-400">Client Education:</strong> Understanding the solution helped prevent future problems</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SmartHomeModule6Section5RealWorld;