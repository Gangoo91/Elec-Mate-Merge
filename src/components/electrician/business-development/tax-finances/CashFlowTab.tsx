
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Calendar, PiggyBank, CreditCard } from "lucide-react";

const CashFlowTab = () => {
  const cashFlowStrategies = [
    {
      title: "Invoice Management",
      icon: <Calendar className="h-5 w-5" />,
      strategies: [
        "Send invoices immediately upon job completion",
        "Use clear payment terms (7, 14, or 30 days)",
        "Include late payment charges in terms",
        "Offer early payment discounts (2% for 7 days)",
        "Use professional invoicing software",
        "Follow up on overdue payments promptly"
      ]
    },
    {
      title: "Payment Terms & Methods",
      icon: <CreditCard className="h-5 w-5" />,
      strategies: [
        "Accept multiple payment methods",
        "Consider card payments for immediate settlement",
        "Use staged payments for larger projects",
        "Require deposits for materials",
        "Set up direct debit for regular customers",
        "Consider invoice factoring for immediate cash"
      ]
    },
    {
      title: "Emergency Fund Planning",
      icon: <PiggyBank className="h-5 w-5" />,
      strategies: [
        "Maintain 3-6 months of expenses in reserve",
        "Separate business and personal emergency funds",
        "Use high-interest business savings accounts",
        "Review and update fund targets quarterly",
        "Consider seasonal fluctuations",
        "Plan for equipment replacement costs"
      ]
    }
  ];

  const seasonalTips = [
    {
      season: "Spring",
      activities: "Garden lighting, outdoor sockets, inspection scheduling",
      cashFlow: "Moderate - outdoor work increases",
      preparation: "Plan for summer peak, update certifications"
    },
    {
      season: "Summer",
      activities: "Peak installation season, commercial projects",
      cashFlow: "High - maximum earning potential",
      preparation: "Build cash reserves for winter, invest in training"
    },
    {
      season: "Autumn",
      activities: "Heating installations, winter preparation work",
      cashFlow: "Good - preparation for winter",
      preparation: "Complete outstanding projects, plan winter work"
    },
    {
      season: "Winter",
      activities: "Emergency repairs, heating systems, indoor work",
      cashFlow: "Lower - weather dependent",
      preparation: "Use reserves wisely, focus on maintenance work"
    }
  ];

  const financingOptions = [
    {
      option: "Business Overdraft",
      description: "Flexible borrowing for short-term cash flow gaps",
      typical: "£1,000 - £25,000",
      cost: "High interest on borrowed amount",
      bestFor: "Temporary gaps between payments"
    },
    {
      option: "Business Credit Card",
      description: "Convenient for expenses with cashback options",
      typical: "£500 - £25,000 limit",
      cost: "High interest if not paid monthly",
      bestFor: "Purchasing materials and equipment"
    },
    {
      option: "Asset Finance",
      description: "Spread cost of expensive equipment over time",
      typical: "£1,000 - £500,000+",
      cost: "3-15% APR depending on terms",
      bestFor: "Van purchase, expensive test equipment"
    },
    {
      option: "Invoice Factoring",
      description: "Sell invoices for immediate cash (80-90% value)",
      typical: "Based on invoice value",
      cost: "1-5% of invoice value",
      bestFor: "Large commercial invoices"
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="border-green-500/50 bg-green-500/10">
        <CardHeader>
          <CardTitle className="text-green-300 flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Cash Flow Management Essentials
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Healthy cash flow is the lifeblood of your electrical business. Implement these strategies 
            to maintain steady income and prepare for seasonal variations.
          </p>
        </CardContent>
      </Card>

      <div className="grid gap-6">
        {cashFlowStrategies.map((strategy, index) => (
          <Card key={index} className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-elec-yellow/10">
                  {strategy.icon}
                </div>
                <CardTitle className="text-xl text-elec-yellow">{strategy.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2">
                {strategy.strategies.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-elec-yellow rounded-full"></div>
                    <span className="text-sm text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-blue-500/50 bg-blue-500/10">
        <CardHeader>
          <CardTitle className="text-blue-300">Seasonal Cash Flow Planning</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {seasonalTips.map((season, index) => (
              <div key={index} className="border border-blue-500/30 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-2">{season.season}</h4>
                <div className="space-y-2 text-sm">
                  <div>
                    <Badge variant="outline" className="border-blue-500/30 mb-1">Activities</Badge>
                    <p className="text-muted-foreground">{season.activities}</p>
                  </div>
                  <div>
                    <Badge variant="outline" className="border-blue-500/30 mb-1">Cash Flow</Badge>
                    <p className="text-muted-foreground">{season.cashFlow}</p>
                  </div>
                  <div>
                    <Badge variant="outline" className="border-blue-500/30 mb-1">Preparation</Badge>
                    <p className="text-muted-foreground">{season.preparation}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-purple-500/50 bg-purple-500/10">
        <CardHeader>
          <CardTitle className="text-purple-300">Financing Options</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {financingOptions.map((option, index) => (
              <div key={index} className="border border-purple-500/30 rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold text-white">{option.option}</h4>
                  <Badge variant="outline" className="border-purple-500/30">{option.typical}</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{option.description}</p>
                <div className="grid md:grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-red-400">Cost: </span>
                    <span className="text-muted-foreground">{option.cost}</span>
                  </div>
                  <div>
                    <span className="text-green-400">Best for: </span>
                    <span className="text-muted-foreground">{option.bestFor}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CashFlowTab;
