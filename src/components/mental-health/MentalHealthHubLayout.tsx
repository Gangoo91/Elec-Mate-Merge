
import { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, ArrowLeft, Shield, Users, BookOpen, Brain } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

interface MentalHealthHubLayoutProps {
  children: ReactNode;
  showBackButton?: boolean;
}

const MentalHealthHubLayout = ({ children, showBackButton = true }: MentalHealthHubLayoutProps) => {
  const location = useLocation();
  const isElectricianPath = location.pathname.startsWith('/electrician/');
  const basePath = isElectricianPath ? '/electrician' : '/apprentice';

  const quickAccessCards = [
    {
      title: "Crisis Support",
      icon: <Shield className="h-5 w-5 text-red-400" />,
      description: "24/7 emergency helplines",
      link: `${isElectricianPath ? '/electrician' : '/apprentice'}/mental-health/crisis-resources`,
      urgent: true
    },
    {
      title: "Stress Management",
      icon: <Brain className="h-5 w-5 text-blue-400" />,
      description: "Quick techniques & tools",
      link: `${isElectricianPath ? '/electrician' : '/apprentice'}/mental-health/stress-management`
    },
    {
      title: "Mental Health Mates",
      icon: <Users className="h-5 w-5 text-purple-400" />,
      description: "Connect with peer support",
      link: "#mental-health-mates"
    },
    {
      title: "Resources Library",
      icon: <BookOpen className="h-5 w-5 text-green-400" />,
      description: "Guides, articles & tools",
      link: `${isElectricianPath ? '/electrician' : '/apprentice'}/mental-health/resources`
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in pb-6">
      {/* Enhanced Header */}
      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <Heart className="h-8 w-8 text-elec-yellow" />
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Mental Health Hub</h1>
              <p className="text-sm sm:text-base text-muted-foreground">
                Your wellbeing matters - find support, resources, and community here
              </p>
            </div>
          </div>
        </div>
        {showBackButton && (
          <Link to={basePath} className="self-start sm:self-auto">
            <Button variant="outline" size="sm" className="w-full sm:w-auto flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Hub
            </Button>
          </Link>
        )}
      </div>

      {/* Emergency Banner */}
      <Card className="border-red-500/40 bg-red-500/5 shadow-md">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <Shield className="h-8 w-8 text-red-500 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-red-500">Emergency Support</h3>
              <p className="text-sm">
                If you're in crisis, call <span className="font-bold">999</span> or contact Samaritans at{" "}
                <a href="tel:116123" className="font-bold text-red-500 hover:underline">116 123</a> (free, 24/7)
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Access Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickAccessCards.map((card) => (
          <Link 
            key={card.title}
            to={card.link.startsWith('#') ? card.link : card.link}
            className="block group"
          >
            <Card className={`border-elec-yellow/20 bg-elec-gray h-full hover:shadow-md hover:border-elec-yellow/30 transition-all group-hover:scale-[1.02] ${card.urgent ? 'border-red-500/30 bg-red-500/5' : ''}`}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {card.icon}
                    <CardTitle className="text-sm">{card.title}</CardTitle>
                  </div>
                  {card.urgent && (
                    <Badge className="bg-red-500 text-white text-xs">Urgent</Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-xs text-muted-foreground">{card.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Main Content */}
      {children}
    </div>
  );
};

export default MentalHealthHubLayout;
