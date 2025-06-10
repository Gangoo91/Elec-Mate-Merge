
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  BookOpen, 
  Calculator, 
  Wrench, 
  FileText, 
  Users, 
  Award,
  Brain,
  GraduationCap,
  Clock,
  Target,
  Briefcase,
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
      description: "Access comprehensive study materials and interactive content",
      icon: BookOpen,
      href: "/apprentice/learning",
      color: "blue",
      featured: true
    },
    {
      title: "Electrical Calculators",
      description: "Professional calculation tools for electrical work",
      icon: Calculator,
      href: "/apprentice/calculators",
      color: "green"
    },
    {
      title: "Professional Toolbox",
      description: "Guidance for building your professional toolkit",
      icon: Wrench,
      href: "/apprentice/toolbox",
      color: "orange"
    },
    {
      title: "Document Templates",
      description: "Professional templates and documentation tools",
      icon: FileText,
      href: "/apprentice/documents",
      color: "purple"
    },
    {
      title: "Career Development",
      description: "Plan your electrical career progression",
      icon: TrendingUp,
      href: "/apprentice/career",
      color: "teal"
    },
    {
      title: "Community Chat",
      description: "Connect with other apprentices and professionals",
      icon: MessageSquare,
      href: "/apprentice/chat",
      color: "pink"
    }
  ];

  const specialFeatures = [
    {
      title: "Advanced Help Box",
      description: "AI-powered assistance and cutting-edge training tools",
      icon: Brain,
      href: "/apprentice/advanced-help",
      gradient: "from-elec-yellow/20 to-orange-500/20",
      border: "border-elec-yellow/30",
      textColor: "text-elec-yellow",
      badge: "AI Enhanced"
    },
    {
      title: "Off-The-Job Training",
      description: "Track your 20% training requirement and manage portfolio",
      icon: Clock,
      href: "/apprentice/enhanced-ojt",
      gradient: "from-blue-500/20 to-cyan-500/20",
      border: "border-blue-500/30",
      textColor: "text-blue-400",
      badge: "Track Progress"
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

      {/* Special Features */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {specialFeatures.map((feature, index) => (
          <Link key={index} to={feature.href}>
            <Card className={`${feature.border} bg-gradient-to-br ${feature.gradient} hover:scale-105 transition-all duration-200 cursor-pointer`}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <feature.icon className={`h-8 w-8 ${feature.textColor}`} />
                    <div>
                      <CardTitle className={feature.textColor}>{feature.title}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {feature.badge && (
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${feature.textColor} bg-current/10`}>
                        {feature.badge}
                      </span>
                    )}
                    <ArrowRight className={`h-5 w-5 ${feature.textColor}`} />
                  </div>
                </div>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>

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
              <Card className="hover:shadow-lg transition-all duration-200 cursor-pointer group">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <item.icon className={`h-6 w-6 text-${item.color}-500 group-hover:scale-110 transition-transform`} />
                    <div>
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </div>
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
