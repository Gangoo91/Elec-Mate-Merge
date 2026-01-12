import { useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Wifi, Settings, FileText, CheckCircle } from 'lucide-react';

const GridTiedSizingPractical = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get("gridtied") || "sizing";
  const setActiveTab = (tab: string) => setSearchParams({ gridtied: tab }, { replace: false });

  return (
    <Card className="bg-elec-gray border-gray-600">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Wifi className="h-5 w-5 text-elec-yellow" />
          Grid-Tied Sizing & Export Tools
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-elec-dark">
            <TabsTrigger value="sizing" className="data-[state=active]:bg-elec-yellow data-[state=active]:text-elec-dark">
              <Settings className="h-4 w-4 mr-1" />
              System Sizing
            </TabsTrigger>
            <TabsTrigger value="export" className="data-[state=active]:bg-elec-yellow data-[state=active]:text-elec-dark">
              <Wifi className="h-4 w-4 mr-1" />
              Export Setup
            </TabsTrigger>
            <TabsTrigger value="applications" className="data-[state=active]:bg-elec-yellow data-[state=active]:text-elec-dark">
              <FileText className="h-4 w-4 mr-1" />
              DNO Applications
            </TabsTrigger>
            <TabsTrigger value="compliance" className="data-[state=active]:bg-elec-yellow data-[state=active]:text-elec-dark">
              <CheckCircle className="h-4 w-4 mr-1" />
              Compliance
            </TabsTrigger>
          </TabsList>

          <TabsContent value="sizing" className="space-y-4">
            <div className="bg-elec-dark p-4 rounded-lg">
              <h3 className="text-elec-yellow font-semibold mb-3">Grid-Tied System Sizing Calculator</h3>
              <div className="space-y-4 text-sm">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-800 p-3 rounded">
                    <h4 className="text-foreground font-medium mb-2">Annual Consumption Method</h4>
                    <div className="text-gray-300 space-y-2">
                      <p>Annual usage: 4,000 kWh</p>
                      <p>UK solar yield: 900 kWh/kW</p>
                      <p>Required capacity: 4,000 ÷ 900 = <span className="text-elec-yellow">4.4kW</span></p>
                      <p className="text-xs">Assumes 100% self-consumption</p>
                    </div>
                  </div>
                  <div className="bg-gray-800 p-3 rounded">
                    <h4 className="text-foreground font-medium mb-2">Roof Constraint Method</h4>
                    <div className="text-gray-300 space-y-2">
                      <p>Available roof area: 30m²</p>
                      <p>Panel efficiency: 20% (400W/2m²)</p>
                      <p>Max capacity: 30 ÷ 2 × 0.4 = <span className="text-elec-yellow">6kW</span></p>
                      <p className="text-xs">Limited by physical space</p>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-800 p-3 rounded">
                  <h4 className="text-foreground font-medium mb-2">Self-Consumption Optimisation</h4>
                  <div className="grid grid-cols-3 gap-3 text-gray-300">
                    <div>
                      <p className="text-foreground font-medium">High Day Use</p>
                      <p>Size for 90-100% of consumption</p>
                      <p>Minimal export losses</p>
                    </div>
                    <div>
                      <p className="text-foreground font-medium">Mixed Pattern</p>
                      <p>Size for 70-80% of consumption</p>
                      <p>Balance self-use vs export</p>
                    </div>
                    <div>
                      <p className="text-foreground font-medium">Evening Heavy</p>
                      <p>Smaller system + battery</p>
                      <p>Maximise time-shifted use</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="export" className="space-y-4">
            <div className="bg-elec-dark p-4 rounded-lg">
              <h3 className="text-elec-yellow font-semibold mb-3">Export Limiting Setup Guide</h3>
              <div className="space-y-4 text-sm">
                <div className="border border-gray-600 p-3 rounded">
                  <h4 className="text-foreground font-medium mb-2">CT Clamp Installation</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="text-gray-300">
                      <p className="font-medium text-foreground mb-1">Installation Steps:</p>
                      <ol className="space-y-1">
                        <li>1. Identify meter tail (grid supply cable)</li>
                        <li>2. Install CT clamp on LIVE conductor only</li>
                        <li>3. Arrow points toward grid (away from consumer unit)</li>
                        <li>4. Connect to inverter CT input terminals</li>
                        <li>5. Configure export limit in inverter settings</li>
                      </ol>
                    </div>
                    <div className="text-gray-300">
                      <p className="font-medium text-foreground mb-1">Common Mistakes:</p>
                      <ul className="space-y-1">
                        <li>• CT arrow pointing wrong direction</li>
                        <li>• Installed on neutral instead of live</li>
                        <li>• Multiple cables through CT clamp</li>
                        <li>• Incorrect CT ratio setting</li>
                        <li>• No export limit programmed</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="border border-gray-600 p-3 rounded">
                  <h4 className="text-foreground font-medium mb-2">Export Limit Configuration</h4>
                  <div className="grid grid-cols-3 gap-3 text-gray-300">
                    <div>
                      <p className="text-foreground font-medium">G98 (≤3.68kW)</p>
                      <p>No export limit required</p>
                      <p>Automatic approval</p>
                    </div>
                    <div>
                      <p className="text-foreground font-medium">G99 Fast Track</p>
                      <p>Usually 16A (3.68kW) limit</p>
                      <p>Must be strictly enforced</p>
                    </div>
                    <div>
                      <p className="text-foreground font-medium">Custom Limits</p>
                      <p>DNO-specified values</p>
                      <p>May be zero export areas</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="applications" className="space-y-4">
            <div className="bg-elec-dark p-4 rounded-lg">
              <h3 className="text-elec-yellow font-semibold mb-3">DNO Application Checklist</h3>
              <div className="space-y-4 text-sm">
                <div className="border border-gray-600 p-3 rounded">
                  <h4 className="text-foreground font-medium mb-2">Required Information</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="text-gray-300">
                      <p className="font-medium text-foreground mb-1">Site Details:</p>
                      <ul className="space-y-1">
                        <li>□ Full postal address</li>
                        <li>□ MPAN (electricity meter reference)</li>
                        <li>□ Current supply capacity (main fuse)</li>
                        <li>□ Three-phase or single-phase supply</li>
                        <li>□ Local substation reference (if known)</li>
                      </ul>
                    </div>
                    <div className="text-gray-300">
                      <p className="font-medium text-foreground mb-1">System Details:</p>
                      <ul className="space-y-1">
                        <li>□ Total DC capacity (kW)</li>
                        <li>□ Total AC capacity (kW)</li>
                        <li>□ Inverter make/model/specs</li>
                        <li>□ Export limitation method</li>
                        <li>□ Maximum export limit requested</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="border border-gray-600 p-3 rounded">
                  <h4 className="text-foreground font-medium mb-2">DNO Contact Information</h4>
                  <div className="grid grid-cols-2 gap-3 text-gray-300">
                    <div>
                      <p className="font-medium text-foreground">Major DNOs:</p>
                      <ul className="space-y-1 text-xs">
                        <li>UK Power Networks (London, SE, E England)</li>
                        <li>Western Power Distribution (Midlands, SW, Wales)</li>
                        <li>Northern Powergrid (NE, Yorkshire)</li>
                        <li>Electricity North West (NW England)</li>
                        <li>Scottish Power (S Scotland, N Wales, Merseyside)</li>
                        <li>SSE (N Scotland, S England)</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Application Methods:</p>
                      <ul className="space-y-1 text-xs">
                        <li>Online portals (preferred)</li>
                        <li>Email applications</li>
                        <li>Postal applications (last resort)</li>
                        <li>Check DNO website for current process</li>
                        <li>Some offer fast-track online approvals</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="compliance" className="space-y-4">
            <div className="bg-elec-dark p-4 rounded-lg">
              <h3 className="text-elec-yellow font-semibold mb-3">G99/G100 Compliance Checklist</h3>
              <div className="space-y-4 text-sm">
                <div className="border border-gray-600 p-3 rounded">
                  <h4 className="text-foreground font-medium mb-2">Pre-Installation Requirements</h4>
                  <ul className="text-gray-300 space-y-1">
                    <li>□ DNO approval received and conditions noted</li>
                    <li>□ MCS certified installer confirmed</li>
                    <li>□ Export limiting device specified if required</li>
                    <li>□ Insurance and warranty arrangements confirmed</li>
                    <li>□ Planning permission obtained if required</li>
                  </ul>
                </div>
                <div className="border border-gray-600 p-3 rounded">
                  <h4 className="text-foreground font-medium mb-2">Installation Compliance</h4>
                  <ul className="text-gray-300 space-y-1">
                    <li>□ System capacity matches approved application</li>
                    <li>□ Export limiting correctly configured and tested</li>
                    <li>□ All equipment meets G99/G100 requirements</li>
                    <li>□ Protection settings correctly programmed</li>
                    <li>□ CT clamps installed and oriented correctly</li>
                    <li>□ Commissioning tests completed successfully</li>
                  </ul>
                </div>
                <div className="border border-gray-600 p-3 rounded">
                  <h4 className="text-foreground font-medium mb-2">Post-Installation Notifications</h4>
                  <ul className="text-gray-300 space-y-1">
                    <li>□ Commissioning certificate submitted to DNO</li>
                    <li>□ MCS certificate provided to customer</li>
                    <li>□ System registered for export tariff (if applicable)</li>
                    <li>□ Customer trained on system operation</li>
                    <li>□ Ongoing monitoring and maintenance arranged</li>
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

export default GridTiedSizingPractical;