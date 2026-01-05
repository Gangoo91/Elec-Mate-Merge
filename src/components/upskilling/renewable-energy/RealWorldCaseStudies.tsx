import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const RealWorldCaseStudies = () => {
  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="text-foreground">Real World Case Studies</CardTitle>
      </CardHeader>
      <CardContent className="text-gray-300 space-y-4">
        <div className="space-y-6">
          <div className="bg-green-600/10 border border-green-600/20 rounded-md p-4">
            <h4 className="text-green-400 font-semibold mb-3">Manufacturing Facility Case Study:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h6 className="text-foreground font-medium mb-2">System Details:</h6>
                <ul className="text-gray-300 space-y-1">
                  <li>• <strong>Capacity:</strong> 250kW rooftop installation</li>
                  <li>• <strong>Total cost:</strong> £225,000 (£900 per kW)</li>
                  <li>• <strong>Annual generation:</strong> 218,750 kWh</li>
                  <li>• <strong>Self-consumption:</strong> 92% during operating hours</li>
                  <li>• <strong>Installation time:</strong> 3 weeks with minimal disruption</li>
                </ul>
              </div>
              <div>
                <h6 className="text-foreground font-medium mb-2">Financial Performance:</h6>
                <ul className="text-gray-300 space-y-1">
                  <li>• <strong>Annual savings:</strong> £38,500 electricity costs</li>
                  <li>• <strong>Export income:</strong> £1,750 SEG payments</li>
                  <li>• <strong>Carbon savings:</strong> 89 tonnes CO₂ annually</li>
                  <li>• <strong>Simple payback:</strong> 5.6 years</li>
                  <li>• <strong>25-year NPV:</strong> £467,000 (8% discount rate)</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-blue-600/10 border border-blue-600/20 rounded-md p-4">
            <h4 className="text-blue-400 font-semibold mb-3">Retail Chain Comparison:</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-600">
                    <th className="text-left p-3 text-foreground">Store Type</th>
                    <th className="text-center p-3 text-blue-400">Small Store (25kW)</th>
                    <th className="text-center p-3 text-green-400">Supermarket (150kW)</th>
                    <th className="text-center p-3 text-purple-400">Distribution Centre (500kW)</th>
                  </tr>
                </thead>
                <tbody className="text-gray-300">
                  <tr className="border-b border-gray-700">
                    <td className="p-3 font-medium">Installation cost</td>
                    <td className="p-3 text-center">£30,000</td>
                    <td className="p-3 text-center">£165,000</td>
                    <td className="p-3 text-center">£475,000</td>
                  </tr>
                  <tr className="border-b border-gray-700">
                    <td className="p-3 font-medium">Self-consumption rate</td>
                    <td className="p-3 text-center">75%</td>
                    <td className="p-3 text-center">88%</td>
                    <td className="p-3 text-center">95%</td>
                  </tr>
                  <tr className="border-b border-gray-700">
                    <td className="p-3 font-medium">Annual savings</td>
                    <td className="p-3 text-center">£4,200</td>
                    <td className="p-3 text-center">£28,600</td>
                    <td className="p-3 text-center">£82,500</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium">Payback period</td>
                    <td className="p-3 text-center">7.1 years</td>
                    <td className="p-3 text-center">5.8 years</td>
                    <td className="p-3 text-center">5.8 years</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-orange-600/10 border border-orange-600/20 rounded-md p-4">
            <h4 className="text-orange-400 font-semibold mb-3">Domestic vs Commercial ROI Analysis:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h6 className="text-green-400 font-medium mb-2">4kW Domestic System:</h6>
                <ul className="text-gray-300 space-y-1">
                  <li>• <strong>Total investment:</strong> £6,000 (0% VAT)</li>
                  <li>• <strong>Annual generation:</strong> 3,500 kWh</li>
                  <li>• <strong>Self-use (60%):</strong> 2,100 kWh saving £630</li>
                  <li>• <strong>Export (40%):</strong> 1,400 kWh earning £105</li>
                  <li>• <strong>Total annual benefit:</strong> £735</li>
                  <li>• <strong>IRR over 25 years:</strong> 12.3%</li>
                </ul>
              </div>
              <div>
                <h6 className="text-orange-400 font-medium mb-2">50kW Commercial System:</h6>
                <ul className="text-gray-300 space-y-1">
                  <li>• <strong>Total investment:</strong> £60,000 (VAT reclaimable)</li>
                  <li>• <strong>Annual generation:</strong> 43,750 kWh</li>
                  <li>• <strong>Self-use (85%):</strong> 37,188 kWh saving £7,810</li>
                  <li>• <strong>Export (15%):</strong> 6,562 kWh earning £525</li>
                  <li>• <strong>Total annual benefit:</strong> £8,335</li>
                  <li>• <strong>IRR over 25 years:</strong> 13.8%</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RealWorldCaseStudies;