
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { MobileAccordion, MobileAccordionContent, MobileAccordionTrigger } from "@/components/ui/mobile-accordion";
import { AccordionItem } from "@radix-ui/react-accordion";
import { Shield, CreditCard, FileText, UserCheck, AlertTriangle, TrendingDown, CheckCircle, Users, Target } from "lucide-react";

const PreventionTab = () => {
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
    <div className="space-y-6">
      {/* Alert Banner */}
      <Alert className="border-green-500/50 bg-green-500/10">
        <Shield className="h-4 w-4" />
        <AlertTitle className="text-green-300">Prevention is Your Best Protection</AlertTitle>
        <AlertDescription className="text-muted-foreground">
          The most effective debt recovery strategy is preventing bad debts before they occur. 
          Implement these preventive measures to minimise your risk of non-payment.
        </AlertDescription>
      </Alert>

      {/* Prevention Strategies */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-elec-yellow" />
            Prevention Strategies
          </CardTitle>
        </CardHeader>
        <CardContent>
          <MobileAccordion type="multiple" className="w-full space-y-2">
            {preventionStrategies.map((strategy, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border border-border rounded-lg">
                <MobileAccordionTrigger 
                  className="px-4"
                  icon={strategy.icon}
                >
                  <div className="text-left">
                    <div className="font-semibold">{strategy.title}</div>
                    <div className="text-sm text-muted-foreground">{strategy.description}</div>
                  </div>
                </MobileAccordionTrigger>
                <MobileAccordionContent className="px-4 pb-4">
                  <div className="space-y-3">
                    {strategy.strategies.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0"></div>
                        <span className="text-sm text-muted-foreground leading-relaxed">{item}</span>
                      </div>
                    ))}
                  </div>
                </MobileAccordionContent>
              </AccordionItem>
            ))}
          </MobileAccordion>
        </CardContent>
      </Card>

      {/* Warning Signs */}
      <Card className="border-red-500/50 bg-red-500/10">
        <CardHeader>
          <CardTitle className="text-red-300 flex items-center gap-2 text-lg md:text-xl">
            <AlertTriangle className="h-5 w-5" />
            Warning Signs to Watch For
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {redFlags.map((flag, index) => (
              <div key={index} className="border border-red-500/30 rounded-lg p-4">
                <div className="flex items-start md:items-center gap-2 mb-2">
                  <Badge variant="outline" className="border-red-500/30 text-red-400 shrink-0">
                    {flag.category}
                  </Badge>
                </div>
                <h4 className="font-semibold text-white mb-2 leading-tight">{flag.warning}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  <span className="text-red-400">Action: </span>
                  {flag.action}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PreventionTab;
