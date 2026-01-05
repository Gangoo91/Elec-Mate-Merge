import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calculator, GitBranch, FileText, Wrench } from 'lucide-react';

const SystemComparisonPractical = () => {
  return (
    <Card className="bg-elec-gray border-gray-600">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Wrench className="h-5 w-5 text-elec-yellow" />
          Practical Tools & Guidance
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="decision" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-elec-dark">
            <TabsTrigger value="decision" className="data-[state=active]:bg-elec-yellow data-[state=active]:text-elec-dark">
              <GitBranch className="h-4 w-4 mr-1" />
              Decision Tree
            </TabsTrigger>
            <TabsTrigger value="calculator" className="data-[state=active]:bg-elec-yellow data-[state=active]:text-elec-dark">
              <Calculator className="h-4 w-4 mr-1" />
              Cost Calculator
            </TabsTrigger>
            <TabsTrigger value="worksheet" className="data-[state=active]:bg-elec-yellow data-[state=active]:text-elec-dark">
              <FileText className="h-4 w-4 mr-1" />
              Worksheets
            </TabsTrigger>
            <TabsTrigger value="scenarios" className="data-[state=active]:bg-elec-yellow data-[state=active]:text-elec-dark">
              Real Scenarios
            </TabsTrigger>
          </TabsList>

          <TabsContent value="decision" className="space-y-4">
            <div className="bg-elec-dark p-4 rounded-lg">
              <h3 className="text-elec-yellow font-semibold mb-3">System Selection Decision Tree</h3>
              <div className="space-y-3 text-sm text-gray-300">
                <div className="border-l-4 border-elec-yellow pl-4">
                  <strong className="text-foreground">Step 1: Grid Availability</strong>
                  <p>Reliable grid connection available? If NO → Off-grid. If YES → Continue</p>
                </div>
                <div className="border-l-4 border-blue-500 pl-4">
                  <strong className="text-foreground">Step 2: Power Security Requirements</strong>
                  <p>Need backup during outages? If YES → Hybrid. If NO → Continue</p>
                </div>
                <div className="border-l-4 border-green-500 pl-4">
                  <strong className="text-foreground">Step 3: Budget Constraints</strong>
                  <p>Limited budget? If YES → Grid-tied. If NO → Consider hybrid for future-proofing</p>
                </div>
                <div className="border-l-4 border-purple-500 pl-4">
                  <strong className="text-foreground">Step 4: Export Potential</strong>
                  <p>Can you benefit from export tariffs? If YES → Grid-tied or Hybrid</p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="calculator" className="space-y-4">
            <div className="bg-elec-dark p-4 rounded-lg">
              <h3 className="text-elec-yellow font-semibold mb-3">System Cost Comparison Calculator</h3>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div className="bg-gray-800 p-3 rounded">
                  <h4 className="text-foreground font-medium mb-2">Grid-Tied (5kW)</h4>
                  <ul className="text-gray-300 space-y-1">
                    <li>Panels: £3,500</li>
                    <li>Inverter: £1,200</li>
                    <li>Installation: £1,500</li>
                    <li><strong className="text-elec-yellow">Total: £6,200</strong></li>
                    <li>Payback: 8-10 years</li>
                  </ul>
                </div>
                <div className="bg-gray-800 p-3 rounded">
                  <h4 className="text-foreground font-medium mb-2">Off-Grid (5kW)</h4>
                  <ul className="text-gray-300 space-y-1">
                    <li>Panels: £3,500</li>
                    <li>Inverter: £2,000</li>
                    <li>Batteries: £6,000</li>
                    <li>Installation: £2,000</li>
                    <li><strong className="text-elec-yellow">Total: £13,500</strong></li>
                    <li>ROI: Variable</li>
                  </ul>
                </div>
                <div className="bg-gray-800 p-3 rounded">
                  <h4 className="text-foreground font-medium mb-2">Hybrid (5kW)</h4>
                  <ul className="text-gray-300 space-y-1">
                    <li>Panels: £3,500</li>
                    <li>Hybrid Inverter: £2,500</li>
                    <li>Batteries: £4,000</li>
                    <li>Installation: £2,200</li>
                    <li><strong className="text-elec-yellow">Total: £12,200</strong></li>
                    <li>Payback: 10-12 years</li>
                  </ul>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="worksheet" className="space-y-4">
            <div className="bg-elec-dark p-4 rounded-lg">
              <h3 className="text-elec-yellow font-semibold mb-3">System Selection Worksheet</h3>
              <div className="space-y-4 text-sm text-gray-300">
                <div className="border border-gray-600 p-3 rounded">
                  <h4 className="text-foreground font-medium mb-2">Current Energy Profile</h4>
                  <ul className="space-y-1">
                    <li>• Annual electricity consumption: _____ kWh</li>
                    <li>• Daily average usage: _____ kWh</li>
                    <li>• Peak demand periods: _____</li>
                    <li>• Current electricity cost: £_____ per year</li>
                  </ul>
                </div>
                <div className="border border-gray-600 p-3 rounded">
                  <h4 className="text-foreground font-medium mb-2">Requirements Assessment</h4>
                  <ul className="space-y-1">
                    <li>• Backup power required? Yes / No</li>
                    <li>• Grid connection quality: Good / Poor / None</li>
                    <li>• Critical loads to protect: _____</li>
                    <li>• Available roof space: _____ m²</li>
                    <li>• Budget available: £_____</li>
                  </ul>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="scenarios" className="space-y-4">
            <div className="space-y-3">
              <div className="bg-elec-dark p-4 rounded-lg">
                <h4 className="text-elec-yellow font-medium mb-2">Scenario 1: Suburban Home</h4>
                <p className="text-gray-300 text-sm mb-2">4-bed house, reliable grid, £4,000 annual electricity bill</p>
                <p className="text-foreground text-sm"><strong>Recommendation:</strong> Grid-tied system. Fastest payback, minimal maintenance, can add batteries later if needed.</p>
              </div>
              <div className="bg-elec-dark p-4 rounded-lg">
                <h4 className="text-elec-yellow font-medium mb-2">Scenario 2: Rural Property</h4>
                <p className="text-gray-300 text-sm mb-2">Remote location, frequent outages, high connection costs</p>
                <p className="text-foreground text-sm"><strong>Recommendation:</strong> Off-grid system with generator backup. Long-term cost savings despite higher initial investment.</p>
              </div>
              <div className="bg-elec-dark p-4 rounded-lg">
                <h4 className="text-elec-yellow font-medium mb-2">Scenario 3: Home Office</h4>
                <p className="text-gray-300 text-sm mb-2">Business operation, cannot afford power interruptions</p>
                <p className="text-foreground text-sm"><strong>Recommendation:</strong> Hybrid system. Grid-tied benefits with guaranteed backup for critical loads.</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default SystemComparisonPractical;