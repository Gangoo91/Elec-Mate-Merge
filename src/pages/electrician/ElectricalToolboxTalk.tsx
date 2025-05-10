
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { MessageSquare, Briefcase, Package, Wrench, Shield, PoundSterling } from "lucide-react";

const ElectricalToolboxTalk = () => {
  const toolboxCategories = [
    {
      id: 1,
      title: "Chat",
      description: "Connect with other electricians and share knowledge",
      icon: <MessageSquare className="h-6 w-6 text-elec-yellow" />,
      link: "/electrician/chat"
    },
    {
      id: 2,
      title: "Job Vacancies",
      description: "Find the latest electrical job opportunities",
      icon: <Briefcase className="h-6 w-6 text-elec-yellow" />,
      link: "/electrician/job-vacancies"
    },
    {
      id: 3,
      title: "Materials",
      description: "Browse and source electrical materials",
      icon: <Package className="h-6 w-6 text-elec-yellow" />,
      link: "/electrician/materials"
    },
    {
      id: 4,
      title: "Tools",
      description: "Essential tools and equipment for electrical work",
      icon: <Wrench className="h-6 w-6 text-elec-yellow" />,
      link: "/electrician/tools"
    },
    {
      id: 5,
      title: "Safety & Industry Updates",
      description: "Safety information and lessons from experience",
      icon: <Shield className="h-6 w-6 text-elec-yellow" />,
      link: "/electrician/safety-shares"
    },
    {
      id: 6,
      title: "Live Pricing",
      description: "Real-time pricing updates for materials and services",
      icon: <PoundSterling className="h-6 w-6 text-elec-yellow" />,
      link: "/electrician/live-pricing"
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold tracking-tight mb-4">Electrical Toolbox Talk</h1>
        <Link to="/electrical-hub">
          <Button variant="outline">Back to Electrical Hub</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {toolboxCategories.map((category) => (
          <Link to={category.link} key={category.id} className="block">
            <Card 
              className="border-elec-yellow/20 bg-elec-gray hover:border-elec-yellow/50 transition-all flex flex-col h-full"
            >
              <CardHeader className="pb-2">
                <CardTitle className="text-xl flex items-center gap-2">
                  {category.icon}
                  {category.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col flex-1 justify-between">
                <CardDescription className="text-sm mb-4">
                  {category.description}
                </CardDescription>
                <Button className="w-full mt-auto">View Details</Button>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ElectricalToolboxTalk;
