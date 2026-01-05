import { Target, Zap, CheckSquare, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const InsulationTestMethodsPractical = () => {
  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Target className="h-5 w-5 text-elec-yellow" />
          Practical Test Method Guidelines
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        
        {/* Testing sequence for different installation types */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground mb-4">Recommended Testing Sequences</h3>
          
          <div className="grid gap-4">
            {/* Single phase domestic */}
            <div className="p-4 rounded-lg bg-blue-600/10 border border-blue-600/20">
              <h4 className="font-medium text-blue-200 mb-3 flex items-center gap-2">
                <Zap className="h-4 w-4" />
                Single-Phase Domestic Installation
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-3">
                  <Badge variant="secondary" className="bg-blue-600/20 text-blue-200 min-w-12">1</Badge>
                  <span className="text-foreground text-sm">Test L1-N</span>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="secondary" className="bg-blue-600/20 text-blue-200 min-w-12">2</Badge>
                  <span className="text-foreground text-sm">Test Line to Earth (L-E)</span>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="secondary" className="bg-blue-600/20 text-blue-200 min-w-12">3</Badge>
                  <span className="text-foreground text-sm">Test Neutral to Earth (N-E)</span>
                </div>
              </div>
            </div>

            {/* Three phase industrial */}
            <div className="p-4 rounded-lg bg-green-600/10 border border-green-600/20">
              <h4 className="font-medium text-green-200 mb-3 flex items-center gap-2">
                <Zap className="h-4 w-4" />
                Three-Phase Industrial Installation
              </h4>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div className="space-y-2">
                  <p className="font-medium text-green-200">Phase to Phase</p>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="bg-green-600/20 text-green-200 text-xs">1</Badge>
                      <span className="text-foreground">L1-L2</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="bg-green-600/20 text-green-200 text-xs">2</Badge>
                      <span className="text-foreground">L1-L3</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="bg-green-600/20 text-green-200 text-xs">3</Badge>
                      <span className="text-foreground">L2-L3</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="font-medium text-green-200">Phase to Neutral</p>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="bg-green-600/20 text-green-200 text-xs">4</Badge>
                      <span className="text-foreground">L1-N</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="bg-green-600/20 text-green-200 text-xs">5</Badge>
                      <span className="text-foreground">L2-N</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="bg-green-600/20 text-green-200 text-xs">6</Badge>
                      <span className="text-foreground">L3-N</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="font-medium text-green-200">Phase to Earth</p>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="bg-green-600/20 text-green-200 text-xs">7</Badge>
                      <span className="text-foreground">L1-E</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="bg-green-600/20 text-green-200 text-xs">8</Badge>
                      <span className="text-foreground">L2-E</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="bg-green-600/20 text-green-200 text-xs">9</Badge>
                      <span className="text-foreground">L3-E</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Alternative test methods */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Alternative Test Methods</h3>
          
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-yellow-600/10 border border-yellow-600/20">
              <h4 className="font-medium text-yellow-200 mb-3 flex items-center gap-2">
                <AlertCircle className="h-4 w-4" />
                L+N to E Testing (When Individual Testing Not Possible)
              </h4>
              <div className="space-y-3">
                <p className="text-foreground text-sm">
                  When equipment cannot be disconnected or individual conductor access is limited, 
                  connect Line and Neutral together and test as a combined unit to Earth.
                </p>
                <div className="bg-yellow-600/10 border border-yellow-600/30 rounded p-3">
                  <p className="text-yellow-200 text-sm font-medium mb-2">Important Limitations:</p>
                  <ul className="text-foreground text-xs space-y-1">
                    <li>• Cannot identify which specific conductor has the fault</li>
                    <li>• May mask problems by providing parallel resistance paths</li>
                    <li>• Must be documented as a limitation in test results</li>
                    <li>• Consider follow-up individual testing when possible</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-purple-600/10 border border-purple-600/20">
              <h4 className="font-medium text-purple-200 mb-3">Motor and Control Circuit Testing</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="font-medium text-purple-200 text-sm mb-2">Motor Circuits:</p>
                  <ul className="text-foreground text-sm space-y-1">
                    <li>• Disconnect motor at local isolator</li>
                    <li>• Test supply cables separately</li>
                    <li>• Test motor windings per manufacturer specs</li>
                    <li>• Check motor terminal connections</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-purple-200 text-sm mb-2">Control Circuits:</p>
                  <ul className="text-foreground text-sm space-y-1">
                    <li>• Use appropriate test voltage (often 250V for low voltage)</li>
                    <li>• Disconnect sensitive control equipment</li>
                    <li>• Test control cables separately from equipment</li>
                    <li>• Document control voltage levels</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Practical tips */}
        <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-4">
          <h3 className="text-green-200 font-medium mb-3 flex items-center gap-2">
            <CheckSquare className="h-4 w-4" />
            Practical Testing Tips
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <p className="font-medium text-green-200 text-sm">Efficiency Tips:</p>
              <ul className="text-foreground text-sm space-y-1">
                <li>• Test systematically - same sequence every time</li>
                <li>• Use test lead extensions for hard-to-reach terminals</li>
                <li>• Label test points clearly before starting</li>
                <li>• Keep a checklist to avoid missing combinations</li>
                <li>• Document equipment disconnections as you go</li>
              </ul>
            </div>
            <div className="space-y-2">
              <p className="font-medium text-green-200 text-sm">Accuracy Tips:</p>
              <ul className="text-foreground text-sm space-y-1">
                <li>• Ensure good contact at test points</li>
                <li>• Clean terminals before testing if necessary</li>
                <li>• Allow readings to stabilise fully</li>
                <li>• Repeat questionable readings</li>
                <li>• Note environmental conditions affecting results</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Common mistakes to avoid */}
        <div className="bg-red-600/10 border border-red-600/20 rounded-lg p-4">
          <h3 className="text-red-200 font-medium mb-3 flex items-center gap-2">
            <AlertCircle className="h-4 w-4" />
            Common Mistakes to Avoid
          </h3>
          <div className="space-y-3">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <ul className="text-foreground text-sm space-y-2">
                  <li>• <strong>Not disconnecting electronic equipment</strong> - Can damage equipment and give false readings</li>
                  <li>• <strong>Using wrong test voltage</strong> - Check circuit voltage rating before selecting test voltage</li>
                  <li>• <strong>Insufficient contact time</strong> - Not allowing readings to stabilise leads to inaccurate results</li>
                </ul>
              </div>
              <div>
                <ul className="text-foreground text-sm space-y-2">
                  <li>• <strong>Missing conductor combinations</strong> - Incomplete testing may miss specific faults</li>
                  <li>• <strong>Poor terminal contact</strong> - Dirty or loose connections affect reading accuracy</li>
                  <li>• <strong>Not documenting limitations</strong> - Failing to record when standard procedures weren't followed</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

      </CardContent>
    </Card>
  );
};