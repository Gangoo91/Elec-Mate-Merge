
import { Helmet } from "react-helmet";
import IndustryNewsCard from "@/components/electrician/safety-shares/IndustryNewsCard";
import { ArrowLeft, Newspaper } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const IndustryNews = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-elec-dark text-white">
      <Helmet>
        <title>Industry News - Elec-Mate</title>
        <meta name="description" content="Latest electrical industry news and regulatory updates" />
      </Helmet>
      
      <div className="container mx-auto py-4 md:py-8 px-2 md:px-4 lg:px-8">
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate(-1)}
            className="border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10 hover:border-elec-yellow/50"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-elec-yellow flex items-center justify-center">
              <Newspaper className="h-5 w-5 text-elec-dark" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-elec-yellow">Industry News</h1>
              <p className="text-gray-300 text-sm md:text-base">
                Latest news and updates from regulatory bodies and industry leaders
              </p>
            </div>
          </div>
        </div>

        <IndustryNewsCard />
      </div>
    </div>
  );
};

export default IndustryNews;
