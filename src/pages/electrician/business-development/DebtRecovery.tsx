
import BackButton from "@/components/common/BackButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Shield, FileText, Phone, AlertTriangle, CheckCircle } from "lucide-react";

const DebtRecovery = () => {
  const recoveryTopics = [
    {
      title: "Prevention is Better Than Cure",
      description: "Implementing systems and processes to minimise the risk of non-payment before work begins.",
      icon: <Shield className="h-8 w-8 text-elec-yellow" />,
      keyPoints: [
        "Credit checks for new commercial clients",
        "Clear payment terms in contracts",
        "Staged payments for larger projects",
        "Retention of title clauses"
      ]
    },
    {
      title: "Professional Debt Recovery Process",
      description: "Step-by-step approach to recovering overdue payments whilst maintaining professional relationships.",
      icon: <FileText className="h-8 w-8 text-elec-yellow" />,
      keyPoints: [
        "Polite reminder emails and phone calls",
        "Formal demand letters with payment deadlines",
        "Statement of account reconciliation",
        "Final notice before legal action"
      ]
    },
    {
      title: "Legal Options & Small Claims Court",
      description: "Understanding your legal rights and options when professional recovery methods fail.",
      icon: <CreditCard className="h-8 w-8 text-elec-yellow" />,
      keyPoints: [
        "Money Claim Online service",
        "Small claims court procedures",
        "Enforcement options after judgment",
        "When to engage a solicitor"
      ]
    },
    {
      title: "Protecting Future Business",
      description: "Strategies to protect your business from repeat issues and maintain cash flow.",
      icon: <CheckCircle className="h-8 w-8 text-elec-yellow" />,
      keyPoints: [
        "Building a 'problem customer' database",
        "Industry networking and credit references",
        "Payment protection insurance options",
        "Factoring and invoice financing"
      ]
    }
  ];

  const recoverySteps = [
    { step: 1, title: "Immediate Follow-up", description: "Contact within 7 days of missed payment" },
    { step: 2, title: "Formal Reminder", description: "Written reminder with 14-day payment deadline" },
    { step: 3, title: "Phone Discussion", description: "Direct conversation to understand payment issues" },
    { step: 4, title: "Final Notice", description: "Formal letter before action with clear consequences" },
    { step: 5, title: "Legal Action", description: "Court proceedings or debt collection agency" }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
      <div className="flex flex-col items-center justify-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight mb-4">Debt Recovery & Non-Payers</h1>
        <p className="text-muted-foreground text-center max-w-2xl mb-4">
          Professional strategies for managing late payments and protecting your business cash flow
        </p>
        <BackButton customUrl="/electrician/business-development" label="Back to Business Development" />
      </div>

      <div className="grid gap-6">
        {recoveryTopics.map((topic, index) => (
          <Card key={index} className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-elec-yellow/10">
                  {topic.icon}
                </div>
                <div className="flex-1">
                  <CardTitle className="text-xl mb-2">{topic.title}</CardTitle>
                  <p className="text-muted-foreground">{topic.description}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2">
                {topic.keyPoints.map((point, pointIndex) => (
                  <div key={pointIndex} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-elec-yellow rounded-full"></div>
                    <span className="text-sm">{point}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-blue-500/50 bg-blue-500/10">
        <CardHeader>
          <CardTitle className="text-blue-300 flex items-center gap-2">
            <Phone className="h-5 w-5" />
            Professional Debt Recovery Process
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {recoverySteps.map((item, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-300 font-semibold">
                  {item.step}
                </div>
                <div>
                  <h4 className="font-semibold text-white">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-red-500/50 bg-red-500/10">
        <CardHeader>
          <CardTitle className="text-red-300 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Legal Considerations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Always ensure your debt recovery practices comply with UK law, including the Late Payment 
            of Commercial Debts (Interest) Act 1998 and Consumer Credit Act regulations.
          </p>
          <div className="grid gap-3">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="border-red-500/30">Legal</Badge>
              <span className="text-sm">You can charge statutory interest on late payments</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="border-red-500/30">Rights</Badge>
              <span className="text-sm">Debt recovery costs can be claimed from the debtor</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="border-red-500/30">Advice</Badge>
              <span className="text-sm">Consider legal advice for debts over £10,000</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DebtRecovery;
