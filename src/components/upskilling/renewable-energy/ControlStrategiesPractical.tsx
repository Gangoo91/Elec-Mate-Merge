import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Settings, Zap, FileText, AlertTriangle } from 'lucide-react';

const ControlStrategiesPractical = () => {
  return (
    <Card className="bg-elec-gray border-gray-600">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Settings className="h-5 w-5 text-elec-yellow" />
          Control Strategies Practical Guide
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="selection" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-elec-dark">
            <TabsTrigger value="selection" className="data-[state=active]:bg-elec-yellow data-[state=active]:text-elec-dark">
              <Settings className="h-4 w-4 mr-1" />
              ATS Selection
            </TabsTrigger>
            <TabsTrigger value="configuration" className="data-[state=active]:bg-elec-yellow data-[state=active]:text-elec-dark">
              <Zap className="h-4 w-4 mr-1" />
              Configuration
            </TabsTrigger>
            <TabsTrigger value="programming" className="data-[state=active]:bg-elec-yellow data-[state=active]:text-elec-dark">
              <FileText className="h-4 w-4 mr-1" />
              Programming
            </TabsTrigger>
            <TabsTrigger value="troubleshooting" className="data-[state=active]:bg-elec-yellow data-[state=active]:text-elec-dark">
              <AlertTriangle className="h-4 w-4 mr-1" />
              Troubleshooting
            </TabsTrigger>
          </TabsList>

          <TabsContent value="selection" className="space-y-4">
            <div className="bg-elec-dark p-4 rounded-lg">
              <h3 className="text-elec-yellow font-semibold mb-3">Automatic Transfer Switch Selection Guide</h3>
              <div className="space-y-4 text-sm">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-800 p-3 rounded">
                    <h4 className="text-foreground font-medium mb-2">Open Transition ATS</h4>
                    <div className="text-gray-300 space-y-1">
                      <p><strong>Best for:</strong> General loads, cost-sensitive applications</p>
                      <p><strong>Switching time:</strong> 50-100ms break</p>
                      <p><strong>Cost:</strong> £500-2,000 (residential)</p>
                      <p><strong>Applications:</strong> Heating, lighting, standard appliances</p>
                    </div>
                  </div>
                  <div className="bg-gray-800 p-3 rounded">
                    <h4 className="text-foreground font-medium mb-2">Closed Transition ATS</h4>
                    <div className="text-gray-300 space-y-1">
                      <p><strong>Best for:</strong> Critical/sensitive loads</p>
                      <p><strong>Switching time:</strong> Seamless transfer</p>
                      <p><strong>Cost:</strong> £1,500-5,000+ (residential)</p>
                      <p><strong>Applications:</strong> Medical equipment, servers, precision tools</p>
                    </div>
                  </div>
                </div>
                <div className="border border-gray-600 p-3 rounded">
                  <h4 className="text-foreground font-medium mb-2">Sizing Calculation Worksheet</h4>
                  <div className="grid grid-cols-3 gap-3 text-gray-300">
                    <div>
                      <p className="font-medium text-foreground">Step 1: Continuous Load</p>
                      <p>Sum all continuous loads: ___A</p>
                      <p>Apply 125% factor: ___A</p>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Step 2: Starting Loads</p>
                      <p>Largest motor: ___A × 6 = ___A</p>
                      <p>Other motors: ___A × 1.25 = ___A</p>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Step 3: Total Requirement</p>
                      <p>Maximum of continuous or starting</p>
                      <p><strong className="text-elec-yellow">ATS Rating: ___A</strong></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="configuration" className="space-y-4">
            <div className="bg-elec-dark p-4 rounded-lg">
              <h3 className="text-elec-yellow font-semibold mb-3">ATS Configuration Setup</h3>
              <div className="space-y-4 text-sm">
                <div className="border border-gray-600 p-3 rounded">
                  <h4 className="text-foreground font-medium mb-2">Voltage Monitoring Settings</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="text-gray-300">
                      <p className="font-medium text-foreground mb-1">Normal Source (Grid):</p>
                      <ul className="space-y-1">
                        <li>Nominal voltage: 230V ±6%</li>
                        <li>Under-voltage pickup: 207V (90%)</li>
                        <li>Over-voltage pickup: 253V (110%)</li>
                        <li>Frequency range: 49.5-50.5Hz</li>
                        <li>Time delay: 3-10 seconds</li>
                      </ul>
                    </div>
                    <div className="text-gray-300">
                      <p className="font-medium text-foreground mb-1">Emergency Source (Generator):</p>
                      <ul className="space-y-1">
                        <li>Pickup voltage: 207V minimum</li>
                        <li>Frequency stabilisation: ±2%</li>
                        <li>Warm-up time: 30-60 seconds</li>
                        <li>Return time delay: 5-30 minutes</li>
                        <li>Cool-down time: 5 minutes</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="border border-gray-600 p-3 rounded">
                  <h4 className="text-foreground font-medium mb-2">Control Circuit Wiring</h4>
                  <div className="grid grid-cols-2 gap-3 text-gray-300">
                    <div>
                      <p className="font-medium text-foreground">Essential Connections:</p>
                      <ul className="space-y-1 text-xs">
                        <li>• Control power supply (24V DC typical)</li>
                        <li>• Normal source voltage sensing</li>
                        <li>• Emergency source voltage sensing</li>
                        <li>• Generator start/stop signal</li>
                        <li>• Manual/automatic selector switch</li>
                        <li>• Remote status indication</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Safety Interlocks:</p>
                      <ul className="space-y-1 text-xs">
                        <li>• Mechanical position feedback</li>
                        <li>• Electrical auxiliary contacts</li>
                        <li>• Emergency stop circuit</li>
                        <li>• Door position switches</li>
                        <li>• Overcurrent protection</li>
                        <li>• Earth fault monitoring</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="programming" className="space-y-4">
            <div className="bg-elec-dark p-4 rounded-lg">
              <h3 className="text-elec-yellow font-semibold mb-3">Control Logic Programming Examples</h3>
              <div className="space-y-4 text-sm">
                <div className="border border-gray-600 p-3 rounded">
                  <h4 className="text-foreground font-medium mb-2">Basic Switching Logic</h4>
                  <div className="bg-gray-900 p-3 rounded font-mono text-xs text-gray-300">
                    <div className="space-y-1">
                      <div>IF (Grid_Voltage &lt; 207V OR Grid_Frequency &lt; 49.5Hz)</div>
                      <div>&nbsp;&nbsp;AND (Timer_Delay &gt; 5_seconds)</div>
                      <div>THEN</div>
                      <div>&nbsp;&nbsp;Start_Generator()</div>
                      <div>&nbsp;&nbsp;Wait_For_Generator_Ready()</div>
                      <div>&nbsp;&nbsp;Transfer_To_Emergency()</div>
                      <div>END IF</div>
                    </div>
                  </div>
                </div>
                <div className="border border-gray-600 p-3 rounded">
                  <h4 className="text-foreground font-medium mb-2">Return to Normal Logic</h4>
                  <div className="bg-gray-900 p-3 rounded font-mono text-xs text-gray-300">
                    <div className="space-y-1">
                      <div>IF (Grid_Voltage &gt; 207V AND Grid_Voltage &lt; 253V)</div>
                      <div>&nbsp;&nbsp;AND (Grid_Frequency &gt; 49.5Hz AND &lt; 50.5Hz)</div>
                      <div>&nbsp;&nbsp;AND (Stable_Time &gt; 300_seconds)</div>
                      <div>THEN</div>
                      <div>&nbsp;&nbsp;Transfer_To_Normal()</div>
                      <div>&nbsp;&nbsp;Wait(300_seconds)</div>
                      <div>&nbsp;&nbsp;Stop_Generator()</div>
                      <div>END IF</div>
                    </div>
                  </div>
                </div>
                <div className="border border-gray-600 p-3 rounded">
                  <h4 className="text-foreground font-medium mb-2">Advanced Features Programming</h4>
                  <div className="grid grid-cols-2 gap-3 text-gray-300">
                    <div>
                      <p className="font-medium text-foreground">Load Shedding:</p>
                      <ul className="space-y-1 text-xs">
                        <li>• Priority load classification</li>
                        <li>• Sequential disconnection logic</li>
                        <li>• Automatic reconnection when capacity available</li>
                        <li>• Manual override capability</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Exercise Scheduling:</p>
                      <ul className="space-y-1 text-xs">
                        <li>• Weekly/monthly automatic start</li>
                        <li>• No-load vs loaded exercise</li>
                        <li>• Run-time accumulation</li>
                        <li>• Exercise inhibit conditions</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="troubleshooting" className="space-y-4">
            <div className="bg-elec-dark p-4 rounded-lg">
              <h3 className="text-elec-yellow font-semibold mb-3">ATS Troubleshooting Decision Tree</h3>
              <div className="space-y-4 text-sm">
                <div className="border border-gray-600 p-3 rounded">
                  <h4 className="text-foreground font-medium mb-2">Problem: ATS Won't Transfer to Emergency</h4>
                  <div className="space-y-2 text-gray-300">
                    <div className="border-l-4 border-red-500 pl-3">
                      <p className="font-medium">1. Check Control Power</p>
                      <p className="text-xs">Verify 24V DC or 120V AC control supply present</p>
                    </div>
                    <div className="border-l-4 border-orange-500 pl-3">
                      <p className="font-medium">2. Verify Normal Source Sensing</p>
                      <p className="text-xs">Check voltage/frequency monitoring settings and actual values</p>
                    </div>
                    <div className="border-l-4 border-yellow-500 pl-3">
                      <p className="font-medium">3. Check Emergency Source Status</p>
                      <p className="text-xs">Verify generator running and voltage/frequency within limits</p>
                    </div>
                    <div className="border-l-4 border-blue-500 pl-3">
                      <p className="font-medium">4. Inspect Mechanical Operation</p>
                      <p className="text-xs">Check for binding, worn contacts, or mechanical failures</p>
                    </div>
                  </div>
                </div>
                <div className="border border-gray-600 p-3 rounded">
                  <h4 className="text-foreground font-medium mb-2">Problem: Frequent False Transfers</h4>
                  <div className="grid grid-cols-2 gap-3 text-gray-300">
                    <div>
                      <p className="font-medium text-foreground">Possible Causes:</p>
                      <ul className="space-y-1 text-xs">
                        <li>• Voltage sensing threshold too tight</li>
                        <li>• Poor neutral connection</li>
                        <li>• Interference in control circuits</li>
                        <li>• Damaged voltage sensing transformers</li>
                        <li>• Time delay settings too short</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Solutions:</p>
                      <ul className="space-y-1 text-xs">
                        <li>• Adjust pickup/dropout voltages</li>
                        <li>• Check and tighten neutral connections</li>
                        <li>• Add filtering to control circuits</li>
                        <li>• Replace sensing transformers</li>
                        <li>• Increase time delays appropriately</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="border border-gray-600 p-3 rounded">
                  <h4 className="text-foreground font-medium mb-2">Common Error Codes</h4>
                  <div className="grid grid-cols-3 gap-2 text-xs text-gray-300">
                    <div><strong>E01:</strong> Control power failure</div>
                    <div><strong>E02:</strong> Normal source failure</div>
                    <div><strong>E03:</strong> Emergency source failure</div>
                    <div><strong>E04:</strong> Transfer timeout</div>
                    <div><strong>E05:</strong> Mechanical fault</div>
                    <div><strong>E06:</strong> Overcurrent trip</div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ControlStrategiesPractical;