
import { Helmet } from "react-helmet";
import IndustryNewsCard from "@/components/electrician/safety-shares/IndustryNewsCard";
import IndustryNewsHero from "@/components/electrician/safety-shares/IndustryNewsHero";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const IndustryNews = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/electrician');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-elec-dark via-elec-dark/98 to-elec-dark/95 text-white">
      <Helmet>
        <title>Industry News & Updates - Elec-Mate</title>
        <meta name="description" content="Latest regulatory updates, compliance information, and industry developments from leading electrical bodies and professional sources" />
        <meta name="keywords" content="electrical news, BS 7671, regulations, compliance, industry updates, electrical safety" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>
      
      <div className="mx-auto max-w-7xl px-3 sm:px-4 lg:px-6 xl:px-8 py-4 sm:py-6 lg:py-8 space-y-6 sm:space-y-8 animate-fade-in">
        {/* Mobile-optimized back button */}
        <div className="flex justify-start">
          <Button
            variant="outline"
            size="sm"
            onClick={handleBackClick}
            className="border-elec-yellow/20 text-elec-yellow hover:bg-elec-yellow/10 hover:border-elec-yellow/40 bg-transparent transition-all duration-200 touch-target min-h-[44px] px-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            <span className="hidden xs:inline">Back to Electrical Hub</span>
            <span className="xs:hidden">Back</span>
          </Button>
        </div>

        {/* Enhanced Hero Section */}
        <IndustryNewsHero />
        
        {/* Main Content */}
        <div className="space-y-6 sm:space-y-8">
          <IndustryNewsCard />
        </div>
      </div>
    </div>
  );
};

export default IndustryNews;
