
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PoundSterling, TrendingUp, Calculator, CreditCard, Lightbulb, ExternalLink } from "lucide-react";

const FinanceTab = () => {
  const startupCosts = [
    {
      category: "Equipment & Tools",
      items: [
        { name: "Multifunction Tester (MFT)", cost: "£800-£1,500" },
        { name: "Basic Hand Tools", cost: "£300-£600" },
        { name: "Power Tools", cost: "£400-£800" },
        { name: "PPE & Safety Equipment", cost: "£200-£400" }
      ],
      total: "£1,700-£3,300"
    },
    {
      category: "Transport & Storage",
      items: [
        { name: "Van Purchase/Lease", cost: "£15,000-£25,000" },
        { name: "Van Racking System", cost: "£800-£1,500" },
        { name: "Van Signage", cost: "£300-£800" },
        { name: "Insurance & Tax", cost: "£2,000-£3,500/year" }
      ],
      total: "£18,100-£30,800"
    },
    {
      category: "Professional Setup",
      items: [
        { name: "Scheme Membership (NICEIC/NAPIT)", cost: "£500-£800" },
        { name: "Public Liability Insurance", cost: "£200-£500" },
        { name: "Professional Indemnity", cost: "£300-£800" },
        { name: "Accountancy Software", cost: "£200-£400/year" }
      ],
      total: "£1,200-£2,500"
    }
  ];

  const monthlyExpenses = [
    { category: "Vehicle", amount: "£400-£600", description: "Fuel, maintenance, insurance" },
    { category: "Insurance", amount: "£100-£150", description: "All business insurances" },
    { category: "Subscriptions", amount: "£50-£100", description: "Software, memberships" },
    { category: "Marketing", amount: "£200-£500", description: "Website, advertising" },
    { category: "Office/Admin", amount: "£100-£200", description: "Phone, internet, stationery" }
  ];

  const pricingGuidelines = [
    {
      service: "Consumer Unit Change",
      dayRate: "£250-£400",
      materials: "£150-£300",
      profit: "£100-£250"
    },
    {
      service: "Full House Rewire (3-bed)",
      dayRate: "£1,500-£2,500",
      materials: "£800-£1,200",
      profit: "£700-£1,300"
    },
    {
      service: "Additional Socket/Light",
      dayRate: "£80-£150",
      materials: "£15-£40",
      profit: "£65-£110"
    },
    {
      service: "EICR Testing",
      dayRate: "£200-£350",
      materials: "£10-£30",
      profit: "£190-£320"
    }
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
            <div className="bg-red-500/10 rounded-lg p-4 border border-red-500/20">
              <div className="text-2xl font-bold text-red-400">£25K-40K</div>
              <div className="text-sm text-muted-foreground">Initial Investment</div>
            </div>
            <div className="bg-amber-500/10 rounded-lg p-4 border border-amber-500/20">
              <div className="text-2xl font-bold text-amber-400">£850-1,550</div>
              <div className="text-sm text-muted-foreground">Monthly Expenses</div>
            </div>
            <div className="bg-green-500/10 rounded-lg p-4 border border-green-500/20">
              <div className="text-2xl font-bold text-green-400">£2K-4K</div>
              <div className="text-sm text-muted-foreground">Monthly Target</div>
            </div>
            <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-500/20">
              <div className="text-2xl font-bold text-blue-400">6-12</div>
              <div className="text-sm text-muted-foreground">Months Break-even</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-elec-yellow" />
            Startup Investment Breakdown
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {startupCosts.map((category, index) => (
              <div key={index} className="border border-elec-yellow/20 rounded-lg p-4">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-semibold text-elec-yellow">{category.category}</h4>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                    {category.total}
                  </Badge>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {category.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{item.name}</span>
                      <span className="text-white font-mono">{item.cost}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-elec-yellow" />
              Monthly Operating Costs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {monthlyExpenses.map((expense, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-elec-dark/50 rounded-lg">
                  <div>
                    <div className="font-medium text-white">{expense.category}</div>
                    <div className="text-xs text-muted-foreground">{expense.description}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-elec-yellow">{expense.amount}</div>
                    <div className="text-xs text-muted-foreground">per month</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Calculator className="h-5 w-5 text-elec-yellow" />
              Pricing Guidelines
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pricingGuidelines.map((service, index) => (
                <div key={index} className="border border-elec-yellow/20 rounded-lg p-3">
                  <h5 className="font-medium text-white mb-2">{service.service}</h5>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div>
                      <span className="text-muted-foreground">Total:</span>
                      <div className="font-mono text-blue-400">{service.dayRate}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Materials:</span>
                      <div className="font-mono text-amber-400">{service.materials}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Profit:</span>
                      <div className="font-mono text-green-400">{service.profit}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-blue-500/30 bg-blue-500/10">
        <CardHeader>
          <CardTitle className="text-blue-400 flex items-center gap-2">
            <Lightbulb className="h-5 w-5" />
            Financial Success Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3 text-blue-300">Cash Flow Management</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Always take deposits for large jobs (30-50%)</li>
                <li>• Set clear payment terms (14-30 days maximum)</li>
                <li>• Keep 3-6 months expenses as emergency fund</li>
                <li>• Invoice immediately upon job completion</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-blue-300">Growth Strategies</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Focus on repeat customers and referrals</li>
                <li>• Build relationships with builders and architects</li>
                <li>• Consider specialising in high-value sectors</li>
                <li>• Invest profits back into quality equipment</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-6 pt-4 border-t border-blue-500/20 flex gap-3">
            <Button className="bg-blue-500 text-blue-900 hover:bg-blue-400">
              <Calculator className="h-4 w-4 mr-2" />
              Business Calculator
            </Button>
            <Button variant="outline" className="border-blue-500/30">
              <ExternalLink className="h-4 w-4 mr-2" />
              Pricing Worksheet
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FinanceTab;
