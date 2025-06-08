
import BackButton from "@/components/common/BackButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PoundSterling, Shield, Phone, Calculator, FileText, Heart, Users } from "lucide-react";
import WageInformationTab from "@/components/apprentice/rights-pay/WageInformationTab";
import ApprenticeRightsTab from "@/components/apprentice/rights-pay/ApprenticeRightsTab";
import SupportResourcesTab from "@/components/apprentice/rights-pay/SupportResourcesTab";
import InteractiveToolsTab from "@/components/apprentice/rights-pay/InteractiveToolsTab";

const RightsAndPay = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
      <div className="flex flex-col items-center justify-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight mb-4">Apprenticeship Rights & Pay</h1>
        <p className="text-muted-foreground text-center max-w-2xl mb-4">
          Know your rights, understand wage expectations, and learn where to get help when needed
        </p>
        <BackButton customUrl="/apprentice/toolbox" label="Back to Guidance Area" />
      </div>

      <Tabs defaultValue="wages" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="wages" className="flex items-center gap-2">
            <PoundSterling className="h-4 w-4" />
            Wages
          </TabsTrigger>
          <TabsTrigger value="rights" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Rights
          </TabsTrigger>
          <TabsTrigger value="support" className="flex items-center gap-2">
            <Phone className="h-4 w-4" />
            Support
          </TabsTrigger>
          <TabsTrigger value="tools" className="flex items-center gap-2">
            <Calculator className="h-4 w-4" />
            Tools
          </TabsTrigger>
        </TabsList>

        <TabsContent value="wages">
          <WageInformationTab />
        </TabsContent>

        <TabsContent value="rights">
          <ApprenticeRightsTab />
        </TabsContent>

        <TabsContent value="support">
          <SupportResourcesTab />
        </TabsContent>

        <TabsContent value="tools">
          <InteractiveToolsTab />
        </TabsContent>
      </Tabs>

      <Card className="border-green-500/50 bg-green-500/10">
        <CardHeader>
          <CardTitle className="text-green-300 flex items-center gap-2">
            <Heart className="h-5 w-5" />
            Remember
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Your apprenticeship should be a positive learning experience. While challenges are normal, 
            exploitation, unsafe conditions, or unfair treatment are not. Don't suffer in silence - 
            help is available and using it shows strength, not weakness.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default RightsAndPay;
