
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Rocket, Calculator, FileText, PoundSterling, TrendingUp, Settings, Target, Clock, Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import BusinessCalculator from "./BusinessCalculator";
import LegalSetupTab from "./LegalSetupTab";
import FundingOptionsTab from "./FundingOptionsTab";
import MarketingStrategyTab from "./MarketingStrategyTab";
import OperationalSetupTab from "./OperationalSetupTab";

const StartupTabs = () => {
  const successMetrics = [
    { label: "Business Setup Time", value: "8-12 weeks", icon: Clock, color: "text-blue-400" },
    { label: "Average Success Rate", value: "87%", icon: Target, color: "text-green-400" },
    { label: "First Year Survival", value: "92%", icon: Shield, color: "text-purple-400" },
    { label: "ROI Timeline", value: "18-24 months", icon: TrendingUp, color: "text-amber-400" }
  ];

  const keyBenefits = [
    "Complete step-by-step guidance from setup to first customer",
    "Interactive calculators for financial planning and pricing",
    "Legal compliance checklists and document templates",
    "Marketing strategies proven to work for electrical contractors",
    "Ongoing support and resources for sustainable growth"
  ];

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
          <div className="space-y-6">
            <p className="text-muted-foreground">
              Everything you need to start your electrical contracting business in the UK. From legal setup to your first customer, 
              we'll guide you through each essential step with practical tools and expert advice.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {successMetrics.map((metric, index) => (
                <div key={index} className="text-center p-4 bg-elec-dark/50 rounded-lg">
                  <metric.icon className={`h-6 w-6 mx-auto mb-2 ${metric.color}`} />
                  <div className={`text-xl font-bold ${metric.color}`}>{metric.value}</div>
                  <div className="text-xs text-muted-foreground">{metric.label}</div>
                </div>
              ))}
            </div>

            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
              <h4 className="font-semibold text-green-400 mb-3">What You'll Get:</h4>
              <ul className="space-y-2">
                {keyBenefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap gap-2">
              <Badge className="bg-elec-yellow/20 text-elec-yellow">Free Resources</Badge>
              <Badge className="bg-blue-500/20 text-blue-400">Expert Guidance</Badge>
              <Badge className="bg-green-500/20 text-green-400">Proven Methods</Badge>
              <Badge className="bg-purple-500/20 text-purple-400">Interactive Tools</Badge>
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
