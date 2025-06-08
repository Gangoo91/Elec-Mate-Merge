
import { useState } from "react";
import BackButton from "@/components/common/BackButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GraduationCap, Award, BookOpen, Briefcase, TrendingUp, Users, Target, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";
import ProfessionalDevelopmentDashboard from "@/components/apprentice/professional-development/ProfessionalDevelopmentDashboard";
import IndustryInsights from "@/components/apprentice/professional-development/IndustryInsights";
import ResourceLibrary from "@/components/apprentice/professional-development/ResourceLibrary";

const ProfessionalDevelopment = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const navigationCards = [
    {
      title: "Career Progression Paths",
      description: "Explore electrical career pathways from apprentice to specialist roles",
      icon: GraduationCap,
      link: "/apprentice/professional-development/career-pathways",
      color: "text-blue-400"
    },
    {
      title: "Professional Certifications",
      description: "Discover industry certifications and qualification requirements",
      icon: Award,
      link: "/apprentice/professional-development/certifications",
      color: "text-green-400"
    },
    {
      title: "Continuing Education",
      description: "Find courses, training programmes, and learning opportunities",
      icon: BookOpen,
      link: "/apprentice/professional-development/continuing-education",
      color: "text-purple-400"
    },
    {
      title: "Industry Networking",
      description: "Connect with professionals and expand your industry network",
      icon: Briefcase,
      link: "/apprentice/professional-development/industry-networking",
      color: "text-orange-400"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fade-in">
      <div className="flex flex-col items-center justify-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight mb-4">Professional Development</h1>
        <BackButton customUrl="/apprentice" label="Back to Apprentice Hub" />
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="insights" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Industry Insights
          </TabsTrigger>
          <TabsTrigger value="resources" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Resource Library
          </TabsTrigger>
          <TabsTrigger value="networking" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Development Areas
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <ProfessionalDevelopmentDashboard />
        </TabsContent>

        <TabsContent value="insights" className="space-y-6">
          <IndustryInsights />
        </TabsContent>

        <TabsContent value="resources" className="space-y-6">
          <ResourceLibrary />
        </TabsContent>

        <TabsContent value="networking" className="space-y-6">
          {/* Professional Development Areas */}
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-elec-yellow" />
                Professional Development Areas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">
                Explore specific areas of professional development to advance your electrical career. 
                Each area provides targeted resources, pathways, and opportunities for growth.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {navigationCards.map((card, index) => (
                  <Link to={card.link} key={index} className="group">
                    <Card className="border-elec-yellow/20 bg-gradient-to-b from-elec-gray to-elec-gray/80 hover:from-elec-gray/90 hover:to-elec-gray/70 transition-all duration-300 shadow-lg shadow-black/20 h-full">
                      <CardContent className="flex flex-col items-center justify-center p-6 h-full">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="p-3 rounded-lg bg-elec-yellow/10 border border-elec-yellow/20">
                            <card.icon className={`h-8 w-8 ${card.color} group-hover:scale-110 transition-transform`} />
                          </div>
                        </div>
                        <h2 className="text-xl font-bold mb-3 text-center">{card.title}</h2>
                        <p className="text-sm text-muted-foreground text-center leading-relaxed">
                          {card.description}
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Additional Development Resources */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-elec-yellow/20 bg-elec-gray">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-elec-yellow" />
                  Professional Bodies
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-elec-dark/50 rounded-lg">
                    <div className="font-medium text-white">Institution of Engineering & Technology (IET)</div>
                    <div className="text-sm text-muted-foreground">Professional engineering institution</div>
                  </div>
                  <div className="p-3 bg-elec-dark/50 rounded-lg">
                    <div className="font-medium text-white">Electrical Contractors' Association (ECA)</div>
                    <div className="text-sm text-muted-foreground">Trade association for electrical contractors</div>
                  </div>
                  <div className="p-3 bg-elec-dark/50 rounded-lg">
                    <div className="font-medium text-white">NICEIC</div>
                    <div className="text-sm text-muted-foreground">Electrical safety certification body</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-elec-yellow/20 bg-elec-gray">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-elec-yellow" />
                  Next Steps
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button className="w-full justify-start bg-elec-yellow/10 hover:bg-elec-yellow hover:text-black">
                    Complete Skills Assessment
                  </Button>
                  <Button variant="outline" className="w-full justify-start border-elec-yellow/30">
                    Set Development Goals
                  </Button>
                  <Button variant="outline" className="w-full justify-start border-elec-yellow/30">
                    Book Career Consultation
                  </Button>
                  <Button variant="outline" className="w-full justify-start border-elec-yellow/30">
                    Join Professional Network
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfessionalDevelopment;
