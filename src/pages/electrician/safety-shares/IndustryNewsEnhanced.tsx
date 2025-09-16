
import { Helmet } from "react-helmet";
import EnhancedIndustryNewsCard from "@/components/electrician/safety-shares/EnhancedIndustryNewsCard";
import { ArrowLeft, Newspaper, Clock, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const IndustryNewsEnhanced = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/electrician');
  };

  return (
    <div className="min-h-screen bg-elec-dark">
      <Helmet>
        <title>Enhanced Industry News - Elec-Mate</title>
        <meta name="description" content="Enhanced electrical industry news with user interactions and filtering" />
      </Helmet>
      
      {/* Professional News Header */}
      <header className="border-b border-elec-yellow/10 bg-elec-dark/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between py-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBackClick}
              className="text-elec-yellow hover:bg-elec-yellow/10 hover:text-elec-yellow"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Back to Hub</span>
            </Button>
            
            {/* News Masthead */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-elec-yellow flex items-center justify-center">
                <Zap className="h-4 w-4 text-elec-dark" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  ElecMate <span className="text-elec-yellow">News</span>
                </h1>
                <p className="text-xs text-muted-foreground hidden sm:block">
                  Electrical Industry Updates
                </p>
              </div>
            </div>

            {/* Live Update Indicator */}
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              <span className="hidden sm:inline">Live Updates</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <EnhancedIndustryNewsCard />
      </main>
    </div>
  );
};

export default IndustryNewsEnhanced;
