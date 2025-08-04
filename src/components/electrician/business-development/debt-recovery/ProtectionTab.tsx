
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { MobileAccordion, MobileAccordionItem, MobileAccordionTrigger, MobileAccordionContent } from "@/components/ui/mobile-accordion";
import { useIsMobile } from "@/hooks/use-mobile";
import { CheckCircle, Database, Users, PiggyBank, Shield, TrendingUp, Clock, Target, Award, Building } from "lucide-react";

const ProtectionTab = () => {
  const isMobile = useIsMobile();

  // Key protection metrics
  const protectionMetrics = [
    {
      metric: "Risk Reduction Rate",
      data: "80% fewer repeat issues",
      icon: <Shield className="h-5 w-5 text-green-400" />,
      detail: "Strong systems prevent future problems"
    },
    {
      metric: "Business Resilience", 
      data: "60% better cash flow",
      icon: <TrendingUp className="h-5 w-5 text-blue-400" />,
      detail: "Diversified client base improves stability"
    },
    {
      metric: "Professional Network",
      data: "5x more referrals",
      icon: <Users className="h-5 w-5 text-purple-400" />,
      detail: "Industry connections provide opportunities"
    },
    {
      metric: "Insurance Protection",
      data: "Up to 90% coverage",
      icon: <Award className="h-5 w-5 text-elec-yellow" />,
      detail: "Financial products protect against losses"
    }
  ];

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
    <div className="space-y-4">
      <Alert className="border-yellow-500/50 bg-yellow-500/10">
        <Shield className="h-4 w-4 text-yellow-400" />
        <AlertDescription className="text-yellow-200">
          Future protection strategies reduce repeat issues by 80% and build business resilience through systematic improvements.
        </AlertDescription>
      </Alert>

      <div className={`grid gap-3 ${isMobile ? 'grid-cols-2' : 'grid-cols-1 md:grid-cols-2 xl:grid-cols-4'}`}>
        {protectionMetrics.map((metric, index) => (
          <Card key={index} className="border-elec-yellow/20 bg-elec-gray p-3">
            <div className="text-center space-y-2">
              {metric.icon}
              <div className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium text-white`}>{metric.metric}</div>
              <div className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>{metric.data}</div>
            </div>
          </Card>
        ))}
      </div>

      <MobileAccordion type="single" collapsible className="space-y-2">
        <MobileAccordionItem value="protection-strategies">
          <MobileAccordionTrigger icon={<Shield className="h-5 w-5 text-green-400" />}>
            Protection Strategies & Systems
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
              {protectionStrategies.map((strategy, index) => (
                <div key={index} className="border border-green-500/20 rounded-lg p-3 space-y-3">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      {strategy.icon}
                      <h4 className={`font-medium text-white ${isMobile ? 'text-sm' : 'text-base'}`}>{strategy.title}</h4>
                    </div>
                    <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>{strategy.description}</p>
                  </div>

                  <div>
                    <h5 className={`font-medium text-green-300 mb-2 ${isMobile ? 'text-xs' : 'text-sm'}`}>Implementation Steps</h5>
                    <ul className="space-y-1">
                      {strategy.strategies.map((step, stepIndex) => (
                        <li key={stepIndex} className={`${isMobile ? 'text-xs' : 'text-sm'} text-green-200 flex items-center gap-1`}>
                          <CheckCircle className="h-3 w-3 text-green-400 flex-shrink-0" />
                          {step}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>

        <MobileAccordionItem value="insurance-protection">
          <MobileAccordionTrigger icon={<PiggyBank className="h-5 w-5 text-purple-400" />}>
            Insurance & Financial Protection
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
              {insuranceOptions.map((option, index) => (
                <div key={index} className="border border-purple-500/20 rounded-lg p-3 space-y-3">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <h4 className={`font-medium text-white ${isMobile ? 'text-sm' : 'text-base'}`}>{option.type}</h4>
                      <Badge variant="outline" className={`text-purple-300 border-purple-400/30 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                        {option.coverage}
                      </Badge>
                    </div>
                    <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>{option.description}</p>
                  </div>

                  <div>
                    <h5 className={`font-medium text-purple-300 mb-2 ${isMobile ? 'text-xs' : 'text-sm'}`}>Key Benefits</h5>
                    <ul className="space-y-1">
                      {option.benefits.map((benefit, benefitIndex) => (
                        <li key={benefitIndex} className={`${isMobile ? 'text-xs' : 'text-sm'} text-purple-200 flex items-center gap-1`}>
                          <CheckCircle className="h-3 w-3 text-green-400 flex-shrink-0" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-purple-500/10 border border-purple-500/30 rounded p-2">
                    <h5 className={`font-medium text-purple-300 mb-1 ${isMobile ? 'text-xs' : 'text-sm'}`}>Cost Structure</h5>
                    <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-purple-200`}>{option.cost}</p>
                  </div>
                </div>
              ))}
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>

        <MobileAccordionItem value="business-practices">
          <MobileAccordionTrigger icon={<Building className="h-5 w-5 text-blue-400" />}>
            Best Business Practices & Systems
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
              {businessPractices.map((practice, index) => (
                <div key={index} className="border border-blue-500/20 rounded-lg p-3 space-y-3">
                  <div className="flex flex-col gap-2">
                    <h4 className={`font-medium text-white ${isMobile ? 'text-sm' : 'text-base'}`}>{practice.practice}</h4>
                    <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>{practice.description}</p>
                  </div>

                  <div>
                    <h5 className={`font-medium text-blue-300 mb-2 ${isMobile ? 'text-xs' : 'text-sm'}`}>Implementation Steps</h5>
                    <ul className="space-y-1">
                      {practice.implementation.map((step, stepIndex) => (
                        <li key={stepIndex} className={`${isMobile ? 'text-xs' : 'text-sm'} text-blue-200 flex items-center gap-1`}>
                          <CheckCircle className="h-3 w-3 text-green-400 flex-shrink-0" />
                          {step}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>

        <MobileAccordionItem value="professional-services">
          <MobileAccordionTrigger icon={<Users className="h-5 w-5 text-orange-400" />}>
            Professional Recovery Services
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
              {recoveryServices.map((service, index) => (
                <div key={index} className="border border-orange-500/20 rounded-lg p-3 space-y-3">
                  <div className="flex flex-col gap-2">
                    <h4 className={`font-medium text-white ${isMobile ? 'text-sm' : 'text-base'}`}>{service.service}</h4>
                  </div>

                  <div className="bg-orange-500/10 border border-orange-500/30 rounded p-2">
                    <div className="space-y-2">
                      <div>
                        <h5 className={`font-medium text-orange-300 mb-1 ${isMobile ? 'text-xs' : 'text-sm'}`}>When to Use</h5>
                        <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-orange-200`}>{service.when}</p>
                      </div>
                      <div>
                        <h5 className={`font-medium text-orange-300 mb-1 ${isMobile ? 'text-xs' : 'text-sm'}`}>Cost Structure</h5>
                        <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-orange-200`}>{service.cost}</p>
                      </div>
                      <div>
                        <h5 className={`font-medium text-orange-300 mb-1 ${isMobile ? 'text-xs' : 'text-sm'}`}>Key Benefits</h5>
                        <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-orange-200`}>{service.benefits}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>
      </MobileAccordion>
    </div>
  );
};

export default ProtectionTab;
