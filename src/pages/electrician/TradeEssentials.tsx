
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { MessageSquare, Briefcase, Package, Wrench, Shield, PoundSterling, ArrowLeft } from "lucide-react";

const TradeEssentials = () => {
  const essentialsCategories = [
    {
      id: 1,
      title: "Chat",
      icon: <MessageSquare className="h-6 w-6 text-elec-yellow" />,
      link: "/electrician/chat",
      badge: "Community"
    },
    {
      id: 2,
      title: "Job Vacancies",
      icon: <Briefcase className="h-6 w-6 text-elec-yellow" />,
      link: "/electrician/job-vacancies",
      badge: "Careers"
    },
    {
      id: 3,
      title: "Materials",
      icon: <Package className="h-6 w-6 text-elec-yellow" />,
      link: "/electrician/materials",
      badge: "Resources"
    },
    {
      id: 4,
      title: "Tools",
      icon: <Wrench className="h-6 w-6 text-elec-yellow" />,
      link: "/electrician/tools",
      badge: "Equipment"
    },
    {
      id: 5,
      title: "Safety & Industry Updates",
      icon: <Shield className="h-6 w-6 text-elec-yellow" />,
      link: "/electrician/safety-shares",
      badge: "Safety"
    },
    {
      id: 6,
      title: "Live Pricing",
      icon: <PoundSterling className="h-6 w-6 text-elec-yellow" />,
      link: "/electrician/live-pricing",
      badge: "Pricing"
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Trade Essentials</h1>
        <Link to="/electrical-hub" className="flex-shrink-0">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Electrical Hub
          </Button>
        </Link>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {essentialsCategories.map((category) => (
          <Link to={category.link} key={category.id} className="focus:outline-none">
            <Card className="border-elec-yellow/20 bg-elec-gray h-full hover:bg-elec-gray/80 transition-colors cursor-pointer">
              <CardHeader className="flex flex-col items-center justify-center text-center">
                <div className="p-2 bg-elec-yellow/20 rounded-lg mb-2">
                  {category.icon}
                </div>
                <CardTitle className="text-xl">{category.title}</CardTitle>
                <Badge className="bg-elec-yellow/20 text-elec-yellow border-elec-yellow/30 mt-2">
                  {category.badge}
                </Badge>
              </CardHeader>
              <CardContent>
                {/* Removed descriptions for cleaner look */}
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TradeEssentials;
