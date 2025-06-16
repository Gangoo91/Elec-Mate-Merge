
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
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
      <div className="flex flex-col items-center justify-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight mb-4">Debt Recovery & Non-Payers</h1>
        <p className="text-muted-foreground text-center max-w-2xl mb-4">
          Professional strategies for managing late payments and protecting your business cash flow
        </p>
        <BackButton customUrl="/electrician/business-development" label="Back to Business Development" />
      </div>

      <Tabs defaultValue="prevention" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="prevention" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Prevention
          </TabsTrigger>
          <TabsTrigger value="process" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Process
          </TabsTrigger>
          <TabsTrigger value="legal" className="flex items-center gap-2">
            <Phone className="h-4 w-4" />
            Legal Options
          </TabsTrigger>
          <TabsTrigger value="protection" className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4" />
            Protection
          </TabsTrigger>
        </TabsList>

        <TabsContent value="prevention">
          <PreventionTab />
        </TabsContent>

        <TabsContent value="process">
          <RecoveryProcessTab />
        </TabsContent>

        <TabsContent value="legal">
          <LegalOptionsTab />
        </TabsContent>

        <TabsContent value="protection">
          <ProtectionTab />
        </TabsContent>
      </Tabs>

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
