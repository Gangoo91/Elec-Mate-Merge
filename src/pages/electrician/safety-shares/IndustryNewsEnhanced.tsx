
import { Helmet } from "react-helmet";
import EnhancedIndustryNewsCard from "@/components/electrician/safety-shares/EnhancedIndustryNewsCard";
import { ArrowLeft, Newspaper } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const IndustryNewsEnhanced = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/electrician');
  };

  return (
    <div className="min-h-screen bg-elec-dark text-white">
      <Helmet>
        <title>Enhanced Industry News - Elec-Mate</title>
        <meta name="description" content="Enhanced electrical industry news with user interactions and filtering" />
      </Helmet>
      
      <div className="container mx-auto px-6 py-8 space-y-8 animate-fade-in">
        {/* Top-left back button */}
        <div className="flex justify-start">
          <Button
            variant="outline"
            size="sm"
            onClick={handleBackClick}
            className="border-elec-yellow/20 text-elec-yellow hover:bg-elec-yellow/10 hover:border-elec-yellow/40 bg-transparent"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Electrical Hub
          </Button>
        </div>

        {/* Centralized title */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <div className="w-12 h-12 rounded-full bg-elec-yellow flex items-center justify-center">
              <Newspaper className="h-6 w-6 text-elec-dark" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-elec-yellow">Industry News</h1>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Interactive industry news with filtering, ratings, and bookmarking
          </p>
        </div>

        <EnhancedIndustryNewsCard />
      </div>
    </div>
  );
};

export default IndustryNewsEnhanced;
