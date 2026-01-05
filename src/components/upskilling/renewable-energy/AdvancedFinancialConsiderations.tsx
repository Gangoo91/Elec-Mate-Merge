import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const AdvancedFinancialConsiderations = () => {
  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="text-foreground">Advanced Financial Considerations</CardTitle>
      </CardHeader>
      <CardContent className="text-gray-300 space-y-4">
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-blue-400 mb-4">Risk Assessment and Mitigation:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-red-900/20 p-4 rounded border border-red-500/30">
                <h5 className="text-foreground font-medium mb-3">Financial Risks:</h5>
                <ul className="text-gray-300 space-y-2 text-sm">
                  <li>• <strong>Interest rate changes:</strong> Affects financing costs for borrowed capital</li>
                  <li>• <strong>Electricity price volatility:</strong> Reduced savings if energy prices fall</li>
                  <li>• <strong>Technology obsolescence:</strong> Newer, cheaper panels reducing system value</li>
                  <li>• <strong>Regulatory changes:</strong> Potential reduction in export tariffs</li>
                  <li>• <strong>Performance degradation:</strong> Annual output decline affects long-term returns</li>
                  <li>• <strong>Maintenance costs:</strong> Inverter replacement and unexpected repairs</li>
                </ul>
              </div>
              <div className="bg-green-900/20 p-4 rounded border border-green-500/30">
                <h5 className="text-foreground font-medium mb-3">Risk Mitigation Strategies:</h5>
                <ul className="text-gray-300 space-y-2 text-sm">
                  <li>• <strong>Performance warranties:</strong> 25-year linear performance guarantees</li>
                  <li>• <strong>Insurance coverage:</strong> All-risk policies including business interruption</li>
                  <li>• <strong>Service agreements:</strong> Comprehensive O&M contracts with SLA guarantees</li>
                  <li>• <strong>Monitoring systems:</strong> Real-time performance tracking and fault detection</li>
                  <li>• <strong>Conservative modelling:</strong> Use worst-case scenarios in financial projections</li>
                  <li>• <strong>Diversified portfolios:</strong> Multiple smaller installations vs single large system</li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-purple-400 mb-4">Advanced Financial Metrics:</h4>
            <div className="bg-elec-dark p-4 rounded border border-gray-600">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <h6 className="text-green-400 font-medium mb-3">Net Present Value (NPV):</h6>
                  <ul className="text-gray-300 space-y-1">
                    <li>• Accounts for time value of money</li>
                    <li>• Uses appropriate discount rates (6-10%)</li>
                    <li>• Positive NPV indicates profitable investment</li>
                    <li>• Compare against alternative investments</li>
                    <li>• Sensitivity analysis for key variables</li>
                  </ul>
                </div>
                <div>
                  <h6 className="text-blue-400 font-medium mb-3">Internal Rate of Return (IRR):</h6>
                  <ul className="text-gray-300 space-y-1">
                    <li>• Discount rate where NPV equals zero</li>
                    <li>• Higher IRR indicates better returns</li>
                    <li>• Compare against cost of capital</li>
                    <li>• Typical solar IRR: 8-15% for commercial</li>
                    <li>• Consider modified IRR for reinvestment</li>
                  </ul>
                </div>
                <div>
                  <h6 className="text-orange-400 font-medium mb-3">Levelised Cost of Electricity (LCOE):</h6>
                  <ul className="text-gray-300 space-y-1">
                    <li>• Total lifecycle costs per kWh produced</li>
                    <li>• Include all capex, opex, and financing</li>
                    <li>• Compare against grid electricity prices</li>
                    <li>• UK solar LCOE: 6-12p/kWh typically</li>
                    <li>• Factor in degradation and maintenance</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-cyan-400 mb-4">Financing Structure Impact on Returns:</h4>
            <div className="space-y-4">
              <div className="bg-cyan-900/20 p-4 rounded border border-cyan-500/30">
                <h5 className="text-foreground font-medium mb-3">Cash Purchase vs Financing Comparison:</h5>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-600">
                        <th className="text-left p-3 text-foreground">Financing Method</th>
                        <th className="text-center p-3 text-green-400">Cash Purchase</th>
                        <th className="text-center p-3 text-blue-400">Asset Finance (5%)</th>
                        <th className="text-center p-3 text-purple-400">PPA Agreement</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-300">
                      <tr className="border-b border-gray-700">
                        <td className="p-3 font-medium">Upfront cost (100kW)</td>
                        <td className="p-3 text-center">£100,000</td>
                        <td className="p-3 text-center">£20,000 deposit</td>
                        <td className="p-3 text-center">£0</td>
                      </tr>
                      <tr className="border-b border-gray-700">
                        <td className="p-3 font-medium">Annual payments</td>
                        <td className="p-3 text-center">£0</td>
                        <td className="p-3 text-center">£8,500 (10 years)</td>
                        <td className="p-3 text-center">£12,500 (20 years)</td>
                      </tr>
                      <tr className="border-b border-gray-700">
                        <td className="p-3 font-medium">Ownership</td>
                        <td className="p-3 text-center">Immediate</td>
                        <td className="p-3 text-center">After 10 years</td>
                        <td className="p-3 text-center">Never</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-medium">25-year NPV (8%)</td>
                        <td className="p-3 text-center">£165,000</td>
                        <td className="p-3 text-center">£145,000</td>
                        <td className="p-3 text-center">£78,000</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdvancedFinancialConsiderations;