
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

  // Sample news data - this would typically come from an API or database
  const newsData = [
    {
      id: 1,
      title: "New BS7671 18th Edition Update Released",
      content: "The latest amendment to BS7671 introduces important changes to electrical safety standards, particularly regarding surge protection devices and electric vehicle charging installations.",
      date: "2024-01-15",
      source: "IET Wiring Regulations"
    },
    {
      id: 2,
      title: "NICEIC Launches Enhanced Inspection Scheme",
      content: "NICEIC announces new inspection procedures for domestic and commercial electrical installations, focusing on improved safety protocols and compliance verification.",
      date: "2024-01-12",
      source: "NICEIC"
    },
    {
      id: 3,
      title: "Electric Vehicle Charging Infrastructure Expansion",
      content: "Government announces £500 million investment in public EV charging points, creating significant opportunities for qualified electrical contractors.",
      date: "2024-01-10",
      source: "Department for Transport"
    },
    {
      id: 4,
      title: "New Safety Guidelines for Solar Panel Installations",
      content: "Updated safety guidelines released for photovoltaic installations following recent incidents, emphasising proper isolation procedures and maintenance protocols.",
      date: "2024-01-08",
      source: "Solar Trade Association"
    },
    {
      id: 5,
      title: "NAPIT Introduces Digital Certification System",
      content: "NAPIT launches new digital platform for electrical certificates, streamlining the certification process and improving compliance tracking.",
      date: "2024-01-05",
      source: "NAPIT"
    }
  ];

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

        <IndustryNewsCard newsData={newsData} />
        
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
