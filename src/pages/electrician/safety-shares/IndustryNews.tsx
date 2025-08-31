
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

  const sampleNewsData = [
    {
      id: 1,
      title: "New BS 7671:2018+A2:2022 Amendment Released",
      content: "The Institution of Engineering and Technology has released the latest amendment to the UK wiring regulations, introducing new requirements for electrical installations.",
      date: "2024-03-15",
      source: "IET"
    },
    {
      id: 2,
      title: "Electric Vehicle Charging Infrastructure Update",
      content: "New guidance published on residential EV charging point installations following increased demand across the UK.",
      date: "2024-03-12",
      source: "NICEIC"
    },
    {
      id: 3,
      title: "Part P Building Regulations Changes",
      content: "Updates to Part P of the Building Regulations affecting notifiable electrical work in dwellings.",
      date: "2024-03-10",
      source: "LABC"
    }
  ];

  return (
    <div className="min-h-screen bg-elec-gray text-white">
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

        <IndustryNewsCard newsData={sampleNewsData} />
        
        {/* Section divider and Major Projects */}
        <div className="pt-12 space-y-8">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-3">
              <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center">
                <Building2 className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-elec-yellow">Major Projects</h2>
            </div>
            <p className="text-muted-foreground">
              Latest major electrical infrastructure projects, tenders, and contract awards
            </p>
          </div>
          
          <MajorProjectsCard />
        </div>
      </div>
    </div>
  );
};

export default IndustryNews;
