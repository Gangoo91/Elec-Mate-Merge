
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { MobileAccordion, MobileAccordionItem, MobileAccordionTrigger, MobileAccordionContent } from "@/components/ui/mobile-accordion";
import { useIsMobile } from "@/hooks/use-mobile";
import { Shield, CreditCard, FileText, UserCheck, AlertTriangle, TrendingDown, CheckCircle, Users, Target, Clock, TrendingUp } from "lucide-react";

const PreventionTab = () => {
  const isMobile = useIsMobile();

  // Key prevention metrics for debt avoidance
  const preventionMetrics = [
    {
      metric: "Prevention Success Rate",
      data: "95% fewer bad debts",
      icon: <Shield className="h-5 w-5 text-green-400" />,
      detail: "Proper screening reduces non-payment risk significantly"
    },
    {
      metric: "Average Recovery Time", 
      data: "3-7 days vs 90+ days",
      icon: <Clock className="h-5 w-5 text-blue-400" />,
      detail: "Prevention costs far less than recovery"
    },
    {
      metric: "Client Retention Rate",
      data: "85% with clear terms",
      icon: <TrendingUp className="h-5 w-5 text-purple-400" />,
      detail: "Professional approach builds lasting relationships"
    },
    {
      metric: "Cash Flow Impact",
      data: "40% improvement",
      icon: <Target className="h-5 w-5 text-elec-yellow" />,
      detail: "Proactive measures stabilise business finances"
    }
  ];

  const preventionStrategies = [
    {
      title: "Credit Checks & Verification",
      icon: <UserCheck className="h-5 w-5" />,
      description: "Research your clients before starting work",
      strategies: [
        "Use credit reference agencies for commercial clients",
        "Check Companies House for business details",
        "Search online for client reviews and experiences",
        "Ask for trade references from other contractors",
        "Verify business registration and VAT numbers",
        "Check for County Court Judgments (CCJs)"
      ]
    },
    {
      title: "Clear Contract Terms",
      icon: <FileText className="h-5 w-5" />,
      description: "Establish payment expectations upfront",
      strategies: [
        "Include detailed payment terms in contracts",
        "Specify late payment charges (8% above base rate)",
        "Add retention of title clauses",
        "Define what constitutes completion",
        "Include dispute resolution procedures",
        "Get contracts signed before starting work"
      ]
    },
    {
      title: "Payment Security Measures",
      icon: <CreditCard className="h-5 w-5" />,
      description: "Protect your cash flow with advance payments",
      strategies: [
        "Request deposits for materials and labour",
        "Use staged payment schedules for larger jobs",
        "Accept credit card payments for instant settlement",
        "Consider payment guarantees for high-value work",
        "Invoice promptly upon completion",
        "Offer early payment discounts"
      ]
    },
    {
      title: "Legal Protections",
      icon: <Shield className="h-5 w-5" />,
      description: "Build legal safeguards into your business",
      strategies: [
        "Use retention of title clauses",
        "Include personal guarantees for limited companies",
        "Register company charges at Companies House",
        "Consider credit insurance for large contracts",
        "Use construction lien rights where applicable",
        "Maintain comprehensive business insurance"
      ]
    }
  ];

  const redFlags = [
    {
      category: "Financial",
      warning: "Poor credit history or multiple CCJs",
      action: "Request larger deposit or payment guarantees"
    },
    {
      category: "Communication",
      warning: "Evasive about payment terms or timeline",
      action: "Clarify expectations before starting work"
    },
    {
      category: "Reputation",
      warning: "Negative reviews from other tradespeople",
      action: "Seek additional references or avoid"
    },
    {
      category: "Business",
      warning: "Recently incorporated with no trading history",
      action: "Request personal guarantees from directors"
    },
    {
      category: "Behaviour",
      warning: "Pressure to start immediately without paperwork",
      action: "Insist on proper contracts and payment terms"
    }
  ];

  return (
    <div className="space-y-4">
      <Alert className="border-green-500/50 bg-green-500/10">
        <Shield className="h-4 w-4 text-green-400" />
        <AlertDescription className="text-green-200">
          Prevention reduces bad debt risk by 95% and saves thousands in recovery costs. Implement these strategies before problems arise.
        </AlertDescription>
      </Alert>

      <div className={`grid gap-3 ${isMobile ? 'grid-cols-2' : 'grid-cols-1 md:grid-cols-2 xl:grid-cols-4'}`}>
        {preventionMetrics.map((metric, index) => (
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
        <MobileAccordionItem value="prevention-strategies">
          <MobileAccordionTrigger icon={<Shield className="h-5 w-5 text-green-400" />}>
            Prevention Strategies & Implementation
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
              {preventionStrategies.map((strategy, index) => (
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

        <MobileAccordionItem value="warning-signs">
          <MobileAccordionTrigger icon={<AlertTriangle className="h-5 w-5 text-red-400" />}>
            Warning Signs & Red Flags
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="bg-elec-gray border border-elec-yellow/20 rounded-b-lg p-4 space-y-4">
              {redFlags.map((flag, index) => (
                <div key={index} className="border border-red-500/20 rounded-lg p-3 space-y-3">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <h4 className={`font-medium text-white ${isMobile ? 'text-sm' : 'text-base'}`}>{flag.warning}</h4>
                      <Badge variant="outline" className={`text-red-300 border-red-400/30 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                        {flag.category}
                      </Badge>
                    </div>
                  </div>

                  <div className="bg-red-500/10 border border-red-500/30 rounded p-2">
                    <h5 className={`font-medium text-red-300 mb-1 ${isMobile ? 'text-xs' : 'text-sm'}`}>Recommended Action</h5>
                    <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-red-200`}>{flag.action}</p>
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

export default PreventionTab;
