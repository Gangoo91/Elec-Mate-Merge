
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, CreditCard, FileText, UserCheck } from "lucide-react";

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
      <Card className="border-green-500/50 bg-green-500/10">
        <CardHeader>
          <CardTitle className="text-green-300 flex items-center gap-2 text-lg md:text-xl">
            <Shield className="h-5 w-5" />
            Prevention is Your Best Protection
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
            The most effective debt recovery strategy is preventing bad debts before they occur. 
            Implement these preventive measures to minimise your risk of non-payment.
          </p>
        </CardContent>
      </Card>

      <div className="grid gap-6">
        {preventionStrategies.map((strategy, index) => (
          <Card key={index} className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <div className="flex items-start md:items-center gap-3">
                <div className="p-2 rounded-lg bg-elec-yellow/10 shrink-0">
                  {strategy.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-lg md:text-xl text-elec-yellow leading-tight">{strategy.title}</CardTitle>
                  <p className="text-muted-foreground text-sm leading-relaxed">{strategy.description}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2">
                {strategy.strategies.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-elec-yellow rounded-full mt-2 shrink-0"></div>
                    <span className="text-sm text-muted-foreground leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-red-500/50 bg-red-500/10">
        <CardHeader>
          <CardTitle className="text-red-300 text-lg md:text-xl">Warning Signs to Watch For</CardTitle>
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
