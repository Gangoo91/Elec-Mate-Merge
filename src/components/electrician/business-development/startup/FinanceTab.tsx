
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { PoundSterling, TrendingUp, Calculator, CreditCard, Building, AlertTriangle, CheckCircle, Download } from "lucide-react";

const FinanceTab = () => {
  const startupCosts = [
    {
      category: "Legal & Registration",
      items: [
        { name: "Company Registration", cost: "£12-50", required: true },
        { name: "Public Liability Insurance", cost: "£200-500", required: true },
        { name: "Professional Indemnity", cost: "£300-800", required: false },
        { name: "Legal Documentation", cost: "£500-1500", required: true }
      ]
    },
    {
      category: "Equipment & Tools",
      items: [
        { name: "Basic Tool Kit", cost: "£500-1500", required: true },
        { name: "Test Equipment (MFT)", cost: "£1000-3000", required: true },
        { name: "Van/Vehicle", cost: "£5000-15000", required: true },
        { name: "Ladder & Access Equipment", cost: "£200-800", required: true }
      ]
    },
    {
      category: "Business Operations",
      items: [
        { name: "Website & Branding", cost: "£500-2000", required: false },
        { name: "Marketing Materials", cost: "£200-500", required: false },
        { name: "Mobile Phone & Contract", cost: "£30-60/month", required: true },
        { name: "Accounting Software", cost: "£20-50/month", required: true }
      ]
    }
  ];

  const fundingOptions = [
    {
      type: "Start Up Loans",
      description: "Government-backed loans up to £25,000",
      rate: "6% fixed",
      term: "1-5 years",
      pros: ["Low interest rate", "Government backing", "Mentoring support"],
      cons: ["Personal guarantee required", "Strict eligibility criteria"]
    },
    {
      type: "Business Bank Loan",
      description: "Traditional bank financing",
      rate: "4-12%",
      term: "1-10 years",
      pros: ["Flexible amounts", "Established process", "Relationship building"],
      cons: ["Requires good credit", "Collateral often needed"]
    },
    {
      type: "Asset Finance",
      description: "Financing for equipment and vehicles",
      rate: "3-8%",
      term: "2-7 years",
      pros: ["Equipment as security", "Preserve cash flow", "Tax benefits"],
      cons: ["Limited to asset value", "Higher rates than secured loans"]
    }
  ];

  const cashFlowProjection = [
    { month: "Month 1", income: 2000, expenses: 4500, net: -2500 },
    { month: "Month 2", income: 3500, expenses: 3200, net: 300 },
    { month: "Month 3", income: 5000, expenses: 3500, net: 1500 },
    { month: "Month 6", income: 8000, expenses: 4000, net: 4000 },
    { month: "Month 12", income: 12000, expenses: 5000, net: 7000 }
  ];

  return (
    <div className="space-y-6">
      <Card className="border-green-500/30 bg-gradient-to-br from-green-500/5 to-blue-500/5">
        <CardHeader>
          <CardTitle className="text-green-400 flex items-center gap-2">
            <PoundSterling className="h-5 w-5" />
            Financial Planning Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-500/20">
              <div className="text-2xl font-bold text-blue-400">£3K-8K</div>
              <div className="text-sm text-muted-foreground">Initial Investment</div>
            </div>
            <div className="bg-green-500/10 rounded-lg p-4 border border-green-500/20">
              <div className="text-2xl font-bold text-green-400">£2K-4K</div>
              <div className="text-sm text-muted-foreground">Monthly Expenses</div>
            </div>
            <div className="bg-purple-500/10 rounded-lg p-4 border border-purple-500/20">
              <div className="text-2xl font-bold text-purple-400">£35-65</div>
              <div className="text-sm text-muted-foreground">Hourly Rate Target</div>
            </div>
            <div className="bg-amber-500/10 rounded-lg p-4 border border-amber-500/20">
              <div className="text-2xl font-bold text-amber-400">6-12</div>
              <div className="text-sm text-muted-foreground">Months to Profit</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Calculator className="h-5 w-5 text-elec-yellow" />
              Startup Cost Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {startupCosts.map((category, index) => (
              <div key={index}>
                <h4 className="font-semibold text-elec-yellow mb-3">{category.category}</h4>
                <div className="space-y-2">
                  {category.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex justify-between items-center p-2 border border-elec-yellow/10 rounded">
                      <div className="flex items-center gap-2">
                        <span className="text-sm">{item.name}</span>
                        <Badge className={item.required ? "bg-red-500/20 text-red-400" : "bg-green-500/20 text-green-400"}>
                          {item.required ? "Required" : "Optional"}
                        </Badge>
                      </div>
                      <span className="text-green-400 font-medium">{item.cost}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-elec-yellow" />
              Funding Options
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {fundingOptions.map((option, index) => (
              <div key={index} className="border border-elec-yellow/20 rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold text-white">{option.type}</h4>
                  <Badge className="bg-blue-500/20 text-blue-400">{option.rate}</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{option.description}</p>
                <div className="text-xs text-blue-400 mb-2">Term: {option.term}</div>
                
                <div className="grid grid-cols-2 gap-3 mt-3">
                  <div>
                    <div className="text-xs font-medium text-green-400 mb-1">Pros:</div>
                    <ul className="text-xs space-y-1">
                      {option.pros.map((pro, i) => (
                        <li key={i} className="flex items-center gap-1">
                          <CheckCircle className="h-3 w-3 text-green-400" />
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div className="text-xs font-medium text-red-400 mb-1">Cons:</div>
                    <ul className="text-xs space-y-1">
                      {option.cons.map((con, i) => (
                        <li key={i} className="flex items-center gap-1">
                          <AlertTriangle className="h-3 w-3 text-red-400" />
                          {con}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-elec-yellow" />
            Cash Flow Projection
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {cashFlowProjection.map((period, index) => (
                <div key={index} className="bg-elec-dark p-4 rounded-lg border border-elec-yellow/10">
                  <div className="text-sm font-medium text-elec-yellow mb-2">{period.month}</div>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span>Income:</span>
                      <span className="text-green-400">£{period.income}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Expenses:</span>
                      <span className="text-red-400">£{period.expenses}</span>
                    </div>
                    <div className="border-t border-elec-yellow/20 pt-1 flex justify-between font-medium">
                      <span>Net:</span>
                      <span className={period.net >= 0 ? "text-green-400" : "text-red-400"}>
                        £{period.net}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
              <h4 className="font-medium text-blue-400 mb-2">Break-even Analysis</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Fixed Costs/Month: </span>
                  <span className="text-blue-400 font-medium">£2,500</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Average Job Value: </span>
                  <span className="text-blue-400 font-medium">£350</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Jobs Needed/Month: </span>
                  <span className="text-blue-400 font-medium">8-10</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-green-500/30 bg-green-500/10">
        <CardHeader>
          <CardTitle className="text-green-400 flex items-center gap-2">
            <Building className="h-5 w-5" />
            Financial Management Tools
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-green-300 mb-3">Essential Software</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Xero Accounting</span>
                  <span className="text-xs text-green-400">£25/month</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">QuickBooks Self-Employed</span>
                  <span className="text-xs text-green-400">£15/month</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">FreeAgent</span>
                  <span className="text-xs text-green-400">£19/month</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Wave Accounting</span>
                  <span className="text-xs text-green-400">Free</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-green-300 mb-3">Key Financial Metrics</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  Track monthly profit margins (target: 20-30%)
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  Monitor cash flow weekly
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  Set aside 20-25% for tax
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  Maintain 3-6 months operating expenses
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-6 pt-4 border-t border-green-500/20">
            <Button className="bg-green-500 text-green-900 hover:bg-green-400">
              <Download className="h-4 w-4 mr-2" />
              Download Financial Planning Template
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FinanceTab;
