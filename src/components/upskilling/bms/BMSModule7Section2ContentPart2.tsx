import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Binary, AlertCircle, Zap, ToggleLeft } from 'lucide-react';

export const BMSModule7Section2ContentPart2 = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Binary className="h-5 w-5 text-elec-yellow" />
          Boolean Logic
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-6">
        <div>
          <h4 className="text-elec-yellow font-semibold mb-3">Foundation of Digital Control</h4>
          <p className="text-foreground mb-4">
            Boolean logic is the foundation of all digital decision-making in BMS systems. It uses conditions of 
            True (1) and False (0) to create logical decisions that control system behaviour. Every digital input, 
            output, and control decision ultimately relies on Boolean logic principles.
          </p>
        </div>

        <div>
          <h4 className="text-elec-yellow font-semibold mb-3">Core Boolean Operations</h4>
          
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
              <h5 className="text-blue-400 font-semibold mb-2 flex items-center gap-2">
                <ToggleLeft className="h-4 w-4" />
                AND Logic
              </h5>
              <div className="space-y-2 text-sm">
                <p className="text-foreground"><strong>Rule:</strong> ALL conditions must be TRUE</p>
                <div className="bg-gray-700 rounded p-2 mt-2">
                  <p className="text-xs text-foreground mb-1"><strong>Truth Table:</strong></p>
                  <div className="font-mono text-xs">
                    <div>A=0, B=0 → 0</div>
                    <div>A=0, B=1 → 0</div>
                    <div>A=1, B=0 → 0</div>
                    <div className="text-green-400">A=1, B=1 → 1</div>
                  </div>
                </div>
                <p className="text-xs text-foreground mt-2">
                  <strong>Example:</strong> Pump runs only if (Power ON) AND (Level OK)
                </p>
              </div>
            </div>
            
            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
              <h5 className="text-green-400 font-semibold mb-2 flex items-center gap-2">
                <Zap className="h-4 w-4" />
                OR Logic
              </h5>
              <div className="space-y-2 text-sm">
                <p className="text-foreground"><strong>Rule:</strong> ANY condition can be TRUE</p>
                <div className="bg-gray-700 rounded p-2 mt-2">
                  <p className="text-xs text-foreground mb-1"><strong>Truth Table:</strong></p>
                  <div className="font-mono text-xs">
                    <div>A=0, B=0 → 0</div>
                    <div className="text-green-400">A=0, B=1 → 1</div>
                    <div className="text-green-400">A=1, B=0 → 1</div>
                    <div className="text-green-400">A=1, B=1 → 1</div>
                  </div>
                </div>
                <p className="text-xs text-foreground mt-2">
                  <strong>Example:</strong> Alarm sounds if (High Temp) OR (Low Flow)
                </p>
              </div>
            </div>
            
            <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
              <h5 className="text-purple-400 font-semibold mb-2 flex items-center gap-2">
                <Binary className="h-4 w-4" />
                NOT Logic
              </h5>
              <div className="space-y-2 text-sm">
                <p className="text-foreground"><strong>Rule:</strong> INVERTS the input</p>
                <div className="bg-gray-700 rounded p-2 mt-2">
                  <p className="text-xs text-foreground mb-1"><strong>Truth Table:</strong></p>
                  <div className="font-mono text-xs">
                    <div>A=0 → 1</div>
                    <div>A=1 → 0</div>
                  </div>
                </div>
                <p className="text-xs text-foreground mt-2">
                  <strong>Example:</strong> NOT(Door Closed) = Door Open
                </p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-elec-yellow font-semibold mb-3">Advanced Boolean Operations</h4>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4">
              <h5 className="text-orange-400 font-semibold mb-2">NAND (NOT AND)</h5>
              <div className="space-y-2 text-sm">
                <p className="text-foreground">Output is TRUE unless ALL inputs are TRUE</p>
                <p className="text-xs text-foreground">Common in safety systems - output fails safe when all conditions are met</p>
                <div className="bg-gray-700 rounded p-2 mt-2">
                  <p className="text-xs"><strong>Example:</strong> Safety relay deactivates only when all guards are closed</p>
                </div>
              </div>
            </div>
            
            <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-4">
              <h5 className="text-cyan-400 font-semibold mb-2">XOR (Exclusive OR)</h5>
              <div className="space-y-2 text-sm">
                <p className="text-foreground">Output TRUE when inputs are DIFFERENT</p>
                <p className="text-xs text-foreground">Useful for changeover operations and conflict detection</p>
                <div className="bg-gray-700 rounded p-2 mt-2">
                  <p className="text-xs"><strong>Example:</strong> Heating OR cooling, but never both simultaneously</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-elec-yellow font-semibold mb-3">Practical BMS Applications</h4>
          
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-blue-500/10 to-green-500/10 border border-blue-500/20 rounded-lg p-4">
              <h5 className="text-blue-400 font-semibold mb-2">Pump Control Example</h5>
              <div className="bg-gray-700 rounded-lg p-3 text-sm">
                <p className="text-foreground mb-2"><strong>Requirement:</strong> Pump allowed to run if system ON AND level switch safe</p>
                <div className="space-y-2">
                  <p><strong>Boolean Expression:</strong> Pump Run = (System ON) AND (Low Level Switch Safe)</p>
                  <div className="mt-2">
                    <p className="text-green-400"><strong>Scenario 1:</strong> System=ON, Level=Safe → Pump=RUN</p>
                    <p className="text-red-400"><strong>Scenario 2:</strong> System=ON, Level=Low → Pump=STOP</p>
                    <p className="text-red-400"><strong>Scenario 3:</strong> System=OFF, Level=Safe → Pump=STOP</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-yellow-500/10 to-red-500/10 border border-yellow-500/20 rounded-lg p-4">
              <h5 className="text-yellow-400 font-semibold mb-2">Fire Safety Logic</h5>
              <div className="bg-gray-700 rounded-lg p-3 text-sm">
                <p className="text-foreground mb-2"><strong>Requirement:</strong> Smoke extract fan runs if fire detected OR manual activation</p>
                <div className="space-y-2">
                  <p><strong>Boolean Expression:</strong> Extract Fan = (Fire Alarm) OR (Manual Start) AND NOT(Isolation Switch)</p>
                  <div className="mt-2">
                    <p className="text-green-400"><strong>Normal Operation:</strong> Manual or automatic activation possible</p>
                    <p className="text-red-400"><strong>Maintenance:</strong> Isolation switch overrides all other commands</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-elec-yellow font-semibold mb-3">Complex Logic Combinations</h4>
          
          <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-lg p-4">
            <h5 className="text-purple-400 font-semibold mb-2">AHU Control Logic Example</h5>
            <div className="space-y-3 text-sm">
              <div className="bg-gray-700 rounded-lg p-3">
                <p className="text-foreground mb-2"><strong>Complex Boolean Expression:</strong></p>
                <div className="font-mono text-xs text-foreground bg-black rounded p-2">
                  Fan Run = (Schedule ON) AND (Fire Alarm Safe) AND <br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;((Auto Mode AND Temp &gt; Setpoint) OR Manual Override) AND <br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;NOT(Emergency Stop)
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-3">
                <div>
                  <p className="text-foreground font-semibold mb-1">This logic ensures:</p>
                  <ul className="ml-4 space-y-1 text-xs">
                    <li>• Fan only runs during scheduled hours</li>
                    <li>• Fire safety takes priority</li>
                    <li>• Auto or manual operation possible</li>
                    <li>• Emergency stop overrides everything</li>
                  </ul>
                </div>
                <div>
                  <p className="text-foreground font-semibold mb-1">Testing requirements:</p>
                  <ul className="ml-4 space-y-1 text-xs">
                    <li>• Verify each input condition</li>
                    <li>• Test override functions</li>
                    <li>• Confirm fail-safe operation</li>
                    <li>• Document all logic paths</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="text-foreground font-semibold mb-2">Inline Check</h4>
              <p className="text-sm text-foreground mb-2">
                👉 Why is Boolean logic fundamental for BMS programming?
              </p>
              <p className="text-xs text-foreground">
                <strong>Answer:</strong> Boolean logic provides the foundation for all digital decision-making in BMS systems. 
                It allows complex control sequences to be broken down into simple True/False decisions that can be 
                implemented reliably in digital controllers. Every input condition, safety interlock, and control 
                decision ultimately uses Boolean logic principles.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};