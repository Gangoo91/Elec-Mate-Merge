
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MessageCircle, FileText, PoundSterling, Users, Clock, BookOpen, AlertTriangle, CheckCircle, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import ActiveToolContent from "@/components/apprentice/toolbox/ActiveToolContent";

const ApprenticeToolbox = () => {
  const [activeTool, setActiveTool] = useState<string | null>(null);

  const toolboxItems = [
    {
      id: "apprenticeship-expectations",
      title: "Apprenticeship Expectations",
      icon: CheckCircle,
      link: "/apprentice/toolbox/apprenticeship-expectations",
      description: "What to expect during your electrical apprenticeship journey"
    },
    {
      id: "off-job-training",
      title: "Off-the-Job Training Guide",
      icon: Clock,
      link: "/apprentice/toolbox/off-job-training-guide",
      description: "Understanding your 20% off-the-job training requirements"
    },
    {
      id: "site-jargon",
      title: "Site Jargon & Terminology",
      icon: MessageCircle,
      link: "/apprentice/toolbox/site-jargon",
      description: "Common electrical and construction terms you'll hear on site"
    },
    {
      id: "portfolio-building",
      title: "Portfolio Building",
      icon: FileText,
      link: "/apprentice/toolbox/portfolio-building",
      description: "How to document your work and build a professional portfolio"
    },
    {
      id: "rights-and-pay",
      title: "Apprenticeship Rights & Pay",
      icon: PoundSterling,
      link: "/apprentice/rights-and-pay",
      description: "National wage tiers, your rights on site, and support channels when things go wrong"
    },
    {
      id: "communication-skills",
      title: "Communication Skills",
      icon: Users,
      link: "/apprentice/toolbox/communication-skills",
      description: "How to speak with supervisors, report problems, and take feedback professionally"
    },
    {
      id: "study-tips",
      title: "Study Tips & Techniques",
      icon: BookOpen,
      link: "/apprentice/toolbox/study-tips",
      description: "Effective learning strategies for electrical theory and practical skills"
    },
    {
      id: "learning-from-mistakes",
      title: "Learning from Mistakes",
      icon: AlertTriangle,
      link: "/apprentice/toolbox/learning-from-mistakes",
      description: "How to handle errors professionally and turn them into learning opportunities"
    },
    {
      id: "time-management",
      title: "Time Management & Work-Life Balance",
      icon: Calendar,
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
        <h1 className="text-3xl font-bold tracking-tight">Apprentice Guidance Area</h1>
        <Link to="/apprentice" className="flex-shrink-0">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Hub
          </Button>
        </Link>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {toolboxItems.map((item) => (
          <Link to={item.link} key={item.id} className="focus:outline-none">
            <Card className="border-elec-yellow/20 bg-elec-gray h-full hover:bg-elec-gray/80 transition-colors cursor-pointer">
              <CardHeader className="flex flex-col items-center justify-center text-center">
                <item.icon className="h-8 w-8 mb-2 text-elec-yellow" />
                <CardTitle className="text-xl">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground text-center">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ApprenticeToolbox;
