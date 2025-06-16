
import BackButton from "@/components/common/BackButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, FileText, Phone, CheckCircle, AlertTriangle, BookOpen } from "lucide-react";
import PreventionTab from "@/components/electrician/business-development/debt-recovery/PreventionTab";
import RecoveryProcessTab from "@/components/electrician/business-development/debt-recovery/RecoveryProcessTab";
import LegalOptionsTab from "@/components/electrician/business-development/debt-recovery/LegalOptionsTab";
import ProtectionTab from "@/components/electrician/business-development/debt-recovery/ProtectionTab";

const DebtRecovery = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-6 md:space-y-8 animate-fade-in px-4 md:px-0">
      <div className="flex flex-col items-center justify-center text-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">Debt Recovery & Non-Payers</h1>
        <p className="text-muted-foreground text-center max-w-2xl mb-4 text-sm md:text-base leading-relaxed">
          Professional strategies for managing late payments and protecting your business cash flow
        </p>
        <BackButton customUrl="/electrician/business-development" label="Back to Business Development" />
      </div>

      <Tabs defaultValue="prevention" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto">
          <TabsTrigger value="prevention" className="flex flex-col md:flex-row items-center gap-1 md:gap-2 p-2 md:p-3 text-xs md:text-sm">
            <Shield className="h-4 w-4" />
            <span className="text-center">Prevention</span>
          </TabsTrigger>
          <TabsTrigger value="process" className="flex flex-col md:flex-row items-center gap-1 md:gap-2 p-2 md:p-3 text-xs md:text-sm">
            <FileText className="h-4 w-4" />
            <span className="text-center">Process</span>
          </TabsTrigger>
          <TabsTrigger value="legal" className="flex flex-col md:flex-row items-center gap-1 md:gap-2 p-2 md:p-3 text-xs md:text-sm">
            <Phone className="h-4 w-4" />
            <span className="text-center">Legal Options</span>
          </TabsTrigger>
          <TabsTrigger value="protection" className="flex flex-col md:flex-row items-center gap-1 md:gap-2 p-2 md:p-3 text-xs md:text-sm">
            <CheckCircle className="h-4 w-4" />
            <span className="text-center">Protection</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="prevention" className="mt-6">
          <PreventionTab />
        </TabsContent>

        <TabsContent value="process" className="mt-6">
          <RecoveryProcessTab />
        </TabsContent>

        <TabsContent value="legal" className="mt-6">
          <LegalOptionsTab />
        </TabsContent>

        <TabsContent value="protection" className="mt-6">
          <ProtectionTab />
        </TabsContent>
      </Tabs>

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
