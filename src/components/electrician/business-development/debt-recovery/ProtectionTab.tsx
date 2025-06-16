
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Database, Users, PiggyBank } from "lucide-react";

const ProtectionTab = () => {
  const protectionStrategies = [
    {
      title: "Client Database Management",
      icon: <Database className="h-5 w-5" />,
      description: "Build a comprehensive client risk database",
      strategies: [
        "Maintain records of payment history for all clients",
        "Flag clients with previous payment issues",
        "Share information with trusted trade networks",
        "Use industry credit reference services",
        "Document all communication and agreements",
        "Regular review and update of client risk ratings"
      ]
    },
    {
      title: "Industry Networking",
      icon: <Users className="h-5 w-5" />,
      description: "Leverage professional networks for protection",
      strategies: [
        "Join local electrical contractor associations",
        "Participate in trade-specific forums and groups",
        "Share experiences with problem clients (legally)",
        "Exchange credit references with other contractors",
        "Build relationships with reliable suppliers",
        "Attend industry events and networking sessions"
      ]
    },
    {
      title: "Financial Protection Products",
      icon: <PiggyBank className="h-5 w-5" />,
      description: "Use financial products to mitigate risk",
      strategies: [
        "Trade credit insurance for large contracts",
        "Invoice factoring for immediate cash flow",
        "Payment protection insurance",
        "Professional indemnity insurance",
        "Business interruption insurance",
        "Legal expenses insurance for debt recovery"
      ]
    },
    {
      title: "Business Process Improvements",
      icon: <CheckCircle className="h-5 w-5" />,
      description: "Strengthen your business operations",
      strategies: [
        "Implement robust invoicing and payment systems",
        "Use professional accounting software",
        "Establish clear credit control procedures",
        "Regular cash flow forecasting and monitoring",
        "Diversify client base to reduce dependency",
        "Build strong relationships with reliable clients"
      ]
    }
  ];

  const insuranceOptions = [
    {
      type: "Trade Credit Insurance",
      coverage: "Up to 90% of invoice value",
      cost: "0.1% - 0.5% of turnover",
      description: "Protects against customer insolvency and non-payment",
      benefits: ["Coverage for existing and new customers", "Credit monitoring services", "Debt collection support"]
    },
    {
      type: "Legal Expenses Insurance",
      coverage: "Up to £100,000 per claim",
      cost: "£200 - £500 annually",
      description: "Covers legal costs for debt recovery and disputes",
      benefits: ["Legal advice helpline", "Court representation", "Debt recovery costs covered"]
    },
    {
      type: "Invoice Protection",
      coverage: "Up to £25,000 per invoice",
      cost: "1% - 3% of invoice value",
      description: "Guarantees payment for specific invoices",
      benefits: ["Quick approval process", "Payment within 30 days", "No credit checks required"]
    }
  ];

  const businessPractices = [
    {
      practice: "Diversified Client Base",
      description: "Avoid dependency on single large clients",
      implementation: [
        "Target multiple market sectors",
        "Limit individual client to 20% of turnover",
        "Develop recurring maintenance contracts",
        "Build strong relationships with smaller clients"
      ]
    },
    {
      practice: "Strong Financial Controls",
      description: "Implement robust financial management",
      implementation: [
        "Monthly cash flow forecasting",
        "Regular debtor age analysis",
        "Automated payment reminders",
        "Professional credit control procedures"
      ]
    },
    {
      practice: "Professional Relationships",
      description: "Build a network of reliable contacts",
      implementation: [
        "Develop partnerships with other trades",
        "Maintain good supplier relationships",
        "Join professional associations",
        "Attend industry networking events"
      ]
    }
  ];

  const recoveryServices = [
    {
      service: "Debt Collection Agencies",
      when: "After 60-90 days of non-payment",
      cost: "15-25% of recovered amount",
      benefits: "Professional expertise, legal knowledge, time-saving"
    },
    {
      service: "Invoice Factoring",
      when: "For immediate cash flow needs",
      cost: "1-3% of invoice value plus interest",
      benefits: "Immediate payment, credit checking, sales ledger management"
    },
    {
      service: "Solicitor Services",
      when: "For complex disputes or large debts",
      cost: "£150-£600 per hour",
      benefits: "Legal expertise, court representation, formal procedures"
    },
    {
      service: "Trade Credit Agencies",
      when: "For credit checking and monitoring",
      cost: "£10-£50 per credit check",
      benefits: "Risk assessment, early warning systems, industry data"
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="border-green-500/50 bg-green-500/10">
        <CardHeader>
          <CardTitle className="text-green-300 flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            Protecting Your Future Business
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Learn from payment issues to strengthen your business against future problems. 
            Build robust systems and networks to minimize risk and protect your cash flow.
          </p>
        </CardContent>
      </Card>

      <div className="grid gap-6">
        {protectionStrategies.map((strategy, index) => (
          <Card key={index} className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-elec-yellow/10">
                  {strategy.icon}
                </div>
                <div>
                  <CardTitle className="text-xl text-elec-yellow">{strategy.title}</CardTitle>
                  <p className="text-muted-foreground text-sm">{strategy.description}</p>
                </div>
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
          <CardTitle className="text-blue-300">Insurance & Protection Products</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {insuranceOptions.map((option, index) => (
              <div key={index} className="border border-blue-500/30 rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold text-white">{option.type}</h4>
                  <div className="text-right">
                    <Badge variant="outline" className="border-blue-500/30 mb-1">
                      {option.coverage}
                    </Badge>
                    <div className="text-xs text-muted-foreground">{option.cost}</div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{option.description}</p>
                <div className="space-y-1">
                  {option.benefits.map((benefit, benefitIndex) => (
                    <div key={benefitIndex} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <div className="w-1 h-1 bg-blue-400 rounded-full"></div>
                      {benefit}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-purple-500/50 bg-purple-500/10">
        <CardHeader>
          <CardTitle className="text-purple-300">Best Business Practices</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {businessPractices.map((practice, index) => (
              <div key={index} className="border border-purple-500/30 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-2">{practice.practice}</h4>
                <p className="text-sm text-muted-foreground mb-3">{practice.description}</p>
                <div className="space-y-1">
                  {practice.implementation.map((step, stepIndex) => (
                    <div key={stepIndex} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                      {step}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-orange-500/50 bg-orange-500/10">
        <CardHeader>
          <CardTitle className="text-orange-300">Professional Recovery Services</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {recoveryServices.map((service, index) => (
              <div key={index} className="border border-orange-500/30 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-2">{service.service}</h4>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-orange-400">When: </span>
                    <span className="text-muted-foreground">{service.when}</span>
                  </div>
                  <div>
                    <span className="text-orange-400">Cost: </span>
                    <span className="text-muted-foreground">{service.cost}</span>
                  </div>
                  <div>
                    <span className="text-orange-400">Benefits: </span>
                    <span className="text-muted-foreground">{service.benefits}</span>
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

export default ProtectionTab;
