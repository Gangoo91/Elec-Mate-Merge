
import BackButton from "@/components/common/BackButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, FileText, Scale, CheckCircle, AlertTriangle, TrendingUp, Clock, Users, CreditCard } from "lucide-react";
import { DropdownTabs } from "@/components/ui/dropdown-tabs";
import PreventionTab from "@/components/electrician/business-development/debt-recovery/PreventionTab";
import RecoveryProcessTab from "@/components/electrician/business-development/debt-recovery/RecoveryProcessTab";
import LegalOptionsTab from "@/components/electrician/business-development/debt-recovery/LegalOptionsTab";
import ProtectionTab from "@/components/electrician/business-development/debt-recovery/ProtectionTab";

const DebtRecovery = () => {
  const tabs = [
    {
      value: "prevention",
      label: "Prevention",
      icon: Shield,
      content: <PreventionTab />
    },
    {
      value: "process", 
      label: "Recovery Process",
      icon: FileText,
      content: <RecoveryProcessTab />
    },
    {
      value: "legal",
      label: "Legal Options", 
      icon: Scale,
      content: <LegalOptionsTab />
    },
    {
      value: "protection",
      label: "Protection",
      icon: CheckCircle,
      content: <ProtectionTab />
    }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6 md:space-y-8 animate-fade-in px-4 md:px-0">
      <div className="text-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">Debt Recovery & Non-Payers</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-4 text-sm md:text-base leading-relaxed">
          Professional strategies for managing late payments and protecting your business cash flow
        </p>
        <BackButton customUrl="/electrician/business-development" label="Back to Business Development" />
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Card className="text-center p-4">
          <div className="flex items-center justify-center mb-2">
            <TrendingUp className="h-6 w-6 text-red-400" />
          </div>
          <div className="text-2xl font-bold text-red-400">32%</div>
          <div className="text-xs text-muted-foreground">Late payment rate in construction</div>
        </Card>
        <Card className="text-center p-4">
          <div className="flex items-center justify-center mb-2">
            <Clock className="h-6 w-6 text-yellow-400" />
          </div>
          <div className="text-2xl font-bold text-yellow-400">38</div>
          <div className="text-xs text-muted-foreground">Average days to payment</div>
        </Card>
        <Card className="text-center p-4">
          <div className="flex items-center justify-center mb-2">
            <Users className="h-6 w-6 text-blue-400" />
          </div>
          <div className="text-2xl font-bold text-blue-400">£9.2k</div>
          <div className="text-xs text-muted-foreground">Average debt per case</div>
        </Card>
        <Card className="text-center p-4">
          <div className="flex items-center justify-center mb-2">
            <CreditCard className="h-6 w-6 text-green-400" />
          </div>
          <div className="text-2xl font-bold text-green-400">78%</div>
          <div className="text-xs text-muted-foreground">Recovery success rate</div>
        </Card>
      </div>

      <DropdownTabs
        tabs={tabs}
        defaultValue="prevention"
        placeholder="Select debt recovery topic..."
      />

      <Card className="border-red-500/50 bg-red-500/10">
        <CardHeader>
          <CardTitle className="text-red-300 flex items-center gap-2 text-lg md:text-xl">
            <AlertTriangle className="h-5 w-5" />
            Legal Considerations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4 text-sm md:text-base leading-relaxed">
            Always ensure your debt recovery practices comply with UK law, including the Late Payment 
            of Commercial Debts (Interest) Act 1998 and Consumer Credit Act regulations.
          </p>
          <div className="grid gap-3">
            <div className="flex items-start md:items-center gap-2">
              <Badge variant="outline" className="border-red-500/30 shrink-0">Legal</Badge>
              <span className="text-sm leading-relaxed">You can charge statutory interest on late payments</span>
            </div>
            <div className="flex items-start md:items-center gap-2">
              <Badge variant="outline" className="border-red-500/30 shrink-0">Rights</Badge>
              <span className="text-sm leading-relaxed">Debt recovery costs can be claimed from the debtor</span>
            </div>
            <div className="flex items-start md:items-center gap-2">
              <Badge variant="outline" className="border-red-500/30 shrink-0">Advice</Badge>
              <span className="text-sm leading-relaxed">Consider legal advice for debts over £10,000</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DebtRecovery;
