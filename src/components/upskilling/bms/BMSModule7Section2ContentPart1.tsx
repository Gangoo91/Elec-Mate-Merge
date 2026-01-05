import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Square, AlertCircle, Zap, Timer, GitBranch } from 'lucide-react';

export const BMSModule7Section2ContentPart1 = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Square className="h-5 w-5 text-elec-yellow" />
          Function Blocks
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-6">
        <div>
          <h4 className="text-elec-yellow font-semibold mb-3">What are Function Blocks?</h4>
          <p className="text-foreground mb-4">
            Function blocks are graphical building blocks used to create control logic in BMS programming. They represent 
            specific functions or operations that process inputs and generate outputs, making complex control sequences 
            easier to understand and maintain.
          </p>
        </div>

        <div>
          <h4 className="text-elec-yellow font-semibold mb-3">Common Function Block Types</h4>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
              <h5 className="text-blue-400 font-semibold mb-2 flex items-center gap-2">
                <GitBranch className="h-4 w-4" />
                Logic Gates
              </h5>
              <ul className="space-y-2 text-sm">
                <li>• <strong>AND gates:</strong> All inputs must be true for output</li>
                <li>• <strong>OR gates:</strong> Any input true gives true output</li>
                <li>• <strong>NAND gates:</strong> Inverted AND logic</li>
                <li>• <strong>NOT gates:</strong> Inverts input signal</li>
                <li>• <strong>XOR gates:</strong> Exclusive OR logic</li>
              </ul>
            </div>
            
            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
              <h5 className="text-green-400 font-semibold mb-2 flex items-center gap-2">
                <Timer className="h-4 w-4" />
                Timing Functions
              </h5>
              <ul className="space-y-2 text-sm">
                <li>• <strong>On-delay timers:</strong> Delay before output activates</li>
                <li>• <strong>Off-delay timers:</strong> Delay before output deactivates</li>
                <li>• <strong>Pulse timers:</strong> Generate timed pulses</li>
                <li>• <strong>Clock functions:</strong> Scheduled operations</li>
                <li>• <strong>Counters:</strong> Count events or cycles</li>
              </ul>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-elec-yellow font-semibold mb-3">Additional Function Block Categories</h4>
          
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4">
              <h5 className="text-orange-400 font-semibold mb-2">Comparison</h5>
              <ul className="space-y-1 text-sm">
                <li>• Greater than (&gt;)</li>
                <li>• Less than (&lt;)</li>
                <li>• Equal to (=)</li>
                <li>• Range checks</li>
                <li>• Limit switches</li>
              </ul>
            </div>
            
            <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
              <h5 className="text-purple-400 font-semibold mb-2">Mathematical</h5>
              <ul className="space-y-1 text-sm">
                <li>• Add/Subtract</li>
                <li>• Multiply/Divide</li>
                <li>• Averaging</li>
                <li>• Min/Max selection</li>
                <li>• Square root</li>
              </ul>
            </div>
            
            <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-4">
              <h5 className="text-cyan-400 font-semibold mb-2">Control</h5>
              <ul className="space-y-1 text-sm">
                <li>• Switching blocks</li>
                <li>• Multiplexers</li>
                <li>• Signal selectors</li>
                <li>• Override functions</li>
                <li>• Interlock blocks</li>
              </ul>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-elec-yellow font-semibold mb-3">Practical Example: AHU Fan Control</h4>
          
          <div className="bg-gradient-to-r from-blue-500/10 to-green-500/10 border border-blue-500/20 rounded-lg p-4">
            <h5 className="text-blue-400 font-semibold mb-2">Function Block Logic Chain</h5>
            <div className="space-y-3 text-sm">
              <div className="bg-gray-700 rounded-lg p-3">
                <p className="text-foreground mb-2"><strong>Scenario:</strong> AHU supply fan control with safety interlocks</p>
                <div className="space-y-2">
                  <p><strong>Input Conditions:</strong></p>
                  <ul className="ml-4 space-y-1">
                    <li>• System enabled (digital input)</li>
                    <li>• Fire alarm status = Safe (digital input)</li>
                    <li>• Filter differential pressure OK (analog comparison)</li>
                    <li>• Manual override switch (digital input)</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-gray-700 rounded-lg p-3">
                <p className="text-foreground mb-2"><strong>Function Block Chain:</strong></p>
                <ol className="ml-4 space-y-1">
                  <li>1. <strong>Comparator Block:</strong> Filter DP &lt; 500Pa → Filter OK</li>
                  <li>2. <strong>AND Block:</strong> (System Enabled) AND (Fire Safe) AND (Filter OK) → Auto Run</li>
                  <li>3. <strong>OR Block:</strong> (Auto Run) OR (Manual Override) → Fan Run Command</li>
                  <li>4. <strong>Timer Block:</strong> 5-second delay before fan start → Output to relay</li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-elec-yellow font-semibold mb-3">Benefits of Function Block Programming</h4>
          
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-lg p-4">
              <h5 className="text-green-400 font-semibold mb-2">Visual Understanding</h5>
              <ul className="space-y-2 text-sm">
                <li>• <strong>Graphical representation:</strong> Easy to follow signal flow</li>
                <li>• <strong>Standardised symbols:</strong> Universal understanding across systems</li>
                <li>• <strong>Clear connections:</strong> Input/output relationships are obvious</li>
                <li>• <strong>Troubleshooting:</strong> Can trace signals through visual blocks</li>
              </ul>
            </div>
            
            <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-lg p-4">
              <h5 className="text-yellow-400 font-semibold mb-2">Maintenance Advantages</h5>
              <ul className="space-y-2 text-sm">
                <li>• <strong>Modular approach:</strong> Individual blocks can be tested separately</li>
                <li>• <strong>Reusable components:</strong> Standard blocks used across projects</li>
                <li>• <strong>Documentation:</strong> Self-documenting visual logic</li>
                <li>• <strong>Commissioning support:</strong> Electricians can verify block functions</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="text-foreground font-semibold mb-2">Inline Check</h4>
              <p className="text-sm text-foreground mb-2">
                👉 What is the purpose of using function blocks instead of traditional coding?
              </p>
              <p className="text-xs text-foreground">
                <strong>Answer:</strong> Function blocks provide a visual, graphical approach that's easier to understand, 
                troubleshoot, and maintain. They use standardised symbols and clear signal flow that electricians and 
                engineers can quickly interpret, making commissioning and maintenance more efficient than traditional 
                text-based programming.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};