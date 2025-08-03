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
      "market-research": "Market Research",
      "digital-marketing": "Digital Marketing",
      "traditional-marketing": "Traditional Marketing", 
      "lead-generation": "Lead Generation",
      "customer-experience": "Customer Experience",
      "retention-growth": "Retention & Growth"
    };
    return tabNames[value as keyof typeof tabNames] || value;
  };

  return (
    <div className="min-h-screen bg-background space-y-6 animate-fade-in pb-12">
      <div className="space-y-6">
        <BusinessCustomersHeader />
        
        <div className="bg-card/30 backdrop-blur border border-elec-yellow/20 rounded-lg p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            {isMobile ? (
              <div className="mb-6">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-full justify-between bg-card/50 border border-elec-yellow/20 hover:bg-elec-yellow/10">
                      {getTabDisplayName(activeTab)}
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-full bg-card border border-elec-yellow/20">
                    <DropdownMenuItem onClick={() => setActiveTab("market-research")}>
                      Market Research
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setActiveTab("digital-marketing")}>
                      Digital Marketing
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setActiveTab("traditional-marketing")}>
                      Traditional Marketing
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setActiveTab("lead-generation")}>
                      Lead Generation
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setActiveTab("customer-experience")}>
                      Customer Experience
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setActiveTab("retention-growth")}>
                      Retention & Growth
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <TabsList className="grid w-full grid-cols-6 bg-card/50 border border-elec-yellow/20 mb-6">
                <TabsTrigger 
                  value="market-research" 
                  className="text-xs sm:text-sm data-[state=active]:bg-elec-yellow/20 data-[state=active]:text-elec-yellow"
                >
                  Market Research
                </TabsTrigger>
                <TabsTrigger 
                  value="digital-marketing" 
                  className="text-xs sm:text-sm data-[state=active]:bg-elec-yellow/20 data-[state=active]:text-elec-yellow"
                >
                  Digital Marketing
                </TabsTrigger>
                <TabsTrigger 
                  value="traditional-marketing" 
                  className="text-xs sm:text-sm data-[state=active]:bg-elec-yellow/20 data-[state=active]:text-elec-yellow"
                >
                  Traditional Marketing
                </TabsTrigger>
                <TabsTrigger 
                  value="lead-generation" 
                  className="text-xs sm:text-sm data-[state=active]:bg-elec-yellow/20 data-[state=active]:text-elec-yellow"
                >
                  Lead Generation
                </TabsTrigger>
                <TabsTrigger 
                  value="customer-experience" 
                  className="text-xs sm:text-sm data-[state=active]:bg-elec-yellow/20 data-[state=active]:text-elec-yellow"
                >
                  Customer Experience
                </TabsTrigger>
                <TabsTrigger 
                  value="retention-growth" 
                  className="text-xs sm:text-sm data-[state=active]:bg-elec-yellow/20 data-[state=active]:text-elec-yellow"
                >
                  Retention & Growth
                </TabsTrigger>
              </TabsList>
            )}

            <div className="mt-6">
              <TabsContent value="market-research" className="mt-0">
                <MarketResearchTab />
              </TabsContent>

              <TabsContent value="digital-marketing" className="mt-0">
                <DigitalMarketingTab />
              </TabsContent>

              <TabsContent value="traditional-marketing" className="mt-0">
                <TraditionalMarketingTab />
              </TabsContent>

              <TabsContent value="lead-generation" className="mt-0">
                <LeadGenerationTab />
              </TabsContent>

              <TabsContent value="customer-experience" className="mt-0">
                <CustomerExperienceTab />
              </TabsContent>

              <TabsContent value="retention-growth" className="mt-0">
                <RetentionGrowthTab />
              </TabsContent>
            </div>
          </Tabs>
        </div>

        <SaveToFavouritesButton />
      </div>
    </div>
  );
};

export default BusinessCustomers;