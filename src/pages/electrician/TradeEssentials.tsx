
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { MessageSquare, Briefcase, Package, Wrench, Shield, PoundSterling, ArrowLeft, Zap } from "lucide-react";

const TradeEssentials = () => {
  const essentialsCategories = [
    {
      id: 1,
      title: "Chat",
      description: "Connect with other electricians and share knowledge",
      icon: <MessageSquare className="h-6 w-6 text-elec-yellow" />,
      link: "/electrician/chat",
      badge: "Community",
      color: "from-blue-500/10 to-elec-yellow/10"
    },
    {
      id: 2,
      title: "Job Vacancies",
      description: "Find the latest electrical job opportunities",
      icon: <Briefcase className="h-6 w-6 text-elec-yellow" />,
      link: "/electrician/job-vacancies",
      badge: "Careers",
      color: "from-green-500/10 to-elec-yellow/10"
    },
    {
      id: 3,
      title: "Materials",
      description: "Browse and source electrical materials",
      icon: <Package className="h-6 w-6 text-elec-yellow" />,
      link: "/electrician/materials",
      badge: "Resources",
      color: "from-purple-500/10 to-elec-yellow/10"
    },
    {
      id: 4,
      title: "Tools",
      description: "Essential tools and equipment for electrical work",
      icon: <Wrench className="h-6 w-6 text-elec-yellow" />,
      link: "/electrician/tools",
      badge: "Equipment",
      color: "from-amber-500/10 to-elec-yellow/10"
    },
    {
      id: 5,
      title: "Safety & Industry Updates",
      description: "Safety information and lessons from experience",
      icon: <Shield className="h-6 w-6 text-elec-yellow" />,
      link: "/electrician/safety-shares",
      badge: "Safety",
      color: "from-red-500/10 to-elec-yellow/10"
    },
    {
      id: 6,
      title: "Live Pricing",
      description: "Real-time pricing updates for materials and services",
      icon: <PoundSterling className="h-6 w-6 text-elec-yellow" />,
      link: "/electrician/live-pricing",
      badge: "Pricing",
      color: "from-emerald-500/10 to-elec-yellow/10"
    }
  ];

  const stats = [
    { label: "Active Professionals", value: "12,500+", icon: MessageSquare },
    { label: "Job Opportunities", value: "850+", icon: Briefcase },
    { label: "Tool Reviews", value: "2,300+", icon: Wrench },
    { label: "Safety Updates", value: "Weekly", icon: Shield }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-elec-dark via-elec-gray to-elec-dark">
      <div className="container mx-auto px-4 py-6 space-y-8 animate-fade-in max-w-7xl">
        {/* Enhanced Header */}
        <div className="space-y-6">
          <div className="flex justify-start">
            <Link to="/electrical-hub">
              <Button 
                variant="outline" 
                className="bg-elec-gray/50 border-elec-yellow/30 hover:bg-elec-yellow/10 text-white"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Electrical Hub
              </Button>
            </Link>
          </div>
          
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 bg-elec-yellow/20 rounded-full">
                <Zap className="h-8 w-8 text-elec-yellow" />
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-elec-yellow leading-tight">
                Trade Essentials
              </h1>
            </div>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-3xl mx-auto">
              Your comprehensive toolkit for electrical professionals. Connect with peers, find opportunities, 
              source materials, and stay updated with the latest industry insights.
            </p>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="bg-elec-gray/30 backdrop-blur border border-elec-yellow/20 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-elec-yellow mb-4 text-center">
            Community Overview
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-4 bg-elec-dark/50 rounded-lg">
                <stat.icon className="h-6 w-6 mx-auto mb-2 text-elec-yellow" />
                <div className="text-xl font-bold text-elec-yellow">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Categories Grid */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-center text-white">
            Essential Services & Resources
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {essentialsCategories.map((category) => (
              <Link to={category.link} key={category.id} className="block group">
                <Card className={`border-elec-yellow/20 bg-gradient-to-br ${category.color} hover:border-elec-yellow/50 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-elec-yellow/10 h-full backdrop-blur`}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="p-2 bg-elec-yellow/20 rounded-lg group-hover:bg-elec-yellow/30 transition-colors">
                        {category.icon}
                      </div>
                      <Badge className="bg-elec-yellow/20 text-elec-yellow border-elec-yellow/30">
                        {category.badge}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl text-white group-hover:text-elec-yellow transition-colors">
                      {category.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col flex-1 justify-between">
                    <CardDescription className="text-sm mb-4 text-muted-foreground leading-relaxed">
                      {category.description}
                    </CardDescription>
                    <Button 
                      className="w-full mt-auto bg-elec-yellow/10 hover:bg-elec-yellow/20 text-elec-yellow border border-elec-yellow/30 group-hover:border-elec-yellow/50 transition-all"
                      variant="outline"
                    >
                      Access Now
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-elec-yellow/10 to-blue-500/10 border border-elec-yellow/30 rounded-lg p-6 mt-8 shadow-lg">
          <div className="text-center space-y-4">
            <h3 className="text-xl font-semibold text-elec-yellow">
              Ready to Enhance Your Electrical Career?
            </h3>
            <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Join thousands of electrical professionals who rely on Elec-Mate for their daily work. 
              From safety updates to career opportunities, we've got everything you need.
            </p>
            <div className="flex flex-wrap justify-center gap-3 mt-4">
              <Badge className="bg-green-500/20 text-green-400">Live Updates</Badge>
              <Badge className="bg-blue-500/20 text-blue-400">Expert Community</Badge>
              <Badge className="bg-purple-500/20 text-purple-400">Trusted Resources</Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradeEssentials;
