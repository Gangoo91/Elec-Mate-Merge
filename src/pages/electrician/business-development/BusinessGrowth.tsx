
import { TrendingUp, ArrowLeft, Target, PoundSterling, Megaphone, Wrench, Settings, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownTabs } from "@/components/ui/dropdown-tabs";
import { GrowthStrategiesTab } from "@/components/electrician/business-development/growth/GrowthStrategiesTab";
import { PricingStrategiesTab } from "@/components/electrician/business-development/growth/PricingStrategiesTab";
import { MarketingTab } from "@/components/electrician/business-development/growth/MarketingTab";
import { ServiceDiversificationTab } from "@/components/electrician/business-development/growth/ServiceDiversificationTab";
import { OperationsTab } from "@/components/electrician/business-development/growth/OperationsTab";
import { FinancialManagementTab } from "@/components/electrician/business-development/growth/FinancialManagementTab";

const BusinessGrowth = () => {
  const tabs = [
    {
      value: "growth-strategies",
      label: "Growth Strategies",
      icon: Target,
      content: <GrowthStrategiesTab />
    },
    {
      value: "pricing",
      label: "Pricing Strategies", 
      icon: PoundSterling,
      content: <PricingStrategiesTab />
    },
    {
      value: "marketing",
      label: "Marketing & Sales",
      icon: Megaphone,
      content: <MarketingTab />
    },
    {
      value: "diversification",
      label: "Service Diversification",
      icon: Wrench,
      content: <ServiceDiversificationTab />
    },
    {
      value: "operations",
      label: "Operations & Systems",
      icon: Settings,
      content: <OperationsTab />
    },
    {
      value: "financial",
      label: "Financial Management",
      icon: BarChart3,
      content: <FinancialManagementTab />
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-2">
        <Link to="/electrician/business-development">
          <Button variant="ghost" size="sm" className="gap-1">
            <ArrowLeft className="h-4 w-4" />
            <span>Back</span>
          </Button>
        </Link>
        <div className="flex items-center gap-3">
          <TrendingUp className="h-6 w-6 text-elec-yellow" />
          <h1 className="text-2xl font-bold">Growing Your Business</h1>
        </div>
      </div>

      <div className="mb-6">
        <p className="text-muted-foreground">
          Comprehensive strategies and guidance for expanding your electrical contracting business in the UK market for 2025.
        </p>
      </div>

      <DropdownTabs 
        tabs={tabs}
        defaultValue="growth-strategies"
        placeholder="Select a growth topic..."
        className="w-full"
      />

      <Card className="border-elec-yellow/20 bg-elec-gray/50">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Target className="h-5 w-5 text-elec-yellow" />
            Remember
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Growing a successful electrical business requires patience, strategic planning, and consistent execution. 
            Focus on building strong relationships with customers, maintaining high-quality work standards, and 
            adapting to market changes. Success comes from small, consistent improvements over time.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default BusinessGrowth;
