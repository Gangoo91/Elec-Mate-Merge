
import { Helmet } from "react-helmet";
import IndustryNewsCard from "@/components/electrician/safety-shares/IndustryNewsCard";
import MajorProjectsCard from "@/components/electrician/safety-shares/MajorProjectsCard";
import { ArrowLeft, Newspaper, Building2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const IndustryNews = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/electrician');
  };

  return (
    <div className="min-h-screen bg-elec-dark text-white">
      <Helmet>
        <title>Industry News - Elec-Mate</title>
        <meta name="description" content="Latest regulatory updates and compliance information from industry bodies" />
      </Helmet>
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
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
        </div>
        
        <IndustryNewsCard />
      </div>
    </div>
  );
};

export default IndustryNews;
