
import BusinessCustomersHeader from "@/components/electrician/business/customers/BusinessCustomersHeader";
import MarketResearchCard from "@/components/electrician/business/customers/MarketResearchCard";
import DigitalMarketingCard from "@/components/electrician/business/customers/DigitalMarketingCard";
import TraditionalMarketingCard from "@/components/electrician/business/customers/TraditionalMarketingCard";
import ClientConversionCard from "@/components/electrician/business/customers/ClientConversionCard";
import CustomerExperienceCard from "@/components/electrician/business/customers/CustomerExperienceCard";
import ClientRetentionCard from "@/components/electrician/business/customers/ClientRetentionCard";
import SuccessCaseStudies from "@/components/electrician/business/customers/SuccessCaseStudies";
import SaveToFavouritesButton from "@/components/electrician/business/customers/SaveToFavouritesButton";
import BusinessTips from "@/components/electrician/business/BusinessTips";

const BusinessCustomers = () => {
  return (
    <div className="space-y-6 animate-fade-in pb-12">
      <BusinessCustomersHeader />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <MarketResearchCard />
        <DigitalMarketingCard />
        <TraditionalMarketingCard />
        <ClientConversionCard />
        <CustomerExperienceCard />
        <ClientRetentionCard />
      </div>
      
      <SuccessCaseStudies />
      
      <BusinessTips />
      
      <SaveToFavouritesButton />
    </div>
  );
};

export default BusinessCustomers;
