
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { MessageSquare, Briefcase, Package, Wrench, Shield, PoundSterling } from "lucide-react";

const ElectricalToolboxTalk = () => {
  const toolboxCategories = [
    {
      id: 1,
      title: "Chat",
      icon: <MessageSquare className="h-8 w-8 text-elec-yellow" />,
      link: "/electrician/chat"
    },
    {
      id: 2,
      title: "Job Vacancies",
      icon: <Briefcase className="h-8 w-8 text-elec-yellow" />,
      link: "/electrician/job-vacancies"
    },
    {
      id: 3,
      title: "Materials",
      icon: <Package className="h-8 w-8 text-elec-yellow" />,
      link: "/electrician/materials"
    },
    {
      id: 4,
      title: "Tools",
      icon: <Wrench className="h-8 w-8 text-elec-yellow" />,
      link: "/electrician/tools"
    },
    {
      id: 5,
      title: "Safety & Industry Updates",
      icon: <Shield className="h-8 w-8 text-elec-yellow" />,
      link: "/electrician/safety-shares"
    },
    {
      id: 6,
      title: "Live Pricing",
      icon: <PoundSterling className="h-8 w-8 text-elec-yellow" />,
      link: "/electrician/live-pricing"
    }
  ];

  return (
    <div className="min-h-screen bg-elec-dark text-white">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Clean Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-light text-white mb-6 tracking-tight">
            Electrical Toolbox Talk
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Your central hub for electrical trade resources and community
          </p>
        </div>

        {/* Clean Navigation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {toolboxCategories.map((category) => (
            <Link key={category.id} to={category.link} className="group block">
              <Card className="border-0 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-500 h-full">
                <CardContent className="p-8 text-center h-full flex flex-col justify-center">
                  <div className="w-16 h-16 bg-elec-yellow/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-elec-yellow/20 transition-all duration-300">
                    {category.icon}
                  </div>
                  
                  <h3 className="text-xl font-medium text-white group-hover:text-elec-yellow transition-colors duration-300">
                    {category.title}
                  </h3>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Back Button */}
        <div className="text-center mt-16">
          <Link to="/electrical-hub">
            <Button variant="outline" className="border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10">
              Back to Electrical Hub
            </Button>
          </Link>
        </div>

        {/* Simple Footer */}
        <div className="text-center mt-16 pt-8 border-t border-white/10">
          <p className="text-gray-500 text-sm">
            Connect, share, and grow with the electrical community
          </p>
        </div>
      </div>
    </div>
  );
};

export default ElectricalToolboxTalk;
