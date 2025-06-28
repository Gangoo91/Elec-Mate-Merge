
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  BookOpen, 
  Wrench, 
  FileText, 
  Users, 
  Brain,
  GraduationCap,
  Target,
  Shield,
  TrendingUp,
  MessageSquare,
  HelpCircle,
  ArrowRight
} from "lucide-react";
import OJTRatioCard from "@/components/apprentice/OJTRatioCard";
import { useIsMobile } from "@/hooks/use-mobile";

const ApprenticeIndex = () => {
  const isMobile = useIsMobile();

  const quickAccessItems = [
    {
      title: "Learning Resources",
      icon: BookOpen,
      href: "/apprentice/learning"
    },
    {
      title: "Professional Toolbox",
      icon: Wrench,
      href: "/apprentice/toolbox"
    },
    {
      title: "Document Templates",
      icon: FileText,
      href: "/apprentice/documents"
    },
    {
      title: "Career Development",
      icon: TrendingUp,
      href: "/apprentice/career"
    },
    {
      title: "Community Chat",
      icon: MessageSquare,
      href: "/apprentice/chat"
    },
    {
      title: "Off-The-Job Training",
      icon: Users,
      href: "/apprentice/ojt"
    }
  ];

  const learningPaths = [
    {
      title: "Electrical Theory",
      progress: 75,
      modules: 12,
      icon: GraduationCap
    },
    {
      title: "Health & Safety",
      progress: 90,
      modules: 8,
      icon: Shield
    },
    {
      title: "Practical Skills",
      progress: 60,
      modules: 15,
      icon: Target
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">
          Welcome to Elec-Mate
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Your comprehensive electrical apprenticeship companion - designed specifically for UK electrical apprentices
        </p>
      </div>

      {/* Advanced Help Box - Moved to the top */}
      <Link to="/apprentice/advanced-help">
        <Card className="border-elec-yellow/30 bg-gradient-to-br from-elec-yellow/20 to-orange-500/20 hover:scale-105 transition-all duration-200 cursor-pointer">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Brain className="h-8 w-8 text-elec-yellow" />
                <div>
                  <CardTitle className="text-elec-yellow">Advanced Help Box</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    AI-powered assistance and cutting-edge training tools
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 rounded-full text-xs font-semibold text-elec-yellow bg-current/10">
                  AI Enhanced
                </span>
                <ArrowRight className="h-5 w-5 text-elec-yellow" />
              </div>
            </div>
          </CardHeader>
        </Card>
      </Link>

      {/* Learning Progress Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Learning Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {learningPaths.map((path, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <path.icon className="h-5 w-5 text-muted-foreground" />
                    <div className="flex-1">
                      <div className="flex justify-between text-sm mb-1">
                        <span>{path.title}</span>
                        <span className="text-muted-foreground">{path.modules} modules</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="bg-elec-yellow h-2 rounded-full transition-all duration-300"
                          style={{ width: `${path.progress}%` }}
                        />
                      </div>
                    </div>
                    <span className="text-sm font-medium">{path.progress}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        <OJTRatioCard />
      </div>

      {/* Quick Access Grid */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Quick Access</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quickAccessItems.map((item, index) => (
            <Link key={index} to={item.href}>
              <Card className="border-elec-yellow/20 bg-elec-gray hover:bg-elec-gray/80 transition-colors cursor-pointer h-full">
                <CardHeader className="flex flex-col items-center justify-center text-center">
                  <item.icon className="h-8 w-8 mb-2 text-elec-yellow" />
                  <CardTitle className="text-xl">{item.title}</CardTitle>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Help Section */}
      <Card className="border-blue-500/20 bg-blue-500/5">
        <CardHeader>
          <CardTitle className="text-blue-400 flex items-center gap-2">
            <HelpCircle className="h-5 w-5" />
            Need Help Getting Started?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            New to Elec-Mate? Check out our getting started guide or explore the Advanced Help Box for AI-powered assistance.
          </p>
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link to="/apprentice/advanced-help">
                Get AI Help
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/apprentice/learning">
                Start Learning
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ApprenticeIndex;
