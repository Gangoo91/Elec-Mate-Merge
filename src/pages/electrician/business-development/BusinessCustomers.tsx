import BackButton from "@/components/common/BackButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownTabs } from "@/components/ui/dropdown-tabs";
import { Target, TrendingUp, Users, Search, Monitor, Megaphone } from "lucide-react";
import BusinessCustomersHeader from "@/components/electrician/business/customers/BusinessCustomersHeader";
import MarketResearchTab from "@/components/electrician/business/customers/tabs/MarketResearchTab";
import DigitalMarketingTab from "@/components/electrician/business/customers/tabs/DigitalMarketingTab";
import TraditionalMarketingTab from "@/components/electrician/business/customers/tabs/TraditionalMarketingTab";
import LeadGenerationTab from "@/components/electrician/business/customers/tabs/LeadGenerationTab";
import CustomerExperienceTab from "@/components/electrician/business/customers/tabs/CustomerExperienceTab";
import RetentionGrowthTab from "@/components/electrician/business/customers/tabs/RetentionGrowthTab";
import CustomerStatsCards from "@/components/electrician/business/customers/CustomerStatsCards";
import SaveToFavouritesButton from "@/components/electrician/business/customers/SaveToFavouritesButton";

const BusinessCustomers = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
      <div className="flex flex-col items-center justify-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight mb-4 flex items-center gap-3">
          <Target className="h-8 w-8 text-elec-yellow" />
          Customer Acquisition for Electricians
        </h1>
        <p className="text-muted-foreground text-center max-w-2xl mb-4">
          Building a solid customer base requires both strategy and consistency. This comprehensive guide offers proven methods for UK electrical contractors to attract, convert and retain valuable customers.
        </p>
        <BackButton customUrl="/electrician/business-development" label="Back to Business Development" />
      </div>

      <CustomerStatsCards />

      <DropdownTabs
        defaultValue="market-research"
        placeholder="Select a section"
        tabs={[
          {
            value: "market-research",
            label: "Market Research & Targeting",
            icon: Search,
            content: <MarketResearchTab />
          },
          {
            value: "digital-marketing",
            label: "Digital Marketing",
            icon: Monitor,
            content: <DigitalMarketingTab />
          },
          {
            value: "traditional-marketing",
            label: "Traditional Marketing",
            icon: Megaphone,
            content: <TraditionalMarketingTab />
          },
          {
            value: "lead-generation",
            label: "Lead Generation",
            icon: Target,
            content: <LeadGenerationTab />
          },
          {
            value: "customer-experience",
            label: "Customer Experience",
            icon: Users,
            content: <CustomerExperienceTab />
          },
          {
            value: "retention-growth",
            label: "Retention & Growth",
            icon: TrendingUp,
            content: <RetentionGrowthTab />
          }
        ]}
      />

      <Card className="border-green-500/50 bg-green-500/10">
        <CardHeader>
          <CardTitle className="text-green-300 flex items-center gap-2">
            <Target className="h-5 w-5" />
            Success Tip
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed text-center md:text-left">
            Customer acquisition is a marathon, not a sprint. Focus on building genuine relationships, 
            delivering exceptional service, and maintaining consistent marketing efforts. Remember that 
            satisfied customers are your best marketing tool - they provide referrals and testimonials 
            that are worth more than any advertising campaign.
          </p>
        </CardContent>
      </Card>

      <SaveToFavouritesButton />
    </div>
  );
};

export default BusinessCustomers;