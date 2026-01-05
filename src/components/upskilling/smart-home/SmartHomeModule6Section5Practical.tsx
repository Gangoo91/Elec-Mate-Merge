import { Card, CardContent } from '@/components/ui/card';

const SmartHomeModule6Section5Practical = () => {
  return (
    <Card className="bg-elec-gray border-transparent">
      <CardContent className="p-6">
        <h2 className="text-2xl font-bold text-foreground mb-6">Practical Guidance</h2>
        <p className="text-foreground mb-6">Essential practices for electricians when troubleshooting ecosystem conflicts:</p>
        
        <div className="grid gap-5">
          {/* Start Simple */}
          <div className="bg-elec-dark/50 border border-elec-yellow/20 rounded-lg p-5">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Start with Simple Solutions First</h3>
              <p className="text-foreground mb-3">Begin troubleshooting with the most basic fixes before moving to complex solutions.</p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-foreground">
                  <span className="w-2 h-2 bg-elec-yellow rounded-full flex-shrink-0"></span>
                  <span><strong>Power cycle devices:</strong> Turn off/on individual devices and hubs</span>
                </div>
                <div className="flex items-center gap-2 text-foreground">
                  <span className="w-2 h-2 bg-elec-yellow rounded-full flex-shrink-0"></span>
                  <span><strong>Check network connectivity:</strong> Wi-Fi signal strength and stability</span>
                </div>
                <div className="flex items-center gap-2 text-foreground">
                  <span className="w-2 h-2 bg-elec-yellow rounded-full flex-shrink-0"></span>
                  <span><strong>Verify basic device operation:</strong> Manual controls work properly</span>
                </div>
                <div className="flex items-center gap-2 text-foreground">
                  <span className="w-2 h-2 bg-elec-yellow rounded-full flex-shrink-0"></span>
                  <span><strong>Test individual apps:</strong> Each device works in its native app</span>
                </div>
              </div>
            </div>
          </div>

          {/* Client Communication */}
          <div className="bg-elec-dark/50 border border-elec-yellow/20 rounded-lg p-5">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Keep Clients Informed</h3>
              <p className="text-foreground mb-3">Explain the troubleshooting process so clients understand why conflicts happen.</p>
              <div className="grid md:grid-cols-2 gap-3">
                <div className="bg-blue-500/10 border border-blue-500/30 rounded p-3">
                  <h4 className="text-blue-300 font-semibold text-sm mb-1">What to Explain</h4>
                  <div className="text-foreground text-xs space-y-1">
                    <div>• Why multiple brands can cause issues</div>
                    <div>• How different protocols affect integration</div>
                    <div>• Why some fixes take time to implement</div>
                    <div>• Expected improvement timeline</div>
                  </div>
                </div>
                <div className="bg-green-500/10 border border-green-500/30 rounded p-3">
                  <h4 className="text-green-300 font-semibold text-sm mb-1">Communication Benefits</h4>
                  <p className="text-foreground text-xs">
                    Clients who understand the process are more patient and less likely to interfere with troubleshooting
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Support Packages */}
          <div className="bg-elec-dark/50 border border-elec-yellow/20 rounded-lg p-5">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Offer Ongoing Support</h3>
              <p className="text-foreground mb-3">Provide maintenance packages for clients with complex multi-brand systems.</p>
              <div className="space-y-3">
                <div className="bg-purple-500/10 border border-purple-500/30 rounded p-3">
                  <h4 className="text-purple-300 font-semibold text-sm mb-2">Support Package Components</h4>
                  <div className="space-y-1 text-xs text-foreground">
                    <div>• Quarterly system health checks</div>
                    <div>• Firmware update management</div>
                    <div>• Priority troubleshooting support</div>
                    <div>• Device replacement recommendations</div>
                    <div>• System expansion planning</div>
                  </div>
                </div>
                
                <div className="bg-amber-500/10 border border-amber-500/30 rounded p-3">
                  <p className="text-foreground text-sm">
                    <strong>Value Proposition:</strong> Proactive maintenance prevents conflicts and ensures long-term 
                    system reliability, reducing emergency service calls.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Design for Simplicity */}
          <div className="bg-elec-dark/50 border border-elec-yellow/20 rounded-lg p-5">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Design for Compatibility</h3>
              <p className="text-foreground mb-3">Plan systems with compatibility and simplicity in mind from the start.</p>
              <div className="space-y-2 text-sm text-foreground">
                <div><strong className="text-green-400">Planning Phase:</strong> Choose compatible devices and protocols during design</div>
                <div><strong className="text-blue-400">Installation Phase:</strong> Configure single primary control system</div>
                <div><strong className="text-purple-400">Testing Phase:</strong> Verify all integrations work before client handover</div>
                <div><strong className="text-amber-400">Documentation Phase:</strong> Provide clear operation and troubleshooting guides</div>
              </div>
              
              <div className="mt-3 p-3 bg-green-500/10 border border-green-500/30 rounded">
                <p className="text-foreground text-sm">
                  <strong>Key Principle:</strong> Prevention through good design is always more cost-effective 
                  than troubleshooting after installation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SmartHomeModule6Section5Practical;