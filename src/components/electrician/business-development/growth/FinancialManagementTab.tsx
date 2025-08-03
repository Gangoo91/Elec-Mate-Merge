import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart3, PiggyBank, TrendingUp, AlertCircle, Calculator, CreditCard } from "lucide-react";

export const FinancialManagementTab = () => {
  const financialMetrics = [
    {
      metric: "Gross Profit Margin",
      description: "Revenue minus direct costs",
      target: "50-70%",
      calculation: "(Revenue - Direct Costs) / Revenue × 100",
      importance: "Shows pricing efficiency and cost control"
    },
    {
      metric: "Net Profit Margin",
      description: "Profit after all expenses",
      target: "10-20%",
      calculation: "(Net Profit / Revenue) × 100",
      importance: "Overall business profitability"
    },
    {
      metric: "Current Ratio",
      description: "Ability to pay short-term debts",
      target: "1.5-2.0",
      calculation: "Current Assets / Current Liabilities",
      importance: "Measures financial health and liquidity"
    },
    {
      metric: "Days Sales Outstanding",
      description: "Average collection period",
      target: "30-45 days",
      calculation: "(Accounts Receivable / Daily Sales)",
      importance: "Cash flow management indicator"
    }
  ];

  const cashFlowStrategies = [
    {
      strategy: "Payment Terms Optimisation",
      tactics: ["Request deposits upfront", "Offer payment plan options", "Invoice immediately upon completion", "Follow up on overdue accounts"],
      impact: "Improved cash flow, reduced bad debt"
    },
    {
      strategy: "Expense Management",
      tactics: ["Negotiate better supplier terms", "Bulk purchase discounts", "Regular expense reviews", "Energy-efficient vehicle choices"],
      impact: "Reduced costs, improved margins"
    },
    {
      strategy: "Working Capital Management",
      tactics: ["Optimise inventory levels", "Extend payment terms with suppliers", "Use trade credit effectively", "Monitor cash flow weekly"],
      impact: "Better liquidity, reduced borrowing needs"
    }
  ];

  const taxConsiderations = [
    {
      area: "Business Structure",
      options: ["Sole Trader", "Limited Company", "Partnership"],
      considerations: "Tax rates, personal liability, administrative burden, growth plans"
    },
    {
      area: "Allowable Expenses",
      options: ["Vehicle costs", "Tools & equipment", "Professional development", "Insurance premiums"],
      considerations: "Keep detailed records, understand what qualifies, claim all eligible expenses"
    },
    {
      area: "VAT Registration",
      options: ["Voluntary registration", "Mandatory at £85k+", "Flat rate scheme"],
      considerations: "Cash flow impact, customer pricing, administrative requirements"
    },
    {
      area: "Capital Allowances",
      options: ["Annual Investment Allowance", "First Year Allowances", "Writing Down Allowances"],
      considerations: "Timing of purchases, equipment vs. expense classification"
    }
  ];

  const fundingSources = [
    {
      source: "Bank Loans",
      amount: "£5k-£500k+",
      pros: ["Lower interest rates", "Established process", "No equity dilution"],
      cons: ["Personal guarantees", "Strict criteria", "Lengthy approval"]
    },
    {
      source: "Government Grants",
      amount: "£1k-£25k",
      pros: ["No repayment required", "Support available", "Encourages innovation"],
      cons: ["Competitive application", "Specific criteria", "Limited availability"]
    },
    {
      source: "Asset Finance",
      amount: "£2k-£200k",
      pros: ["Equipment as security", "Preserve cash flow", "Tax benefits"],
      cons: ["Higher total cost", "Asset depreciation", "Ownership restrictions"]
    },
    {
      source: "Invoice Finance",
      amount: "80-90% of invoices",
      pros: ["Immediate cash flow", "Based on sales", "Flexible facility"],
      cons: ["Higher cost", "Customer awareness", "Ongoing fees"]
    }
  ];

  const investmentPriorities = [
    "Essential safety equipment and PPE",
    "Testing and measurement equipment",
    "Vehicle and mobile workshop setup",
    "Professional development and training",
    "Business management software",
    "Marketing and website development"
  ];

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-elec-yellow" />
            Key Financial Metrics
          </CardTitle>
          <CardDescription>
            Essential financial indicators to monitor your electrical business health
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {financialMetrics.map((metric, index) => (
              <Card key={index} className="bg-elec-gray/30">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{metric.metric}</CardTitle>
                    <Badge variant="outline">Target: {metric.target}</Badge>
                  </div>
                  <CardDescription>{metric.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <h5 className="font-medium text-elec-yellow mb-1">Calculation</h5>
                      <p className="text-sm text-muted-foreground font-mono">{metric.calculation}</p>
                    </div>
                    <div>
                      <h5 className="font-medium text-elec-yellow mb-1">Why It Matters</h5>
                      <p className="text-sm text-muted-foreground">{metric.importance}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-elec-yellow/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-elec-yellow" />
            Cash Flow Management
          </CardTitle>
          <CardDescription>
            Strategies to maintain healthy cash flow for business growth
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {cashFlowStrategies.map((strategy, index) => (
              <Card key={index} className="bg-elec-gray/20">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">{strategy.strategy}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <h5 className="font-medium mb-2">Implementation Tactics</h5>
                      <div className="space-y-2">
                        {strategy.tactics.map((tactic, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full" />
                            <span className="text-sm">{tactic}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h5 className="font-medium mb-2">Expected Impact</h5>
                      <p className="text-sm text-muted-foreground">{strategy.impact}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-elec-yellow/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5 text-elec-yellow" />
            Tax & Compliance (UK 2025)
          </CardTitle>
          <CardDescription>
            Essential tax considerations for electrical contractors
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {taxConsiderations.map((tax, index) => (
              <Card key={index} className="bg-elec-gray/20">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">{tax.area}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <h6 className="text-sm font-medium text-elec-yellow">Options</h6>
                    <p className="text-sm text-muted-foreground">{tax.options}</p>
                  </div>
                  <div>
                    <h6 className="text-sm font-medium text-elec-yellow">Key Considerations</h6>
                    <p className="text-sm text-muted-foreground">{tax.considerations}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-elec-yellow/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PiggyBank className="h-5 w-5 text-elec-yellow" />
            Funding & Investment Options
          </CardTitle>
          <CardDescription>
            Finance sources to support your business growth plans
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {fundingSources.map((funding, index) => (
              <Card key={index} className="bg-elec-gray/30">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{funding.source}</CardTitle>
                    <Badge variant="outline">{funding.amount}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <h5 className="font-medium text-green-400 mb-2">Advantages</h5>
                      <div className="space-y-1">
                        {funding.pros.map((pro, i) => (
                          <div key={i} className="text-sm text-muted-foreground">• {pro}</div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h5 className="font-medium text-orange-400 mb-2">Considerations</h5>
                      <div className="space-y-1">
                        {funding.cons.map((con, i) => (
                          <div key={i} className="text-sm text-muted-foreground">• {con}</div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-elec-yellow/20 bg-elec-gray/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-elec-yellow" />
            Investment Priorities for Growth
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <p className="text-sm font-medium">Recommended investment sequence for sustainable growth:</p>
            {investmentPriorities.map((priority, index) => (
              <div key={index} className="flex items-start gap-3">
                <Badge variant="outline" className="shrink-0">{index + 1}</Badge>
                <span className="text-sm">{priority}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};