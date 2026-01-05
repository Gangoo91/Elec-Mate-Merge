import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const CostBenefitAnalysisTable = () => {
  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="text-foreground">Capital Cost and Economy of Scale Analysis</CardTitle>
      </CardHeader>
      <CardContent className="text-gray-300 space-y-4">
        <div className="bg-blue-600/10 border border-blue-600/20 rounded-md p-4">
          <h4 className="text-blue-400 font-semibold mb-2">Economy of Scale Impact:</h4>
          <p className="text-sm">
            As system size increases, the cost per kW typically decreases due to fixed costs being 
            spread across more capacity, bulk purchasing power, and reduced installation complexity per kW.
          </p>
        </div>
        
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-green-400 mb-4">Domestic Systems (2-10kW):</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-green-900/20 p-4 rounded border border-green-500/30">
                <h5 className="text-foreground font-medium mb-3">Cost Characteristics:</h5>
                <ul className="text-gray-300 space-y-2 text-sm">
                  <li>• <strong>Typical cost:</strong> £1,200-£1,800 per kW installed</li>
                  <li>• <strong>4kW system:</strong> £5,000-£7,000 total</li>
                  <li>• <strong>Fixed costs:</strong> Higher proportion (scaffolding, design)</li>
                  <li>• <strong>VAT treatment:</strong> 0% VAT on systems ≤10kW (domestic)</li>
                  <li>• <strong>Financing:</strong> Personal loans, solar loans, cash</li>
                  <li>• <strong>Payback period:</strong> 7-12 years typically</li>
                </ul>
              </div>
              <div className="bg-green-900/20 p-4 rounded border border-green-500/30">
                <h5 className="text-foreground font-medium mb-3">Revenue Characteristics:</h5>
                <ul className="text-gray-300 space-y-2 text-sm">
                  <li>• <strong>Self-consumption:</strong> 40-70% typically</li>
                  <li>• <strong>Export income:</strong> SEG rates 4-15p/kWh</li>
                  <li>• <strong>Electricity offset:</strong> 28-35p/kWh domestic rates</li>
                  <li>• <strong>Annual savings:</strong> £400-£1,200 for 4kW system</li>
                  <li>• <strong>Maintenance:</strong> Minimal, mainly cleaning</li>
                  <li>• <strong>Monitoring:</strong> Basic app-based systems</li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-orange-400 mb-4">Commercial Systems (10-500kW+):</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-orange-900/20 p-4 rounded border border-orange-500/30">
                <h5 className="text-foreground font-medium mb-3">Cost Advantages:</h5>
                <ul className="text-gray-300 space-y-2 text-sm">
                  <li>• <strong>Reduced cost per kW:</strong> £800-£1,400 per kW installed</li>
                  <li>• <strong>50kW system:</strong> £40,000-£70,000 total</li>
                  <li>• <strong>Bulk purchasing:</strong> Better equipment prices</li>
                  <li>• <strong>VAT recovery:</strong> 20% reclaimable for VAT-registered businesses</li>
                  <li>• <strong>Capital allowances:</strong> 100% first-year allowance available</li>
                  <li>• <strong>Financing options:</strong> Asset finance, leasing, Power Purchase Agreements</li>
                </ul>
              </div>
              <div className="bg-orange-900/20 p-4 rounded border border-orange-500/30">
                <h5 className="text-foreground font-medium mb-3">Revenue Advantages:</h5>
                <ul className="text-gray-300 space-y-2 text-sm">
                  <li>• <strong>High self-consumption:</strong> 70-95% for well-matched systems</li>
                  <li>• <strong>Commercial electricity rates:</strong> 18-25p/kWh plus standing charges</li>
                  <li>• <strong>Demand charge avoidance:</strong> Additional savings for larger users</li>
                  <li>• <strong>Grid services revenue:</strong> Frequency response, capacity markets</li>
                  <li>• <strong>Corporate PPA rates:</strong> Better than SEG for large export</li>
                  <li>• <strong>Tax benefits:</strong> Corporation tax relief on investments</li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-purple-400 mb-4">Cost-Benefit Comparison Table:</h4>
            <div className="bg-elec-dark p-4 rounded border border-gray-600">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-600">
                      <th className="text-left p-3 text-foreground">Metric</th>
                      <th className="text-center p-3 text-green-400">Domestic (4kW)</th>
                      <th className="text-center p-3 text-orange-400">Commercial (50kW)</th>
                      <th className="text-center p-3 text-purple-400">Large Commercial (500kW)</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-300">
                    <tr className="border-b border-gray-700">
                      <td className="p-3 font-medium">Cost per kW</td>
                      <td className="p-3 text-center">£1,500</td>
                      <td className="p-3 text-center">£1,200</td>
                      <td className="p-3 text-center">£900</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="p-3 font-medium">Total system cost</td>
                      <td className="p-3 text-center">£6,000</td>
                      <td className="p-3 text-center">£60,000</td>
                      <td className="p-3 text-center">£450,000</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="p-3 font-medium">Annual generation</td>
                      <td className="p-3 text-center">3,500 kWh</td>
                      <td className="p-3 text-center">43,750 kWh</td>
                      <td className="p-3 text-center">437,500 kWh</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="p-3 font-medium">Self-consumption</td>
                      <td className="p-3 text-center">60%</td>
                      <td className="p-3 text-center">85%</td>
                      <td className="p-3 text-center">90%</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="p-3 font-medium">Annual savings</td>
                      <td className="p-3 text-center">£840</td>
                      <td className="p-3 text-center">£8,500</td>
                      <td className="p-3 text-center">£75,000</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="p-3 font-medium">Simple payback</td>
                      <td className="p-3 text-center">7.1 years</td>
                      <td className="p-3 text-center">7.1 years</td>
                      <td className="p-3 text-center">6.0 years</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium">25-year ROI</td>
                      <td className="p-3 text-center">250%</td>
                      <td className="p-3 text-center">254%</td>
                      <td className="p-3 text-center">317%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CostBenefitAnalysisTable;