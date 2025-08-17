
import { Helmet } from "react-helmet";
import EnhancedIndustryNewsCard from "@/components/electrician/safety-shares/EnhancedIndustryNewsCard";
import { ArrowLeft, Newspaper } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const IndustryNewsEnhanced = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    // If there's browser history, go back, otherwise go to safety shares
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/electrician/safety-shares');
    }
  };

  return (
    <div className="min-h-screen bg-elec-dark text-white">
      <Helmet>
        <title>Enhanced Industry News - Elec-Mate</title>
        <meta name="description" content="Enhanced electrical industry news with user interactions and filtering" />
      </Helmet>
      
      <div className="space-y-8 animate-fade-in">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={handleBackClick}
            className="border-elec-yellow/20 text-elec-yellow hover:bg-elec-yellow/10 hover:border-elec-yellow/40 bg-transparent"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-elec-yellow flex items-center justify-center">
              <Newspaper className="h-6 w-6 text-elec-dark" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-elec-yellow">Enhanced Industry News</h1>
              <p className="text-muted-foreground">
                Interactive industry news with filtering, ratings, and bookmarking
              </p>
            </div>
          </div>
        </div>

        <EnhancedIndustryNewsCard />
      </div>
    </div>
  );
};

export default IndustryNewsEnhanced;
