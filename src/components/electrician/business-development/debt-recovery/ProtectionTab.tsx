
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { MobileAccordion, MobileAccordionContent, MobileAccordionTrigger } from "@/components/ui/mobile-accordion";
import { AccordionItem } from "@radix-ui/react-accordion";
import { CheckCircle, Database, Users, PiggyBank, Shield, TrendingUp, Clock, Target } from "lucide-react";

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
      {/* Alert Banner */}
      <Alert className="border-yellow-500/50 bg-yellow-500/10">
        <Shield className="h-4 w-4" />
        <AlertTitle className="text-yellow-300">Protecting Your Future Business</AlertTitle>
        <AlertDescription className="text-muted-foreground">
          Learn from payment issues to strengthen your business against future problems. 
          Build robust systems and networks to minimize risk and protect your cash flow.
        </AlertDescription>
      </Alert>


      {/* Protection Strategies */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Protection Strategies
          </CardTitle>
        </CardHeader>
        <CardContent>
          <MobileAccordion type="multiple" className="w-full">
            {protectionStrategies.map((strategy, index) => (
              <AccordionItem key={index} value={`protection-${index}`}>
                <MobileAccordionTrigger icon={strategy.icon}>
                  <div className="text-left">
                    <div className="font-semibold">{strategy.title}</div>
                    <div className="text-sm text-muted-foreground">{strategy.description}</div>
                  </div>
                </MobileAccordionTrigger>
                <MobileAccordionContent>
                  <div className="space-y-3 pt-4">
                    {strategy.strategies.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                        <span className="text-sm leading-relaxed">{item}</span>
                      </div>
                    ))}
                  </div>
                </MobileAccordionContent>
              </AccordionItem>
            ))}
          </MobileAccordion>
        </CardContent>
      </Card>

      {/* Insurance & Protection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PiggyBank className="h-5 w-5" />
            Insurance & Protection Products
          </CardTitle>
        </CardHeader>
        <CardContent>
          <MobileAccordion type="single" collapsible className="w-full">
            {insuranceOptions.map((option, index) => (
              <AccordionItem key={index} value={`insurance-${index}`}>
                <MobileAccordionTrigger icon={<PiggyBank className="h-4 w-4" />}>
                  <div className="text-left flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="font-semibold">{option.type}</div>
                        <div className="text-sm text-muted-foreground">{option.description}</div>
                      </div>
                      <div className="text-right ml-4">
                        <Badge variant="outline" className="border-primary/30 text-primary mb-1">
                          {option.coverage}
                        </Badge>
                        <div className="text-xs text-muted-foreground">{option.cost}</div>
                      </div>
                    </div>
                  </div>
                </MobileAccordionTrigger>
                <MobileAccordionContent>
                  <div className="space-y-3 pt-4">
                    {option.benefits.map((benefit, benefitIndex) => (
                      <div key={benefitIndex} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                        <span className="text-sm leading-relaxed">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </MobileAccordionContent>
              </AccordionItem>
            ))}
          </MobileAccordion>
        </CardContent>
      </Card>

      {/* Business Practices */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            Best Business Practices
          </CardTitle>
        </CardHeader>
        <CardContent>
          <MobileAccordion type="multiple" className="w-full">
            {businessPractices.map((practice, index) => (
              <AccordionItem key={index} value={`practice-${index}`}>
                <MobileAccordionTrigger icon={<CheckCircle className="h-4 w-4" />}>
                  <div className="text-left">
                    <div className="font-semibold">{practice.practice}</div>
                    <div className="text-sm text-muted-foreground">{practice.description}</div>
                  </div>
                </MobileAccordionTrigger>
                <MobileAccordionContent>
                  <div className="space-y-3 pt-4">
                    {practice.implementation.map((step, stepIndex) => (
                      <div key={stepIndex} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                        <span className="text-sm leading-relaxed">{step}</span>
                      </div>
                    ))}
                  </div>
                </MobileAccordionContent>
              </AccordionItem>
            ))}
          </MobileAccordion>
        </CardContent>
      </Card>

      {/* Professional Services */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Professional Recovery Services
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {recoveryServices.map((service, index) => (
              <div key={index} className="border border-border rounded-lg p-4">
                <h4 className="font-semibold mb-2">{service.service}</h4>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-primary">When: </span>
                    <span className="text-muted-foreground">{service.when}</span>
                  </div>
                  <div>
                    <span className="text-primary">Cost: </span>
                    <span className="text-muted-foreground">{service.cost}</span>
                  </div>
                  <div>
                    <span className="text-primary">Benefits: </span>
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
