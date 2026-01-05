import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Zap, List, Route, Clock } from 'lucide-react';

const LoadPriorityPractical = () => {
  return (
    <Card className="bg-elec-gray border-gray-600">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Zap className="h-5 w-5 text-elec-yellow" />
          Load Priority & Energy Routing Tools
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="classification" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-elec-dark">
            <TabsTrigger value="classification" className="data-[state=active]:bg-elec-yellow data-[state=active]:text-elec-dark">
              <List className="h-4 w-4 mr-1" />
              Load Classification
            </TabsTrigger>
            <TabsTrigger value="routing" className="data-[state=active]:bg-elec-yellow data-[state=active]:text-elec-dark">
              <Route className="h-4 w-4 mr-1" />
              Energy Routing
            </TabsTrigger>
            <TabsTrigger value="shedding" className="data-[state=active]:bg-elec-yellow data-[state=active]:text-elec-dark">
              <Zap className="h-4 w-4 mr-1" />
              Load Shedding
            </TabsTrigger>
            <TabsTrigger value="optimization" className="data-[state=active]:bg-elec-yellow data-[state=active]:text-elec-dark">
              <Clock className="h-4 w-4 mr-1" />
              Optimisation
            </TabsTrigger>
          </TabsList>

          <TabsContent value="classification" className="space-y-4">
            <div className="bg-elec-dark p-4 rounded-lg">
              <h3 className="text-elec-yellow font-semibold mb-3">Load Classification Worksheet</h3>
              <div className="space-y-4 text-sm">
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-red-900/30 border border-red-600 p-3 rounded">
                    <h4 className="text-red-300 font-medium mb-2">Critical Loads (Priority 1)</h4>
                    <div className="text-gray-300 space-y-1 text-xs">
                      <p><strong>Must never lose power</strong></p>
                      <ul className="space-y-1">
                        <li>□ Security/alarm systems</li>
                        <li>□ Medical equipment</li>
                        <li>□ Emergency lighting</li>
                        <li>□ Communication systems</li>
                        <li>□ Smoke/fire detection</li>
                        <li>□ Heating controls (winter)</li>
                        <li>□ Refrigeration (food/medicine)</li>
                      </ul>
                      <p className="text-red-300 font-medium">Typical load: 2-5kW</p>
                    </div>
                  </div>
                  <div className="bg-yellow-900/30 border border-yellow-600 p-3 rounded">
                    <h4 className="text-yellow-300 font-medium mb-2">Essential Loads (Priority 2)</h4>
                    <div className="text-gray-300 space-y-1 text-xs">
                      <p><strong>Important but can shed temporarily</strong></p>
                      <ul className="space-y-1">
                        <li>□ Lighting (living areas)</li>
                        <li>□ Kitchen appliances</li>
                        <li>□ Water heating</li>
                        <li>□ Garage doors</li>
                        <li>□ Computer/office equipment</li>
                        <li>□ Washing machine</li>
                        <li>□ Basic heating/cooling</li>
                      </ul>
                      <p className="text-yellow-300 font-medium">Typical load: 3-8kW</p>
                    </div>
                  </div>
                  <div className="bg-green-900/30 border border-green-600 p-3 rounded">
                    <h4 className="text-green-300 font-medium mb-2">Comfort Loads (Priority 3)</h4>
                    <div className="text-gray-300 space-y-1 text-xs">
                      <p><strong>Convenience items - first to shed</strong></p>
                      <ul className="space-y-1">
                        <li>□ Entertainment systems</li>
                        <li>□ Electric heating (non-essential)</li>
                        <li>□ Pool/spa equipment</li>
                        <li>□ Workshop equipment</li>
                        <li>□ Decorative lighting</li>
                        <li>□ Non-essential outlets</li>
                        <li>□ Electric vehicle charging</li>
                      </ul>
                      <p className="text-green-300 font-medium">Typical load: 2-10kW</p>
                    </div>
                  </div>
                </div>
                <div className="border border-gray-600 p-3 rounded">
                  <h4 className="text-foreground font-medium mb-2">Load Assessment Calculations</h4>
                  <div className="grid grid-cols-2 gap-3 text-gray-300">
                    <div>
                      <p className="font-medium text-foreground">Simultaneous Demand:</p>
                      <p className="text-xs">Critical loads: ___kW × 100% = ___kW</p>
                      <p className="text-xs">Essential loads: ___kW × 70% = ___kW</p>
                      <p className="text-xs">Comfort loads: ___kW × 40% = ___kW</p>
                      <p className="text-xs"><strong className="text-elec-yellow">Total: ___kW</strong></p>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Battery Sizing Impact:</p>
                      <p className="text-xs">Critical only: ___kWh × 3 days = ___kWh</p>
                      <p className="text-xs">Critical + Essential: ___kWh × 2 days = ___kWh</p>
                      <p className="text-xs">All loads: ___kWh × 1 day = ___kWh</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="routing" className="space-y-4">
            <div className="bg-elec-dark p-4 rounded-lg">
              <h3 className="text-elec-yellow font-semibold mb-3">Energy Routing Configuration Guide</h3>
              <div className="space-y-4 text-sm">
                <div className="border border-gray-600 p-3 rounded">
                  <h4 className="text-foreground font-medium mb-2">Routing Decision Matrix</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs text-gray-300 border-collapse">
                      <thead>
                        <tr className="border-b border-gray-600">
                          <th className="text-left p-2">Condition</th>
                          <th className="text-left p-2">Solar</th>
                          <th className="text-left p-2">Battery</th>
                          <th className="text-left p-2">Grid</th>
                          <th className="text-left p-2">Action</th>
                        </tr>
                      </thead>
                      <tbody className="text-xs">
                        <tr><td className="p-2">High solar + Low demand</td><td>✓</td><td>Charging</td><td>Export</td><td>Supply load, charge battery, export excess</td></tr>
                        <tr><td className="p-2">Medium solar + High demand</td><td>✓</td><td>Supplement</td><td>Import</td><td>Solar + battery to load, import if needed</td></tr>
                        <tr><td className="p-2">No solar + Day time</td><td>✗</td><td>Conserve</td><td>Primary</td><td>Grid supplies load, battery on standby</td></tr>
                        <tr><td className="p-2">No solar + Peak tariff</td><td>✗</td><td>Discharge</td><td>Backup</td><td>Battery supplies load, avoid peak rates</td></tr>
                        <tr><td className="p-2">Grid outage</td><td>Varies</td><td>Primary</td><td>✗</td><td>Solar + battery, shed non-critical loads</td></tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="border border-gray-600 p-3 rounded">
                  <h4 className="text-foreground font-medium mb-2">Smart Switch Configuration</h4>
                  <div className="grid grid-cols-2 gap-3 text-gray-300">
                    <div>
                      <p className="font-medium text-foreground">Individual Circuit Control:</p>
                      <ul className="space-y-1 text-xs">
                        <li>• WiFi smart switches for lighting circuits</li>
                        <li>• Contactors for high-power loads (heating, etc.)</li>
                        <li>• Smart plugs for portable appliances</li>
                        <li>• Dedicated EV charging control</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Control Integration:</p>
                      <ul className="space-y-1 text-xs">
                        <li>• Central energy management system</li>
                        <li>• Real-time power monitoring</li>
                        <li>• Automated scheduling based on SOC</li>
                        <li>• Manual override capabilities</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="shedding" className="space-y-4">
            <div className="bg-elec-dark p-4 rounded-lg">
              <h3 className="text-elec-yellow font-semibold mb-3">Load Shedding Programming Guide</h3>
              <div className="space-y-4 text-sm">
                <div className="border border-gray-600 p-3 rounded">
                  <h4 className="text-foreground font-medium mb-2">Progressive Load Shedding Schedule</h4>
                  <div className="space-y-2">
                    <div className="bg-gray-800 p-2 rounded">
                      <div className="flex justify-between items-center">
                        <span className="text-foreground font-medium">Battery SOC: 80-100%</span>
                        <span className="text-green-400">All loads active</span>
                      </div>
                      <p className="text-gray-400 text-xs">Normal operation - all systems running</p>
                    </div>
                    <div className="bg-gray-800 p-2 rounded">
                      <div className="flex justify-between items-center">
                        <span className="text-foreground font-medium">Battery SOC: 60-80%</span>
                        <span className="text-yellow-400">Shed comfort loads</span>
                      </div>
                      <p className="text-gray-400 text-xs">Turn off: Entertainment, decorative lighting, pool equipment</p>
                    </div>
                    <div className="bg-gray-800 p-2 rounded">
                      <div className="flex justify-between items-center">
                        <span className="text-foreground font-medium">Battery SOC: 40-60%</span>
                        <span className="text-orange-400">Shed non-essential</span>
                      </div>
                      <p className="text-gray-400 text-xs">Turn off: Electric heating, EV charging, workshop equipment</p>
                    </div>
                    <div className="bg-gray-800 p-2 rounded">
                      <div className="flex justify-between items-center">
                        <span className="text-foreground font-medium">Battery SOC: 20-40%</span>
                        <span className="text-red-400">Essential loads only</span>
                      </div>
                      <p className="text-gray-400 text-xs">Keep only: Security, lighting, refrigeration, heating controls</p>
                    </div>
                    <div className="bg-gray-800 p-2 rounded">
                      <div className="flex justify-between items-center">
                        <span className="text-foreground font-medium">Battery SOC: &lt;20%</span>
                        <span className="text-red-600">Critical loads only</span>
                      </div>
                      <p className="text-gray-400 text-xs">Minimal power: Security, emergency lighting, communication</p>
                    </div>
                  </div>
                </div>
                <div className="border border-gray-600 p-3 rounded">
                  <h4 className="text-foreground font-medium mb-2">Load Reconnection Logic</h4>
                  <div className="bg-gray-900 p-3 rounded font-mono text-xs text-gray-300">
                    <div className="space-y-1">
                      <div>IF (Battery_SOC &gt; Previous_Shed_Level + 10%)</div>
                      <div>&nbsp;&nbsp;AND (Solar_Available OR Grid_Available)</div>
                      <div>&nbsp;&nbsp;AND (Stable_Time &gt; 300_seconds)</div>
                      <div>THEN</div>
                      <div>&nbsp;&nbsp;Reconnect_Next_Priority_Load()</div>
                      <div>&nbsp;&nbsp;Monitor_For_Overload(60_seconds)</div>
                      <div>&nbsp;&nbsp;IF (Overload_Detected)</div>
                      <div>&nbsp;&nbsp;&nbsp;&nbsp;Shed_Load_Again()</div>
                      <div>&nbsp;&nbsp;END IF</div>
                      <div>END IF</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="optimization" className="space-y-4">
            <div className="bg-elec-dark p-4 rounded-lg">
              <h3 className="text-elec-yellow font-semibold mb-3">Time-of-Use & Economic Optimisation</h3>
              <div className="space-y-4 text-sm">
                <div className="border border-gray-600 p-3 rounded">
                  <h4 className="text-foreground font-medium mb-2">Tariff-Based Load Scheduling</h4>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-green-900/30 border border-green-600 p-2 rounded">
                      <h5 className="text-green-300 font-medium text-xs">Off-Peak (00:30-07:30)</h5>
                      <p className="text-gray-300 text-xs">7.5p/kWh</p>
                      <ul className="text-xs text-gray-400 mt-1">
                        <li>• Charge batteries from grid</li>
                        <li>• Run washing machine/dishwasher</li>
                        <li>• Water heating</li>
                        <li>• EV charging</li>
                      </ul>
                    </div>
                    <div className="bg-yellow-900/30 border border-yellow-600 p-2 rounded">
                      <h5 className="text-yellow-300 font-medium text-xs">Standard (07:30-16:00, 20:00-00:30)</h5>
                      <p className="text-gray-300 text-xs">24.5p/kWh</p>
                      <ul className="text-xs text-gray-400 mt-1">
                        <li>• Use solar where possible</li>
                        <li>• Battery for peak shaving</li>
                        <li>• Normal load operation</li>
                        <li>• Moderate consumption</li>
                      </ul>
                    </div>
                    <div className="bg-red-900/30 border border-red-600 p-2 rounded">
                      <h5 className="text-red-300 font-medium text-xs">Peak (16:00-20:00)</h5>
                      <p className="text-gray-300 text-xs">39.9p/kWh</p>
                      <ul className="text-xs text-gray-400 mt-1">
                        <li>• Use battery instead of grid</li>
                        <li>• Shed non-essential loads</li>
                        <li>• Export if profitable</li>
                        <li>• Minimise grid import</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="border border-gray-600 p-3 rounded">
                  <h4 className="text-foreground font-medium mb-2">Economic Optimisation Strategy</h4>
                  <div className="grid grid-cols-2 gap-3 text-gray-300">
                    <div>
                      <p className="font-medium text-foreground">Battery Strategy:</p>
                      <ul className="space-y-1 text-xs">
                        <li>• Charge during off-peak rates</li>
                        <li>• Discharge during peak rates</li>
                        <li>• Reserve 20% for outage protection</li>
                        <li>• Cycle depth optimisation for longevity</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Load Scheduling:</p>
                      <ul className="space-y-1 text-xs">
                        <li>• Defer flexible loads to off-peak</li>
                        <li>• Pre-heat/cool during cheap periods</li>
                        <li>• Smart appliance scheduling</li>
                        <li>• EV charging optimisation</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="border border-gray-600 p-3 rounded">
                  <h4 className="text-foreground font-medium mb-2">Annual Savings Calculation</h4>
                  <div className="bg-gray-800 p-3 rounded text-xs text-gray-300">
                    <p className="text-foreground font-medium mb-2">Example 4kW System with 10kWh Battery:</p>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <p>Peak shaving (4kWh/day × 365 × 15.4p): <span className="text-elec-yellow">£224/year</span></p>
                        <p>Off-peak charging advantage: <span className="text-elec-yellow">£156/year</span></p>
                        <p>Solar self-consumption increase: <span className="text-elec-yellow">£180/year</span></p>
                      </div>
                      <div>
                        <p>Load scheduling savings: <span className="text-elec-yellow">£95/year</span></p>
                        <p>Export optimisation: <span className="text-elec-yellow">£65/year</span></p>
                        <p><strong className="text-elec-yellow">Total savings: £720/year</strong></p>
                      </div>
                    </div>
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

export default LoadPriorityPractical;