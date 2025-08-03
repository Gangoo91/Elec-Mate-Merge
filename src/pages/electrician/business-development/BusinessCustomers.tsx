
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { useMobileEnhanced } from "@/hooks/use-mobile-enhanced";
import BusinessCustomersHeader from "@/components/electrician/business/customers/BusinessCustomersHeader";
import MarketResearchTab from "@/components/electrician/business/customers/tabs/MarketResearchTab";
import DigitalMarketingTab from "@/components/electrician/business/customers/tabs/DigitalMarketingTab";
import TraditionalMarketingTab from "@/components/electrician/business/customers/tabs/TraditionalMarketingTab";
import LeadGenerationTab from "@/components/electrician/business/customers/tabs/LeadGenerationTab";
import CustomerExperienceTab from "@/components/electrician/business/customers/tabs/CustomerExperienceTab";
import RetentionGrowthTab from "@/components/electrician/business/customers/tabs/RetentionGrowthTab";
import SaveToFavouritesButton from "@/components/electrician/business/customers/SaveToFavouritesButton";

const BusinessCustomers = () => {
  const [activeTab, setActiveTab] = useState("market-research");
  const { isMobile } = useMobileEnhanced();

  const getTabDisplayName = (value: string) => {
    const tabNames = {
      "market-research": "Market Research & Targeting",
      "digital-marketing": "Digital Marketing Strategies",
      "traditional-marketing": "Traditional Marketing & Networking", 
      "lead-generation": "Lead Generation & Conversion",
      "customer-experience": "Customer Experience & Service",
      "retention-growth": "Retention & Growth"
    };
    return tabNames[value as keyof typeof tabNames] || value;
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      <BusinessCustomersHeader />
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        {isMobile ? (
          <div className="mb-6">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full justify-between">
                  {getTabDisplayName(activeTab)}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-full bg-background border border-border">
                <DropdownMenuItem onClick={() => setActiveTab("market-research")}>
                  Market Research & Targeting
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setActiveTab("digital-marketing")}>
                  Digital Marketing Strategies
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setActiveTab("traditional-marketing")}>
                  Traditional Marketing & Networking
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setActiveTab("lead-generation")}>
                  Lead Generation & Conversion
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setActiveTab("customer-experience")}>
                  Customer Experience & Service
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setActiveTab("retention-growth")}>
                  Retention & Growth
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <TabsList className="grid w-full grid-cols-6 mb-6">
            <TabsTrigger value="market-research" className="text-xs">Market Research</TabsTrigger>
            <TabsTrigger value="digital-marketing" className="text-xs">Digital Marketing</TabsTrigger>
            <TabsTrigger value="traditional-marketing" className="text-xs">Traditional Marketing</TabsTrigger>
            <TabsTrigger value="lead-generation" className="text-xs">Lead Generation</TabsTrigger>
            <TabsTrigger value="customer-experience" className="text-xs">Customer Experience</TabsTrigger>
            <TabsTrigger value="retention-growth" className="text-xs">Retention & Growth</TabsTrigger>
          </TabsList>
        )}

        <TabsContent value="market-research">
          <MarketResearchTab />
        </TabsContent>

        <TabsContent value="digital-marketing">
          <DigitalMarketingTab />
        </TabsContent>

        <TabsContent value="traditional-marketing">
          <TraditionalMarketingTab />
        </TabsContent>

        <TabsContent value="lead-generation">
          <LeadGenerationTab />
        </TabsContent>

        <TabsContent value="customer-experience">
          <CustomerExperienceTab />
        </TabsContent>

        <TabsContent value="retention-growth">
          <RetentionGrowthTab />
        </TabsContent>
      </Tabs>
      
      <SaveToFavouritesButton />
    </div>
  );
};

export default BusinessCustomers;
