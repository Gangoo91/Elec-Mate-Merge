
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, ArrowLeft, FileText, PoundSterling, Settings, TrendingUp, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import BackButton from "@/components/common/BackButton";
import LegalSetupTab from "@/components/electrician/business-development/startup/LegalSetupTab";
import FinanceTab from "@/components/electrician/business-development/startup/FinanceTab";
import OperationsTab from "@/components/electrician/business-development/startup/OperationsTab";
import GrowthTab from "@/components/electrician/business-development/startup/GrowthTab";

const BusinessStartup = () => {
  const [activeTab, setActiveTab] = useState("legal");

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
      <div className="flex flex-col items-center justify-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight mb-4">Starting an Electrical Business</h1>
        <p className="text-muted-foreground text-center max-w-2xl mb-4">
          Complete guidance for establishing and growing your electrical contracting business in the UK
        </p>
        <BackButton customUrl="/electrician/business-development" label="Back to Business Development" />
      </div>

      <Tabs defaultValue="legal" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="legal" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">Legal Setup</span>
            <span className="inline sm:hidden">Legal</span>
          </TabsTrigger>
          <TabsTrigger value="finance" className="flex items-center gap-2">
            <PoundSterling className="h-4 w-4" />
            <span className="hidden sm:inline">Finance</span>
            <span className="inline sm:hidden">Money</span>
          </TabsTrigger>
          <TabsTrigger value="operations" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            <span className="hidden sm:inline">Operations</span>
            <span className="inline sm:hidden">Ops</span>
          </TabsTrigger>
          <TabsTrigger value="growth" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            <span className="hidden sm:inline">Growth</span>
            <span className="inline sm:hidden">Scale</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="legal">
          <LegalSetupTab />
        </TabsContent>

        <TabsContent value="finance">
          <FinanceTab />
        </TabsContent>

        <TabsContent value="operations">
          <OperationsTab />
        </TabsContent>

        <TabsContent value="growth">
          <GrowthTab />
        </TabsContent>
      </Tabs>

      <Card className="border-green-500/50 bg-green-500/10">
        <CardHeader>
          <CardTitle className="text-green-300 flex items-center gap-2">
            <Lightbulb className="h-5 w-5" />
            Success Foundation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Building a successful electrical business requires careful planning, proper legal setup, 
            sound financial management, and excellent customer service. Take time to establish 
            solid foundations - they'll support your growth for years to come. Remember, every 
            successful electrician started exactly where you are now.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default BusinessStartup;
