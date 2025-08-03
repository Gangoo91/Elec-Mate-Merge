import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownTabs } from "@/components/ui/dropdown-tabs";
import { Target, TrendingUp, Users, Search, Monitor, Megaphone, Zap } from "lucide-react";
import BackButton from "@/components/common/BackButton";
import MarketResearchTab from "@/components/electrician/business/customers/tabs/MarketResearchTab";
import DigitalMarketingTab from "@/components/electrician/business/customers/tabs/DigitalMarketingTab";
import TraditionalMarketingTab from "@/components/electrician/business/customers/tabs/TraditionalMarketingTab";
import LeadGenerationTab from "@/components/electrician/business/customers/tabs/LeadGenerationTab";
import CustomerExperienceTab from "@/components/electrician/business/customers/tabs/CustomerExperienceTab";
import RetentionGrowthTab from "@/components/electrician/business/customers/tabs/RetentionGrowthTab";

const BusinessCustomers = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-fade-in">
      {/* Header Section */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <Zap className="h-6 w-6 text-elec-yellow" />
          <h1 className="text-2xl font-bold">Customer Acquisition for Electricians</h1>
        </div>
        
        <p className="text-base text-muted-foreground max-w-3xl mx-auto">
          Building a solid customer base requires both strategy and consistency. This comprehensive guide offers proven methods for UK electrical contractors to attract, convert and retain valuable customers.
        </p>
        
        <BackButton 
          customUrl="/electrician/business-development" 
          label="Back to Business Development" 
        />
      </div>

      <DropdownTabs
        defaultValue="market-research"
        placeholder="Select a customer topic..."
        className="w-full"
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

      <Card className="border-elec-yellow/20 bg-elec-gray/50">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Target className="h-5 w-5 text-elec-yellow" />
            Remember
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Customer acquisition is a marathon, not a sprint. Focus on building genuine relationships, 
            delivering exceptional service, and maintaining consistent marketing efforts. Remember that 
            satisfied customers are your best marketing tool - they provide referrals and testimonials 
            that are worth more than any advertising campaign.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default BusinessCustomers;