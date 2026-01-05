import { Card, CardContent } from '@/components/ui/card';
import { Search, CheckCircle, AlertCircle, TrendingUp } from 'lucide-react';

const SmartHomeModule6Section4Practical = () => {
  return (
    <Card className="bg-elec-gray border-transparent">
      <CardContent className="p-6">
        <h2 className="text-2xl font-bold text-foreground mb-6">Practical Guidance</h2>
        <p className="text-foreground mb-6">As an electrician, follow this systematic approach for legacy system integration:</p>
        
        <div className="grid gap-5">
          {/* Survey Existing Systems */}
          <div className="bg-elec-dark/50 border border-elec-yellow/20 rounded-lg p-5">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Survey Existing Systems</h3>
                <p className="text-foreground mb-3">Conduct a thorough assessment before recommending any solutions.</p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-foreground">
                    <span className="w-2 h-2 bg-elec-yellow rounded-full flex-shrink-0"></span>
                    <span><strong>Document all existing systems:</strong> Age, manufacturer, model numbers, protocols</span>
                  </div>
                  <div className="flex items-center gap-2 text-foreground">
                    <span className="w-2 h-2 bg-elec-yellow rounded-full flex-shrink-0"></span>
                    <span><strong>Test current functionality:</strong> What works, what doesn't, reliability issues</span>
                  </div>
                  <div className="flex items-center gap-2 text-foreground">
                    <span className="w-2 h-2 bg-elec-yellow rounded-full flex-shrink-0"></span>
                    <span><strong>Identify wiring and connections:</strong> Available terminals, power requirements</span>
                  </div>
                  <div className="flex items-center gap-2 text-foreground">
                    <span className="w-2 h-2 bg-elec-yellow rounded-full flex-shrink-0"></span>
                    <span><strong>Research compatibility:</strong> Available bridges, supported features</span>
                  </div>
              </div>
            </div>

          {/* Check Bridge Availability */}
          <div className="bg-elec-dark/50 border border-elec-yellow/20 rounded-lg p-5">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Research Bridging Options</h3>
                <p className="text-foreground mb-3">Investigate whether suitable bridging solutions exist.</p>
                <div className="grid md:grid-cols-2 gap-3">
                  <div className="bg-green-500/10 border border-green-500/30 rounded p-3">
                    <h4 className="text-green-300 font-semibold text-sm mb-1">Check Manufacturer Support</h4>
                    <p className="text-foreground text-xs">Official bridges, firmware updates, technical documentation</p>
                  </div>
                  <div className="bg-blue-500/10 border border-blue-500/30 rounded p-3">
                    <h4 className="text-blue-300 font-semibold text-sm mb-1">Third-Party Solutions</h4>
                    <p className="text-foreground text-xs">Community integrations, universal bridges, protocol converters</p>
                  </div>
                </div>
              </div>
            </div>

          {/* Set Clear Expectations */}
          <div className="bg-elec-dark/50 border border-elec-yellow/20 rounded-lg p-5">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Set Clear Expectations</h3>
                <p className="text-foreground mb-3">Be transparent about limitations and functionality differences.</p>
                <div className="space-y-3">
                  <div className="bg-amber-500/10 border border-amber-500/30 rounded p-3">
                    <h4 className="text-amber-300 font-semibold text-sm mb-2">Client Communication Points</h4>
                    <div className="space-y-1 text-xs text-foreground">
                      <div>• Explain what features will and won't work</div>
                      <div>• Discuss reliability compared to new devices</div>
                      <div>• Clarify ongoing maintenance requirements</div>
                      <div>• Provide cost comparison with replacement options</div>
                    </div>
                  </div>
                  
                  <div className="bg-red-500/10 border border-red-500/30 rounded p-3">
                    <p className="text-foreground text-sm">
                      <strong>Example:</strong> "Your old alarm will get basic smart features like notifications, 
                      but you'll only get 'armed/disarmed' status, not individual sensor details like new systems provide."
                    </p>
                  </div>
                </div>
              </div>
            </div>

          {/* Gradual Upgrade Strategy */}
          <div className="bg-elec-dark/50 border border-elec-yellow/20 rounded-lg p-5">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Recommend Gradual Upgrades</h3>
                <p className="text-foreground mb-3">Suggest a phased approach to modernisation over time.</p>
                <div className="space-y-2 text-sm text-foreground">
                  <div><strong className="text-blue-400">Phase 1:</strong> Bridge critical systems (security, heating)</div>
                  <div><strong className="text-green-400">Phase 2:</strong> Replace high-use devices (lighting, commonly used switches)</div>
                  <div><strong className="text-purple-400">Phase 3:</strong> Full system replacement when budget allows</div>
                </div>
                
                <div className="mt-3 p-3 bg-green-500/10 border border-green-500/30 rounded">
                  <p className="text-foreground text-sm">
                    <strong>Benefit:</strong> This approach spreads costs over time while providing immediate smart home benefits 
                    and allows clients to experience modern features before full commitment.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SmartHomeModule6Section4Practical;