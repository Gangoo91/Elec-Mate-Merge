import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calculator, FileText, Settings, Battery } from 'lucide-react';

const OffGridDesignPractical = () => {
  return (
    <Card className="bg-elec-gray border-gray-600">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Settings className="h-5 w-5 text-elec-yellow" />
          Off-Grid Design Tools
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="sizing" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-elec-dark">
            <TabsTrigger value="sizing" className="data-[state=active]:bg-elec-yellow data-[state=active]:text-elec-dark">
              <Calculator className="h-4 w-4 mr-1" />
              Battery Sizing
            </TabsTrigger>
            <TabsTrigger value="generator" className="data-[state=active]:bg-elec-yellow data-[state=active]:text-elec-dark">
              <Settings className="h-4 w-4 mr-1" />
              Generator Guide
            </TabsTrigger>
            <TabsTrigger value="worksheet" className="data-[state=active]:bg-elec-yellow data-[state=active]:text-elec-dark">
              <FileText className="h-4 w-4 mr-1" />
              Load Analysis
            </TabsTrigger>
            <TabsTrigger value="maintenance" className="data-[state=active]:bg-elec-yellow data-[state-active]:text-elec-dark">
              <Battery className="h-4 w-4 mr-1" />
              Maintenance
            </TabsTrigger>
          </TabsList>

          <TabsContent value="sizing" className="space-y-4">
            <div className="bg-elec-dark p-4 rounded-lg">
              <h3 className="text-elec-yellow font-semibold mb-3">Battery Sizing Calculator</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="bg-gray-800 p-3 rounded">
                    <h4 className="text-foreground font-medium mb-2">Step 1: Daily Energy Calculation</h4>
                    <div className="text-gray-300 space-y-1">
                      <p>Daily Load = Σ(Power × Hours used)</p>
                      <p>Example: 5kW × 4h = 20kWh/day</p>
                      <p>Add 10% for inefficiencies</p>
                      <p><strong className="text-elec-yellow">Total: 22kWh/day</strong></p>
                    </div>
                  </div>
                  <div className="bg-gray-800 p-3 rounded">
                    <h4 className="text-foreground font-medium mb-2">Step 2: Autonomy Requirements</h4>
                    <div className="text-gray-300 space-y-1">
                      <p>Autonomy days: 3 (typical UK)</p>
                      <p>Safety factor: 1.2</p>
                      <p>Total energy: 22 × 3 × 1.2 = 79.2kWh</p>
                      <p><strong className="text-elec-yellow">Required: 79.2kWh</strong></p>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-800 p-3 rounded">
                  <h4 className="text-foreground font-medium mb-2">Step 3: Battery Capacity by Technology</h4>
                  <div className="grid grid-cols-3 gap-3 text-sm text-gray-300">
                    <div>
                      <p><strong className="text-foreground">Lithium (80% DOD):</strong></p>
                      <p>79.2 ÷ 0.8 = <span className="text-elec-yellow">99kWh</span></p>
                    </div>
                    <div>
                      <p><strong className="text-foreground">AGM (50% DOD):</strong></p>
                      <p>79.2 ÷ 0.5 = <span className="text-elec-yellow">158kWh</span></p>
                    </div>
                    <div>
                      <p><strong className="text-foreground">Flooded (50% DOD):</strong></p>
                      <p>79.2 ÷ 0.5 = <span className="text-elec-yellow">158kWh</span></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="generator" className="space-y-4">
            <div className="bg-elec-dark p-4 rounded-lg">
              <h3 className="text-elec-yellow font-semibold mb-3">Generator Selection & Setup Guide</h3>
              <div className="space-y-4 text-sm">
                <div className="border border-gray-600 p-3 rounded">
                  <h4 className="text-foreground font-medium mb-2">Sizing Requirements</h4>
                  <ul className="text-gray-300 space-y-1">
                    <li>• Essential loads: List all critical appliances</li>
                    <li>• Motor starting surge: Multiply motor loads by 3-5x</li>
                    <li>• Battery charging: Add 20-30% of battery capacity in kW</li>
                    <li>• Recommended minimum: 125% of combined load</li>
                  </ul>
                </div>
                <div className="border border-gray-600 p-3 rounded">
                  <h4 className="text-foreground font-medium mb-2">Auto-Start Configuration</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-foreground font-medium">Start Conditions:</p>
                      <ul className="text-gray-300">
                        <li>• Battery SOC: 20-30%</li>
                        <li>• Low voltage: 22.8V (24V system)</li>
                        <li>• Time-based: After 3-5 days</li>
                        <li>• Manual override available</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-foreground font-medium">Stop Conditions:</p>
                      <ul className="text-gray-300">
                        <li>• Battery SOC: 80-90%</li>
                        <li>• Runtime limit: 8-12 hours</li>
                        <li>• Cool-down period: 5 minutes</li>
                        <li>• Fault conditions: Auto-stop</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="worksheet" className="space-y-4">
            <div className="bg-elec-dark p-4 rounded-lg">
              <h3 className="text-elec-yellow font-semibold mb-3">Load Analysis Worksheet</h3>
              <div className="space-y-4 text-sm">
                <div className="border border-gray-600 p-3 rounded">
                  <h4 className="text-foreground font-medium mb-2">Critical Loads (Must run 24/7)</h4>
                  <table className="w-full text-gray-300">
                    <thead>
                      <tr className="border-b border-gray-600">
                        <th className="text-left">Appliance</th>
                        <th className="text-left">Power (W)</th>
                        <th className="text-left">Hours/Day</th>
                        <th className="text-left">Daily kWh</th>
                      </tr>
                    </thead>
                    <tbody className="space-y-1">
                      <tr><td>Refrigerator</td><td>150</td><td>24</td><td>3.6</td></tr>
                      <tr><td>Freezer</td><td>200</td><td>18</td><td>3.6</td></tr>
                      <tr><td>LED Lighting</td><td>100</td><td>8</td><td>0.8</td></tr>
                      <tr><td>Router/Modem</td><td>20</td><td>24</td><td>0.5</td></tr>
                      <tr className="border-t border-gray-600"><td><strong>Total Critical</strong></td><td></td><td></td><td><strong>8.5 kWh</strong></td></tr>
                    </tbody>
                  </table>
                </div>
                <div className="border border-gray-600 p-3 rounded">
                  <h4 className="text-foreground font-medium mb-2">Non-Critical Loads (Can be shed during low power)</h4>
                  <table className="w-full text-gray-300">
                    <thead>
                      <tr className="border-b border-gray-600">
                        <th className="text-left">Appliance</th>
                        <th className="text-left">Power (W)</th>
                        <th className="text-left">Hours/Day</th>
                        <th className="text-left">Daily kWh</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr><td>Washing Machine</td><td>2000</td><td>1</td><td>2.0</td></tr>
                      <tr><td>Electric Heating</td><td>3000</td><td>6</td><td>18.0</td></tr>
                      <tr><td>Entertainment</td><td>300</td><td>4</td><td>1.2</td></tr>
                      <tr className="border-t border-gray-600"><td><strong>Total Non-Critical</strong></td><td></td><td></td><td><strong>21.2 kWh</strong></td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="maintenance" className="space-y-4">
            <div className="bg-elec-dark p-4 rounded-lg">
              <h3 className="text-elec-yellow font-semibold mb-3">Maintenance Schedule & Procedures</h3>
              <div className="space-y-4 text-sm">
                <div className="grid grid-cols-2 gap-4">
                  <div className="border border-gray-600 p-3 rounded">
                    <h4 className="text-foreground font-medium mb-2">Weekly Tasks</h4>
                    <ul className="text-gray-300 space-y-1">
                      <li>□ Check battery voltages</li>
                      <li>□ Monitor system logs</li>
                      <li>□ Test generator start</li>
                      <li>□ Check fuel levels</li>
                      <li>□ Visual inspection of connections</li>
                    </ul>
                  </div>
                  <div className="border border-gray-600 p-3 rounded">
                    <h4 className="text-foreground font-medium mb-2">Monthly Tasks</h4>
                    <ul className="text-gray-300 space-y-1">
                      <li>□ Clean solar panels</li>
                      <li>□ Check charge controller settings</li>
                      <li>□ Test generator under load</li>
                      <li>□ Inspect battery terminals</li>
                      <li>□ Review energy consumption data</li>
                    </ul>
                  </div>
                </div>
                <div className="border border-gray-600 p-3 rounded">
                  <h4 className="text-foreground font-medium mb-2">Annual Professional Service</h4>
                  <ul className="text-gray-300 space-y-1">
                    <li>□ Battery capacity test and health check</li>
                    <li>□ Inverter calibration and firmware updates</li>
                    <li>□ Generator full service (oil, filters, spark plugs)</li>
                    <li>□ Electrical connections torque check</li>
                    <li>□ System performance analysis and optimisation</li>
                    <li>□ Safety system testing (emergency stops, RCD, etc.)</li>
                  </ul>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default OffGridDesignPractical;