import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const TaxVATConsiderations = () => {
  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="text-foreground">Tax, VAT, and Grant Considerations</CardTitle>
      </CardHeader>
      <CardContent className="text-gray-300 space-y-4">
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-blue-400 mb-4">VAT Treatment Differences:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-blue-900/20 p-4 rounded border border-blue-500/30">
                <h5 className="text-foreground font-medium mb-3">Domestic VAT Rules:</h5>
                <ul className="text-gray-300 space-y-2 text-sm">
                  <li>• <strong>0% VAT:</strong> Solar PV systems ≤10kW (since April 2022)</li>
                  <li>• <strong>0% VAT:</strong> Battery storage ≤10kWh when installed with solar</li>
                  <li>• <strong>Eligibility:</strong> Residential properties only</li>
                  <li>• <strong>Retroactive claims:</strong> Not possible for systems installed before rules</li>
                  <li>• <strong>Documentation:</strong> Installer must provide VAT-exempt invoice</li>
                  <li>• <strong>Savings:</strong> 20% reduction in total system cost</li>
                </ul>
              </div>
              <div className="bg-yellow-900/20 p-4 rounded border border-yellow-500/30">
                <h5 className="text-foreground font-medium mb-3">Commercial VAT Treatment:</h5>
                <ul className="text-gray-300 space-y-2 text-sm">
                  <li>• <strong>Standard rate:</strong> 20% VAT applies to installation</li>
                  <li>• <strong>VAT recovery:</strong> Reclaimable for VAT-registered businesses</li>
                  <li>• <strong>Cash flow:</strong> Upfront payment, quarterly reclaim</li>
                  <li>• <strong>Mixed use:</strong> Partial reclaim for partly domestic use</li>
                  <li>• <strong>Import VAT:</strong> Reclaimable on equipment imports</li>
                  <li>• <strong>Net effect:</strong> No VAT cost for most businesses</li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-green-400 mb-4">Tax Incentives and Allowances:</h4>
            <div className="bg-elec-dark p-4 rounded border border-gray-600">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <h6 className="text-green-400 font-medium mb-3">Capital Allowances:</h6>
                  <ul className="text-gray-300 space-y-1">
                    <li>• <strong>100% First Year Allowance:</strong> Available for energy-saving equipment</li>
                    <li>• <strong>Annual Investment Allowance:</strong> £1 million allowance for qualifying expenditure</li>
                    <li>• <strong>Enhanced Capital Allowances:</strong> For equipment on Energy Technology List</li>
                    <li>• <strong>Corporation tax relief:</strong> Immediate deduction from taxable profits</li>
                    <li>• <strong>Tax saving:</strong> 19-25% of installation cost</li>
                  </ul>
                </div>
                <div>
                  <h6 className="text-blue-400 font-medium mb-3">Business Rates:</h6>
                  <ul className="text-gray-300 space-y-1">
                    <li>• <strong>Exemption:</strong> Rooftop solar typically exempt from business rates</li>
                    <li>• <strong>Ground-mounted:</strong> May be subject to business rates</li>
                    <li>• <strong>Valuation:</strong> Based on rental value if rateable</li>
                    <li>• <strong>Appeals process:</strong> Available if rated incorrectly</li>
                    <li>• <strong>Small business relief:</strong> May apply to reduce liability</li>
                  </ul>
                </div>
                <div>
                  <h6 className="text-purple-400 font-medium mb-3">Income Tax (Domestic):</h6>
                  <ul className="text-gray-300 space-y-1">
                    <li>• <strong>SEG payments:</strong> Generally tax-free for domestic installations</li>
                    <li>• <strong>Threshold:</strong> £1,000 property income allowance</li>
                    <li>• <strong>Commercial use:</strong> May be subject to income tax</li>
                    <li>• <strong>Record keeping:</strong> Maintain SEG payment records</li>
                    <li>• <strong>Professional advice:</strong> Recommended for complex cases</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-orange-400 mb-4">Grant and Funding Opportunities:</h4>
            <div className="space-y-4">
              <div className="bg-orange-900/20 p-4 rounded border border-orange-500/30">
                <h5 className="text-foreground font-medium mb-3">Business and Commercial Grants:</h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h6 className="text-yellow-400 font-medium mb-2">National Schemes:</h6>
                    <ul className="text-gray-300 space-y-1">
                      <li>• <strong>Green Business Fund:</strong> Various regional schemes</li>
                      <li>• <strong>Innovate UK:</strong> Innovation and R&D funding</li>
                      <li>• <strong>Net Zero Innovation Portfolio:</strong> Large-scale projects</li>
                      <li>• <strong>Industrial Energy Transformation Fund:</strong> Energy efficiency projects</li>
                      <li>• <strong>Public Sector Decarbonisation Scheme:</strong> Public buildings</li>
                    </ul>
                  </div>
                  <div>
                    <h6 className="text-cyan-400 font-medium mb-2">Local and Sector-Specific:</h6>
                    <ul className="text-gray-300 space-y-1">
                      <li>• <strong>Local Enterprise Partnerships:</strong> Regional development funding</li>
                      <li>• <strong>Local Authority schemes:</strong> Planning and building requirements</li>
                      <li>• <strong>Agricultural grants:</strong> Farming equipment and diversification</li>
                      <li>• <strong>Community energy grants:</strong> Community-owned projects</li>
                      <li>• <strong>European Regional Development Fund:</strong> Where still applicable</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-green-900/20 p-4 rounded border border-green-500/30">
                <h5 className="text-foreground font-medium mb-3">Domestic Support Schemes:</h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h6 className="text-green-400 font-medium mb-2">Current Schemes:</h6>
                    <ul className="text-gray-300 space-y-1">
                      <li>• <strong>0% VAT:</strong> Effective 20% discount on qualifying systems</li>
                      <li>• <strong>Interest-free loans:</strong> Some local authorities offer schemes</li>
                      <li>• <strong>Council tax reductions:</strong> Limited availability in some areas</li>
                      <li>• <strong>Energy Company Obligation:</strong> Support for vulnerable households</li>
                    </ul>
                  </div>
                  <div>
                    <h6 className="text-orange-400 font-medium mb-2">Financing Options:</h6>
                    <ul className="text-gray-300 space-y-1">
                      <li>• <strong>Solar loans:</strong> Specialist renewable energy lending</li>
                      <li>• <strong>Green mortgages:</strong> Better rates for energy-efficient homes</li>
                      <li>• <strong>Personal loans:</strong> Unsecured lending for smaller systems</li>
                      <li>• <strong>Power Purchase Agreements:</strong> No upfront cost options</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TaxVATConsiderations;