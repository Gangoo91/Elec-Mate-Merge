
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Rocket, Calculator, FileText, PoundSterling, TrendingUp, Settings } from "lucide-react";
import BusinessCalculator from "./BusinessCalculator";
import LegalSetupTab from "./LegalSetupTab";
import FundingOptionsTab from "./FundingOptionsTab";
import MarketingStrategyTab from "./MarketingStrategyTab";
import OperationalSetupTab from "./OperationalSetupTab";

const StartupTabs = () => {
  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/30 bg-gradient-to-br from-elec-yellow/10 to-blue-500/10">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <Rocket className="h-6 w-6" />
            Complete Startup Guide for Electrical Contractors
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Everything you need to start your electrical contracting business in the UK. From legal setup to your first customer, 
            we'll guide you through each essential step with practical tools and expert advice.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">5</div>
              <div className="text-xs text-muted-foreground">Essential Sections</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">£2K-5K</div>
              <div className="text-xs text-muted-foreground">Typical Setup Cost</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">8-12</div>
              <div className="text-xs text-muted-foreground">Weeks to Launch</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-amber-400">90%</div>
              <div className="text-xs text-muted-foreground">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-elec-yellow">Free</div>
              <div className="text-xs text-muted-foreground">All Resources</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="calculator" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 h-auto p-1">
          <TabsTrigger value="calculator" className="flex items-center gap-2 p-3">
            <Calculator className="h-4 w-4" />
            <span className="hidden sm:inline">Calculator</span>
          </TabsTrigger>
          <TabsTrigger value="legal" className="flex items-center gap-2 p-3">
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">Legal Setup</span>
          </TabsTrigger>
          <TabsTrigger value="funding" className="flex items-center gap-2 p-3">
            <PoundSterling className="h-4 w-4" />
            <span className="hidden sm:inline">Funding</span>
          </TabsTrigger>
          <TabsTrigger value="marketing" className="flex items-center gap-2 p-3">
            <TrendingUp className="h-4 w-4" />
            <span className="hidden sm:inline">Marketing</span>
          </TabsTrigger>
          <TabsTrigger value="operations" className="flex items-center gap-2 p-3">
            <Settings className="h-4 w-4" />
            <span className="hidden sm:inline">Operations</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="calculator" className="space-y-6">
          <BusinessCalculator />
        </TabsContent>

        <TabsContent value="legal" className="space-y-6">
          <LegalSetupTab />
        </TabsContent>

        <TabsContent value="funding" className="space-y-6">
          <FundingOptionsTab />
        </TabsContent>

        <TabsContent value="marketing" className="space-y-6">
          <MarketingStrategyTab />
        </TabsContent>

        <TabsContent value="operations" className="space-y-6">
          <OperationalSetupTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StartupTabs;
