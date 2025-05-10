
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { MessageSquare, Wrench, Shield, GraduationCap, BookOpen, LightbulbIcon } from "lucide-react";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import StudyPlanner from "@/components/apprentice/study/StudyPlanner";

const ApprenticeToolbox = () => {
  const [showStudyPlanner, setShowStudyPlanner] = useState(false);
  const isMobile = useIsMobile();

  const toolboxCategories = [
    {
      id: 1,
      title: "Chat",
      icon: <MessageSquare className="h-6 w-6 text-elec-yellow" />,
      link: "/apprentice/chat"
    },
    {
      id: 3,
      title: "Basic Tools Guide",
      icon: <Wrench className="h-6 w-6 text-elec-yellow" />,
      link: "/apprentice/tools-guide"
    },
    {
      id: 4,
      title: "Safety Fundamentals",
      icon: <Shield className="h-6 w-6 text-elec-yellow" />,
      link: "/apprentice/safety-fundamentals"
    },
    {
      id: 6,
      title: "Qualification Pathway",
      icon: <GraduationCap className="h-6 w-6 text-elec-yellow" />,
      link: "/apprentice/career-progression"
    }
  ];

  const toggleStudyPlanner = () => {
    setShowStudyPlanner(!showStudyPlanner);
  };

  return (
    <div className="space-y-6 animate-fade-in pb-6">
      <div className="flex flex-col items-center justify-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight mb-4">Apprentice Toolbox</h1>
        <Link to="/apprentice/hub" className="w-full max-w-xs">
          <Button variant="outline" className="w-full">Back to Apprentice Hub</Button>
        </Link>
      </div>

      {!showStudyPlanner && (
        <>
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
                    <Button className="w-full mt-auto">View Details</Button>
                  </CardContent>
                </Card>
              </Link>
            ))}

            {/* Quick Reference Card */}
            <Card className="border-elec-yellow/20 bg-elec-gray hover:border-elec-yellow/50 transition-all flex flex-col h-full">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl flex items-center gap-2">
                  <BookOpen className="h-6 w-6 text-elec-yellow" />
                  Quick References
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col flex-1 justify-between">
                <div className="space-y-2 mb-4">
                  <div className="text-sm p-2 bg-elec-dark rounded-md">
                    <span className="font-semibold text-elec-yellow">18th Edition:</span> BS 7671:2018+A2:2022
                  </div>
                  <div className="text-sm p-2 bg-elec-dark rounded-md">
                    <span className="font-semibold text-elec-yellow">Copper/Aluminium:</span> 17.24 / 28.26 Ω mm²/km
                  </div>
                </div>
                <Button variant="outline" className="w-full">View All References</Button>
              </CardContent>
            </Card>

            {/* Study Planner Trigger Card */}
            <Card 
              className="border-elec-yellow/20 bg-elec-gray hover:border-elec-yellow/50 transition-all flex flex-col h-full cursor-pointer"
              onClick={toggleStudyPlanner}
            >
              <CardHeader className="pb-2">
                <CardTitle className="text-xl flex items-center gap-2">
                  <LightbulbIcon className="h-6 w-6 text-elec-yellow" />
                  Study Planner
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col flex-1 justify-between">
                <div className="text-sm text-muted-foreground mb-4">
                  Create personalized study plans for your apprenticeship
                </div>
                <Button className="w-full mt-auto">Open Study Planner</Button>
              </CardContent>
            </Card>
          </div>

          {/* Tips section - only visible on desktop */}
          {!isMobile && (
            <div className="bg-elec-gray border border-elec-yellow/20 rounded-lg p-4 mt-6">
              <h3 className="text-lg font-medium text-elec-yellow mb-2">Top Tips for New Apprentices</h3>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li>Always carry a voltage tester and use it before working on circuits</li>
                <li>Keep a notebook for recording important information on site</li>
                <li>Ask questions - experienced electricians are usually happy to share knowledge</li>
                <li>Invest in quality tools that will last throughout your apprenticeship</li>
              </ul>
            </div>
          )}
        </>
      )}

      {showStudyPlanner && (
        <div className="space-y-4">
          <Button variant="outline" onClick={toggleStudyPlanner} className="mb-2">
            Back to Toolbox
          </Button>
          <StudyPlanner />
        </div>
      )}
    </div>
  );
};

export default ApprenticeToolbox;
