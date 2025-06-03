
import { Helmet } from "react-helmet";
import IndustryNewsCard from "@/components/electrician/safety-shares/IndustryNewsCard";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const IndustryNews = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-elec-dark text-white p-6">
      <Helmet>
        <title>Industry News - Elec-Mate</title>
        <meta name="description" content="Latest electrical industry news and regulatory updates" />
      </Helmet>
      
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate(-1)}
            className="border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-elec-yellow mb-2">Industry News</h1>
            <p className="text-gray-300">
              Latest news and updates from regulatory bodies and industry leaders
            </p>
          </div>
        </div>

        <IndustryNewsCard />
      </div>
    </div>
  );
};

export default IndustryNews;
