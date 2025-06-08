
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Wrench, MapPin, MessageCircle, FileText, PoundSterling, Users, Clock, BookOpen, AlertTriangle, CheckCircle, TrendingUp, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import ToolboxGrid from "@/components/apprentice/toolbox/ToolboxGrid";
import ToolboxHeader from "@/components/apprentice/toolbox/ToolboxHeader";
import ToolboxTips from "@/components/apprentice/toolbox/ToolboxTips";
import ToolboxCard from "@/components/apprentice/toolbox/ToolboxCard";
import ActiveToolContent from "@/components/apprentice/toolbox/ActiveToolContent";

const ApprenticeToolbox = () => {
  const [activeTool, setActiveTool] = useState<string | null>(null);

  const toolboxItems = [
    {
      id: "tools-guide",
      title: "Tools & Materials Guide",
      icon: <Wrench className="h-6 w-6 text-elec-yellow" />,
      link: "/apprentice/toolbox/tools-guide",
      description: "Essential tools, materials, and equipment guides for electrical work"
    },
    {
      id: "electrical-guides",
      title: "Electrical Installation Guides",
      icon: <BookOpen className="h-6 w-6 text-elec-yellow" />,
      link: "/apprentice/toolbox/electrical-installation-guides",
      description: "Step-by-step guides for domestic, commercial, and industrial installations"
    },
    {
      id: "apprenticeship-expectations",
      title: "Apprenticeship Expectations",
      icon: <CheckCircle className="h-6 w-6 text-elec-yellow" />,
      link: "/apprentice/toolbox/apprenticeship-expectations",
      description: "What to expect during your electrical apprenticeship journey"
    },
    {
      id: "off-job-training",
      title: "Off-the-Job Training Guide",
      icon: <Clock className="h-6 w-6 text-elec-yellow" />,
      link: "/apprentice/toolbox/off-job-training-guide",
      description: "Understanding your 20% off-the-job training requirements"
    },
    {
      id: "site-jargon",
      title: "Site Jargon & Terminology",
      icon: <MessageCircle className="h-6 w-6 text-elec-yellow" />,
      link: "/apprentice/toolbox/site-jargon",
      description: "Common electrical and construction terms you'll hear on site"
    },
    {
      id: "portfolio-building",
      title: "Portfolio Building",
      icon: <FileText className="h-6 w-6 text-elec-yellow" />,
      link: "/apprentice/toolbox/portfolio-building",
      description: "How to document your work and build a professional portfolio"
    },
    {
      id: "rights-and-pay",
      title: "Apprenticeship Rights & Pay",
      icon: <PoundSterling className="h-6 w-6 text-elec-yellow" />,
      link: "/apprentice/rights-and-pay",
      description: "National wage tiers, your rights on site, and support channels when things go wrong"
    },
    {
      id: "communication-skills",
      title: "Communication Skills",
      icon: <Users className="h-6 w-6 text-elec-yellow" />,
      link: "/apprentice/toolbox/communication-skills",
      description: "How to speak with supervisors, report problems, and take feedback professionally"
    },
    {
      id: "study-tips",
      title: "Study Tips & Techniques",
      icon: <BookOpen className="h-6 w-6 text-elec-yellow" />,
      link: "/apprentice/toolbox/study-tips",
      description: "Effective learning strategies for electrical theory and practical skills"
    },
    {
      id: "learning-from-mistakes",
      title: "Learning from Mistakes",
      icon: <AlertTriangle className="h-6 w-6 text-amber-400" />,
      link: "/apprentice/toolbox/learning-from-mistakes",
      description: "How to handle errors professionally and turn them into learning opportunities"
    },
    {
      id: "professional-development",
      title: "Professional Development & Career Planning",
      icon: <TrendingUp className="h-6 w-6 text-blue-400" />,
      link: "/apprentice/professional-development",
      description: "Plan your career progression, explore specialisations, and develop professional skills"
    },
    {
      id: "time-management",
      title: "Time Management & Work-Life Balance",
      icon: <Calendar className="h-6 w-6 text-green-400" />,
      link: "/apprentice/toolbox/time-management",
      description: "Manage your apprenticeship workload whilst maintaining a healthy work-life balance"
    }
  ];

  if (activeTool) {
    return <ActiveToolContent activeTool={activeTool} onClose={() => setActiveTool(null)} />;
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <ToolboxHeader 
          title="Apprentice Guidance Area"
          linkPath="/apprentice"
          linkText="Back to Hub"
        />
        <Link to="/apprentice" className="flex-shrink-0">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Hub
          </Button>
        </Link>
      </div>

      <ToolboxTips />

      <Card className="border-elec-yellow/20 bg-elec-gray p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {toolboxItems.map((item) => (
            <ToolboxCard
              key={item.id}
              title={item.title}
              icon={item.icon}
              link={item.link}
              description={item.description}
            />
          ))}
        </div>
      </Card>
    </div>
  );
};

export default ApprenticeToolbox;
