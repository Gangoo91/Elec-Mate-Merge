import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownTabs } from "@/components/ui/dropdown-tabs";
import { Target, TrendingUp, Users, Search, Monitor, Megaphone, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import MarketResearchTab from "@/components/electrician/business/customers/tabs/MarketResearchTab";
import DigitalMarketingTab from "@/components/electrician/business/customers/tabs/DigitalMarketingTab";
import TraditionalMarketingTab from "@/components/electrician/business/customers/tabs/TraditionalMarketingTab";
import LeadGenerationTab from "@/components/electrician/business/customers/tabs/LeadGenerationTab";
import CustomerExperienceTab from "@/components/electrician/business/customers/tabs/CustomerExperienceTab";
import RetentionGrowthTab from "@/components/electrician/business/customers/tabs/RetentionGrowthTab";

const BusinessCustomers = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Hero Section */}
      <div className="bg-elec-gray rounded-lg p-8 text-center space-y-6">
        <div className="flex items-center justify-center gap-4">
          <Target className="h-8 w-8 text-elec-yellow" />
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            Customer Acquisition for Electricians
          </h1>
        </div>
        
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Building a solid customer base requires both strategy and consistency. This comprehensive guide offers proven methods for UK electrical contractors to attract, convert and retain valuable customers.
        </p>
        
        <Link to="/electrician/business-development">
          <Button variant="outline" size="lg" className="gap-2 border-elec-yellow/20 hover:bg-elec-yellow/10">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Business Development</span>
          </Button>
        </Link>
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